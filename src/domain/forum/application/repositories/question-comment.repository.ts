import type { QuestionComment } from "../../enterprise/entities/question-comment.entity.js";

export interface QuestionCommentRepository {
  create: (questionComment: QuestionComment) => Promise<void>;
}
