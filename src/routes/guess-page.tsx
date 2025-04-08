import { useState } from 'react'
import { Link } from 'react-router-dom'

import AudioLoader from '../components/audioLoader'

// import audio1 from '../assets/audio/001_supermariobros/001-Castle_Clear.mp3'

const AUDIO_PATHS = [
    '../assets/audio/001_supermariobros/001-Castle_Clear.mp3',
    '../assets/audio/001_supermariobros/002-Overworld.mp3',
    '../assets/audio/001_supermariobros/003-Underwater.mp3',
    '../assets/audio/001_supermariobros/004-Underworld.mp3',
    '../assets/audio/001_supermariobros/005-Invincible.mp3',
    '../assets/audio/001_supermariobros/006-Game_Over.mp3',
]

export default function GuessPage({ gameId }: { gameId: number }) {
    const [songNumber, setSongNumber] = useState(1)
    const [guessNumber, setGuessNumber] = useState(1)

    // Audio clip logic
    const [clips, setClips] = useState<HTMLAudioElement[]>([])

    const handleClipsLoaded = (loaded: HTMLAudioElement[]) => {
        setClips(loaded)
        console.log('Clips available in parent:', loaded)

        // Example: autoplay first one
        loaded[0]?.play()
    }

    return (
        <>
            <AudioLoader audioPaths={AUDIO_PATHS} onLoaded={handleClipsLoaded} />

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
                <p>{console.log(clips)}</p>
            </div>
            {/* <audio src={clips[0]} controls /> */}

            {/* <audio controls>
            <source src="horse.ogg" type="audio/ogg">
            <source src="horse.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio> */}

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
