import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug.value-object.js";
import { makeQuestionFactory } from "../../../../../../test/factories/make-question.factory.js";
import { InMemoryQuestionRepository } from "../../../../../../test/repositories/in-memory-question.repository.js";
import { GetQuestionBySlugUseCase } from "../get-question-by-slug.use-case.js";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlugUseCase;

describe("GetQuestionBySlugUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository);
  });

  it("should be able get a question by slug", async () => {
    const newQuestion = makeQuestionFactory({
      slug: Slug.create("example-question"),
    });

    await inMemoryQuestionRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "example-question",
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toEqual(newQuestion.title);
  });
});
