import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import AudioFetcher from '../components/audioFetcher'

// import audio1 from '../assets/audio/001_supermariobros/001-Castle_Clear.mp3'

const AUDIO_PATHS = [
    '../assets/audio/001_supermariobros/001-Castle_Clear.mp3',
    '../assets/audio/001_supermariobros/002-Ending_Theme.mp3',
    '../assets/audio/001_supermariobros/003-Underwater_Theme.mp3',
    '../assets/audio/001_supermariobros/004-Castle_Theme.mp3',
    '../assets/audio/001_supermariobros/005-Underground_Theme.mp3',
    '../assets/audio/001_supermariobros/006-Overworld_Theme.mp3',
]

export default function GuessPage({ gameId }: { gameId: number }) {
    const [songNumber, setSongNumber] = useState(1)
    const [guessNumber, setGuessNumber] = useState(1)

    // Audio clip logic
    const [audioSrc, setAudioSrc] = useState<string[]>([])

    const handleClipsFetched = useCallback((sources: string[]) => {
        setAudioSrc(sources)
    }, [])

    return (
        <>
            <AudioFetcher paths={AUDIO_PATHS} onFetched={handleClipsFetched} />

            <p>Game #001 – Tuesday, April 1, 2024</p>

            <p>Song number: {songNumber}</p>

            {[1, 2, 3, 4, 5, 6].map((number) => (
                <button key={number} onClick={() => setSongNumber(number)}>
                    {number}
                </button>
            ))}

            <div style={{ width: '100%', height: '30px', backgroundColor: 'blue' }}>Song bar</div>

            <div>{guessNumber <= 6 && '' + (6 - guessNumber) + ' guesses remaining!'}</div>

            <div>
                <h3>Bam</h3>
                {audioSrc.length > 0 && (
                    <audio src={audioSrc[songNumber - 1]} controls>
                        Your browser does not support the audio element. Try again on a different
                        browser.
                    </audio>
                )}
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
                    <Link to={`/guess/${gameId} - 1`}>Prev</Link>
                </button>
                <button className="rightArrow">
                    <Link to={`/guess/${gameId + 1}`}>Next</Link>
                </button>
            </div>
        </>
    )
}
