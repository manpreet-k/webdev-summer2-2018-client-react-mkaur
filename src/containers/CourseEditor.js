import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ModuleLists from './ModuleLists';
import ModuleEditor from './ModuleEditor';

class CourseEditor extends React.Component {

    constructor() {
        super();
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {courseId: ''};
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
    }

    render() {
        return (
            <Router>
            <div className="row">
                <div className="col-md-6">
                    <ModuleLists courseId={this.props.match.params.courseId}/></div>
                <div className="col-6">
                    <Route path="/course/:courseId/module/:moduleId"
                           component={ModuleEditor}>
                    </Route>
                </div>
            </div>
            </Router>

        );
    }
}

export default CourseEditor;