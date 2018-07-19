import React from 'react';
import LessonServiceClient from '../services/LessonServiceClient';
import LessonTabItem from '../components/LessonTabItem';

export default class LessonTabs extends React.Component {
    constructor(props) {
        super();
        this.state = {
            lessonId: '',
            moduleId: '',
            courseId: '',
            lesson: {title: ''},
            lessons: []
        };

        this.lessonService = LessonServiceClient.instance;
        this.setLessons = this.setLessons.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setLessonTitle(event) {
        this.setState({lesson: {title: event.target.value}})
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
        this.findAllLessonsForModule(this.props.courseId, this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId);
    }

    findAllLessonsForModule(courseId, moduleId) {
        this.lessonService.findAllLessonsForModule(courseId, moduleId).then((lessons) => {
            this.setLessons(lessons)
        });
    }

    setLessons(lessons) {
        this.setState({lessons: lessons})
    }

    createLesson() {
        this.lessonService.createLesson(this.state.courseId, this.state.moduleId, this.state.lesson).then(() => {
            this.findAllLessonsForModule(this.state.courseId, this.state.moduleId);
        });
    }

    deleteLesson(lessonId) {
        var input = window.confirm("Are you sure you want to delete this lesson?");
        if (input === true) {
            this.lessonService.deleteLesson(lessonId).then(() => {
                this.findAllLessonsForModule(this.state.courseId, this.state.moduleId)
            });
        }
    }

    updateLesson(lessonId, lesson) {
        this.lessonService.updateLesson(lessonId, lesson).then(() => {
            this.findAllLessonsForModule(this.state.courseId, this.state.moduleId)
        });
    }

    renderLessons() {
        let lessons = this.state.lessons.map((lesson) => {
            return <LessonTabItem key={lesson.id}
                                  lesson={lesson}
                                  courseId={this.state.courseId}
                                  moduleId={this.state.moduleId}
                                  delete={this.deleteLesson}
                                  update={this.updateLesson}/>
        });
        return lessons;
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg justify-content-between">
                    <ul className="nav nav-tabs">
                        {this.renderLessons()}
                        <li className="nav-item">
                            <div className="form-row">
                                <span className="col-11">
                                    <input onChange={this.setLessonTitle}
                                           value={this.state.lesson.title}
                                           placeholder="New Lesson Name"
                                           className="form-control"/>

                                </span>
                                <span className="col-1">
                                    <i className="fa fa-plus" onClick={this.createLesson}/>
                                </span>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}