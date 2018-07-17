import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseServiceClient from "../services/CourseServiceClient";


class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseServiceClient.instance;
        this.state = {courses: []};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    courseRows() {
        var rows = this.state.courses.map((course) => {
            return <CourseRow course={course} key={course.id} delete={this.deleteCourse}/>
        });
        return rows;
    }

    titleChanged(event) {
        this.setState({course: {title: event.target.value}});
    }

    createCourse() {
        // add error handling for empty course
        this.courseService.createCourse(this.state.course).then(() => {
            this.findAllCourses();
        });
    }

    deleteCourse(courseId) {
        this.courseService.deleteCourse(courseId);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses().then((courses) => {
            this.setState({courses: courses});
            console.log(courses);
        });
    }


    render() {
        return (
            <div>
                <h2> Course List </h2>
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                    <tr>
                        <th><input id="titleFld" placeholder="cs101" onChange={this.titleChanged}/></th>
                        <th>
                            <button onClick={this.createCourse}>Add</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.courseRows()}
                    </tbody>
                </table>
            </div>)
    }
}

export default CourseList;