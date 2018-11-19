
import React from 'react'

import Button from '@material-ui/core/Button'
import AddAlarmIcon from '@material-ui/icons/AddAlarm'

import SingleTimer from './SingleTimer'
import timerHelper from '../helpers/timerHelper'

import Styles from './TimerList'

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

    addTimer = (seconds = LONG_TIME) => {

        const newTimer = {
            runningTime: seconds * timerHelper.MILISECONDS_IN_A_SECOND,
            originalTime: seconds * timerHelper.MILISECONDS_IN_A_SECOND,
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

    renderTimerList = (timerList) => {

        if (!timerList) {
            // empty timer list, eject! eject!
            return
        }

        return timerList.map((timer, index) =>
            <SingleTimer
                key={index}
                isRunning={timer.isRunning}
                runningTime={timer.runningTime} />
        )
    }

    render() {
        return (
            <div>
                <h1>Pomodoro Timer</h1>

                {this.renderTimerList(this.state.timerList)}

                <Button
                    onClick={this.onAddLongTimerClick}
                    variant="extendedFab"
                    className={Styles.addTimer}>
                    <AddAlarmIcon />
                    Long timer
                </Button>

                <Button
                    onClick={this.onAddShortTimerClick}
                    variant="extendedFab"
                    className={Styles.addTimer}>
                    <AddAlarmIcon />
                    Short timer
                </Button>
            </div>
        )
    }
}