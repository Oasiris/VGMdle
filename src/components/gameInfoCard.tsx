/*
This card appears when the puzzle is either completed or failed
*/

import { useEffect, useState } from 'react'
import { VGMDLE_ANSWER_KEY } from '../data/answerKey'

import './gameInfoCard.scss'

// Create lazy glob map of all images
const imageModules = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,webp,gif}', {
  as: 'url',
}) as Record<string, () => Promise<string>>

interface GameInfoCardProps {
  gameId: string | number
}

export default function GameInfoCard({ gameId }: GameInfoCardProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const game = VGMDLE_ANSWER_KEY[String(gameId)]

  useEffect(() => {
    const loadImages = async () => {
      const match = Object.entries(imageModules).find(([key]) =>
        key.endsWith(`/images/${game.coverThumb}`),
      )
      if (!match) {
        console.warn(`Image not found: ${game.coverThumb}`)
        return
      }
      setImageSrc(await match[1]())
    }

    if (game.coverThumb) {
      loadImages()
    }
  }, [imageSrc, game.coverThumb, gameId])

  return (
    <div>
      <section className="game-info-card">
        <div className="left">
          <div className="image-container">
            {game.coverThumb && imageSrc && (
              <img src={imageSrc} alt="Game Cover" className="game-cover" />
            )}
          </div>
        </div>
        <div className="right">
          <h2>{game.title}</h2>
        </div>
      </section>
    </div>
  )
}
