export const SECONDS_IN_A_MINUTE = 60
export const MILLISECONDS_IN_A_SECOND = 1000

export function secondsToMinutesAndSeconds(totalSeconds) {

    const minutes = Math.floor(totalSeconds / SECONDS_IN_A_MINUTE)
    const seconds = (totalSeconds % SECONDS_IN_A_MINUTE)

    const paddedSeconds = seconds.toString().padStart(2, 0)

    return [minutes, paddedSeconds].join(':')
}