import type { BlogArticle, BlogErrorCode, BlogGenerationError, UserResponses } from '../types';
import { CATEGORY_QUESTIONS } from '../data/stressCategories';



// Legacy pre-crafted articles (kept for reference/tests only — NOT used as a
// fallback in the live flow, per product requirement).
export function generateCuratedArticle(responses: UserResponses): BlogArticle {
  const { categoryId, answers, freeTextAnswer } = responses;
  const now = new Date().toISOString();

  switch (categoryId) {
    case 'exams': {
      const worry = answers['exam_worry'] || 'low_marks';
      const help = answers['desired_help'] || 'study_plan';

      let title = "When Exam Pressure Feels Too Heavy";
      let subtitle = "A gentle guide to feeling calmer, studying smarter, and trusting your progress.";
      let keyTakeaway = "You are more than a mark on a report card. Your brain learns best when it feels safe, not scared.";

      if (worry === 'forget_stuff') {
        title = "Studying Hard But Blanking Out? Here is Why";
        subtitle = "How to stop memory freeze, retain what you study, and walk into exam rooms with clarity.";
        keyTakeaway = "Blanking out is just your nervous system hitting an emergency alarm. Calming your body unlocks your memory.";
      } else if (worry === 'lack_time') {
        title = "Tackling the Crunch When Time Feels Too Short";
        subtitle = "How to prioritize high-impact topics and breathe through last-minute revision panic.";
        keyTakeaway = "You do not need to master 100% of the syllabus to make meaningful progress today. 20 focused minutes beats 2 hours of doom-scrolling.";
      } else if (worry === 'expectations') {
        title = "Carrying Everyone’s Expectations on Your Shoulders";
        subtitle = "Separating who you are from what everyone expects you to score.";
        keyTakeaway = "Other people’s expectations are their thoughts, not your identity. Do your honest best for you, not for their applause.";
      }

      return {
        id: `article-exam-${Date.now()}`,
        categoryId: 'exams',
        title,
        subtitle: freeTextAnswer ? `${subtitle} Tailored for ${freeTextAnswer.slice(0, 45)}...` : subtitle,
        estimatedMinutes: 4,
        keyTakeaway,
        reflectionQuestion: "What is one small thing you can take off your mental plate before tonight?",
        actionSteps: [
          "Pick just ONE specific concept to review for 15 minutes right now.",
          "Use the 4-7-8 breathing pacer whenever your chest feels tight.",
          "Close your study notes 30 minutes before bed so your brain can consolidate memories.",
        ],
        sections: [
          {
            heading: "01 — First, take the pressure down",
            body: "You don’t need to solve everything today. When your brain is convinced that a single test determines your entire life, your heart races and your prefrontal cortex shuts down. Start by taking a deep, long exhale. One exam is just a single data point in a very long, exciting life.",
            type: "story",
            practicalTip: "Write down one topic you feel okay about, and one topic you need to revise. Start with just 15 minutes on the second topic.",
          },
          {
            heading: "02 — Make studying feel manageable",
            body: "Break giant chapters into bite-sized, bite-friendly portions. Finishing a 15-minute flashcard session gives your dopamine receptors an immediate win, breaking the spiral of procrastination and dread.",
            type: "advice",
            practicalTip: "Set a timer for 15 minutes. Put your phone in another room or turn on Do Not Disturb. When the timer chimes, stop immediately and celebrate.",
          },
          {
            heading: "03 — Ground your body right now",
            body: "Your mind cannot relax until your physical body gets the signal that you are safe in this chair. Follow the gentle breath guide below to reset your pulse.",
            type: "exercise",
            exerciseDetails: {
              kind: 'breathing',
              title: "The 4-4-6 Calming Breath",
              description: "Breathe in for 4 seconds, gently hold for 4 seconds, and exhale slowly for 6 seconds to trigger your vagus nerve.",
              actionItems: [
                "Sit comfortably with your feet flat on the floor",
                "Relax your jaw and let your shoulders drop",
                "Follow the rhythmic breathing circle below for 3 cycles",
              ],
            },
          },
          {
            heading: "04 — A small, realistic plan for today",
            body: "Don't write a 14-hour study schedule that no human could survive. Instead, commit to these three micro-steps and protect your evening rest.",
            type: "advice",
            practicalTip: help === 'calm_mind'
              ? "Focus on sleep and hydration today. An overtired brain recalls 40% less information than a rested one."
              : "Review your high-yield summary questions first, rather than reading entire textbook chapters word-for-word.",
          },
        ],
        createdAt: now,
      };
    }

    case 'studies': {
      return {
        id: `article-studies-${Date.now()}`,
        categoryId: 'studies',
        title: "Taming the Homework Mountain Without Burning Out",
        subtitle: "How to beat afternoon procrastination, regain focus, and protect your free time.",
        estimatedMinutes: 3,
        keyTakeaway: "Procrastination isn't laziness—it's emotional overwhelm. Lowering the bar for starting makes all the difference.",
        reflectionQuestion: "What is the single easiest 5-minute task you can knock out first?",
        actionSteps: [
          "Set up the 15-Minute Study Sprint and start with the simplest worksheet.",
          "Place your phone across the room or inside a drawer for one focus block.",
          "Give yourself full permission to relax once your sprint is done.",
        ],
        sections: [
          {
            heading: "01 — The friction of starting",
            body: "Staring at three different assignments while your phone buzzes creates a paralyzing friction. You end up refreshing feeds while feeling guilty about not working. Acknowledge that the dread of starting is always ten times worse than the actual work itself.",
            type: "story",
            practicalTip: "Tell yourself: 'I am only going to open the document and read the first sentence. If I want to stop after 3 minutes, I can.'",
          },
          {
            heading: "02 — The 15-Minute Focus Sprint",
            body: "Instead of telling your brain you have 4 hours of homework, offer it a painless bargain: 15 minutes of undivided attention on one single subject, followed by a guilt-free stretch.",
            type: "exercise",
            exerciseDetails: {
              kind: 'timer',
              title: "15-Minute Micro-Sprint",
              description: "Use the focus timer below to do just 15 minutes of single-task work.",
              actionItems: [
                "Pick one assignment (not two, not three)",
                "Press start on the 15-minute timer",
                "When the chime rings, stand up, drink water, and decide if you want another round",
              ],
            },
          },
          {
            heading: "03 — Protect your recovery time",
            body: "Studying while constantly half-distracted ruins both your learning and your rest. True focus for 45 minutes followed by 45 minutes of genuine relaxation is infinitely healthier than 4 hours of stressed half-studying.",
            type: "advice",
            practicalTip: "Establish a strict 'pencils down' time tonight so your evening feels like yours again.",
          },
        ],
        createdAt: now,
      };
    }

    case 'friends': {
      return {
        id: `article-friends-${Date.now()}`,
        categoryId: 'friends',
        title: "Finding Ground When Friendships Feel Rocky",
        subtitle: "Navigating lunchtime awkwardness, group dynamics, and staying true to your own worth.",
        estimatedMinutes: 4,
        keyTakeaway: "Your value does not fluctuate based on who sat next to you at lunch or whether someone replied to your text instantly.",
        reflectionQuestion: "Who in your life—inside or outside of school—makes you feel comfortable being yourself?",
        actionSteps: [
          "Take a step back from group chats that spike your anxiety today.",
          "Do one kind gesture for yourself during the next break (listen to music, sketch, or take a short walk).",
          "Remember that school social groups change constantly, and this semester’s drama will fade.",
        ],
        sections: [
          {
            heading: "01 — The sting of feeling on the outside",
            body: "Few things hurt as acutely as feeling left out of a conversation, an inside joke, or a weekend plan. It activates the same neural pain pathways as physical injury. If you felt invisible or excluded today, know that your pain is real, but it is not proof that you are unlikable.",
            type: "story",
            practicalTip: "When you notice your mind spiraling into 'nobody likes me', pause and ask: 'Is that a fact, or is that a hurt feeling talking right now?'",
          },
          {
            heading: "02 — Protecting your emotional battery",
            body: "You do not have to perform, pretend, or laugh at mean jokes just to maintain a seat at a table. Fitting in requires changing who you are; true belonging means being accepted for who you already are.",
            type: "advice",
            practicalTip: "Notice which people leave you feeling drained vs. energized. Gently invest your energy where kindness is returned.",
          },
          {
            heading: "03 — Resetting your social compass",
            body: "Take 2 minutes right now to ground your awareness back into your own space.",
            type: "exercise",
            exerciseDetails: {
              kind: 'checklist',
              title: "Social Reset Checklist",
              description: "Three grounding checks to remind yourself who you are outside the crowd.",
              actionItems: [
                "I don't have to win everyone's approval to have a meaningful day",
                "I can be kind and polite while keeping healthy boundaries",
                "My true friends will appreciate the real me, without the mask",
              ],
            },
          },
        ],
        createdAt: now,
      };
    }

    case 'family': {
      return {
        id: `article-family-${Date.now()}`,
        categoryId: 'family',
        title: "Carrying High Expectations at Home",
        subtitle: "How to handle family pressure, avoid heated arguments, and carve out your own space.",
        estimatedMinutes: 4,
        keyTakeaway: "You can respect your parents while still understanding that your life and your happiness are your own journey.",
        reflectionQuestion: "What is one boundary you can create tonight to give yourself peace in your room?",
        actionSteps: [
          "Take 3 deep breaths before responding when grades or future plans come up at dinner.",
          "Create a quiet physical or mental sanctuary in your room with favorite calming music.",
          "Remind yourself that parental worry often disguises itself as pressure, but it doesn't mean you're failing.",
        ],
        sections: [
          {
            heading: "01 — When love feels like a high-stakes test",
            body: "Parents often project their own anxieties, unfulfilled dreams, or fears about the future onto their children. Even when it stems from a place of caring, hearing 'Why didn't you get an A?' or being compared to a cousin feels crushing. It can make you feel like love has conditions.",
            type: "story",
            practicalTip: "Recognize that their expectations are a reflection of their worldview and fears, not an accurate measure of your potential.",
          },
          {
            heading: "02 — De-escalating tense dinner talks",
            body: "When a conversation turns into a lecture or interrogation, your natural urge is either to yell in defense or shut down completely. Both leave you feeling worse.",
            type: "advice",
            practicalTip: "Try the calm agreement bridge: 'I hear how important this is to you. I'm working on it and need a little quiet time to study right now.' It defuses tension without provoking an argument.",
          },
          {
            heading: "03 — Carving your own quiet sanctuary",
            body: "Create a mental buffer zone. Your bedroom desk or a cozy corner can be your retreat where family judgment cannot touch your inner peace.",
            type: "exercise",
            exerciseDetails: {
              kind: 'breathing',
              title: "Boundary Reset Breath",
              description: "Use slow, measured breathing to release physical tension stored in your neck and chest.",
              actionItems: [
                "Drop your shoulders and unclench your jaw",
                "Breathe in calm dignity, exhale other people's expectations",
                "Affirm: 'I am doing my best, and my best is enough for today'",
              ],
            },
          },
        ],
        createdAt: now,
      };
    }

    case 'confidence': {
      return {
        id: `article-confidence-${Date.now()}`,
        categoryId: 'confidence',
        title: "Quieting the Harsh Inner Critic",
        subtitle: "How to stop constant comparisons, embrace making mistakes, and trust your quiet strength.",
        estimatedMinutes: 4,
        keyTakeaway: "You don't need to feel 100% confident to take action. Courage comes first; confidence follows after.",
        reflectionQuestion: "What is one thing you handled or survived this year that you forgot to give yourself credit for?",
        actionSteps: [
          "Catch the inner critic speaking and gently reply: 'Thanks for trying to protect me, but I've got this.'",
          "Raise your hand or share an opinion once tomorrow, even if your voice wobbles.",
          "Write down one genuine strength you have that has nothing to do with test scores.",
        ],
        sections: [
          {
            heading: "01 — The highlight reel illusion",
            body: "Looking around your classroom, it is easy to assume everyone else has sharp focus, endless friends, and zero self-doubt. But you are comparing your messy internal thoughts to everyone else's polished external mask. Nobody has it all figured out.",
            type: "story",
            practicalTip: "Notice how often you assume others are judging you. In reality, most classmates are too busy worrying about their own insecurities to judge yours.",
          },
          {
            heading: "02 — Making mistakes is evidence of learning",
            body: "If you never make a mistake in class, it only means the material was too easy. Stumbling on an answer or missing a mark is the scientific process of neural rewiring. Mistakes are not character flaws.",
            type: "advice",
            practicalTip: "Shift your metric from 'Did I perform perfectly?' to 'Did I show up and try?' The second metric is always within your power.",
          },
          {
            heading: "03 — Claiming your quiet strengths",
            body: "School often celebrates only loud extroversion and quick memorization. Yet empathy, curiosity, resilience, and creativity are what truly shape fulfilling lives.",
            type: "exercise",
            exerciseDetails: {
              kind: 'checklist',
              title: "Self-Appreciation Check",
              description: "Tick these off as you acknowledge your true qualities.",
              actionItems: [
                "I have endured difficult days before and learned from them",
                "My worth is not tied to a single teacher's opinion or grade",
                "I am capable of growing at my own authentic pace",
              ],
            },
          },
        ],
        createdAt: now,
      };
    }

    default: {
      return {
        id: `article-other-${Date.now()}`,
        categoryId: 'other',
        title: "A Safe Space for What’s Weighing on You",
        subtitle: "Taking a step back, breathing out the noise, and finding your center today.",
        estimatedMinutes: 3,
        keyTakeaway: "You don't need to have all the answers figured out right now. Just the next gentle breath is enough.",
        reflectionQuestion: "What is the most compassionate thing you could do for yourself in the next hour?",
        actionSteps: [
          "Take a slow 5-minute break away from screens.",
          "Drink a glass of cool water and stretch your shoulders.",
          "Talk to a trusted friend, family member, or school counsellor if it continues to feel heavy.",
        ],
        sections: [
          {
            heading: "01 — Validating what you are feeling",
            body: freeTextAnswer
              ? `You mentioned: "${freeTextAnswer.slice(0, 100)}...". That is genuinely a lot to hold. It makes complete sense that you are feeling weighed down by this right now.`
              : "Whatever you are carrying right now, it is valid. You don't have to compare your struggles to anyone else's or minimize what hurts.",
            type: "story",
            practicalTip: "Put your hand on your heart or chest. Take one slow, gentle breath. Tell yourself: 'It makes sense that I feel this way, and I will be okay.'",
          },
          {
            heading: "02 — Separating the solvable from the rest",
            body: "When multiple worries tangle together, they feel like an avalanche. If you untangle them, there is usually only one small thing you can affect today, while the rest must wait.",
            type: "advice",
            practicalTip: "Ask yourself: 'Can I do anything about this in the next 30 minutes?' If yes, take one small action. If not, give your mind permission to shelve it until tomorrow.",
          },
          {
            heading: "03 — Grounding your nervous system",
            body: "Let's reset your baseline with a peaceful breathing cycle.",
            type: "exercise",
            exerciseDetails: {
              kind: 'breathing',
              title: "Gentle Reset Breath",
              description: "Calm your nervous system with slow, paced inhalation and exhalation.",
              actionItems: [
                "Relax your shoulders and jaw",
                "Feel the ground beneath your feet",
                "Exhale slowly and completely",
              ],
            },
          },
        ],
        createdAt: now,
      };
    }
  }
}

