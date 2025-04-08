import { useCallback, useEffect, useState } from 'react'
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

interface GuessPageProps {
    gameId: number
    // autoPlay is a boolean that indicates whether to auto-play the audio. Default behavior is true
    autoPlay?: boolean
}

export default function GuessPage({ gameId, autoPlay }: GuessPageProps) {
    const [songNumber, setSongNumber] = useState(1)
    const [guessNumber, setGuessNumber] = useState(1)

    // Audio clip logic
    const [hasInteracted, setHasInteracted] = useState(false)
    const [audioSources, setAudioSources] = useState<string[]>([])
    const [currentAudioSrc, setCurrentAudioSrc] = useState<string | null>(null)

    const handleClipsFetched = useCallback((sources: string[]) => {
        setAudioSources(sources)
        setCurrentAudioSrc(sources[songNumber - 1])
    }, [])

    // Use a useEffect to auto-play when currentAudioSrc changes
    useEffect(() => {
        if (currentAudioSrc) {
            const audioElement = document.getElementById('guess-audio') as HTMLAudioElement
            if (hasInteracted && autoPlay !== false) {
                audioElement?.play()
            }
        }
    }, [currentAudioSrc, autoPlay])

    return (
        <>
            <AudioFetcher paths={AUDIO_PATHS} onFetched={handleClipsFetched} />

            <p>Game #001 – Tuesday, April 1, 2024</p>

            <p>Song number: {songNumber}</p>

            {[1, 2, 3, 4, 5, 6].map((number) => (
                <button
                    key={number}
                    onClick={() => {
                        setHasInteracted(true)
                        setSongNumber(number)
                        setCurrentAudioSrc(audioSources[number - 1])
                    }}
                >
                    {number}
                </button>
            ))}

            <div>
                {currentAudioSrc && (
                    <audio id="guess-audio" src={currentAudioSrc} controls preload="auto">
                        Your browser does not support the audio element. Try again on a different
                        browser.
                    </audio>
                )}
            </div>

            <br />

            <div>{guessNumber <= 6 && '' + (6 - guessNumber) + ' guesses remaining!'}</div>

            <br />

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

            <br />

            <div>
                <button className="leftArrow">
                    <Link to={`/guess/${gameId} - 1`}>Prev Puzzle</Link>
                </button>
                <button className="rightArrow">
                    <Link to={`/guess/${gameId + 1}`}>Next Puzzle</Link>
                </button>
            </div>
        </>
    )
}
