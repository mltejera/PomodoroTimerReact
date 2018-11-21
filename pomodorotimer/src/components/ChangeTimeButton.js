import React from 'react'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

export default class ChangeTimeButton extends React.Component {

    onButtonClick = (e) => {
        e.stopPropagation()
        this.props.onChangeTimeClick(this.props.changeAmount)
    }

    icon = () => {
        if (this.props.changeAmount > 0) {
            return <AddIcon />
        }

        return <RemoveIcon />
    }

    render() {
        return (
            <Button
                onClick={this.onButtonClick}
                variant="fab"
                aria-label={this.props.ariaLabel}>
                {this.icon()}
            </Button >
        )
    }
}