import type { QuestionRepository } from "@/domain/forum/application/repositories/question.repository.js";
import type { Question } from "@/domain/forum/enterprise/entities/question.entity.js";

export class InMemoryQuestionRepository implements QuestionRepository {
  items: Question[] = [];

  async create(question: Question) {
    this.items.push(question);
  }
}
