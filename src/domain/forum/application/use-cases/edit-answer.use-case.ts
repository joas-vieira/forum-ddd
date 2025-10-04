import type { Answer } from "../../enterprise/entities/answer.entity.js";
import type { AnswerRepository } from "../repositories/answer.repository.js";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    if (authorId && answer.authorId.toString() !== authorId) {
      throw new Error("You are not the author of this answer");
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return { answer };
  }
}
