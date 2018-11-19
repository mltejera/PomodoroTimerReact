const MILISECONDS_IN_A_MINUTE = 60000
const MILISECONDS_IN_A_SECOND = 1000

function millisToMinutesAndSeconds(millis) {

    const minutes = Math.floor(millis / MILISECONDS_IN_A_MINUTE)
    let seconds = ((millis % MILISECONDS_IN_A_MINUTE) / MILISECONDS_IN_A_SECOND).toFixed(0)

    if (seconds < 10) {
        seconds = ['0', seconds].join('')
    }

    return [minutes, seconds].join(':')
}

module.exports = {
    MILISECONDS_IN_A_SECOND,
    millisToMinutesAndSeconds
}