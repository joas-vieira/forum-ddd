import type { AnswerComment } from "../../enterprise/entities/answer-comment.entity.js";

export interface AnswerCommentRepository {
  findById: (id: string) => Promise<AnswerComment | null>;
  create: (answerComment: AnswerComment) => Promise<void>;
  delete: (answerComment: AnswerComment) => Promise<void>;
}
