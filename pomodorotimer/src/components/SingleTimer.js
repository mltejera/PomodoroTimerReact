import React from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import StartIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import DoneIcon from '@material-ui/icons/Done'

import Styles from './SingleTimer.css'
import { MillisToMinutesAndSeconds } from '../helpers/timerHelper.js'

const ONE_SECOND = 1000

export default class SingleTimer extends React.Component {
    state = {
        isRunning: false,
        runningTime: this.props.runningTime,
        isComplete: false,
        originalTime: this.props.runningTime
    }

    startStopTimerOnClick = (e) => {
        e.stopPropagation()

        this.setState(state => {
            if (this.state.isRunning) {
                this.setState({
                    isRunning: false
                })
            } else {
                setTimeout(this.timerTick, ONE_SECOND)
                this.setState({ isRunning: true })
            }
        })
    }

    timerTick = () => {

        if (this.state.runningTime >= ONE_SECOND && this.state.isRunning) {
            const newTime = this.state.runningTime - ONE_SECOND

            this.setState({ runningTime: newTime })

            // set another timerTick
            window.setTimeout(this.timerTick, ONE_SECOND);
        } else if (this.state.runningTime < ONE_SECOND) {
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

    resetTimerOnClick = (e) => {
        e.stopPropagation()

        clearInterval(this.timer)
        this.setState({
            runningTime: this.state.originalTime,
            isRunning: false,
            isComplete: false
        })
    }

    addMinuteOnClick = (e) => {
        e.stopPropagation()

        let newRunningTime = this.state.runningTime + ONE_SECOND

        this.setState({ runningTime: newRunningTime })
    }

    subtractMinuteOnClick = (e) => {
        e.stopPropagation()

        if (this.state.runningTime > 0) {
            let newRunningTime = this.state.runningTime - ONE_SECOND
            this.setState({ runningTime: newRunningTime })
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const { isRunning, runningTime } = this.state

        return (
            <div>
                <div className={Styles.placeHolder}>
                    {this.state.isRunning && <CircularProgress className={Styles.progressSpinner} />}
                    {this.state.isComplete && <DoneIcon className={Styles.doneIcon} />}
                </div>
                <div>
                    <h1>{MillisToMinutesAndSeconds(runningTime)}</h1>

                    <Button
                        onClick={this.startStopTimerOnClick}
                        disabled={this.state.isComplete}
                        variant="fab"
                        color="primary"
                        className={Styles.startStopButton}
                        aria-label="StartStop">
                        {isRunning ?
                            <PauseIcon />
                            :
                            <StartIcon />}
                    </Button>

                    <Button
                        onClick={this.resetTimerOnClick}
                        variant="fab"
                        color="secondary"
                        className={Styles.startStopButton}
                        aria-label="Reset">
                        <RefreshIcon />
                    </Button>

                    <Button
                        onClick={this.addMinuteOnClick}
                        variant="fab"
                        className={Styles.startStopButton}
                        aria-label="Reset">
                        <AddIcon />
                    </Button>

                    <Button
                        onClick={this.subtractMinuteOnClick}
                        variant="fab"
                        className={Styles.startStopButton}
                        aria-label="Reset">
                        <RemoveIcon />
                    </Button>
                </div>
            </div >
        )
    }
}