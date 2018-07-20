import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleServiceClient from "../services/ModuleServiceClient";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as constants from '../constants/constants';

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
        this.createModuleServiceCall = this.createModuleServiceCall.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    // a little function to help us with reordering the result
    reorder(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }



    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const courses = this.reorder(
            this.state.modules,
            result.source.index,
            result.destination.index
        );

        this.setState({
            courses,
        });
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
        if (undefined === this.state.module || '' === this.state.module.title) {
            this.setState({module: {title: 'New Module'}}, function () {
                this.createModuleServiceCall();
            });
        }
        else this.createModuleServiceCall();
    }

    createModuleServiceCall() {
        this.moduleService.createModule(this.state.courseId, this.state.module).then(() => {
            this.findAllModulesForCourse(this.state.courseId);
        });
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
        let modules = this.state.modules.map((module, index) => {
            return <ModuleListItem key={module.id}
                                   index={index}
                                   courseId={this.state.courseId}
                                   module={module}
                                   delete={this.deleteModule}
                                   update={this.updateModule}
            />
        });
        return modules;
    }

    render() {
        return (
            <div className="wbdv-module-list">
                <h2>&nbsp;&nbsp;&nbsp;&nbsp;Modules for {this.state.courseId}</h2>


                <div className="row">
                    <div className="col-11">
                        <input onChange={this.setModuleTitle}
                               value={this.state.module.title}
                               placeholder="New Module"
                               className="form-control"/>
                    </div>
                    <div className="col-1">
                        <i className="fa fa-plus" onClick={this.createModule}/>
                    </div>
                </div>

                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={constants.getListStyle(snapshot.isDraggingOver)}
                            >
                                {this.renderModules()}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}