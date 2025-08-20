import { Entity } from "../../core/entities/entity.js";

interface AnswerProps {
  authorId: string;
  questionId: string;
  content: string;
}

export class Answer extends Entity<AnswerProps> {
  get content(): string {
    return this.props.content;
  }
}
