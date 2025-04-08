import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AudioFetcher from '../components/audioFetcher'

import './guess-page.scss'
import { VGMDLE_ANSWER_KEY } from '../data/answerKey'
import GameInfoCard from '../components/gameInfoCard'

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
  // autoPlayPref is a boolean that indicates whether to auto-play the audio. Default behavior is true
  autoPlayPref?: boolean
}

enum GameState {
  GUESSING = 'guessing',
  CORRECT = 'correct',
  GAME_OVER = 'gameOver',
}

export default function GuessPage({ gameId, autoPlayPref }: GuessPageProps) {
  const [songNumber, setSongNumber] = useState<number>(1)
  const [guessNumber, setGuessNumber] = useState(1)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [autoPlay, setAutoPlay] = useState(autoPlayPref ?? true)

  const [guessText, setGuessText] = useState('')

  const [gameState, setGameState] = useState(GameState.GUESSING)

  // Stores audio sources that have been fetched, as well as the current audio source
  const [audioSources, setAudioSources] = useState<string[]>([])
  const [audioLoaded, setAudioLoaded] = useState(false)

  const handleClipsFetched = useCallback((sources: string[]) => {
    setAudioSources(sources)
    setAudioLoaded(true)
  }, [])

  const handleGuess = useCallback(
    (guess: string) => {
      setHasInteracted(true)
      const answer = VGMDLE_ANSWER_KEY[String(gameId)].title
      console.log('Comparing ' + guess + ' to ' + answer)
      if (guess === answer) {
        console.log('Correct guess!')
        setGameState(GameState.CORRECT)
      } else {
        console.log('Incorrect guess!')
        const next = guessNumber + 1
        setGuessNumber(next)
        setSongNumber(next)
        setGuessText('')
      }
    },
    [guessNumber, gameId],
  )

  const handleSkip = useCallback(() => {
    setHasInteracted(true)
    const next = guessNumber + 1
    setGuessNumber(next)
    setSongNumber(next)
  }, [guessNumber])

  // Auto-play logic
  useEffect(() => {
    if (audioLoaded) {
      const audioElement = document.getElementById('guess-audio') as HTMLAudioElement
      if (hasInteracted && autoPlay !== false) {
        audioElement?.play()
      }
    }
  }, [audioLoaded, songNumber, hasInteracted, autoPlay])
  // Turn off auto-play when the game is over
  useEffect(() => {
    if (gameState === GameState.GAME_OVER || gameState === GameState.CORRECT) {
      setAutoPlay(false)
    }
  }, [gameState])
  return (
    <>
      <AudioFetcher paths={AUDIO_PATHS} onFetched={handleClipsFetched} />

      <code style={{ fontSize: '0.5em' }}>
        <p>
          {JSON.stringify({
            // currentAudioSrc,
            audioSources,
            hasInteracted,
            songNumber,
            guessNumber,
            gameId,
            secret: VGMDLE_ANSWER_KEY[String(gameId)],
            autoPlay,
            gameState,
          })}
        </p>
      </code>

      <p>Game #001 – Tuesday, April 1, 2024</p>

      <p>Song number: {songNumber}</p>

      <div>{guessNumber <= 6 && '' + (6 - guessNumber) + ' guesses remaining!'}</div>

      {[1, 2, 3, 4, 5, 6].map((number) => (
        <button
          key={number}
          className={`guess-button ${number === songNumber ? '_active' : ''}
                    ${number > guessNumber ? '_disabled' : ''}`}
          onClick={() => {
            setHasInteracted(true)
            setSongNumber(number)
            // setCurrentAudioSrc(audioSources[number - 1])
          }}
        >
          {number}
        </button>
      ))}

      <div>
        {audioLoaded && (
          <audio id="guess-audio" src={audioSources[songNumber - 1]} controls preload="auto">
            Your browser does not support the audio element. Try again on a different browser.
          </audio>
        )}
      </div>

      <br />

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (guessText === '') {
              return
            }
            handleGuess(guessText)
          }}
        >
          <div>
            <label>
              <input
                type="text"
                spellCheck="false"
                value={guessText}
                onChange={(e) => {
                  setGuessText(e.target.value)
                }}
                placeholder="Search for a game..."
              />
            </label>
            <button onClick={handleSkip}>Skip</button>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      <br />

      {(gameState === GameState.CORRECT || gameState === GameState.GAME_OVER) && (
        <GameInfoCard gameId={gameId} />
      )}

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
