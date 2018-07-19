import React from 'react';

export default class TopicPillItem extends React.Component {

    render() {
        return (
            <li className="nav-item">
                {this.props.topic.title}
            </li>
        );
    }
}