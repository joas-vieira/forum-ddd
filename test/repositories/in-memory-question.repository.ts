import type { QuestionRepository } from "@/domain/forum/application/repositories/question.repository.js";
import type { Question } from "@/domain/forum/enterprise/entities/question.entity.js";

export class InMemoryQuestionRepository implements QuestionRepository {
  items: Question[] = [];

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id);

    if (!question) return null;

    return question;
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) return null;

    return question;
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    this.items[itemIndex] = question;
  }

  async create(question: Question) {
    this.items.push(question);
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    this.items.splice(itemIndex, 1);
  }
}
