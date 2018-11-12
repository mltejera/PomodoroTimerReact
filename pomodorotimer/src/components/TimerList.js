
import React from 'react';
import SingleTimer from './SingleTimer';


class TimerList extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {

        let singleTimerArray = [];

        if (this.props.timerList) {
            singleTimerArray = this.props.timerList.map((timer, index) => {
                return <SingleTimer
                    key={index}
                    isRunning={timer.isRunning}
                    runningTime={timer.runningTime} />
            });
        }


        console.log(singleTimerArray);

        return (
            <div className="App">
                {singleTimerArray}
            </div>
        );
    }

}

TimerList.propTypes = {
};

TimerList.defaultProps = {
};

export default TimerList;
