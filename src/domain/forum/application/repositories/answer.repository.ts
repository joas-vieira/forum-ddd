import type { Answer } from "../../enterprise/entities/answer.entity.js";

export interface AnswerRepository {
  create: (answer: Answer) => Promise<void>;
}
