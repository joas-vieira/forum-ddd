import { right, type Either } from "@/core/either.js";
import { UniqueId } from "@/core/entities/value-objects/unique-id.value-object.js";
import { Question } from "../../enterprise/entities/question.entity.js";
import type { QuestionRepository } from "../repositories/question.repository.js";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment.entity.js";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
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
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueId(authorId),
      title,
      content,
    });

    const attachments = attachmentsIds.map((attachmentId) =>
      QuestionAttachment.create({
        questionId: question.id,
        attachmentId: new UniqueId(attachmentId),
      })
    );

    question.attachments = attachments;

    await this.questionRepository.create(question);

    return right({ question });
  }
}
