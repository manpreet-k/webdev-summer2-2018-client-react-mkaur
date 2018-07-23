import React from 'react';
import TopicServiceClient from "../services/TopicServiceClient";

export default class TopicPage extends React.Component {
    constructor() {
        super();
        this.state = {
            topicId: '',
            title:''
        };
        this.topicService = TopicServiceClient.instance;
        this.setTopicId = this.setTopicId.bind(this);
    }

    setTopicId(topicId) {
        this.setState({topicId: topicId});
    }

    componentDidMount() {
        this.setTopicId(this.props.match.params.topicId);
        this.findTopicById(this.props.match.params.topicId);
    }

    componentWillReceiveProps(newProps) {
        this.setTopicId(newProps.match.params.topicId);
    }

    findTopicById(topicId){
        this.topicService.findTopicById(topicId).then((topic) => {
            this.setState({title: topic.title});
        });
    }

    render() {
        return (
            <h4 className="wbdv-padding-5">
                {this.state.topicId}&nbsp;{this.state.title}
            </h4>
        )
    }
}