import React, { useState, useEffect } from 'react';
import type { AppStep, BlogGenerationError, StressCategory, BlogArticle, UserResponses } from './types';
import { AppHeader } from './components/AppHeader';
import { SupportModal } from './components/SupportModal';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { CategorySelection } from './pages/CategorySelection';
import { FollowUpQuestions } from './pages/FollowUpQuestions';
import { BlogGeneration } from './pages/BlogGeneration';
import { BlogReader } from './pages/BlogReader';
import { generateBlogArticle } from './services/aiService';
import { 
  getBlogsFromCookies, 
  saveBlogsToCookies, 
  getActiveSession, 
  saveActiveSession, 
  clearActiveSession 
} from './utils/cookieUtils';

const LOCAL_STORAGE_KEY = 'calmly_saved_articles_v1';

export const App: React.FC = () => {
  // Restore any active session so accidental page refreshes never lose the student's progress
  const [initialSession] = useState(() => getActiveSession());

  const [currentStep, setCurrentStep] = useState<AppStep>(() => {
    if (initialSession?.currentStep) {
      if (initialSession.currentStep === 'generating') {
        return initialSession.generatedArticle ? 'reader' : 'questions';
      }
      return initialSession.currentStep;
    }
    return 'category';
  });

  const [selectedCategory, setSelectedCategory] = useState<StressCategory | null>(
    () => initialSession?.selectedCategory || null
  );
  const [customConcern, setCustomConcern] = useState<string>(
    () => initialSession?.customConcern || ''
  );
  const [answers, setAnswers] = useState<Record<string, string>>(
    () => initialSession?.answers || {}
  );
  const [freeTextAnswer, setFreeTextAnswer] = useState<string>(
    () => initialSession?.freeTextAnswer || ''
  );
  const [generatedArticle, setGeneratedArticle] = useState<BlogArticle | null>(
    () => initialSession?.generatedArticle || null
  );
  const [generationError, setGenerationError] = useState<BlogGenerationError | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(
    () => initialSession?.questionIndex || 0
  );
  const [readingProgress, setReadingProgress] = useState<number>(0);

  // Modals & Drawers
  const [supportModalOpen, setSupportModalOpen] = useState<boolean>(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState<boolean>(false);

  // Saved Articles - Load from Cookies first, with localStorage fallback
  const [savedArticles, setSavedArticles] = useState<BlogArticle[]>(() => {
    try {
      const fromCookies = getBlogsFromCookies();
      if (fromCookies && fromCookies.length > 0) {
        return fromCookies;
      }
      const fromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
      return fromStorage ? JSON.parse(fromStorage) : [];
    } catch {
      return [];
    }
  });

  // Keep cookies and localStorage synchronized whenever saved articles change
  useEffect(() => {
    try {
      saveBlogsToCookies(savedArticles);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedArticles));
    } catch (err) {
      console.warn("Could not synchronize saved articles storage:", err);
    }
  }, [savedArticles]);

  // Persist active session state across accidental page reloads
  useEffect(() => {
    saveActiveSession({
      currentStep,
      selectedCategory,
      customConcern,
      answers,
      freeTextAnswer,
      generatedArticle,
      questionIndex,
    });
  }, [currentStep, selectedCategory, customConcern, answers, freeTextAnswer, generatedArticle, questionIndex]);

  // Step Number for header
  let stepNumber = 1;
  if (currentStep === 'questions') stepNumber = 2;
  if (currentStep === 'generating' || currentStep === 'reader') stepNumber = 3;

  // Handle Category Continue
  const handleCategoryContinue = () => {
    if (selectedCategory) {
      setCurrentStep('questions');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle Question Answer Selection
  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Handle Questionnaire Submit -> Generate via AI backend (no hardcoded fallback).
  // Student answers are preserved in state, so Retry reuses them untouched.
  const runGeneration = async () => {
    if (!selectedCategory) return;

    setGenerationError(null);
    setCurrentStep('generating');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const responses: UserResponses = {
      categoryId: selectedCategory.id,
      categoryTitle: selectedCategory.title,
      customConcern,
      answers,
      freeTextAnswer,
    };

    // Minimum calming animation delay so the loading state is perceivable
    const startTime = Date.now();
    try {
      const article = await generateBlogArticle(responses);
      const elapsed = Date.now() - startTime;
      const remainingDelay = Math.max(0, 1200 - elapsed);

      setTimeout(() => {
        setGeneratedArticle(article);
        setReadingProgress(0);
        setCurrentStep('reader');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, remainingDelay);
    } catch (err) {
      // Stay on the generating screen and surface the error + Retry.
      // Never display a fabricated static article as a successful result.
      const genError = (err ?? {}) as Partial<BlogGenerationError>;
      setGenerationError({
        code: genError.code ?? 'SERVER_ERROR',
        message: genError.message ?? "We couldn't generate your guide right now. Please try again.",
        retryable: genError.retryable ?? true,
        details: genError.details,
      });
    }
  };

  const handleSubmitQuestions = () => {
    void runGeneration();
  };

  // Back Navigation preserving student choices
  const handleBack = () => {
    if (currentStep === 'questions') {
      setCurrentStep('category');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 'reader') {
      setCurrentStep('questions');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset to start over (explicit restart clears the active session)
  const handleRestart = () => {
    clearActiveSession();
    setSelectedCategory(null);
    setAnswers({});
    setFreeTextAnswer('');
    setCustomConcern('');
    setGeneratedArticle(null);
    setGenerationError(null);
    setQuestionIndex(0);
    setReadingProgress(0);
    setCurrentStep('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Article Saved status (stored in cookies & localStorage)
  const handleToggleSave = () => {
    if (!generatedArticle) return;
    const isAlreadySaved = savedArticles.some((a) => a.id === generatedArticle.id);
    if (isAlreadySaved) {
      setSavedArticles((prev) => prev.filter((a) => a.id !== generatedArticle.id));
    } else {
      setSavedArticles((prev) => [generatedArticle, ...prev]);
    }
  };

  const handleSelectSavedArticle = (article: BlogArticle) => {
    setGeneratedArticle(article);
    setReadingProgress(0);
    setCurrentStep('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveSavedArticle = (articleId: string) => {
    setSavedArticles((prev) => prev.filter((a) => a.id !== articleId));
  };

  const isCurrentArticleSaved = generatedArticle
    ? savedArticles.some((a) => a.id === generatedArticle.id)
    : false;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F0] text-[#2D3748]">
      {/* Top Application Header */}
      <AppHeader
        currentStep={currentStep}
        stepNumber={stepNumber}
        totalSteps={3}
        readingProgress={currentStep === 'reader' ? readingProgress : undefined}
        onBack={handleBack}
        onOpenSupport={() => setSupportModalOpen(true)}
        onOpenSaved={() => setSavedDrawerOpen(true)}
        savedCount={savedArticles.length}
      />

      {/* Main Screen Content */}
      <main className="flex-1 flex flex-col">
        {currentStep === 'category' && (
          <CategorySelection
            selectedCategory={selectedCategory}
            customConcernText={customConcern}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onChangeCustomConcern={setCustomConcern}
            onContinue={handleCategoryContinue}
          />
        )}

        {currentStep === 'questions' && selectedCategory && (
          <FollowUpQuestions
            category={selectedCategory}
            answers={answers}
            freeTextAnswer={freeTextAnswer}
            currentQuestionIndex={questionIndex}
            onQuestionIndexChange={setQuestionIndex}
            onSelectAnswer={handleSelectAnswer}
            onChangeFreeText={setFreeTextAnswer}
            onSubmit={handleSubmitQuestions}
          />
        )}

        {currentStep === 'generating' && selectedCategory && (
          <BlogGeneration
            categoryTitle={selectedCategory.title}
            error={generationError}
            onRetry={() => void runGeneration()}
            onBack={() => setCurrentStep('questions')}
          />
        )}

        {currentStep === 'reader' && generatedArticle && (
          <BlogReader
            article={generatedArticle}
            isSaved={isCurrentArticleSaved}
            onToggleSave={handleToggleSave}
            onRestart={handleRestart}
            onOpenSupport={() => setSupportModalOpen(true)}
            onUpdateProgress={setReadingProgress}
          />
        )}
      </main>

      {/* Modals & Overlays */}
      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />

      <SavedArticlesDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedArticles={savedArticles}
        onSelectArticle={handleSelectSavedArticle}
        onRemoveArticle={handleRemoveSavedArticle}
      />
    </div>
  );
};

export default App;
