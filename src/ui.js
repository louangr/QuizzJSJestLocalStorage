import { hasToDisplayNextQuestion, isRightAnswer, storeQuizz, removeStoredQuizz, getGoodUserAnswer } from './model.js'
import { resources } from "./resources.js"

const disabledTimerColor = "#909090"
const timerTimeInSecs = 10

let currentQuestion = 0
let timerInterval

const setCurrentQuestion = (newCurrentQuestion) => {
    currentQuestion = newCurrentQuestion
}

const renderTitle = () => {
    const h1 = document.createElement("h1")
    h1.textContent = resources.quizzTitle
    document.body.appendChild(h1)
}

const generateFirstQuestion = () => {
    generateTimedQuestion()
}

const generateTimedQuestion = () => {
    generateQuestion()
    
    timerInterval = setInterval(() => {
        
        const currentInput = document.getElementById(`a${resources.questions[currentQuestion].number}`)
        const currentTimer = document.getElementById(`t${resources.questions[currentQuestion].number}`)
        currentTimer.textContent--
        
        if (currentTimer.textContent < 1) {
            storeQuizz(resources.questions[currentQuestion].text)

            clearInterval(timerInterval)
            disabledAnsweredQuestion(currentInput, currentTimer)
            generateNextQuestionIfNecessary()
        }
    }, 1000)
}

const generateQuestion = (restoredQuestion = null) => {
    const q = restoredQuestion === null
        ? resources.questions[currentQuestion]
        : restoredQuestion

    const text = document.createElement("p")
    text.id = `q${q.number}`
    text.textContent = q.text

    const input = document.createElement("input")
    input.id = `a${q.number}`
    input.type = "text"
    restoredQuestion !== null && (input.value = q.userAnswer)
    restoredQuestion !== null && (input.disabled = true)

    const btn = document.createElement("button")
    btn.id = "btn"
    btn.textContent = resources.submitButtonLabel
    btn.addEventListener("click", checkAnswer)

    const timer = document.createElement("p")
    timer.id = `t${q.number}`
    timer.textContent = restoredQuestion !== null ? q.timer : timerTimeInSecs
    restoredQuestion !== null && (timer.style.color = disabledTimerColor)

    document.body.appendChild(text)
    document.body.appendChild(input)
    restoredQuestion ?? (document.body.appendChild(btn))
    document.body.appendChild(timer)
}

const disabledAnsweredQuestion = (currentInput, currentTimer) => {
    currentInput.disabled = true;
    currentTimer.style.color = disabledTimerColor
    document.getElementById("btn").remove()
}

const clearCurrentInput = (currentInput) => {
    currentInput.value = ""
}

const generateFooter = () => {
    const p = document.createElement("p")
    p.textContent = resources.scoreLabel.replace("{1}", getGoodUserAnswer()).replace("{2}", resources.questions.length)
    document.body.appendChild(p)
}

const generateNextQuestionIfNecessary = () => {
    if (hasToDisplayNextQuestion(currentQuestion)) {
        currentQuestion++
        generateTimedQuestion()
    } else {
        removeStoredQuizz()
        generateFooter()
    }
}

const checkAnswer = () => {
    const currentTimer = document.getElementById(`t${resources.questions[currentQuestion].number}`)
    const currentInput = document.getElementById(`a${resources.questions[currentQuestion].number}`)
    const currentUserAnswer = currentInput.value
    
    if (isRightAnswer(currentQuestion, currentUserAnswer)) {
        storeQuizz(resources.questions[currentQuestion].text, currentUserAnswer, currentTimer.textContent)
        clearInterval(timerInterval)
        disabledAnsweredQuestion(currentInput, currentTimer)
        generateNextQuestionIfNecessary()
    } else {
        clearCurrentInput(currentInput)
    }
}

export {
    renderTitle,
    generateFirstQuestion,
    checkAnswer,
    generateQuestion,
    setCurrentQuestion
}