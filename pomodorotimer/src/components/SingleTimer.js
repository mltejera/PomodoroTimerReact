import React from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import StartIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import DoneIcon from '@material-ui/icons/Done'

import timerHelper from '../helpers/timerHelper'

import Styles from './SingleTimer'

export default class SingleTimer extends React.Component {
    state = {
        isRunning: false,
        runningTime: this.props.runningTime,
        isComplete: false,
        originalTime: this.props.runningTime
    }

    timerTick = () => {

        if (this.state.runningTime >= timerHelper.MILISECONDS_IN_A_SECOND && this.state.isRunning) {
            const newTime = this.state.runningTime - timerHelper.MILISECONDS_IN_A_SECOND

            this.setState({ runningTime: newTime })

            // set another timerTick
            window.setTimeout(this.timerTick, timerHelper.MILISECONDS_IN_A_SECOND);
        } else if (this.state.runningTime < timerHelper.MILISECONDS_IN_A_SECOND) {
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

        this.setState(state => {
            if (this.state.isRunning) {
                this.setState({
                    isRunning: false
                })
            } else {
                setTimeout(this.timerTick, timerHelper.MILISECONDS_IN_A_SECOND)
                this.setState({ isRunning: true })
            }
        })
    }

    resetTimerOnClick = (e) => {
        e.stopPropagation()

        this.setState({
            runningTime: this.state.originalTime,
            isRunning: false,
            isComplete: false
        })
    }

    onAddMinuteClick = (e) => {
        e.stopPropagation()

        let newRunningTime = this.state.runningTime + timerHelper.MILISECONDS_IN_A_SECOND

        this.setState({ runningTime: newRunningTime })
    }

    onSubtractMinuteClick = (e) => {
        e.stopPropagation()

        if (this.state.runningTime > 0) {
            let newRunningTime = this.state.runningTime - timerHelper.MILISECONDS_IN_A_SECOND
            this.setState({ runningTime: newRunningTime })
        }
    }

    ControlButton = (onClick, icon, ariaLabel) => {
        return (
            <Button
                onClick={onClick}
                variant="fab"
                className={Styles.startStopButton}
                aria-label={ariaLabel} >
                {icon}
            </Button >
        )
    }

    PauseStartIcon = () => {
        if (this.state.isRunning) {
            return <PauseIcon />
        }

        return <StartIcon />
    }

    render() {
        return (
            <div>
                {this.state.isRunning && <CircularProgress className={Styles.progressSpinner} />}
                {this.state.isComplete && <DoneIcon className={Styles.doneIcon} />}

                <h1>{timerHelper.millisToMinutesAndSeconds(this.state.runningTime)}</h1>

                <Button
                    onClick={this.onStartStopTimerClick}
                    disabled={this.state.isComplete}
                    variant="fab"
                    color="primary"
                    className={Styles.startStopButton}
                    aria-label="StartStop">
                    <this.PauseStartIcon />
                </Button>

                <Button
                    onClick={this.resetTimerOnClick}
                    variant="fab"
                    color="secondary"
                    className={Styles.startStopButton}
                    aria-label="Reset">
                    <RefreshIcon />
                </Button>

                {this.ControlButton(this.onAddMinuteClick, <AddIcon />, 'Add second')}

                {this.ControlButton(this.onSubtractMinuteClick, <RemoveIcon />, 'Remove second')}
            </div >
        )
    }
}