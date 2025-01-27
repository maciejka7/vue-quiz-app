import { assert } from "vitest";
import { Question } from "../question/question";
import { uuid, UUID } from "../utils/uuid";
import { DefaultQuizValidationPolicy, QuizValidationParams, QuizValidationPolicy } from "./quizValidationPolicy";


export interface QuizParam {
  title: string
  description: string
  questions: Question[]
}

export interface QuizConfig {
  validation?: QuizValidationPolicy,
  minNumberOfQuestions?: number,
  maxNumberOfQuestions?: number,
}

export class Quiz {

  public id: UUID
  public title: string
  public description: string
  public questions: Question[]

  private validation: QuizValidationPolicy

  private defaultConfig: QuizConfig = {
    minNumberOfQuestions: 1,
    maxNumberOfQuestions: 5,
    validation: new DefaultQuizValidationPolicy()
  }

  constructor(param: QuizParam, config?: QuizConfig) {

    assert(this.defaultConfig.validation)
    assert(this.defaultConfig.minNumberOfQuestions)
    assert(this.defaultConfig.maxNumberOfQuestions)

    this.validation = config?.validation || this.defaultConfig.validation

    const { title, description, questions } = param

    const validationParams: QuizValidationParams = {
      max: config?.maxNumberOfQuestions || this.defaultConfig.maxNumberOfQuestions,
      min: config?.minNumberOfQuestions || this.defaultConfig.minNumberOfQuestions,
      questions
    }

    const { message, error } = this.validation.validate(validationParams)

    if (error) {
      throw new Error(message)
    }

    this.id = uuid()
    this.title = title
    this.description = description
    this.questions = questions
  }

}
