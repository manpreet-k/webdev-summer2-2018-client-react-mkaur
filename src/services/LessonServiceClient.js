let _singleton = Symbol();
const COURSE_API_URL = 'https://webdev-summer2-2018-mkaur.herokuapp.com/api/course';
const LESSON_API_URL = 'https://webdev-summer2-2018-mkaur.herokuapp.com/api/lesson';

class LessonServiceClient
{
    constructor(singletonToken)
    {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance()
    {
        if (!this[_singleton]) this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    }

    createLesson(cid, mid, lesson) {
        var lessonStr = JSON.stringify(lesson);
        return fetch(COURSE_API_URL + '/' + cid + '/module/' + mid + '/lesson', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: lessonStr
        })
            .then(function(response) {
                return response.json();
            });
    }

    deleteLesson(id) {
        return fetch(LESSON_API_URL + '/' + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function(response){
                return response;
            });
    }

    findAllLessons() {
        return fetch(LESSON_API_URL, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function(response) {
                return response.json();
            });
    }

    findLessonById(id) {
        return fetch(LESSON_API_URL + '/' + id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function(response) {
                return response.json();
            });
    }

    findAllLessonsForModule(cid, mid) {
        return fetch(COURSE_API_URL + '/' + cid + '/module/' + mid + '/lesson', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function(response) {
                return response.json();
            });
    }

    updateLesson(id, lesson) {
        var lessonStr = JSON.stringify(lesson);
        return fetch(LESSON_API_URL + '/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: lessonStr
        })
            .then(function(response) {
                return response.json();
            });
    }
}

export default LessonServiceClient;