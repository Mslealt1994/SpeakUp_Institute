import { YouTubePlayerOptions } from "./player";

export interface ContentAtom {
  readonly id: string;
  readonly text: string;
  readonly audioUrl?: string;
  readonly phoneticSymbol?: string;
}

interface InformationContent {
  readonly title: string;
  readonly message: string;
  readonly audioUrl?: string;
}

interface QuizContent extends InformationContent {
  readonly options: readonly ContentAtom[];
  readonly correctAnswerId: string;
  readonly feedback: {
    readonly success: string;
    readonly error: string;
  };
}

interface DragDropContent extends InformationContent {
  readonly items: readonly ContentAtom[];
  readonly zones: readonly {
    readonly id: string;
    readonly expectedAtomId: string;
    readonly label?: string;
  }[];
}

export type InteractiveBox = 
  | { readonly variant: "dialogue" | "tip" | "phonetic-atom"; readonly content: readonly InformationContent[] }
  | { readonly variant: "quiz-multiple" | "quiz-voice"; readonly content: readonly QuizContent[] }
  | { readonly variant: "quiz-text"; readonly content: readonly (InformationContent & { readonly correctAnswer: string; readonly placeholder?: string })[] }
  | { readonly variant: "drag-drop"; readonly content: readonly DragDropContent[] }; // Normalizado a array

export type StepType = "interactive-boxes" | "video-sequence";

export interface BaseStep {
  readonly id: string;
  readonly type: StepType;
  readonly nextButtonLabel?: string; 
  readonly actionButtonLabel?: string;
  readonly isRequired?: boolean;
}

export interface InteractiveStep extends BaseStep {
  readonly type: "interactive-boxes";
  readonly data: InteractiveBox;
}

export interface VideoSegment extends YouTubePlayerOptions {
  readonly segmentId: string;
  readonly label?: string;
}

export interface VideoSequenceStep extends BaseStep {
  readonly type: "video-sequence";
  readonly sequenceData: readonly VideoSegment[];
}

export type CourseStep = InteractiveStep | VideoSequenceStep;

export type ProficiencyLevel = "A1" | "A2" | "B1" | "B2";

export interface LessonManifest {
  readonly lessonId: string;
  readonly title: string;
  readonly description?: string;
  readonly version: string;
  readonly steps: readonly CourseStep[];
  readonly metadata?: {
    readonly difficulty: ProficiencyLevel;
    readonly estimatedDuration: number;
    readonly tags?: readonly string[];
  };
}