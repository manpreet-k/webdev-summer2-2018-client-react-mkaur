import React from 'react';
import {Link} from 'react-router-dom';

export default class ModuleListItem extends React.Component {
    render() {
        return (
            <div className="container">
                <li className="wbdv-module-list-item list-group-item list-group-item-primary">
                    <Link
                        to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                        {this.props.module.title}
                    </Link>
                    <span className='float-right'>
                        <i className="fa fa-trash"
                           onClick={() => {
                               this.props.delete(this.props.module.id)
                           }}
                        />
                        &nbsp;&nbsp;&nbsp;
                        <i className="fa fa-pencil"
                           onClick={() => {
                               this.props.update(this.props.module.id, this.props.module)
                           }}
                        />
                    </span>
                </li>
            </div>
        );
    }
}