import { useEffect, useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing.tsx";
import { HangmanWord } from "./HangmanWord.tsx";
import { Keyboard } from "./Keyboard.tsx";

function App() {
  // obtenemos las palabras del listado
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  });


  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  
  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  function addGuessedLetter(letter: string) {
    if(guessedLetters.includes(letter)) return

    setGuessedLetters(currentletter => [...currentletter, letter])
  }

  useEffect(() => {
    const handle = (e: KeyboardEvent) {
      const key = e.key
      if (!key.match(/^[az]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handle)

    return () => {
      document.removeEventListener("keypress", handle)
    }
  })

  return (
  <div 
    style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto", 
      alignItems: "center"
    }}>
      <div style={{
        fontSize: "2rem",
        textAlign: "center"
      }}>
        Lose 
        Win
      </div>

      <HangmanDrawing numberOfGuesses = {incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{alignSelf: "stretch"}}>
        <Keyboard />
      </div>
      
      
  </div>
  
  );}
export default App;