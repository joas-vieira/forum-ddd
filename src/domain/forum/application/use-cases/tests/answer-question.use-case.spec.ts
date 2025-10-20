import { InMemoryAnswerRepository } from "../../../../../../test/repositories/in-memory-answer.repository.js";
import { AnswerQuestionUseCase } from "../answer-question.use-case.js";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionUseCase;

describe("AnswerQuestionUseCase", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });

  it("should be able create an answer", async () => {
    const response = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "This is an answer",
    });

    expect(response.isRight()).toBe(true);
    expect(inMemoryAnswerRepository.items[0]).toEqual(response.value?.answer);
  });
});
