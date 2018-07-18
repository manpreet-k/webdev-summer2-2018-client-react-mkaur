import React from 'react';
import LessonTabs from "./LessonTabs";
import LessonEditor from "./LessonEditor";
import {BrowserRouter as Router, Route} from 'react-router-dom';

class ModuleEditor extends React.Component {

    constructor() {
        super();
        this.state = {
            courseId: '',
            moduleId: ''
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
                    <div >
                        <LessonTabs courseId={this.props.match.params.courseId}
                                    moduleId={this.props.match.params.moduleId}/>
                        <div>
                        <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                               component={LessonEditor}>
                        </Route>
                        </div>
                    </div>
                </div>
            </Router>

        );
    }
}

export default ModuleEditor;