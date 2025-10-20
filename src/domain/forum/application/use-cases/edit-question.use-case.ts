import { left, right, type Either } from "@/core/either.js";
import type { Question } from "../../enterprise/entities/question.entity.js";
import type { QuestionRepository } from "../repositories/question.repository.js";
import { NotAllowedError } from "./errors/not-allowed.error.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.error.js";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

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
      return left(new ResourceNotFoundError());
    }

    if (authorId && question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return right({ question });
  }
}
