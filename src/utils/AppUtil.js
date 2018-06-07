import { API_BASE_URL } from '../common/global';

const AppUtils = {

    //Experience-API-Calls

    ExperienceList: async function() {

        return await fetch(API_BASE_URL+'/admin/getAllExp', {
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

    AddExperience: async function(data) {
        return await fetch(API_BASE_URL + '/admin/insertExp', {
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

    EditExperience: async function (data) {
        return await fetch(API_BASE_URL + '/admin/updateExp', {
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

    DeleteExperience: function (data) {
        return fetch(API_BASE_URL + '/admin/deleteExp', {
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

    //SubExperience-API-Calls

    SubExperienceList: async function() {

        return await fetch(API_BASE_URL+'/admin/getAllSubExp', {
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

    AddSubExperience: async function(data) {
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

    UserBlockUnblock: async function(data) {
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

    promoCodeList: async function() {

        return await fetch(API_BASE_URL+'/admin/getAllPromocodes', {
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

    AddpromoCode: async function(data) {
        return await fetch(API_BASE_URL + '/admin/insertPromocode', {
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