
import { describe, expect, it } from "vitest";
import { Question, QuestionConfig, QuestionParam } from "./question";
import { Answer } from "../answer/answer";
import { answerMocks } from "../answer/answerMock";

const a1 = new Answer(answerMocks[0])
const a2 = new Answer(answerMocks[1])
const a3 = new Answer(answerMocks[2])
const a4 = new Answer(answerMocks[3])

const label = 'first sample question'
const answers = [a1, a2, a3]
const singleGoodAnswer = [a2.id]

describe('question tests', () => {

  describe('single good answer policy tests', () => {

    it('should had required property', async () => {

      const questionData: QuestionParam = {
        label,
        answers,
        goodAnswers: singleGoodAnswer
      }
      const question = new Question(questionData)

      expect('label' in question).toBeTruthy()
      expect(question.label).to.not.toBeFalsy()
      expect('answers' in question).toBeTruthy()
      expect(question.answers).to.not.toBeFalsy()
      expect('goodAnswers' in question).toBeTruthy()
      expect(question.goodAnswers).to.not.toBeFalsy()
      expect('id' in question).toBeTruthy()
      expect(question.id).to.not.toBeFalsy()
    });

    it('should contain at least two answer', async () => {

      const singleAnswerQuestion: QuestionParam = {
        label,
        answers: [a1],
        goodAnswers: singleGoodAnswer
      }

      const multipleAnswerQuestion: QuestionParam = {
        label,
        answers: [a1, a2],
        goodAnswers: singleGoodAnswer
      }

      expect(() => new Question(singleAnswerQuestion)).toThrowError(/number of answers are lower than/i)
      expect(() => new Question(multipleAnswerQuestion)).not.toThrowError()

    });

    it('should throw a error when no single good answers provided', () => {

      const singleAnswerQuestion: QuestionParam = {
        label,
        answers: [a1, a2],
        goodAnswers: []
      }

      expect(() => new Question(singleAnswerQuestion)).toThrowError(/no good answers provided/i)

    });

    it('should contain at least one good answer ', () => {

      const singleAnswerQuestion: QuestionParam = {
        label,
        answers: [a1, a2],
        goodAnswers: [a1.id]
      }
      expect(() => new Question(singleAnswerQuestion)).to.not.toThrowError()
      const q = new Question(singleAnswerQuestion)
      expect(q.goodAnswers).toBeTruthy()
    });

    it('should thow error when not at least one good answer among answers passed', () => {

      const singleAnswerQuestion: QuestionParam = {
        label,
        answers: [a1, a2],
        goodAnswers: [a3.id]
      }
      expect(() => new Question(singleAnswerQuestion)).toThrowError(/answer id not match any of answers provided/i)
    });

    it('should contain at least one good answer among answers passed', () => {

      const singleAnswerQuestion: QuestionParam = {
        label,
        answers: [a1, a2],
        goodAnswers: [a1.id]
      }
      expect(() => new Question(singleAnswerQuestion)).to.not.toThrowError()
    });


    it('should contain an label', async () => {

      const singleAnswerQuestion: QuestionParam = {
        label,
        answers: [a1, a2],
        goodAnswers: [a1.id]
      }

      const q = new Question(singleAnswerQuestion)

      expect(q).toHaveProperty('label')
      expect(q.label).toMatch(/first sample question/i)
    });


    it('should contain at least two answer different from each other based based on text', async () => {

      const singleAnswerQuestion: QuestionParam = {
        label,
        answers: [a1, a1],
        goodAnswers: [a1.id]
      }

      expect(() => new Question(singleAnswerQuestion)).toThrowError(/There must be at least two different answers/i)
    });

    it('should throw error when answers max number exceeded', async () => {
      const singleAnswerQuestion: QuestionParam = {
        label,
        answers: [a1, a2, a3, a4],
        goodAnswers: [a1.id]
      }

      const questionConfig: QuestionConfig = {
        maxNumberOfAnswers: 3
      }

      expect(() => new Question(singleAnswerQuestion, questionConfig)).toThrowError(/max 3 answers allowed/i)
    });


    it('should throw error when min config number are higher than low', async () => {

      const singleAnswerQuestion: QuestionParam = {
        label,
        answers: [a1, a2, a3, a4],
        goodAnswers: [a1.id]
      }

      const questionConfig: QuestionConfig = {
        minNumberOfAnswers: 4,
        maxNumberOfAnswers: 3
      }

      expect(() => new Question(singleAnswerQuestion, questionConfig)).toThrowError(/Min number of answers are higher then max one/i)
    });

    it('should contain a explanation when are provided', async () => {

      const singleAnswerQuestion: QuestionParam = {
        label,
        answers: [a1, a2, a3, a4],
        goodAnswers: [a1.id],
        explanation: "some simple explanation"
      }

      const q = new Question(singleAnswerQuestion)

      expect(q.explanation).toBeTruthy()

    });
  })

})
