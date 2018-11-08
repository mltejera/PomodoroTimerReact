
import React from 'react';
//import { withRouter } from 'react-router-dom';
import Stopwatch from './Stopwatch';

class Startup extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Stopwatch</h1>
                <Stopwatch
                    isRunning={false}
                    runningTime={0} />
            </div>
        );
    }
}

Startup.propTypes = {
};

Startup.defaultProps = {
};

export default Startup;
