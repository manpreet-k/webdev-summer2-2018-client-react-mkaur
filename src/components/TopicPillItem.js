import React from 'react';

export default class TopicPillItem extends React.Component {

    render() {
        return (
            <div className="list-group-item">
                <li className="nav-item">
                        {this.props.topic.title}
                </li>
            </div>
        );
    }
}