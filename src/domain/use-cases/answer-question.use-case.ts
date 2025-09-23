import { UniqueId } from "../../core/entities/value-objects/unique-id.value-object.js";
import { Answer } from "../entities/answer.entity.js";
import type { AnswerRepository } from "../repositories/answer.repository.js";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      authorId: new UniqueId(instructorId),
      questionId: new UniqueId(questionId),
      content,
    });

    await this.answerRepository.create(answer);

    return answer;
  }
}
