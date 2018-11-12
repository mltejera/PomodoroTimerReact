
import React from 'react';
import SingleTimer from './SingleTimer';
// import TimerList from './TimerList';

import Button from '@material-ui/core/Button';
import AddAlarmIcon from '@material-ui/icons/AddAlarm'
import TimerList from './TimerList';

class Startup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            timerList: []
        };
    }

    addAlarm = (seconds) => {

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

        console.log(this.state.timerList)
    }


    render() {

        return (
            <div className="App">
                <h1>Stopwatch</h1>

                <TimerList timerList={this.state.timerList} />

                <SingleTimer
                    isRunning={false}
                    runningTime={5000} />

                <Button
                    onClick={this.addAlarm}
                    variant="fab"
                    className="button">
                    <AddAlarmIcon />
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
