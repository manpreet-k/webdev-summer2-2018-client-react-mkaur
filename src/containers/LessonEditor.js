import React from 'react';

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

                <div className="row">
                    <div className="col-4">
                        <h1>Topics</h1>
                        <h2> courseId={this.props.match.params.courseId}</h2>
                        <h3> moduleId={this.props.match.params.moduleId}</h3>
                        <h4> lessonId={this.props.match.params.lessonId}</h4>
                    </div>
                </div>

        );
    }
}

export default LessonEditor;