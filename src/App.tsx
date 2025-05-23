import { useCallback, useEffect, useState } from "react";
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

  const addGuessedLetter = useCallback((letter: string) => {
    if(guessedLetters.includes(letter)) return

    setGuessedLetters(currentletter => [...currentletter, letter])
  }, [guessedLetters])
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
    if (!key.match(/^[a-z]$/)) return;

    // Evita el comportamiento por defecto del evento
    e.preventDefault();
    // Llama a la función addGuessedLetter con la tecla presionada
    addGuessedLetter(key);
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
        Lose 
        Win
      </div>

      <HangmanDrawing numberOfGuesses = {incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{alignSelf: "stretch"}}>
        <Keyboard 
        activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}

        inactiveLetters = {incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        />
      </div>
      
      
  </div>
  
  );}
export default App;