import type { AnswerRepository } from "@/domain/forum/application/repositories/answer.repository.js";
import type { Answer } from "@/domain/forum/enterprise/entities/answer.entity.js";

export class InMemoryAnswerRepository implements AnswerRepository {
  items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
  }
}
