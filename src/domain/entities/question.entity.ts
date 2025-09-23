import { Entity } from "../../core/entities/entity.js";
import type { UniqueId } from "../../core/entities/value-objects/unique-id.value-object.js";
import type { Optional } from "../../core/types/optional.js";
import type { Slug } from "./value-objects/slug.value-object.js";

interface QuestionProps {
  authorId: UniqueId;
  bestAnswerId?: UniqueId;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(props: Optional<QuestionProps, "createdAt">, id?: UniqueId) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return question;
  }
}
