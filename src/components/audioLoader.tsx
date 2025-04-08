// AudioTest.tsx
import { useEffect, useState } from 'react'

// Eagerly load all audio files in assets
const audioFiles = import.meta.glob('../assets/**/*.{mp3,wav,ogg}', {
    eager: true,
    as: 'url',
}) as Record<string, string>

const AudioTest = () => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

    useEffect(() => {
        console.log('Audio files:', audioFiles)
        // Desired filename (relative to ../assets)
        const filename = 'audio/001_supermariobros/001-Castle_Clear.mp3'

        // Find full path
        const matchedPath = Object.keys(audioFiles).find((path) => path.endsWith(filename))

        if (matchedPath) {
            const src = audioFiles[matchedPath]
            const newAudio = new Audio(src)
            setAudio(newAudio)
        }
    }, [])

    const handlePlay = () => {
        audio?.play()
    }

    return (
        <div>
            <button onClick={handlePlay} disabled={!audio}>
                Play Audio
            </button>
        </div>
    )
}

export default AudioTest
