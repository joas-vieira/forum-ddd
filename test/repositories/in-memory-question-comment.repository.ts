import type { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comment.repository.js";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment.entity.js";

export class InMemoryQuestionCommentRepository
  implements QuestionCommentRepository
{
  items: QuestionComment[] = [];

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }
}
