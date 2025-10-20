import { right, type Either } from "@/core/either.js";
import { UniqueId } from "@/core/entities/value-objects/unique-id.value-object.js";
import { Answer } from "../../enterprise/entities/answer.entity.js";
import type { AnswerRepository } from "../repositories/answer.repository.js";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

export class AnswerQuestionUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueId(instructorId),
      questionId: new UniqueId(questionId),
      content,
    });

    await this.answerRepository.create(answer);

    return right({ answer });
  }
}
