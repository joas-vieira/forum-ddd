import { makeQuestionFactory } from "../../../../../../test/factories/make-question.factory.js";
import { InMemoryQuestionRepository } from "../../../../../../test/repositories/in-memory-question.repository.js";
import { FetchRecentQuestionsUseCase } from "../fetch-recent-questions.use-case.js";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: FetchRecentQuestionsUseCase;

describe("FetchRecentQuestionsUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository);
  });

  it("should be able fetch recent questions", async () => {
    await inMemoryQuestionRepository.create(
      makeQuestionFactory({
        createdAt: new Date(2024, 0, 20),
      })
    );
    await inMemoryQuestionRepository.create(
      makeQuestionFactory({
        createdAt: new Date(2024, 0, 18),
      })
    );
    await inMemoryQuestionRepository.create(
      makeQuestionFactory({
        createdAt: new Date(2024, 0, 23),
      })
    );

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toHaveLength(3);
    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 18) }),
    ]);
  });

  it("should be able fetch paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestionFactory());
    }

    const { questions } = await sut.execute({
      page: 2,
    });

    expect(questions).toHaveLength(2);
  });
});
