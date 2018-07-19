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
        this.setState({module: {title: event.target.value}});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.findAllModulesForCourse(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
    }

    findAllModulesForCourse(courseId) {
        this.moduleService.findAllModulesForCourse(courseId).then((modules) => {
            this.setModules(modules)
        });
    }

    setModules(modules) {
        this.setState({module: {title: ''}});
        this.setState({modules: modules})
    }

    createModule() {
        if(undefined === this.state.module){
            this.setState({module: {title: 'New Module Name'}}, function () {
                this.moduleService.createModule(this.state.courseId, this.state.module).then(() => {
                    this.findAllModulesForCourse(this.state.courseId);
                });
            });
        }
    }

    deleteModule(moduleId) {
        var input = window.confirm("Are you sure you want to delete this module?");
        if (input === true) {
            this.moduleService.deleteModule(moduleId).then(() => {
                this.findAllModulesForCourse(this.state.courseId)
            });
        }
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
            <div className="container">
                <div className="form-row">
                    <div className="col-12">
                        <h4>Modules for {this.state.courseId}</h4>
                    </div>
                </div>
                <div className="form-row">
                    <span className="col-11">
                    <input onChange={this.setModuleTitle}
                           value={this.state.module.title}
                           placeholder="New Lesson Name"
                           className="form-control"/>

                    </span>
                    <span className="col-1">
                    <i className="fa fa-plus" onClick={this.createModule}/>
                        </span>
                </div>
                <div className="form-row">
                    <div className="col-12">
                    <ul className="list-group">
                        {this.renderModules()}
                    </ul>
                    </div>
                </div>
            </div>
        );
    }
}