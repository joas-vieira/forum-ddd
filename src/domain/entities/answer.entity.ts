import { Entity } from "../../core/entities/entity.js";
import type { UniqueId } from "../../core/entities/value-objects/unique-id.value-object.js";
import type { Optional } from "../../core/types/optional.js";

interface AnswerProps {
  authorId: UniqueId;
  questionId: UniqueId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  get content(): string {
    return this.props.content;
  }

  static create(props: Optional<AnswerProps, "createdAt">, id?: UniqueId) {
    const answer = new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return answer;
  }
}
