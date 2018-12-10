import React from 'react'

import Button from '@material-ui/core/Button'

export default class IconButton extends React.Component {
    onClick = (e) => {
        e.stopPropagation()
        this.props.onClick()
    }

    render() {
        return (
            <Button
                onClick={this.onClick}
                variant="fab"
                aria-label={this.props.ariaLabel}
            >
                {this.props.icon}
            </Button >
        )
    }
}
