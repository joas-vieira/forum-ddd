import type { Answer } from "../../enterprise/entities/answer.entity.js";

export interface AnswerRepository {
  findById: (id: string) => Promise<Answer | null>;
  create: (answer: Answer) => Promise<void>;
  delete: (answer: Answer) => Promise<void>;
}
