import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const app = express();
const PORT = Number(process.env.PORT || 3001);
const MODEL = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct';
const API_KEY = process.env.OPENROUTER_API_KEY || '';

app.use(cors());
app.use(express.json({ limit: '64kb' }));

// ---------- helpers ----------

const CRISIS_KEYWORDS = [
  'kill myself', 'suicide', 'end my life', 'harm myself', 'self harm',
  'cut myself', 'dont want to live', "don't want to live", 'hang myself',
  'overdose', 'die', 'no reason to live',
];

function hasCrisisIntent(text) {
  if (!text || typeof text !== 'string') return false;
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((k) => lower.includes(k));
}

function keyLooksLikeOR(key) {
  return typeof key === 'string' && /^sk-or-v1-[A-Za-z0-9]{16,}$/.test(key);
}

function safetyArticle(categoryId) {
  return {
    id: `crisis-${Date.now()}`,
    categoryId,
    title: 'We Hear You, and You Are Not Alone',
    subtitle: 'Immediate, caring support is available for you right now.',
    introduction:
      'What you are feeling right now matters, and you deserve support right away. This guide pauses everything else to help you reach someone who can help.',
    estimatedMinutes: 2,
    keyTakeaway:
      'Your life and safety are the most important thing. Please connect with someone who can support you right now.',
    reflectionQuestion: 'Can you reach out to one trusted person or counsellor right now?',
    actionSteps: [
      'Call or text a crisis support hotline (free, confidential, available 24/7).',
      'Speak with a school counsellor, parent, or trusted adult immediately.',
      'Stay in a safe place with someone you trust.',
    ],
    sections: [
      {
        heading: '01 — Please know you matter deeply',
        body: 'What you are feeling right now is very serious, and no one should have to walk through this alone. There are people trained and ready to listen without judging you.',
        type: 'story',
      },
      {
        heading: '02 — Confidential immediate resources',
        body: 'If you are in distress, please reach out to 988 Suicide & Crisis Lifeline (call/text 988 in the US/Canada), text HOME to 741741 (Crisis Text Line), or contact your local school counsellor or emergency services. They are free, confidential, and care about you.',
        type: 'advice',
      },
    ],
    createdAt: new Date().toISOString(),
  };
}

function buildPrompt({ categoryId, categoryTitle, answers, answerDetails, freeTextAnswer, customConcern }) {
  const detailLines =
    Array.isArray(answerDetails) && answerDetails.length > 0
      ? answerDetails.map((d) => `- Q: ${d.question}\n  A: ${d.answer}`).join('\n')
      : Object.entries(answers || {})
          .map(([q, a]) => `- ${q}: ${a}`)
          .join('\n');

  const extra = [customConcern, freeTextAnswer].filter(Boolean).join(' | ') || 'None';

  return `You are an expert school psychologist and compassionate editor writing for a student mental wellness app named MindEase.
Write a personalized mental wellness guide for a school student. Supportive, warm, non-judgmental tone for middle/high school reading level. No clinical jargon, no diagnoses, no shaming, no promises of cures. Encourage talking to a trusted adult, teacher, or school counsellor when stress feels heavy.

Student situation (use ALL of this — the article must directly reference their specific answers, not generic advice):
Category: ${categoryTitle} (${categoryId})
Answers:
${detailLines || '(none)'}
Additional context in student's own words: ${String(extra).slice(0, 500)}

Return ONLY raw JSON (no markdown fences) matching this shape:
{
  "title": string (engaging, relatable, references their situation),
  "subtitle": string,
  "introduction": string (2-4 empathetic sentences naming their specific concerns),
  "estimatedMinutes": number (2-5),
  "keyTakeaway": string,
  "reflectionQuestion": string,
  "actionSteps": string[] (3-5 concrete steps),
  "conclusion": string (supportive closing, 2-4 sentences, suggests trusted adult/counsellor),
  "sections": [
    { "heading": string, "body": string, "type": "story" | "advice" | "exercise", "practicalTip"?: string,
      "exerciseDetails"?: { "kind": "breathing" | "checklist" | "timer" | "reflection", "title": string, "description": string, "actionItems"?: string[] } }
  ]
}

Rules:
1. Exactly 3 to 4 sections, headings prefixed "01", "02", "03" (, "04").
2. At least 1 section of type "exercise" with exerciseDetails.
3. Every section body must reference something from the student's answers (not generic).
4. Simple, age-appropriate language.`;
}

function validateArticleJson(parsed) {
  const errors = [];
  if (!parsed || typeof parsed !== 'object') return ['Response was not a JSON object'];
  for (const f of ['title', 'subtitle', 'keyTakeaway', 'reflectionQuestion']) {
    if (typeof parsed[f] !== 'string' || !parsed[f].trim()) errors.push(`Missing field: ${f}`);
  }
  if (!Number.isFinite(parsed.estimatedMinutes)) errors.push('Missing field: estimatedMinutes');
  if (!Array.isArray(parsed.actionSteps) || parsed.actionSteps.length < 2) errors.push('actionSteps must have 2+ items');
  if (!Array.isArray(parsed.sections) || parsed.sections.length < 3 || parsed.sections.length > 4)
    errors.push('sections must contain 3-4 items');
  else {
    let hasExercise = false;
    for (const [i, s] of parsed.sections.entries()) {
      if (!s.heading || !s.body || !['story', 'advice', 'exercise'].includes(s.type))
        errors.push(`sections[${i}] needs heading, body, valid type`);
      if (s.type === 'exercise') {
        hasExercise = true;
        const e = s.exerciseDetails;
        if (!e || !e.title || !e.description || !['breathing', 'checklist', 'timer', 'reflection'].includes(e.kind))
          errors.push(`sections[${i}].exerciseDetails incomplete`);
      }
    }
    if (!hasExercise) errors.push('At least one exercise section is required');
  }
  return errors;
}

