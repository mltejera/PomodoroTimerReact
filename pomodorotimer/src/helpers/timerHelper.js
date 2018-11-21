export const SECONDS_IN_A_MINUTE = 60
export const MILISECONDS_IN_A_SECOND = 1000

export function secondsToMinutesAndSeconds(seconds) {

    const minutes = Math.floor(seconds / SECONDS_IN_A_MINUTE)
    const trimmedSeconds = (seconds % SECONDS_IN_A_MINUTE).toFixed(0)

    if (trimmedSeconds < 10) {
        const displaySeconds = ['0', seconds].join('')

        return [minutes, displaySeconds].join(':')
    }
    return [minutes, trimmedSeconds].join(':')
}