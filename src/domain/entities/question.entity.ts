import { Entity } from "../../core/entities/entity.js";
import type { Slug } from "./value-objects/slug.value-object.js";

interface QuestionProps {
  authorId: string;
  title: string;
  content: string;
  slug: Slug;
}

export class Question extends Entity<QuestionProps> {}