function stripFences(text) {
  const t = String(text).trim();
  const m = t.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (m) return m[1];
  // Fallback: extract the largest {...} block (models often add preamble/postamble).
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) return t.slice(start, end + 1);
  return t;
}

// ---------- routes ----------

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    model: MODEL,
    provider: 'openrouter',
    hasKey: Boolean(API_KEY),
    // Never expose the key value — only whether its shape looks like an OpenRouter key.
    keyLooksValid: keyLooksLikeOR(API_KEY),
  });
});

app.post('/api/generate-blog', async (req, res) => {
  try {
    const { categoryId, categoryTitle, answers, answerDetails, freeTextAnswer, customConcern } = req.body || {};

    const allowed = ['exams', 'studies', 'friends', 'family', 'confidence', 'other'];
    if (!allowed.includes(categoryId)) {
      return res.status(400).json({ code: 'BAD_REQUEST', message: 'Unknown categoryId.' });
    }
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ code: 'BAD_REQUEST', message: 'answers object is required.' });
    }

    // Safety first: crisis language never goes to the AI, answered locally.
    // This is a deliberate safety response (source: "safety"), NOT a fallback.
    if (hasCrisisIntent(customConcern) || hasCrisisIntent(freeTextAnswer)) {
      return res.json({ article: safetyArticle(categoryId), safety: true, source: 'safety' });
    }

    // A key must exist — and merely existing is not enough to assume validity.
    const key = (process.env.OPENROUTER_API_KEY || '').trim();
    if (!key) {
      return res.status(500).json({
        code: 'MISSING_KEY',
        message: 'OPENROUTER_API_KEY is not configured on the server. Add a valid OpenRouter key (starts with "sk-or-v1-...") to the server .env file and restart.',
      });
    }
    // No silent fallbacks below: every failure returns a structured HTTP error
    // so the client can show a real error + Retry instead of a fabricated article.

    const prompt = buildPrompt({ categoryId, categoryTitle, answers, answerDetails, freeTextAnswer, customConcern });

    let upstream;
    try {
      upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
          'HTTP-Referer': 'http://localhost:3001',
          'X-Title': 'MindEase',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.8,
          max_tokens: 2048,
        }),
        signal: AbortSignal.timeout(90000),
      });
    } catch {
      return res.status(502).json({ code: 'NETWORK', message: "We couldn't generate your guide right now. Please try again." });
    }

    if (!upstream.ok) {
      const status = upstream.status;
      let detail = '';
      try {
        detail = await upstream.text();
      } catch { /* ignore body read errors */ }
      if (status === 401 || status === 403) {
        return res.status(502).json({
          code: 'INVALID_KEY',
          message: 'The AI service rejected the API key. Verify OPENROUTER_API_KEY is a valid OpenRouter key.',
          upstream: detail.slice(0, 300),
        });
      }
      if (status === 429 || status === 402) {
        return res.status(429).json({ code: 'RATE_LIMIT', message: 'The OpenRouter service has no credits / is rate-limited right now. Check your OpenRouter credits, then try again.' });
      }
      return res.status(502).json({ code: 'UPSTREAM_ERROR', message: `The AI service returned an error (HTTP ${status}). Please try again.`, upstream: detail.slice(0, 300) });
    }

    const data = await upstream.json();
    const text =
      data?.choices?.[0]?.message?.content ||
      (Array.isArray(data?.choices) ? data.choices.map((c) => c?.text || '').join('') : '') ||
      '';
    if (!text) {
      return res.status(502).json({ code: 'INVALID_RESPONSE', message: "We couldn't generate your guide right now. Please try again." });
    }

    let parsed;
    try {
      parsed = JSON.parse(stripFences(text));
    } catch {
      return res.status(502).json({ code: 'INVALID_RESPONSE', message: 'The AI returned malformed data. Please try again.' });
    }

    const problems = validateArticleJson(parsed);
    if (problems.length > 0) {
      return res.status(502).json({ code: 'INVALID_RESPONSE', message: 'The AI response failed validation. Please try again.', details: problems });
    }

    // Genuine OpenRouter output only — explicit source metadata (never trust an ID alone).
    return res.json({
      article: {
        id: `article-ai-${Date.now()}`,
        categoryId,
        createdAt: new Date().toISOString(),
        estimatedMinutes: Math.max(2, Math.min(6, Math.round(parsed.estimatedMinutes))),
        ...parsed,
      },
      source: 'ai',
    });
  } catch (err) {
    console.error('generate-blog failed:', err);
    return res.status(500).json({ code: 'SERVER_ERROR', message: "We couldn't generate your guide right now. Please try again." });
  }
});

// Serve built frontend in production (dist/ next to server/)

const distDir = path.join(ROOT, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/.*/, (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
}

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[mindease] API listening on http://localhost:${PORT}`);
    console.log(`[mindease] provider=openrouter model=${MODEL} hasKey=${Boolean(API_KEY)} keyLooksValid=${keyLooksLikeOR(API_KEY)}`);
  });
}

export default app;
