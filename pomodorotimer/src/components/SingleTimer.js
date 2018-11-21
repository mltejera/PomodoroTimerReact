import React from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import StartIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import RefreshIcon from '@material-ui/icons/Refresh'
import DoneIcon from '@material-ui/icons/Done'

import ChangeTimeButton from './ChangeTimeButton'

import { MILISECONDS_IN_A_SECOND, secondsToMinutesAndSeconds } from '../helpers/timerHelper'

import Styles from './SingleTimer'

const ONE = 1
const NEGATIVE_ONE = -1

export default class SingleTimer extends React.Component {
    state = {
        isRunning: false,
        runningTime: this.props.runningTime,
        isComplete: false,
        originalTime: this.props.runningTime
    }

    onTimerTick = () => {

        if (!this.state.isRunning) {
            return
        }

        if (this.state.runningTime > 0) {
            const newTime = this.state.runningTime - ONE

            this.setState({ runningTime: newTime })

            // set up another timerTick
            window.setTimeout(this.onTimerTick, MILISECONDS_IN_A_SECOND)

        } else {
            this.completeTimer()
        }
    }

    completeTimer = () => {
        this.setState({
            isRunning: false,
            runningTime: 0,
            isComplete: true
        })
    }

    onStartStopTimerClick = (e) => {
        e.stopPropagation()

        if (this.state.isRunning) {
            this.setState({ isRunning: false })
        } else {
            this.setState({ isRunning: true })

            window.setTimeout(this.onTimerTick, MILISECONDS_IN_A_SECOND)
        }
    }

    resetTimerOnClick = (e) => {
        e.stopPropagation()

        this.setState({
            runningTime: this.state.originalTime,
            isRunning: false,
            isComplete: false
        })
    }

    onAddSecondClick = (changeAmountInSeconds) => {

        // don't let it go negative
        if (changeAmountInSeconds < 0 && this.state.runningTime <= 0) {
            return
        }

        const newRunningTime = this.state.runningTime + changeAmountInSeconds

        this.setState({ runningTime: newRunningTime })
    }

    pauseStartIcon = () => {
        if (this.state.isRunning) {
            return <PauseIcon />
        }

        return <StartIcon />
    }

    statusIcon = () => {
        if (this.state.isRunning) {
            return <CircularProgress className={Styles.progressSpinner} />
        } else if (this.state.isComplete) {
            return <DoneIcon className={Styles.doneIcon} />
        }
    }

    render() {
        return (
            <div>
                {this.statusIcon()}

                <h1>{secondsToMinutesAndSeconds(this.state.runningTime)}</h1>

                <Button
                    onClick={this.onStartStopTimerClick}
                    disabled={this.state.isComplete}
                    variant="fab"
                    color="primary"
                    className={Styles.startStopButton}
                    aria-label="StartStop">
                    {this.pauseStartIcon()}
                </Button>

                <Button
                    onClick={this.resetTimerOnClick}
                    variant="fab"
                    color="secondary"
                    className={Styles.startStopButton}
                    aria-label="Reset">
                    <RefreshIcon />
                </Button>

                <ChangeTimeButton
                    onChangeTimeClick={this.onAddSecondClick}
                    changeAmount={ONE}
                    ariaLabel="Add Second" />

                <ChangeTimeButton
                    onChangeTimeClick={this.onAddSecondClick}
                    changeAmount={NEGATIVE_ONE}
                    ariaLabel="Remove Second" />
            </div >
        )
    }
}