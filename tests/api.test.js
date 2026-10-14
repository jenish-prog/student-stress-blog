import test from 'node:test';
import assert from 'node:assert/strict';

const API_BASE = 'http://127.0.0.1:3001';

test('1. Safety intent returns source: "safety" with no AI call', async () => {
  const res = await fetch(`${API_BASE}/api/generate-blog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      categoryId: 'other',
      categoryTitle: 'Something else',
      answers: {},
      freeTextAnswer: 'I feel like I want to harm myself and end it all',
    }),
  });

  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.safety, true);
  assert.equal(data.source, 'safety');
  assert.ok(data.article.title.includes('We Hear You'));
  assert.ok(!data.article.id.startsWith('article-fallback-'));
});

test('2. Missing category or answers returns HTTP 400 BAD_REQUEST', async () => {
  const res = await fetch(`${API_BASE}/api/generate-blog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categoryId: 'invalid-category' }),
  });

  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.code, 'BAD_REQUEST');
});

test('3. No silent fallback template (RATE_LIMIT or genuine AI)', async () => {
  const res = await fetch(`${API_BASE}/api/generate-blog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      categoryId: 'exams',
      categoryTitle: 'Exam stress',
      answers: { exam_worry: 'low_marks' },
    }),
  });

  const data = await res.json();
  if (res.status !== 200) {
    // Honest error path (RATE_LIMIT / UPSTREAM_ERROR / INVALID_RESPONSE): never a fake article.
    assert.equal(data.article, undefined);
    assert.notEqual(res.status, 200);
  } else {
    // Key has credits: must be a genuine AI article, never a fabricated fallback.
    assert.equal(data.source, 'ai');
    assert.ok(!data.article.id.startsWith('article-fallback-'));
  }
});

test('4. No failed response ever returns HTTP 200 with article-fallback-*', async () => {
  const res = await fetch(`${API_BASE}/api/generate-blog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      categoryId: 'studies',
      categoryTitle: 'Study pressure',
      answers: { study_draining: 'concentration' },
    }),
  });

  const data = await res.json();
  if (res.status !== 200) {
    assert.equal(data.article, undefined);
    assert.notEqual(res.status, 200);
  } else {
    // If successful, must be genuine AI or safety
    assert.ok(data.source === 'ai' || data.source === 'safety');
    assert.ok(!data.article.id.startsWith('article-fallback-'));
  }
});
