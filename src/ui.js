import { hasToDisplayNextQuestion, isRightAnswer, storeQuizz, removeStoredQuizz } from './model.js'
import { resources } from "./resources.js"

let currentQuestion = 0
let goodUserAnswer = 0
let storedQuizz = []
let timerInterval

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
            storedQuizz.push({ text: resources.questions[currentQuestion].text, userAnswer: "", timer: "0" })
            storeQuizz(storedQuizz)

            clearInterval(timerInterval)
            disabledAnsweredQuestion(currentInput, currentTimer)
            generateNextQuestionIfNecessary()
        }
    }, 1000)
}

const generateQuestion = () => {
    const q = resources.questions[currentQuestion]

    const text = document.createElement("p")
    text.id = `q${q.number}`
    text.textContent = q.text

    const input = document.createElement("input")
    input.id = `a${q.number}`
    input.type = "text"

    const btn = document.createElement("button")
    btn.id = "btn"
    btn.textContent = resources.submitButtonLabel
    btn.addEventListener("click", checkAnswer)

    const timer = document.createElement("p")
    timer.id = `t${q.number}`
    timer.textContent = 10

    document.body.appendChild(text)
    document.body.appendChild(input)
    document.body.appendChild(btn)
    document.body.appendChild(timer)
}

const disabledAnsweredQuestion = (currentInput, currentTimer) => {
    currentInput.disabled = true;
    currentTimer.style.color = '#909090'
    document.getElementById("btn").remove()
}

const clearCurrentInput = (currentInput) => {
    currentInput.value = ""
}

const generateFooter = () => {
    const p = document.createElement("p")
    p.textContent = resources.scoreLabel.replace("{1}", goodUserAnswer).replace("{2}", resources.questions.length)
    document.body.appendChild(p)
}

const generateNextQuestionIfNecessary = () => {
    if (hasToDisplayNextQuestion(currentQuestion)) {
        currentQuestion++
        generateTimedQuestion()
        return true
    } else {
        removeStoredQuizz()
        generateFooter()
        return false
    }
}

const checkAnswer = () => {
    const currentTimer = document.getElementById(`t${resources.questions[currentQuestion].number}`)
    const currentInput = document.getElementById(`a${resources.questions[currentQuestion].number}`)
    const currentUserAnswer = currentInput.value
    
    if (isRightAnswer(currentQuestion, currentUserAnswer)) {
        storedQuizz.push({ text: resources.questions[currentQuestion].text, userAnswer: currentUserAnswer, timer: currentTimer.textContent })
        storeQuizz(storedQuizz)

        goodUserAnswer++
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
    checkAnswer
}