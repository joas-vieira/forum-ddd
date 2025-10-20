import { UniqueId } from "@/core/entities/value-objects/unique-id.value-object.js";
import { makeQuestionFactory } from "../../../../../../test/factories/make-question.factory.js";
import { InMemoryQuestionRepository } from "../../../../../../test/repositories/in-memory-question.repository.js";
import { EditQuestionUseCase } from "../edit-question.use-case.js";
import { NotAllowedError } from "../errors/not-allowed.error.js";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: EditQuestionUseCase;

describe("EditQuestionUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestionFactory(
      {
        authorId: new UniqueId("author-1"),
      },
      new UniqueId("question-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      questionId: "question-1",
      title: "Edited Question",
      content: "Edited Content",
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: "Edited Question",
      content: "Edited Content",
    });
  });

  it("should not be able to edit a question from another author", async () => {
    const newQuestion = makeQuestionFactory(
      {
        authorId: new UniqueId("author-1"),
      },
      new UniqueId("question-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    const response = await sut.execute({
      authorId: "author-2",
      questionId: "question-1",
      title: "Edited Question",
      content: "Edited Content",
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(NotAllowedError);
  });
});
