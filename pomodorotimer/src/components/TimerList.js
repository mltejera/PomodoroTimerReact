import React from 'react'

import Button from '@material-ui/core/Button'
import AddAlarmIcon from '@material-ui/icons/AddAlarm'

import SingleTimer from './SingleTimer'

const LONG_TIME = 5
const SHORT_TIME = 2

export default class TimerList extends React.Component {
    constructor() {
        super()
        this.state = {
            timerList: []
        }
    }

    componentDidMount() {
        this.addTimer(LONG_TIME)
        this.addTimer(SHORT_TIME)

        this.addTimer(LONG_TIME)
        this.addTimer(SHORT_TIME)
    }

    addTimer(seconds) {

        const newTimer = {
            runningTime: seconds,
            originalTime: seconds,
            isRunning: false,
            isComplete: false,
        }

        this.setState((prevState => {
            return {
                timerList: prevState.timerList.concat(newTimer)
            }
        }))
    }

    onAddShortTimerClick = (e) => {
        e.stopPropagation()

        this.addTimer(SHORT_TIME)
    }

    onAddLongTimerClick = (e) => {
        e.stopPropagation()

        this.addTimer(LONG_TIME)
    }

    render() {

        return (
            <div>
                <h1>Pomodoro Timer</h1>

                {renderTimerList(this.state.timerList)}

                <Button
                    onClick={this.onAddLongTimerClick}
                    variant="extendedFab"
                >
                    <AddAlarmIcon />
                    Long timer
                </Button>

                <Button
                    onClick={this.onAddShortTimerClick}
                    variant="extendedFab"
                >
                    <AddAlarmIcon />
                    Short timer
                </Button>
            </div>
        )
    }
}

function renderTimerList(timerList) {

    if (!timerList) {
        return
    }

    return timerList.map((timer, index) =>
        <SingleTimer
            key={index}
            isRunning={timer.isRunning}
            runningTime={timer.runningTime} />
    )
}