import type { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comment.repository.js";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment.entity.js";

export class InMemoryAnswerCommentRepository
  implements AnswerCommentRepository
{
  items: AnswerComment[] = [];

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }
}
