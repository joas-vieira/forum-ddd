import type { AnswerComment } from "../../enterprise/entities/answer-comment.entity.js";

export interface AnswerCommentRepository {
  create: (answerComment: AnswerComment) => Promise<void>;
}
