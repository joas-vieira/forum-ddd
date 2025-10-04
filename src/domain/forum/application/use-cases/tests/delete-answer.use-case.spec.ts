import { UniqueId } from "@/core/entities/value-objects/unique-id.value-object.js";
import { makeAnswerFactory } from "../../../../../../test/factories/make-answer.factory.js";
import { InMemoryAnswerRepository } from "../../../../../../test/repositories/in-memory-answer.repository.js";
import { DeleteAnswerUseCase } from "../delete-answer.use-case.js";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: DeleteAnswerUseCase;

describe("DeleteAnswerUseCase", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  });

  it("should be able to delete a answer", async () => {
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
    });

    expect(inMemoryAnswerRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer from another author", async () => {
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
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
