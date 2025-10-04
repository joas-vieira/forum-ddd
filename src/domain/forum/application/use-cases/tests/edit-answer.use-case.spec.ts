import { UniqueId } from "@/core/entities/value-objects/unique-id.value-object.js";
import { makeAnswerFactory } from "../../../../../../test/factories/make-answer.factory.js";
import { InMemoryAnswerRepository } from "../../../../../../test/repositories/in-memory-answer.repository.js";
import { EditAnswerUseCase } from "../edit-answer.use-case.js";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: EditAnswerUseCase;

describe("EditAnswerUseCase", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new EditAnswerUseCase(inMemoryAnswerRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswerFactory(
      {
        authorId: new UniqueId("author-1"),
      },
      new UniqueId("answer-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      answerId: "answer-1",
      content: "Edited Content",
    });

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: "Edited Content",
    });
  });

  it("should not be able to edit a answer from another author", async () => {
    const newAnswer = makeAnswerFactory(
      {
        authorId: new UniqueId("author-1"),
      },
      new UniqueId("answer-1")
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await expect(() =>
      sut.execute({
        authorId: "author-2",
        answerId: "answer-1",
        content: "Edited Content",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
