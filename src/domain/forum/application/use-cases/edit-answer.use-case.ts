import { left, right, type Either } from "@/core/either.js";
import type { Answer } from "../../enterprise/entities/answer.entity.js";
import type { AnswerRepository } from "../repositories/answer.repository.js";
import { NotAllowedError } from "./errors/not-allowed.error.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.error.js";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId && answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return right({ answer });
  }
}
