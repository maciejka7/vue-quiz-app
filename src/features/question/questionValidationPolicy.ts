import { Answer } from "../answer/answer";
import { AppError, errorFactory, noError } from "../error/errorFactory";

export interface QuestionValidationError extends AppError { }

export interface QuestionValidationParams {
  answers: Answer[], goodAnswers: Answer['id'][], min: number, max: number
}

export interface QuestionValidationPolicy {
  validate: (params: QuestionValidationParams) => QuestionValidationError
}
interface UniformityValidationResult {
  answerId: Answer['id'],
  amountOfUniforityAnswers: number
}

export class SingleGoodAnswerPolicy implements QuestionValidationPolicy {

  private MIN_NUMBER_OF_ANSWERS = 2

  public validate(params: QuestionValidationParams) {

    const { answers, goodAnswers, max, min } = params

    const validations: Array<() => QuestionValidationError> = [
      () => this.validateMinAndMax(answers, min, max),
      () => this.validateAnswersAmount(answers),
      () => this.validateGoodAmswers(answers, goodAnswers),
      () => this.validateAnswersUniformity(answers),
    ]

    for (const validation of validations) {
      const result = validation();

      if (result.error) {
        return result
      }
    }

    return noError()
  }

  private validateMinAndMax(answers: Answer[], min: number, max: number): QuestionValidationError {

    if (min > max) {
      return errorFactory('Min number of answers are higher then max one')
    }

    if (answers.length > max) {
      return errorFactory(`Max ${max} answers allowed`)
    }



    return noError()
  }


  private validateGoodAmswers(answers: Answer[], goodAnswers: Answer['id'][]): QuestionValidationError {

    if (!goodAnswers.length) {
      return errorFactory('No good answers provided')
    }

    if (goodAnswers.length && !this.chechGoodAnswerMatchAnswers(answers, goodAnswers)) {
      return errorFactory('Good answer id not match any of answers provided')
    }

    return noError()
  }

  private chechGoodAnswerMatchAnswers(answers: Answer[], goodAnswers: Answer['id'][]): boolean {
    return answers.map(({ id }) => id === goodAnswers[0]).includes(true)
  }

  private validateAnswersAmount(answers: Answer[]): QuestionValidationError {

    if (!answers.length) {
      return errorFactory('No answers provided')
    }

    if (answers.length < this.MIN_NUMBER_OF_ANSWERS) {
      return errorFactory(`Number of answers are lower than ${this.MIN_NUMBER_OF_ANSWERS}`)
    }
    return noError()
  }

  private validateAnswersUniformity(answers: Answer[]): QuestionValidationError {

    let numberOfUniformityAnswer = 0

    answers.forEach((first) => {
      answers.every((second) => { if (first.equals(second)) { numberOfUniformityAnswer++ } })
    })

    if (answers.length === numberOfUniformityAnswer) {
      return errorFactory(`There must be at least two different answers`)
    }

    return noError()
  }

}

export class MultipleGoodAnswerPolicy implements QuestionValidationPolicy {

  private MIN_NUMBER_OF_ANSWERS = 2

  public validate(answers: Answer[], goodAnswers: Answer["id"][]) {

    const validations: Array<() => QuestionValidationError> = [
      () => this.validateAnswersAmount(answers),
      () => this.validtateGoodAnswers(goodAnswers),
    ]

    for (const validation of validations) {
      const result = validation();

      if (result.error) {
        return result
      }
    }

    return noError()
  };


  private validateAnswersAmount(answers: Answer[]): QuestionValidationError {

    if (!answers.length) {
      return errorFactory('No answers provided')
    }

    if (answers.length < this.MIN_NUMBER_OF_ANSWERS) {
      return errorFactory(`Number of answers are lower than ${this.MIN_NUMBER_OF_ANSWERS}`)
    }

    return noError()
  }

  private validtateGoodAnswers(goodAnswers: Answer['id'][]): QuestionValidationError {
    throw new Error('not implemented yet')
    return noError()
  }


}
