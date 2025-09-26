import { UniqueId } from "@/core/entities/value-objects/unique-id.value-object.js";
import { makeQuestionFactory } from "../../../../../../test/factories/make-question.factory.js";
import { InMemoryQuestionRepository } from "../../../../../../test/repositories/in-memory-question.repository.js";
import { DeleteQuestionUseCase } from "../delete-question.use-case.js";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: DeleteQuestionUseCase;

describe("DeleteQuestionUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository);
  });

  it("should be able to delete a question", async () => {
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
    });

    expect(inMemoryQuestionRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a question from another author", async () => {
    const newQuestion = makeQuestionFactory(
      {
        authorId: new UniqueId("author-1"),
      },
      new UniqueId("question-1")
    );

    await inMemoryQuestionRepository.create(newQuestion);

    await expect(() =>
      sut.execute({
        authorId: "author-2",
        questionId: "question-1",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
