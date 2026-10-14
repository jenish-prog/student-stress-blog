export type StressCategoryId = 'exams' | 'studies' | 'friends' | 'family' | 'confidence' | 'other';

export interface StressCategory {
  id: StressCategoryId;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  sublabel?: string;
}

export interface Question {
  id: string;
  prompt: string;
  description?: string;
  options: QuestionOption[];
}

export interface CategoryQuestionConfig {
  categoryId: StressCategoryId;
  questions: Question[];
  optionalTextPrompt?: string;
  optionalTextPlaceholder?: string;
}

export interface UserResponses {
  categoryId: StressCategoryId;
  categoryTitle: string;
  customConcern?: string;
  answers: Record<string, string>; // questionId -> optionId/optionLabel
  freeTextAnswer?: string;
}

export type SectionType = "story" | "advice" | "exercise";

export interface BlogSection {
  heading: string;
  body: string;
  type: SectionType;
  practicalTip?: string;
  exerciseDetails?: {
    kind: 'breathing' | 'checklist' | 'timer' | 'reflection';
    title: string;
    description: string;
    actionItems?: string[];
  };
}

export interface BlogArticle {
  id: string;
  categoryId: StressCategoryId;
  title: string;
  subtitle: string;
  /** Empathetic opening naming the student's specific situation (AI-generated). */
  introduction?: string;
  estimatedMinutes: number;
  sections: BlogSection[];
  keyTakeaway: string;
  actionSteps: string[];
  reflectionQuestion: string;
  /** Supportive closing (AI-generated). */
  conclusion?: string;
  createdAt: string;
}

export interface AnswerDetail {
  questionId: string;
  question: string;
  answer: string;
}

export interface GenerateBlogPayload extends UserResponses {
  answerDetails: AnswerDetail[];
}

export type BlogErrorCode =
  | 'MISSING_KEY'
  | 'INVALID_KEY'
  | 'RATE_LIMIT'
  | 'NETWORK'
  | 'INVALID_RESPONSE'
  | 'UPSTREAM_ERROR'
  | 'SERVER_ERROR'
  | 'BAD_REQUEST';

export interface BlogGenerationError {
  code: BlogErrorCode;
  message: string;
  /** Whether pressing Retry could plausibly succeed. */
  retryable: boolean;
  details?: string[];
}

export type AppStep = 'category' | 'questions' | 'generating' | 'reader';
