import { UniqueId } from "@/core/entities/value-objects/unique-id.value-object.js";
import { makeAnswerFactory } from "../../../../../../test/factories/make-answer.factory.js";
import { InMemoryAnswerRepository } from "../../../../../../test/repositories/in-memory-answer.repository.js";
import { DeleteAnswerUseCase } from "../delete-answer.use-case.js";
import { NotAllowedError } from "../errors/not-allowed.error.js";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: DeleteAnswerUseCase;

describe("DeleteAnswerUseCase", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  });

  it("should be able to delete a answer", async () => {
    const newAnswer = makeAnswerFactory();

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
    });

    expect(inMemoryAnswerRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer from another author", async () => {
    const newAnswer = makeAnswerFactory({
      authorId: new UniqueId("author-1"),
    });

    await inMemoryAnswerRepository.create(newAnswer);

    const response = await sut.execute({
      authorId: "author-2",
      answerId: newAnswer.id.toString(),
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(NotAllowedError);
  });
});
