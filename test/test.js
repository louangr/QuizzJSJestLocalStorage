import { hasToDisplayNextQuestion, isRightAnswer } from '../src/model.js'

test("exemple de test", () => {
    // ARRANGE
    // je met en place l'environnement du test
    // je positionne le système dans un état déterminé
    
    // ACT
    // je fais un truc et un seul avec le système
    
    // ASSERT
    // je vérifie que le système est dans l'état attendu
    // je vérifie que la valeur de retour est celle attendue
    expect(true).toBe(true)
})

describe("nextQuestion", () => {    
    test('return true when there is next question available', () => {
        expect(hasToDisplayNextQuestion(0)).toBe(true)
    })

    test('return false when there is not next question available', () => {
        expect(hasToDisplayNextQuestion(2)).toBe(false)
    })
})

describe("checkUserAnswer", () => {    
    test('return true if this is the right answer', () => {
        expect(isRightAnswer(0, "Blanc")).toBe(true)
    })

    test('return true if this is the right answer (lowercase)', () => {
        expect(isRightAnswer(0, "blanc")).toBe(true)
    })

    test('return false if this is not the right answer', () => {
        expect(isRightAnswer(1, "Blanc")).toBe(false)
    })
})