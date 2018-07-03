import {API_BASE_URL, token} from '../common/global';

const convertFormData = async (data) => {
    let formData = new FormData();
    for (let k in data) {
        await formData.append(k, data[k]);
    }
    return formData;
};

const API = {

    //Experience-API-Calls

    ExperienceList: async function () {
        return await fetch(API_BASE_URL + '/admin/getAllExp', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': await token()
            },
        })
            .then(response =>
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

    AddExperience: async function (data) {
        return await fetch(API_BASE_URL + '/admin/insertExp', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Authorization': await token()
            },
            body: await convertFormData(data)
        })
            .then(response =>
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
        return await fetch(API_BASE_URL + '/admin/updateExp', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Authorization': await token()
            },
            body: await convertFormData(data)
        })
            .then(response =>
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

    DeleteExperience: async function (data) {
        return await fetch(API_BASE_URL + '/admin/deleteExp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': await token()
            },
            body: JSON.stringify(data)
        })
            .then(response =>
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

    //Items-API-Calls

    ItemList: async function () {
        return await fetch(API_BASE_URL + '/admin/getAllSubExp', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': await token()
            },
        })
            .then((response) => {
                return response.json();
            })
            .catch((err) => {
                console.log(err)
            })
    },

    AddItem: async function (data) {
        return await fetch(API_BASE_URL + '/admin/insertSubexp', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Authorization': await token()
            },
            body: await convertFormData(data)
        })
            .then(response =>
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

    EditItem: async function (data) {
        return await fetch(API_BASE_URL + '/admin/updateSubExp', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Authorization': await token()
            },
            body: await convertFormData(data)
        })
            .then(response =>
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

    DeleteItem: async function (data)  {
        return await fetch(API_BASE_URL + '/admin/deleteSubExp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': await token()
            },
            body: JSON.stringify(data)
        })
            .then(response =>
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

    //User-API-Calls

    UserList: async function () {
        return await fetch(API_BASE_URL + '/admin/getAllUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': await token()
            },
        })
            .then((response) => {
                return response.json();
            })
            .catch((err) => {
                console.log(err)
            })
    },

    ItemsByUser: async function (userId) {
        userId = userId.substring(1);
        return await fetch(API_BASE_URL + `/admin/getItemsByUser/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': await token()
            },
        })
            .then((response) => {
                return response.json();
            })
            .catch((err) => {
                console.log(err)
            })
    },

    UserBlockUnblock: async function (data) {
        return await fetch(API_BASE_URL + '/admin/blockUnblock', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': await token()
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.log(err)
            })
    },

    //promoCode-API-Calls

    PromoCodeList: async function () {
        return await fetch(API_BASE_URL + '/admin/getAllPromocodes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': await token()
            },
        })
            .then((response) => {
                return response.json();
            })
            .catch((err) => {
                console.log(err)
            })
    },

    AddPromoCode: async function (data) {
        return await fetch(API_BASE_URL + '/admin/insertPromocode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': await token()
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                return response.json();
            })
            .catch((err) => {
                console.log(err)
            })
    },

    EditPromoCode: async function (data) {
        return await fetch(API_BASE_URL + '/admin/updatePromocode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': await token()
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                return response.json();
            })
            .catch((err) => {
                console.log(err)
            })
    },

    DeletePromoCode: async function (data) {
        return await fetch(API_BASE_URL + '/admin/deletePromocode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': await token()
            },
            body: JSON.stringify(data)
        })
            .then(response =>
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

    //Login

    Login: async function (data) {
        return await fetch(API_BASE_URL + '/admin/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response =>
                response.json()
                    .then(data => ({
                        data: data,
                        status: response.status
                    }))
                    .then(res => {
                        return res.data
                    })
            )
            .catch((err) => {
                console.log(err)
            })
    },

    //LogOut

    Logout: async function () {
        return await fetch(API_BASE_URL + '/admin/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
            .then((response) => {
                return response.json();
            })
            .catch((err) => {
                console.log(err)
            })
    },
};

export default API