import {API_BASE_URL} from '../common/global';

const convertFormData = async (data) => {
    var formData = new FormData();
    for (var k in data) {
        formData.append(k, data[k]);
    }
    return formData;
}

const AppUtils = {

    //Experience-API-Calls

    ExperienceList: async function () {

        return await fetch(API_BASE_URL + '/admin/getAllExp', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
            .then((response) => {
                setTimeout(() => null, 0);
                return response.json();
            })
    },

    AddExperience: async function (data) {
        console.log(data);
        return await fetch(API_BASE_URL + '/admin/insertExp', {
            method: 'POST',
            headers: {
                'Accept':'*/*'
            },
            body: await convertFormData(data)
        }).then(response =>
            response.json()
                .then(data => ({
                    data: data,
                    status: response.status
                }))
                .then(res => {
                    return res.data
                }))
            .catch((err) => {
                console.log(err)
            })
    },

    EditExperience: async function (data) {
        console.log(data);
        return await fetch(API_BASE_URL + '/admin/updateExp', {
            method: 'POST',
            headers: {
                'Accept':'*/*'
            },
            body: await convertFormData(data)
        })
            .then((response) => {
                setTimeout(() => null, 0);
                console.log(response);
                return response;
            })
            .catch((err) => {
                console.log(err)
            })
    },

    DeleteExperience: async function (data) {
        return fetch(API_BASE_URL + '/admin/deleteExp', {
            method: 'POST',
            headers: {
                'Accept':'*/*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: await data
        })
            .then((response) => {
                setTimeout(() => null, 0);
                console.log(response);
                return response;
            })
            .catch((err) => {
                console.log(err)
            })
    },

    //SubExperience-API-Calls

    SubExperienceList: async function () {

        return await fetch(API_BASE_URL + '/admin/getAllSubExp', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
            .then((response) => {
                setTimeout(() => null, 0);
                return response.json();
            })
    },

    AddSubExperience: async function (data) {
        return await fetch(API_BASE_URL + '/admin/insertSubexp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then((response) => {
                setTimeout(() => null, 0);
                console.log(response.json());
                return response.json();
            })
            .catch((err) => {
                console.log(err)
            })
    },

    EditSubExperience: async function (data) {
        return await fetch(API_BASE_URL + '/admin/updateSubExp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then((response) => {
                setTimeout(() => null, 0);
                console.log(response.json());
                return response.json();
            })
            .catch((err) => {
                console.log('apputil' + err)
            })
    },

    DeleteSubExperience: function (data) {
        return fetch(API_BASE_URL + '/admin/deleteSubExp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then((response) => {
                setTimeout(() => null, 0);
                console.log(response.json());
                return response.json();
            })
            .catch((err) => {
                console.log('apputil' + err)
            })
    },

    //User-API-Calls

    // UserList: async function() {
    //
    //     return await fetch(API_BASE_URL+'/admin/getAllExp', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //     })
    //         .then((response) => {
    //             setTimeout(() => null, 0);
    //             return response.json();
    //         })
    // },

    // ItemsByUser: async function() {
    //
    //     return await fetch(API_BASE_URL+'/admin/getItemsByUser/:userid', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //     })
    //         .then((response) => {
    //             setTimeout(() => null, 0);
    //             return response.json();
    //         })
    // },

    UserBlockUnblock: async function (data) {
        return await fetch(API_BASE_URL + '/admin/blockUnblock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then((response) => {
                setTimeout(() => null, 0);
                console.log(response.json());
                return response.json();
            })
            .catch((err) => {
                console.log(err)
            })
    },

    //promoCode-API-Calls

    promoCodeList: async function () {

        return await fetch(API_BASE_URL + '/admin/getAllPromocodes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
            .then((response) => {
                setTimeout(() => null, 0);
                return response.json();
            })
    },

    AddpromoCode: async function (data) {
        console.log(data);
        return await fetch(API_BASE_URL + '/admin/insertPromocode', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                setTimeout(() => null, 0);
                console.log('AppUtil then--' + response.toString());
                return response.json();
            })
            .catch((err) => {
                console.log('AppUtil err ' + err)
            })
    },

    EditpromoCode: async function (data) {
        return await fetch(API_BASE_URL + '/admin/updatePromocode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then((response) => {
                setTimeout(() => null, 0);
                console.log(response.json());
                return response.json();
            })
            .catch((err) => {
                console.log('apputil' + err)
            })
    },

    DeletepromoCode: function (data) {
        return fetch(API_BASE_URL + '/admin/deletePromocode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then((response) => {
                setTimeout(() => null, 0);
                console.log(response.json());
                return response.json();
            })
            .catch((err) => {
                console.log('apputil' + err)
            })
    }

};

module.exports = AppUtils;