import React from 'react';
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

            <div className="row">
                <div className="col-4">
                    <h2>Lessons</h2>
                    <h2> courseId={this.props.match.params.courseId}</h2>
                    <h2>moduleId={this.props.match.params.moduleId}</h2>
                </div>

            </div>


        );
    }
}

export default ModuleEditor;