import type { AnswerComment } from "../../enterprise/entities/answer-comment.entity.js";
import type { AnswerCommentRepository } from "../repositories/answer-comment.repository.js";

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

export class FetchAnswerCommentsUseCase {
  constructor(
    private readonly answerCommentRepository: AnswerCommentRepository
  ) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, {
        page,
      });

    return { answerComments };
  }
}
