export type Game = {
    title: string
    year?: number
    system?: string
    composersMain?: string[]
    series?: string[]
    coverThumb?: string
}

export const VGMDLE_ANSWER_KEY: Record<string, Game> = {
    '1': {
        title: 'Super Mario Bros.',
        year: 1985,
        system: 'NES',
        composersMain: ['Koji Kondo'],
        series: ['Mario'],
        coverThumb: '001_supermariobros/cover.jpeg',
    },
}
