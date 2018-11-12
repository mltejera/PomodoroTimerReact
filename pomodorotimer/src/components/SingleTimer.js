import React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import StartIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';


import './SingleTimer.css'

const ONE_SECOND = 1000;


class SingleTimer extends React.Component {
    state = {
        isRunning: false,
        runningTime: this.props.runningTime,
        isComplete: false,
        originalTime: this.props.runningTime
    }

    startStopTimer = () => {
        this.setState(state => {
            if (this.state.isRunning) {
                clearInterval(this.timer);
            } else {
                this.timer = setInterval(this.timerTick, ONE_SECOND);
                this.setState({ isComplete: false });
            }
            return { isRunning: !this.state.isRunning };
        });
    };

    timerTick = () => {
        console.log('tick');

        if (this.state.runningTime >= ONE_SECOND) {
            var newTime = this.state.runningTime - ONE_SECOND;

            this.setState({ runningTime: newTime })
        } else {
            this.completeTimer();
        }
    }

    completeTimer = () => {
        this.setState({
            isRunning: false,
            runningTime: 0,
            isComplete: true
        })

        clearInterval(this.timer);
    }

    resetTimer = () => {
        clearInterval(this.timer);
        this.setState({ runningTime: this.state.originalTime, isRunning: false });
    };

    addMinute = () => {
        var newRunningTime = this.state.runningTime + 1000;

        this.setState({ runningTime: newRunningTime })
    }

    subtractMinute = () => {

        if (this.state.runningTime >= 1000) {
            var newRunningTime = this.state.runningTime - 1000;
            this.setState({ runningTime: newRunningTime });
        }
    }

    millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {

        const { isRunning, runningTime } = this.state;

        return (
            <div className="someId">
                <h1>{this.millisToMinutesAndSeconds(runningTime)}</h1>
                {this.state.isRunning && <CircularProgress className="fabProgress" />}
                {this.state.isComplete && <DoneIcon className="fabProgress" />}
                <Button
                    onClick={this.startStopTimer}
                    variant="fab"
                    color="primary"
                    className="startStop-Button"
                    aria-label="StartStop">
                    {isRunning ?
                        <PauseIcon />
                        :
                        <StartIcon />}
                </Button>

                <Button
                    onClick={this.resetTimer}
                    variant="fab"
                    color="secondary"
                    className="startStop-Button"
                    aria-label="Reset">
                    <RefreshIcon />
                </Button>

                <Button
                    onClick={this.addMinute}
                    variant="fab"
                    className="startStop-Button"
                    aria-label="Reset">
                    <AddIcon />
                </Button>

                <Button
                    onClick={this.subtractMinute}
                    variant="fab"
                    className="startStop-Button"
                    aria-label="Reset">
                    <RemoveIcon />
                </Button>
                {/* <Button
                    onClick={this.resetTimer}
                    variant="fab"
                    className="startStop-Button"
                    aria-label="Reset">
                    <DeleteIcon />
                </Button> */}
            </div>
        );
    }
}

export default SingleTimer;