import React from 'react'

import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'

export default function TaskItem(props) {
    return (
        <div className="taskItem">
            <TextField value={props.taskName} />
            <Checkbox />
        </div>
    )
}
