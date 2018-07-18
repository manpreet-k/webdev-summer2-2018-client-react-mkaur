let _singleton = Symbol();
const COURSE_API_URL = 'http://localhost:8080/api/course';
const MODULE_API_URL = 'http://localhost:8080/api/module';

class ModuleServiceClient
{
    constructor(singletonToken)
    {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance()
    {
        if (!this[_singleton]) this[_singleton] = new ModuleServiceClient(_singleton);
        return this[_singleton]
    }

    createModule(cid, module) {
        var moduleStr = JSON.stringify(module);
        return fetch(COURSE_API_URL + '/' + cid + '/module', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: moduleStr,
            'credentials': 'include'
        })
            .then(function(response) {
                return response.json();
            });
    }

    deleteModule(id) {
        return fetch(MODULE_API_URL + '/' + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            'credentials': 'include'
        })
            .then(function(response){
                return response;
            });
    }

    findAllModules() {
        return fetch(MODULE_API_URL, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function(response) {
                return response.json();
            });
    }

    findModuleById(id) {
        return fetch(MODULE_API_URL + '/' + id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function(response) {
                return response.json();
            });
    }

    findAllModulesForCourse(id, callback) {
        return fetch(COURSE_API_URL + '/' + id + '/module', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function(response) {
                return response.json();
            });
    }

    updateModule(id, module) {
        var moduleStr = JSON.stringify(module);
        return fetch(MODULE_API_URL + '/' + id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: moduleStr
        })
            .then(function(response) {
                return response.json();
            });
    }
}

export default ModuleServiceClient;