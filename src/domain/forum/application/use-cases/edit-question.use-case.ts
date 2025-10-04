import type { Question } from "../../enterprise/entities/question.entity.js";
import type { QuestionRepository } from "../repositories/question.repository.js";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseResponse {
  question: Question;
}

export class EditQuestionUseCase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if (authorId && question.authorId.toString() !== authorId) {
      throw new Error("You are not the author of this question");
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return { question };
  }
}
