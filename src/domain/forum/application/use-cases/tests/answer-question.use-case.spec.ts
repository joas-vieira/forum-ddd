import type { AnswerRepository } from "../../repositories/answer.repository.js";
import { AnswerQuestionUseCase } from "../answer-question.use-case.js";

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer) => {},
};

test("create an answer", async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestionUseCase.execute({
    instructorId: "1",
    questionId: "1",
    content: "This is an answer",
  });

  expect(answer.content).toEqual("This is an answer");
});
