import { resources } from "./resources.js"

const localStorageQuizzKey = "quizz"

const hasToDisplayNextQuestion = (currentQuestion) => {
    return resources.questions[currentQuestion + 1]?.number !== undefined
}

const isRightAnswer = (currentQuestion, currentUserAnswer) => {
    return resources.questions[currentQuestion].answer.toLowerCase() === currentUserAnswer.toLowerCase()
}

const storeQuizz = (quizz) => {
    localStorage.setItem(localStorageQuizzKey, JSON.stringify(quizz))
}

const removeStoredQuizz = () => {
    localStorage.removeItem(localStorageQuizzKey)
}

const getStoredQuizz = () => {
    return JSON.parse(localStorage.getItem(localStorageQuizzKey))
}

export {
    hasToDisplayNextQuestion,
    isRightAnswer,
    storeQuizz,
    removeStoredQuizz,
    getStoredQuizz
}
