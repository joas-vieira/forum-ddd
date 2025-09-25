import type { Question } from "../../enterprise/entities/question.entity.js";

export interface QuestionRepository {
  create: (question: Question) => Promise<void>;
}