// Check for crisis / sensitive safety terms
export function checkCrisisIntent(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  const crisisKeywords = [
    'kill myself', 'suicide', 'end my life', 'harm myself', 'self harm',
    'cut myself', 'dont want to live', "don't want to live", 'hang myself',
    'overdose', 'die', 'no reason to live'
  ];
  return crisisKeywords.some(keyword => lower.includes(keyword));
}

// Generate a personalized article via the secure backend proxy (`POST /api/generate-blog`).
// The OpenRouter API key lives ONLY on the server (OPENROUTER_API_KEY env var) and is never
// exposed to the browser. There is intentionally NO client-side fallback to hardcoded
// content: failures throw a typed BlogGenerationError so the UI can show a Retry button.
export async function generateBlogArticle(responses: UserResponses): Promise<BlogArticle> {
  const config = CATEGORY_QUESTIONS[responses.categoryId] ?? CATEGORY_QUESTIONS.other;

  // Resolve option IDs to human-readable labels so the AI sees what the student meant.
  const answerDetails = config.questions.map((q) => {
    const selectedId = responses.answers[q.id] ?? '';
    const option = q.options.find((o) => o.id === selectedId);
    return {
      questionId: q.id,
      question: q.prompt,
      answer: option ? option.label : selectedId,
    };
  });

  // Attempt backend API call if server is running
  // NOTE: when the API server is down, the Vite dev proxy answers 502 with an
  // HTML error page — never assume the body is JSON (see readJsonBody).
  let res: Response;
  try {
    res = await fetch('/api/generate-blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...responses, answerDetails }),
    });
  } catch {
    throw {
      code: 'NETWORK',
      message: "We couldn't generate your guide right now. Please try again.",
      retryable: true,
    } satisfies BlogGenerationError;
  }

  const body = await readJsonBody(res);

  if (res.ok) {
    if (body?.article) {
      return body.article;
    }
    throw {
      code: 'INVALID_RESPONSE',
      message: "We couldn't generate your guide right now. Please try again.",
      retryable: true,
    } satisfies BlogGenerationError;
  }

  // Backend failure: propagate a typed error so the UI shows Retry.
  // Never silently swap in a static template as a "successful" result.
  const knownCodes: BlogErrorCode[] = [
    'MISSING_KEY', 'INVALID_KEY', 'RATE_LIMIT', 'NETWORK',
    'INVALID_RESPONSE', 'UPSTREAM_ERROR', 'SERVER_ERROR', 'BAD_REQUEST',
  ];
  const code: BlogGenerationError['code'] =
    body.code && (knownCodes as string[]).includes(body.code)
      ? (body.code as BlogGenerationError['code'])
      : 'SERVER_ERROR';
  throw {
    code,
    message: body.message || "We couldn't generate your guide right now. Please try again.",
    retryable: code !== 'BAD_REQUEST' && code !== 'MISSING_KEY' && code !== 'INVALID_KEY',
    details: body.details,
  } satisfies BlogGenerationError;
}

// Read a response body as JSON ONLY when the server actually sent JSON.
// Proxies/gateways return HTML error pages (e.g. Vite's 502 "Bad Gateway"
// when the API server isn't running) — parsing those as JSON throws the
// "<!doctype ..." SyntaxError, so check the content-type first and never throw.
async function readJsonBody(
  response: Response,
): Promise<{ article?: BlogArticle; code?: string; message?: string; details?: string[] }> {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    console.warn(
      '[mindease] API did not return JSON (got "' +
        contentType +
        '"). Is the backend running? Start it with `npm run dev:server` (or `npm run dev:full`).',
    );
    return {};
  }
  try {
    return (await response.json()) as { article?: BlogArticle; code?: string; message?: string; details?: string[] };
  } catch {
    console.warn('[mindease] API returned an unreadable body. Treating as a generic failure.');
    return {};
  }
}

