import type { AnswerCommentRepository } from "../repositories/answer-comment.repository.js";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answerCommentRepository: AnswerCommentRepository
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<void> {
    const answerComment = await this.answerCommentRepository.findById(
      answerCommentId
    );

    if (!answerComment) {
      throw new Error("Answer comment not found");
    }

    if (authorId && answerComment.authorId.toString() !== authorId) {
      throw new Error("You are not the author of this answer comment");
    }

    await this.answerCommentRepository.delete(answerComment);
  }
}
