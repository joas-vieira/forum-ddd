import { InMemoryQuestionRepository } from "../../../../../../test/repositories/in-memory-question.repository.js";
import { CreateQuestionUseCase } from "../create-question.use-case.js";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: CreateQuestionUseCase;

describe("CreateQuestionUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository);
  });

  it("should be able create a question", async () => {
    const { question } = await sut.execute({
      authorId: "1",
      title: "This is a question",
      content: "This is the content of the question",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionRepository.items[0]).toEqual(question);
  });
});
