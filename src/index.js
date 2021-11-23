import { renderTitle, generateFirstQuestion, checkAnswer } from './ui.js'
import { getStoredQuizz } from './model.js'

const initialyze = () => {
    renderTitle()

    const storedQuizz = getStoredQuizz()
    if (storedQuizz != null) {
        // TODO : display previous questions if there are any in local storage
    }

    generateFirstQuestion()

    document.getElementById("btn").addEventListener("click", checkAnswer)
}

window.addEventListener("DOMContentLoaded", initialyze)