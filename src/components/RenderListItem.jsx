import React, { Component } from 'react';


class RenderListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { label, value } = this.props;
        return (
            <div style={{ display: 'flex' }}>
                <p>{label}:  </p>
                <p>{value}</p>
            </div>
        );
    }
}

export default RenderListItem;