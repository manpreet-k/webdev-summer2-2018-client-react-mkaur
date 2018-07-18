import React from 'react';
import TopicPills from "./TopicPills";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TopicEditor from "./TopicEditor";

class LessonEditor extends React.Component {

    constructor() {
        super();
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId:''
        };
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
    }

    render() {
        return (
            <Router>
                <div className="form-row">
                    <div className="tab-content">
                        <TopicPills courseId={this.props.match.params.courseId}
                                    moduleId={this.props.match.params.moduleId}
                                    lessonId={this.props.match.params.lessonId}/>
                        <div>
                            <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                                   component={TopicEditor}>
                            </Route>
                        </div>
                    </div>
                </div>
            </Router>

        );
    }
}

export default LessonEditor;