import { useEffect } from 'react'

interface AudioFetcherProps {
    // loadGlob is a glob pattern to match audio files, e.g. '../assets/audio/**/*.{mp3,wav,ogg}'
    paths: string[]
    onFetched: (audioSources: string[]) => void
}

// Create lazy glob map
const audioModules = import.meta.glob('../assets/audio/**/*.mp3', {
    as: 'url',
}) as Record<string, () => Promise<string>>

const AudioFetcher: React.FC<AudioFetcherProps> = ({ paths, onFetched }) => {
    useEffect(() => {
        console.log('🔁 AudioFetcher useEffect triggered')
        const load = async () => {
            console.log(Object.entries(audioModules))
            console.log(paths)

            const urls = []
            for (const path of paths) {
                const audioUrl = await audioModules[path]()
                urls.push(audioUrl)
            }

            // const sources = Object.values(audioModules)
            onFetched(urls)
        }
        load()
    }, [paths, onFetched])

    return null // No UI necessary
}

export default AudioFetcher
