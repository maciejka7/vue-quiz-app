import { describe, expect, it } from 'vitest'
import { Answer, AnswerParam } from './answer'
import { answerMocks } from './answerMock';

describe('answer VO tests', () => {

    it('should should create answer object with properties', async () => {

        const mockAnswer = answerMocks[0]
        const answer = new Answer(mockAnswer)
        const properties = ['id', 'text', 'description']

        properties.forEach(prop => (expect(prop in answer).toBeTruthy()))
    });


    it('should answer can be equals based on text', async () => {

        const answerOneData: AnswerParam = answerMocks[1]
        const answerTwoData: AnswerParam = answerMocks[2]

        const answerOne = new Answer(answerOneData)
        const answerTwo = new Answer(answerOneData)
        const answerThree = new Answer(answerTwoData)

        expect(answerOne.equals(answerTwo)).toBeTruthy()
        expect(answerOne.equals(answerThree)).toBeFalsy()
    });

});