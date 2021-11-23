import { resources } from "./resources.js"

const localStorageQuizzKey = "quizz"
let currentQuizz = []

const hasToDisplayNextQuestion = (currentQuestion) => {
    return resources.questions[currentQuestion + 1]?.number !== undefined
}

const isRightAnswer = (currentQuestion, currentUserAnswer) => {
    return resources.questions[currentQuestion].answer.toLowerCase() === currentUserAnswer.toLowerCase()
}

const storeQuizz = (textQuestion, userAnswer = null, timerTime = null) => {
    currentQuizz.push({ text: textQuestion, userAnswer: userAnswer ?? "", timer: timerTime ?? "0" })
    localStorage.setItem(localStorageQuizzKey, JSON.stringify(currentQuizz))
}

const removeStoredQuizz = () => {
    localStorage.removeItem(localStorageQuizzKey)
}

const getStoredQuizz = () => {
    const storedQuizz = JSON.parse(localStorage.getItem(localStorageQuizzKey))
    storedQuizz !== null && (currentQuizz = currentQuizz.concat(storedQuizz))
    return storedQuizz
}

const getGoodUserAnswer = () => {
    let goodUserAnswer = 0
    currentQuizz.forEach(q => q.userAnswer !== "" && goodUserAnswer++)
    return goodUserAnswer
}

export {
    hasToDisplayNextQuestion,
    isRightAnswer,
    storeQuizz,
    removeStoredQuizz,
    getStoredQuizz,
    getGoodUserAnswer
}
