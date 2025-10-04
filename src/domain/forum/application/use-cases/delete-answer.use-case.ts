import type { AnswerRepository } from "../repositories/answer.repository.js";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

export class DeleteAnswerUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<void> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    if (authorId && answer.authorId.toString() !== authorId) {
      throw new Error("You are not the author of this answer");
    }

    await this.answerRepository.delete(answer);
  }
}
