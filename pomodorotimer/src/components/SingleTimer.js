import React from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import StartIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import RefreshIcon from '@material-ui/icons/Refresh'
import DoneIcon from '@material-ui/icons/Done'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

import IconButton from './IconButton'

import { MILLISECONDS_IN_A_SECOND, secondsToMinutesAndSeconds } from '../helpers/timerHelper'

import Styles from './SingleTimer'

const TIMER_STEP = 1

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

        if (this.state.runningTime <= 0) {
            this.completeTimer()
            return
        }

        const runningTime = this.state.runningTime - TIMER_STEP
        this.setState({ runningTime })
        window.setTimeout(this.onTimerTick, MILLISECONDS_IN_A_SECOND)
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

            window.setTimeout(this.onTimerTick, MILLISECONDS_IN_A_SECOND)
        }
    }

    onResetTimerClick = (e) => {
        e.stopPropagation()

        this.setState({
            runningTime: this.state.originalTime,
            isRunning: false,
            isComplete: false
        })
    }

    // If you define an instance method with an arrow function:
    //
    // handleAddClick = () => { ... }
    //
    // Then Babel will do the "right" thing w.r.t. `this`....i.e. `this`
    // will be available inside the function.
    //
    // HOWEVER, when you invoke another function as we're doing here, you
    // don't get the automagical `this` binding, so you have to do it
    // manually.
    handleAddClick = changeRunningTime.call(this, TIMER_STEP)

    handleSubtractClick = changeRunningTime.call(this, -TIMER_STEP)

    render() {
        return (
            <div>
                {statusIcon(this.state.isRunning, this.state.isComplete)}

                <h1>{secondsToMinutesAndSeconds(this.state.runningTime)}</h1>

                <Button
                    onClick={this.onStartStopTimerClick}
                    disabled={this.state.isComplete}
                    variant="fab"
                    color="primary"
                    className={Styles.startStopButton}
                    aria-label="Start Stop"
                >
                    {pauseStartIcon(this.state.isRunning)}
                </Button>

                <Button
                    onClick={this.onResetTimerClick}
                    variant="fab"
                    color="secondary"
                    className={Styles.startStopButton}
                    aria-label="Reset"
                >
                    <RefreshIcon />
                </Button>

                <IconButton
                    onClick={this.handleAddClick}
                    ariaLabel="Add Second"
                    icon={<AddIcon />} />

                <IconButton
                    onClick={this.handleSubtractClick}
                    ariaLabel="Remove Second"
                    icon={<RemoveIcon />} />
            </div >
        )
    }
}

function statusIcon(isRunning, isComplete) {
    if (isRunning) {
        return <CircularProgress className={Styles.progressSpinner} />
    } else if (isComplete) {
        return <DoneIcon className={Styles.doneIcon} />
    }
}

function pauseStartIcon(isRunning) {
    if (isRunning) {
        return <PauseIcon />
    }

    return <StartIcon />
}

function changeRunningTime(changeAmount) {
    return () => {
        if ( this.state.runningTime <= 0 ) {
            return
        }

        this.setState({
            runningTime: this.state.runningTime + changeAmount
        })
    }
}
