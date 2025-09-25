import type { AnswerRepository } from "../../repositories/answer.repository.js";
import type { QuestionRepository } from "../../repositories/question.repository.js";
import { AnswerQuestionUseCase } from "../answer-question.use-case.js";
import { CreateQuestionUseCase } from "../create-question.use-case.js";

const fakeQuestionRepository: QuestionRepository = {
  create: async (question) => {},
};

test("create a question", async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(
    fakeQuestionRepository
  );

  const { question } = await createQuestionUseCase.execute({
    authorId: "1",
    title: "This is a question",
    content: "This is the content of the question",
  });

  expect(question.id).toBeTruthy();
});
