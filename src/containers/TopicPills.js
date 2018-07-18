import React from 'react';
import TopicServiceClient from '../services/TopicServiceClient';
import TopicPillItem from '../components/TopicPillItem';

export default class TopicPills extends React.Component {
    constructor(props) {
        super();
        this.state = {
            lessonId: '',
            moduleId: '',
            courseId: '',
            topic: {title: ''},
            topics: []
        };

        this.topicService = TopicServiceClient.instance;
        this.setTopics = this.setTopics.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.setTopicTitle = this.setTopicTitle.bind(this);
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    setTopicTitle(event) {
        this.setState({topic: {title: event.target.value}})
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
        this.setLessonId(this.props.lessonId);
        this.findAllTopicsForLesson(this.props.courseId, this.props.moduleId, this.props.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.courseId, newProps.moduleId, newProps.lessonId);
    }

    findAllTopicsForLesson(courseId, moduleId, lessonId) {
        this.topicService.findAllTopicsForLesson(courseId, moduleId, lessonId).then((topics) => {
            this.setTopics(topics);
        });
    }

    setTopics(topics) {
        this.setState({topics: topics})
    }

    createTopic() {
        this.topicService.createTopic(this.state.courseId,
            this.state.moduleId, this.state.lessonId, this.state.topic).then(() => {
            this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId);
        });
    }

    deleteTopic(topicId) {
        this.topicService.deleteTopic(topicId).then(() => {
            this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId, this.state.lessonId)
        });
    }

    updateTopic(topicId, topic) {
        this.topicService.updateTopic(topicId, topic).then(() => {
            this.findAllTopicsForLesson(this.state.courseId, this.state.moduleId)
        });
    }

    renderTopics() {
        let topics = this.state.topics.map((topic) => {
            return <TopicPillItem key={topic.id}
                                 topic={topic}
                                 courseId={this.state.courseId}
                                 moduleId={this.state.moduleId}
                                 lessonId={this.state.lessonId}
                                 delete={this.deleteTopic}
                                 update={this.updateTopic}/>
        });
        return topics;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="form-row">
                    <span className="col-11">
                    <input onChange={this.setTopicTitle}
                           value={this.state.topic.title}
                           placeholder="New Topic Name"
                           className="form-control"/>

                    </span>
                    <span className="col-1">
                    <i className="fa fa-plus-circle" onClick={this.createTopic}/>
                        </span>
                </div>

                <nav className="navbar navbar-expand-lg navbar-dark bg-light justify-content-between">
                    <ul className="nav nav-pills nav-justified">
                        {this.renderTopics()}
                    </ul>
                </nav>
            </div>
        );
    }
}