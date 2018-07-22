import React from 'react';
import {Link} from 'react-router-dom';

class CourseRow extends React.Component {

   static getModifiedTime(dateTime){
        return new Date(dateTime).toISOString().slice(0, 19).replace('T', ' ');
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
                    {CourseRow.getModifiedTime(this.props.course.modified)}
                </td>
                <td>
                    <select onChange={()=>this.props.update(this.props.course)}>
                        <option value=""/>
                        <option value="Edit">Edit</option>
                    </select>
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