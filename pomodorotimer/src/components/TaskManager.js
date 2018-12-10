import React from 'react'

import TaskItem from './TaskItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import './TaskManager.css'

export default class TaskManager extends React.Component {
    constructor() {
        super()
        this.state = {
            newTaskName: '',
            taskList: []
        }
    }

    componentDidMount() {
        this.addTask("Hit Snooze")
        this.addTask("Get out of bed")
        this.addTask("Shower")
        this.addTask("Shave")
        this.addTask("Brush teeth")
        this.addTask("Eat")
    }

    addTask(newTaskName) {
        if (!newTaskName) {
            return
        }

        this.setState((state) => ({
            taskList: state.taskList.concat(newTaskName),
            newTaskName: ''
        }))
    }

    onTextChanged = (e) => {
        e.stopPropagation()

        this.setState({ newTaskName: e.target.value })
    }

    onSubmitClick = (e) => {
        e.stopPropagation()

        this.addTask(this.state.newTaskName)
    }

    render() {
        return (
            <div className="taskManagerPanel">
                <h2>Tasks</h2>
                <div className="taskList">
                    {renderTaskList(this.state.taskList)}
                </div>
                <div className="additorPanel">
                    <TextField
                        className="newTaskName"
                        value={this.state.newTaskName}
                        onChange={this.onTextChanged}
                        placeholder='New Task Name' />
                    <div className="submit">
                        <Button
                            disabled={!this.state.newTaskName}
                            onClick={this.onSubmitClick}
                            variant="fab"
                            color="primary"
                        >
                            <AddIcon />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

function renderTaskList(taskList) {
    if (!taskList) {
        return
    }

    return taskList.map((task, index) => (
        <TaskItem
            key={index}
            taskName={task} />
    ))
}
