import { Answer } from "../answer/answer"
import { AppError, errorFactory, noError } from "../error/errorFactory"
import { Question } from "../question/question"
import { QuestionValidationParams, QuestionValidationError } from "../question/questionValidationPolicy"

export interface QuizValidationError extends AppError { }

export interface QuizValidationParams {
  questions: Question[],
  min: number,
  max: number
}

export interface QuizValidationPolicy {
  validate: (params: QuizValidationParams) => QuizValidationError
}

export class DefaultQuizValidationPolicy implements QuizValidationPolicy {

  MIN_QUESTIONS_AMOUNT = 1;

  public validate(params: QuizValidationParams) {

    const { questions } = params

    const validations: Array<() => QuestionValidationError> = [
      () => this.validateQuestionsLenght(questions),
    ]

    for (const validation of validations) {
      const result = validation();

      if (result.error) {
        return result
      }
    }

    return noError()
  }

  private validateQuestionsLenght(questions: Question[]): QuizValidationError {

    if (questions.length <= this.MIN_QUESTIONS_AMOUNT) {
      return errorFactory(`At least ${this.MIN_QUESTIONS_AMOUNT} questions required`)
    }

    return noError()

  }

}

