type HangmanDrawingProps = {
    guessedLetters: string[]
    wordToGuess:string
}

export function HangmanWord({ guessedLetters, wordToGuess}: HangmanDrawingProps){
    //const word = "test"
    //const guessedLetters = ["t", "e", "g"]
    return <div style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace"
        }}>
            {wordToGuess.split("").map((    letter, index) => (
                <span style={{ borderBottom: ".1em solid  black"}} key={index}>
                    <span style={{
                        visibility: guessedLetters.includes(letter) ? "visible": "hidden",
                    }}>
                        {letter}
                        </span>    
                </span>
            ))}
    </div>
}