import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleServiceClient from "../services/ModuleServiceClient";

export default class ModuleLists extends React.Component {
    constructor(props) {
        super(props);
        this.moduleService = ModuleServiceClient.instance;
        this.state = {
            courseId: '',
            module: {title: ''},
            modules: []
        };
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleTitle(event) {
        this.setState({module: {title: event.target.value}})
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.findAllModulesForCourse(this.props.courseId)
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    findAllModulesForCourse(courseId) {
        this.moduleService.findAllModulesForCourse(courseId).then((modules) => {
            this.setModules(modules)
        });
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    createModule() {
        this.moduleService.createModule(this.state.courseId, this.state.module).then(() => {
            this.findAllModulesForCourse(this.state.courseId);
        });
    }

    deleteModule(moduleId) {
        this.moduleService.deleteModule(moduleId).then(() => {
            this.findAllModulesForCourse(this.state.courseId)
        });
    }

    renderModules() {
        let modules = this.state.modules.map((module) => {
            return <ModuleListItem key={module.id}
                                   courseId={this.state.courseId}
                                   module={module}
                                   delete={this.deleteModule}
                                   update={this.updateModule}/>
        });
        return (<ul>{modules}</ul>)
    }

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <h4>Module List for courseId: {this.state.courseId}</h4>
                    <input value={this.state.module.title}
                           placeholder="New Module"
                           onChange={this.setModuleTitle}/>
                    <button onClick={this.createModule}>Create</button>


                <ul className="list-group">
                    {this.renderModules()}
                </ul>
                </div>
            </div>
        );
    }
}