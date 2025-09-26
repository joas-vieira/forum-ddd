import type { QuestionRepository } from "../repositories/question.repository.js";

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

export class DeleteQuestionUseCase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<void> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if (authorId && question.authorId.toString() !== authorId) {
      throw new Error("You are not the author of this question");
    }

    await this.questionRepository.delete(question);
  }
}
