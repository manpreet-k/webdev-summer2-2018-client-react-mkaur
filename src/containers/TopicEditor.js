import React from 'react';
import TopicServiceClient from "../services/TopicServiceClient";

export  default  class TopicEditor extends React.Component {

    constructor() {
        super();
        this.topicService = TopicServiceClient.instance;
        this.getTitle = this.getTitle.bind(this);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: ''
        };
    }

    getTitle(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.getTitle(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.getTitle(newProps.match.params.courseId);
    }

render() {
        return (

                <div className="row">
                    <div className="col-4">
                        {/*<h1>{this.props.match.params.courseId} {this.props.match.params.lessonId}</h1>*/}

                    </div>
                </div>

        );
    }
}