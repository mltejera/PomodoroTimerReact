import React from 'react'

import TimerManager from './components/TimerManager'
import TaskManager from './components/TaskManager'

import './App.css'

export default function App() {
    return (
        <div className='mainAppLayout'>
            <h1 className='mainAppTitle'>Mason's Pomodoro Timer</h1>
            <div className='mainAppTimerList'><TimerManager /></div>
            <div className='mainAppTaskList'><TaskManager /></div>
        </div>
    )
}