import React from 'react'

import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'

export default class TaskItem extends React.Component {
    render() {

        return (
            <div>
                <TextField
                    value={this.props.taskName} />
                <Checkbox />
            </div>
        )
    }
}