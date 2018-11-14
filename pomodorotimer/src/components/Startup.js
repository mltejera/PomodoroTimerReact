
import React from 'react'
import SingleTimer from './SingleTimer'

import Button from '@material-ui/core/Button'
import AddAlarmIcon from '@material-ui/icons/AddAlarm'

import Styles from './Startup.css'

const LONG_TIME = 5
const SHORT_TIME = 2

export default class Startup extends React.Component {
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

    addTimer = (seconds) => {

        if (isNaN(seconds)) {
            seconds = LONG_TIME
        }

        let newTimer = {
            runningTime: seconds * 1000,
            originalTime: seconds * 1000,
            isRunning: false,
            isComplete: false,
        }

        this.setState((prevState => {
            return {
                timerList: prevState.timerList.concat(newTimer)
            }
        }))
    }

    addShortTimerOnClick = (e) => {
        e.stopPropagation()

        this.addTimer(SHORT_TIME)
    }

    addLongTimerOnClick = (e) => {
        e.stopPropagation()

        this.addTimer(LONG_TIME)
    }

    timerList = () => {
        let singleTimerArray = []

        if (this.state.timerList) {
            singleTimerArray = this.state.timerList.map((timer, index) =>
                <SingleTimer
                    key={index}
                    isRunning={timer.isRunning}
                    runningTime={timer.runningTime} />
            )
        }

        return singleTimerArray
    }

    render() {
        return (
            <div className="App">
                <h1>Pomodoro Timer</h1>

                <this.timerList />

                <Button
                    onClick={this.addLongTimerOnClick}
                    variant="extendedFab"
                    className={Styles.addTimer}>
                    <AddAlarmIcon />
                    Long timer
                </Button>

                <Button
                    onClick={this.addShortTimerOnClick}
                    variant="extendedFab"
                    className={Styles.addTimer}>
                    <AddAlarmIcon />
                    Short timer
                </Button>
            </div>
        )
    }
}