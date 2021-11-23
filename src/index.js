import { renderTitle, generateFirstQuestion, generateQuestion, checkAnswer, setCurrentQuestion } from './ui.js'
import { getStoredQuizz } from './model.js'

const initialyze = () => {
    renderTitle()
    const storedQuizz = getStoredQuizz()
    
    if (storedQuizz != null) {
        storedQuizz.forEach(q => {
            generateQuestion(q)
        })

        setCurrentQuestion(storedQuizz.length)
    }

    generateFirstQuestion()
    document.getElementById("btn").addEventListener("click", checkAnswer)
}

window.addEventListener("DOMContentLoaded", initialyze)