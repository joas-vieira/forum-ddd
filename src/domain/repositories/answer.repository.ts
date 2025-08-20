import type { Answer } from "../entities/answer.entity.js";

export interface AnswerRepository {
  create: (answer: Answer) => Promise<void>;
}
