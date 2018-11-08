import React, { Component } from 'react';

class Stopwatch extends React.Component {
    state = {
        isRunning: false,
        runningTime: 0
    }

    startStopTimer = () => {
        this.setState(state => {
            if (this.state.isRunning) {
                clearInterval(this.timer);
            } else {
                const startTime = Date.now() - this.state.runningTime;
                this.timer = setInterval(() => {
                    this.setState({ runningTime: Date.now() - startTime })
                });
            }
            return { isRunning: !this.state.isRunning };
        });
    };

    resetTimer = () => {
        clearInterval(this.timer);
        this.setState({ runningTime: 0, isRunning: false });
    };
    render() {

        const { isRunning, runningTime } = this.state;

        return (
            <div>
                <p>{runningTime}ms</p>
                <button onClick={this.startStopTimer}>{isRunning ? 'Stop' : 'Start'}</button>
                <button onClick={this.resetTimer}>Reset</button>
            </div>
        );
    }
}

export default Stopwatch;