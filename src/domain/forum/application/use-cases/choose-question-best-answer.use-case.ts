import type { Question } from "../../enterprise/entities/question.entity.js";
import type { AnswerRepository } from "../repositories/answer.repository.js";
import type { QuestionRepository } from "../repositories/question.repository.js";

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly questionRepository: QuestionRepository
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString()
    );

    if (!question) {
      throw new Error("Question not found");
    }

    if (authorId && question.authorId.toString() !== authorId) {
      throw new Error("You are not the author of this question");
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return { question };
  }
}
