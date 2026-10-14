import type { BlogArticle, AppStep, StressCategory } from '../types';

const SAVED_BLOGS_COOKIE = 'calmly_saved_blogs';
const ACTIVE_SESSION_COOKIE = 'calmly_active_session';
const ACTIVE_SESSION_STORAGE_KEY = 'calmly_active_session_data';
const COOKIE_EXPIRY_DAYS = 365;

export interface ActiveSessionState {
  currentStep: AppStep;
  selectedCategory: StressCategory | null;
  customConcern: string;
  answers: Record<string, string>;
  freeTextAnswer: string;
  generatedArticle: BlogArticle | null;
  questionIndex: number;
}

/**
 * Set a cookie with URI encoding and optional expiration in days
 */
export function setCookie(name: string, value: string, days?: number): void {
  try {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    const encodedValue = encodeURIComponent(value);
    document.cookie = `${name}=${encodedValue}${expires}; path=/; SameSite=Lax`;
  } catch (err) {
    console.warn('Failed to set cookie:', err);
  }
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  try {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
  } catch (err) {
    console.warn('Failed to read cookie:', err);
  }
  return null;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string): void {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

/**
 * Save blog articles to cookies.
 * We store essential structured article fields to ensure it stays well within cookie limits.
 */
export function saveBlogsToCookies(articles: BlogArticle[]): void {
  try {
    // Keep up to 10 most recent saved guides in cookies
    const trimmed = articles.slice(0, 10);
    const serialized = JSON.stringify(trimmed);
    setCookie(SAVED_BLOGS_COOKIE, serialized, COOKIE_EXPIRY_DAYS);
  } catch (err) {
    console.warn('Could not save blogs to cookie:', err);
  }
}

/**
 * Retrieve saved blog articles from cookies
 */
export function getBlogsFromCookies(): BlogArticle[] {
  try {
    const cookieVal = getCookie(SAVED_BLOGS_COOKIE);
    if (cookieVal) {
      const parsed = JSON.parse(cookieVal);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not parse blogs from cookie:', err);
  }
  return [];
}

/**
 * Persist active session so page refreshes don't lose the student's progress
 */
export function saveActiveSession(session: ActiveSessionState): void {
  try {
    const serialized = JSON.stringify(session);
    // Store in sessionStorage (tab-scoped)
    sessionStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, serialized);
    // Also save in session cookie for backup
    setCookie(ACTIVE_SESSION_COOKIE, serialized);
  } catch (err) {
    console.warn('Could not save active session:', err);
  }
}

/**
 * Retrieve active session state upon page load / refresh
 */
export function getActiveSession(): ActiveSessionState | null {
  try {
    // Check sessionStorage first
    const fromStorage = sessionStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);
    if (fromStorage) {
      const parsed = JSON.parse(fromStorage);
      if (parsed && parsed.currentStep) return parsed;
    }
    // Fallback to cookie
    const fromCookie = getCookie(ACTIVE_SESSION_COOKIE);
    if (fromCookie) {
      const parsed = JSON.parse(fromCookie);
      if (parsed && parsed.currentStep) return parsed;
    }
  } catch (err) {
    console.warn('Could not restore active session:', err);
  }
  return null;
}

/**
 * Clear active session state when student starts a new question
 */
export function clearActiveSession(): void {
  try {
    sessionStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
    deleteCookie(ACTIVE_SESSION_COOKIE);
  } catch (err) {
    console.warn('Could not clear active session:', err);
  }
}
