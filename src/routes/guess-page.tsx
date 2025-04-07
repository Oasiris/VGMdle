import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function GuessPage({ gameId }: { gameId: number }) {
    const [songNumber, setSongNumber] = useState(1);
    const [guessNumber, setGuessNumber] = useState(1);


    return (
        <>
        <p>Game #001 – Tuesday, April 1, 2024</p>

        <p>Song number: {songNumber}</p>

        {
            [1, 2, 3, 4, 5, 6].map((number) => (
                <button key={number} onClick={() => setSongNumber(number)}>
                    {number}
                </button>
            ))
        }

        <div style={{ width: '100%', height: '30px', backgroundColor: 'blue' }}>
            Song bar
        </div>

        <div>
            {
                guessNumber <= 6 && ("" + (6 - guessNumber) + " guesses remaining!")
            }
        </div>

        <div>
            <form>
                <label>
                    <input
                        spellCheck="false"
                        type="text"
                        placeholder="Search for a game..."
                        value={guessNumber}
                        onChange={(e) => setGuessNumber(Number(e.target.value))}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>

        <div>
            <button className="leftArrow">
                <Link to={`/guess/${gameId} - 1`}>
                    Prev
                </Link>
            </button>
            <button className="rightArrow">
                <Link to={`/guess/${gameId + 1}`}>
                    Next
                </Link>
            </button>
        </div>

        </>
    )
}