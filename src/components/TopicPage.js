import React from 'react';

export default class TopicPage extends React.Component {
    constructor() {
        super();
        this.state = {
            topicId: ''
        };
        this.setTopicId = this.setTopicId.bind(this);
    }

    setTopicId(topicId) {
        this.setState({topicId: topicId});
    }

    componentDidMount() {
        this.setTopicId(this.props.match.params.topicId);
    }

    componentWillReceiveProps(newProps) {
        this.setTopicId(newProps.match.params.topicId);
    }
    render() {
        return (
            <h4>
                {this.state.topicId}
            </h4>
        )
    }
}