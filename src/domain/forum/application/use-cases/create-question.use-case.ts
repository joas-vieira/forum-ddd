import { right, type Either } from "@/core/either.js";
import { UniqueId } from "@/core/entities/value-objects/unique-id.value-object.js";
import { Question } from "../../enterprise/entities/question.entity.js";
import type { QuestionRepository } from "../repositories/question.repository.js";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueId(authorId),
      title,
      content,
    });

    await this.questionRepository.create(question);

    return right({ question });
  }
}
