import React from 'react';
import {Link} from 'react-router-dom';

export default class ModuleListItem extends React.Component {
    render() {
        return (
            <li className="wbdv-module-list-item list-group-item">
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
        );
    }
}