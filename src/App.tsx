import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing.tsx";
import { HangmanWord } from "./HangmanWord.tsx";
import { Keyboard } from "./Keyboard.tsx";

function getWord() {
      return words[Math.floor(Math.random() * words.length)]
}

function App() {
  // obtenemos las palabras del listado
  const [wordToGuess, setWordToGuess] = useState(getWord);


  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  
  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if(guessedLetters.includes(letter)) return

    setGuessedLetters(currentletter => [...currentletter, letter])
  }, [guessedLetters, isWinner, isLoser])
  // Funcion no necesaria
  // function addGuessedLetter(letter: string) {
  //   if(guessedLetters.includes(letter)) return

  //   setGuessedLetters(currentletter => [...currentletter, letter])
  // }

useEffect(() => {
  // Definición de la función manejadora de eventos
  const handle = (e: KeyboardEvent) => {
    const key = e.key;
    // Verifica si la tecla presionada es una letra entre 'a' y 'z'
    if (key !== "Enter") return;
    e.preventDefault()
    setGuessedLetters([])
    setWordToGuess(getWord())
  };

  // Añade el manejador de eventos al documento
  document.addEventListener("keypress", handle);

  // Función de limpieza que se ejecuta al desmontar el componente
  return () => {
    // Elimina el manejador de eventos del documento
    document.removeEventListener("keypress", handle);
  };
}, [guessedLetters]); // Arreglo de dependencias vacío

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
        {isWinner && "Winner! Refresh to continue"}
        {isLoser && "Sorry, you lose. Refresh to continue"}
      </div>

      <HangmanDrawing numberOfGuesses = {incorrectLetters.length} />
      <HangmanWord reveal={isLoser} 
      guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{alignSelf: "stretch"}}>
        <Keyboard 
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters = {incorrectLetters}
          disabled = {isWinner || isLoser}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
      
      
  </div>
  
  );}
export default App;