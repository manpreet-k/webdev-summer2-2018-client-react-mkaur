import React from 'react';
import {Link} from 'react-router-dom';

export default class LessonTabItem extends React.Component {

    render() {
        console.log(this.props.lesson.title)
        return (

                <li className="nav-item">
                    <Link
                        to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
                        {this.props.lesson.title}
                    </Link>
                </li>

        );
    }
}