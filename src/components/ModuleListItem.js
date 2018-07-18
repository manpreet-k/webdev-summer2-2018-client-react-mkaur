import React from 'react';
import {Link} from 'react-router-dom';

export default class ModuleListItem extends React.Component {
    render() {
        return (
            <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                {this.props.module.title}
                <span className='float-right'>
                <i className="fa fa-trash"
                   onClick={() => {
                       this.props.delete(this.props.module.id)
                   }}
                />
                <i className="fa fa-pencil"
                   onClick={() => {
                       this.props.update(this.props.module.id, this.props.module)
                   }}
                />
                </span>
            </Link>);
    }
}