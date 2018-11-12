
import React from 'react';
import TimerList from './TimerList';

import Button from '@material-ui/core/Button';
import AddAlarmIcon from '@material-ui/icons/AddAlarm'


import './Startup.css'

class Startup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            timerList: []
        };
    }

    componentDidMount() {
        this.addLongTimer(5);
        this.addShortTimer(2);

        this.addLongTimer(5);
        this.addShortTimer(2);
    }

    addTimer = (seconds) => {

        if (isNaN(seconds)) {
            seconds = 5;
        }

        var newTimer = {
            runningTime: seconds * 1000,
            originalTime: seconds * 1000,
            isRunning: false,
            isComplete: false,
        }

        this.setState((prevState => {
            return {
                timerList: prevState.timerList.concat(newTimer)
            };
        }));
    }

    addShortTimer = () => {
        this.addTimer(3);
    }

    addLongTimer = () => {
        this.addTimer(5);
    }


    render() {

        return (
            <div className="App">
                <h1>Pomodoro Timer</h1>

                <TimerList timerList={this.state.timerList} />

                <Button
                    onClick={this.addLongTimer}
                    variant="extendedFab"
                    className="button addTimer">
                    <AddAlarmIcon />
                    Long timer
                </Button>

                <Button
                    onClick={this.addShortTimer}
                    variant="extendedFab"
                    className="button addTimer">
                    <AddAlarmIcon />
                    Short timer
                </Button>
            </div>
        );
    }
}

Startup.propTypes = {
};

Startup.defaultProps = {
};

export default Startup;
