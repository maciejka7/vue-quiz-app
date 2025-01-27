import { Answer } from "../answer/answer";
import { Question, QuestionConfig, QuestionParam } from "./question";

const q1 = () => {
  const answers = [
    new Answer({ text: "function = myFunction()" }),
    new Answer({ text: "function myFunction()" }),
    new Answer({ text: "function:myFunction()" }),
    new Answer({ text: "func myFunction()" }),
  ]

  const goodAnswers = [answers[1].id]

  const param = {
    answers,
    goodAnswers,
    label: "How to create a function in JavaScript?"
  }

  return new Question(param)
}

const q2 = () => {
  const answers = [
    new Answer({ text: " Math.round(7.25)" }),
    new Answer({ text: " Math.rnd(7.25)" }),
    new Answer({ text: " round(7.25)" }),
    new Answer({ text: " rnd(7.25)" }),
  ]

  const goodAnswers = [answers[0].id]

  const param = {
    answers,
    goodAnswers,
    label: "How do you round the number 7.25, to the nearest integer?"
  }

  return new Question(param)
}

export const questionMock = [
  q1(),
  q2(),
]
