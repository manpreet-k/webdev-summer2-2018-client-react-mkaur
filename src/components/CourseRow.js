import React from 'react';
import {Link} from 'react-router-dom';

class CourseRow extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    getModifiedTime(dateTime){
        return new Date(dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    render() {
        return (
            <tr>
                <td>
                    <Link to=
                              {`/course/${this.props.course.id}`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td>
                    me
                </td>
                <td>
                    {this.getModifiedTime(this.props.course.modified)}
                </td>
                <td>
                    <i onClick={() => {
                        this.props.update(this.props.course, this.props.course.id)
                    }} className="fa fa-pencil" >

                    </i>
                </td>
                <td>
                </td>
                <td>
                    <i onClick={() => {
                        this.props.delete(this.props.course.id)
                    }} className="fa fa-trash" >

                    </i>

                </td>
            </tr>)
    }
}

export default CourseRow;