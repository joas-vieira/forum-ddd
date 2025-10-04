import type { UniqueId } from "@/core/entities/value-objects/unique-id.value-object.js";
import type { Optional } from "@/core/types/optional.js";
import { Comment, type CommentProps } from "./comment.entity.js";

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueId;
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId;
  }

  static create(
    props: Optional<AnswerCommentProps, "createdAt">,
    id?: UniqueId
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return answerComment;
  }
}
