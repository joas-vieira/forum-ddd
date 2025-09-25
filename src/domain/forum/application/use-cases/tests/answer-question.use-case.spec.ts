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
    const { answer } = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "This is an answer",
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswerRepository.items[0]).toEqual(answer);
  });
});
