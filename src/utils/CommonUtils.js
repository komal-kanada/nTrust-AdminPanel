

// // import { API_BASE_URL_CUSTOM, API_BASE_URL_ADDEVENT } from '../common/globals.jsx';

// // const ProductUtils = {
// //     getProduct : function(){
// //         let apiUrl = API_BASE_URL_CUSTOM+"b_getProduct";
// //         return fetch(apiUrl,{
// //             method:'GET',
// //         }).then((response) => response.json()).then((res) => {
// //             console.log("res in food.."+JSON.stringify(res))            
// //             return res;
// //         })
// //         .catch((error)=>{
// //             console.log("error::"+JSON.stringify(error))
// //         })
// //     },
// //     getAppointmentSlots : function(){
// //         let apiUrl = API_BASE_URL_CUSTOM+"b_getAvailableSlots";
// //         return fetch(apiUrl,{
// //             method:'GET',
// //         }).then((response) => response.json()).then((res) => {
// //             console.log("res in appointment.."+JSON.stringify(res))            
// //             return res;
// //         })
// //         .catch((error)=>{
// //             console.log("error::"+JSON.stringify(error))
// //         })
// //     },
// //     getAddEvent : function(data){
// //         console.log("data from API",data)
// //         // let data = {
// //         //     "calendarId": "sathish@purplegrids.com",
// //         //     "timeZone": "America/Log_Angeles",
// //         //     "startTime": "05-09-2018 11:00",
// //         //     "endTime": "05-09-2018 13:00",
// //         //     "subject": "Appointment with",
// //         //     "description": "Following appointment",
// //         //     "Contact information": "Email "
// //         // }
// //         let apiUrl =  API_BASE_URL_ADDEVENT+"addEvent";
// //         return fetch(apiUrl,{
// //             'method':'POST',
// //             'body':JSON.stringify(data),
// //         }).then( (response)  => response.json()).then((res) => {
// //             console.log("save successfully.."+JSON.stringify(res))            
// //             return res;
// //         })
// //         .catch((error)=>{
// //             console.log("error::"+JSON.stringify(error))
// //         })
// //     },

// // }

// // module.exports = ProductUtils; 
// //module.exports = CommonUtils;


// // import { API_BASE_URL_CUSTOM, API_BASE_URL_ADDEVENT } from '../common/globals.jsx';

// // const ProductUtils = {
//     //const CommonUtils = {
// //     getProduct : function(){
// //         let apiUrl = API_BASE_URL_CUSTOM+"b_getProduct";
// //         return fetch(apiUrl,{
// //             method:'GET',
// //         }).then((response) => response.json()).then((res) => {
// //             console.log("res in food.."+JSON.stringify(res))            
// //             return res;
// //         })
// //         .catch((error)=>{
// //             console.log("error::"+JSON.stringify(error))
// //         })
// //     },
// //     getAppointmentSlots : function(){
// //         let apiUrl = API_BASE_URL_CUSTOM+"b_getAvailableSlots";
// //         return fetch(apiUrl,{
// //             method:'GET',
// //         }).then((response) => response.json()).then((res) => {
// //             console.log("res in appointment.."+JSON.stringify(res))            
// //             return res;
// //         })
// //         .catch((error)=>{
// //             console.log("error::"+JSON.stringify(error))
// //         })
// //     },
// //     getAddEvent : async function(data){
// //         console.log("data from API",data)
// //         // let data = {
// //         //     "calendarId": "sathish@purplegrids.com",
// //         //     "timeZone": "America/Log_Angeles",
// //         //     "startTime": "05-09-2018 11:00",
// //         //     "endTime": "05-09-2018 13:00",
// //         //     "subject": "Appointment with",
// //         //     "description": "Following appointment",
// //         //     "Contact information": "Email "
// //         // }
// //         let apiUrl =  API_BASE_URL_ADDEVENT+"addEvent";
// //         return fetch(apiUrl,{
// //             'method':'POST',
// //             'body':JSON.stringify(data),
// //         }).then(async (response) => {
// //             let res =  await response.json();
// //             console.log("Save Successfully.." +res)            
// //             return res;
// //         })
// //         .catch((error)=>{
// //             console.log("error::"+JSON.stringify(error))
// //         })
// //     },

// // }

// // module.exports = ProductUtils;
// //module.exports = CommonUtils; 

// import { API_BASE_URL_CUSTOM, API_BASE_URL_ADDEVENT } from '../common/globals.jsx';


// const CommonUtils = {
//     getProduct : function(){
//         let apiUrl = API_BASE_URL_CUSTOM+"b_getProduct";
//         return fetch(apiUrl,{
//             method:'GET',
//         }).then((response) => response.json()).then((res) => {
//             console.log("res in food.."+JSON.stringify(res))            
//             return res;
//         })
//         .catch((error)=>{
//             console.log("error::"+JSON.stringify(error))
//         })
//     },
//     getAppointmentSlots : function(){
//         let apiUrl = "https://dev.purplegrids.com/jellogateway/gcalendar/availableSlots";
//         //let apiUrl = API_BASE_URL_CUSTOM+"b_getAvailableSlots";
//         return fetch(apiUrl,{
//             'method':'post',
//             headers: {'Content-Type':'application/json'},
//             'body':JSON.stringify({merchant:'Purple Grids',date:'05-12-2018'}),
//         }).then((response) => response.json()).then((res) => {
//             console.log("res in appointment.."+JSON.stringify(res))            
//             return res;
//         })
//         .catch((error)=>{
//             console.log("error::"+JSON.stringify(error))
//         })
//     },
//     getAddEvent : function(data){
//         console.log("data from API",data)
//         // let data = {
//         //     "calendarId": "sathish@purplegrids.com",
//         //     "timeZone": "America/Log_Angeles",
//         //     "startTime": "05-09-2018 11:00",
//         //     "endTime": "05-09-2018 13:00",
//         //     "subject": "Appointment with",
//         //     "description": "Following appointment",
//         //     "Contact information": "Email "
//         // }
//         //let apiUrl =  API_BASE_URL_ADDEVENT+"addEvent";
//         let apiUrl="https://dev.purplegrids.com/jellogateway/gcalendar/addEvent";
//         return fetch(apiUrl,{
//             'method':'POST',
//             'body':JSON.stringify(data),
//         }).then( (response)  => response.json()).then((res) => {
//             console.log("save successfully.."+JSON.stringify(res))            
//             return res;
//         })
//         .catch((error)=>{
//             console.log("error::"+JSON.stringify(error))
//         })
//     },

// }


// module.exports = CommonUtils; 
// // import { API_BASE_URL_CUSTOM, API_BASE_URL_ADDEVENT } from '../common/globals.jsx';

// // const ProductUtils = {
// //     getProduct : function(){
// //         let apiUrl = API_BASE_URL_CUSTOM+"b_getProduct";
// //         return fetch(apiUrl,{
// //             method:'GET',
// //         }).then((response) => response.json()).then((res) => {
// //             console.log("res in food.."+JSON.stringify(res))            
// //             return res;
// //         })
// //         .catch((error)=>{
// //             console.log("error::"+JSON.stringify(error))
// //         })
// //     },
// //     getAppointmentSlots : function(){
// //         let apiUrl = API_BASE_URL_CUSTOM+"b_getAvailableSlots";
// //         return fetch(apiUrl,{
// //             method:'GET',
// //         }).then((response) => response.json()).then((res) => {
// //             console.log("res in appointment.."+JSON.stringify(res))            
// //             return res;
// //         })
// //         .catch((error)=>{
// //             console.log("error::"+JSON.stringify(error))
// //         })
// //     },
// //     getAddEvent : async function(data){
// //         console.log("data from API",data)
// //         // let data = {
// //         //     "calendarId": "sathish@purplegrids.com",
// //         //     "timeZone": "America/Log_Angeles",
// //         //     "startTime": "05-09-2018 11:00",
// //         //     "endTime": "05-09-2018 13:00",
// //         //     "subject": "Appointment with",
// //         //     "description": "Following appointment",
// //         //     "Contact information": "Email "
// //         // }
// //         let apiUrl =  API_BASE_URL_ADDEVENT+"addEvent";
// //         return fetch(apiUrl,{
// //             'method':'POST',
// //             'body':JSON.stringify(data),
// //         }).then(async (response) => {
// //             let res =  await response.json();
// //             console.log("Save Successfully.." +res)            
// //             return res;
// //         })
// //         .catch((error)=>{
// //             console.log("error::"+JSON.stringify(error))
// //         })
// //     },

// // }

// // module.exports = ProductUtils;

// import { API_BASE_URL_CUSTOM, API_BASE_URL_ADDEVENT } from '../common/globals.jsx';

// const ProductUtils = {
//     getProduct : function(){
//         let apiUrl = API_BASE_URL_CUSTOM+"b_getProduct";
//         return fetch(apiUrl,{
//             method:'GET',
//         }).then((response) => response.json()).then((res) => {
//             console.log("res in food.."+JSON.stringify(res))            
//             return res;
//         })
//         .catch((error)=>{
//             console.log("error::"+JSON.stringify(error))
//         })
//     },
//     getAppointmentSlots : function(){
//         let apiUrl = API_BASE_URL_CUSTOM+"b_getAvailableSlots";
//         return fetch(apiUrl,{
//             method:'GET',
//         }).then((response) => response.json()).then((res) => {
//             console.log("res in appointment.."+JSON.stringify(res))            
//             return res;
//         })
//         .catch((error)=>{
//             console.log("error::"+JSON.stringify(error))
//         })
//     },
//     getAddEvent : function(data){
//         console.log("data from API",data)
//         // let data = {
//         //     "calendarId": "sathish@purplegrids.com",
//         //     "timeZone": "America/Log_Angeles",
//         //     "startTime": "05-09-2018 11:00",
//         //     "endTime": "05-09-2018 13:00",
//         //     "subject": "Appointment with",
//         //     "description": "Following appointment",
//         //     "Contact information": "Email "
//         // }
//         let apiUrl =  API_BASE_URL_ADDEVENT+"addEvent";
//         return fetch(apiUrl,{
//             'method':'POST',
//             'body':JSON.stringify(data),
//         }).then( (response)  => response.json()).then((res) => {
//             console.log("save successfully.."+JSON.stringify(res))            
//             return res;
//         })
//         .catch((error)=>{
//             console.log("error::"+JSON.stringify(error))
//         })
//     },

// }

// module.exports = ProductUtils; 
//module.exports = CommonUtils;


// import { API_BASE_URL_CUSTOM, API_BASE_URL_ADDEVENT } from '../common/globals.jsx';

// const ProductUtils = {
    //const CommonUtils = {
//     getProduct : function(){
//         let apiUrl = API_BASE_URL_CUSTOM+"b_getProduct";
//         return fetch(apiUrl,{
//             method:'GET',
//         }).then((response) => response.json()).then((res) => {
//             console.log("res in food.."+JSON.stringify(res))            
//             return res;
//         })
//         .catch((error)=>{
//             console.log("error::"+JSON.stringify(error))
//         })
//     },
//     getAppointmentSlots : function(){
//         let apiUrl = API_BASE_URL_CUSTOM+"b_getAvailableSlots";
//         return fetch(apiUrl,{
//             method:'GET',
//         }).then((response) => response.json()).then((res) => {
//             console.log("res in appointment.."+JSON.stringify(res))            
//             return res;
//         })
//         .catch((error)=>{
//             console.log("error::"+JSON.stringify(error))
//         })
//     },
//     getAddEvent : async function(data){
//         console.log("data from API",data)
//         // let data = {
//         //     "calendarId": "sathish@purplegrids.com",
//         //     "timeZone": "America/Log_Angeles",
//         //     "startTime": "05-09-2018 11:00",
//         //     "endTime": "05-09-2018 13:00",
//         //     "subject": "Appointment with",
//         //     "description": "Following appointment",
//         //     "Contact information": "Email "
//         // }
//         let apiUrl =  API_BASE_URL_ADDEVENT+"addEvent";
//         return fetch(apiUrl,{
//             'method':'POST',
//             'body':JSON.stringify(data),
//         }).then(async (response) => {
//             let res =  await response.json();
//             console.log("Save Successfully.." +res)            
//             return res;
//         })
//         .catch((error)=>{
//             console.log("error::"+JSON.stringify(error))
//         })
//     },

// }

// module.exports = ProductUtils;
//module.exports = CommonUtils; 

import { API_BASE_URL_CUSTOM, API_BASE_URL_ADDEVENT } from '../common/globals.jsx';


const CommonUtils = {
    getProduct : function(){
        let apiUrl = API_BASE_URL_CUSTOM+"b_getProduct";
        return fetch(apiUrl,{
            method:'GET',
        }).then((response) => response.json()).then((res) => {
            console.log("res in food.."+JSON.stringify(res))            
            return res;
        })
        .catch((error)=>{
            console.log("error::"+JSON.stringify(error))
        })
    },
    getAppointmentSlots : function(MID, selectedDate){
        let apiUrl = "https://dev.purplegrids.com/jellogateway/gcalendar/availableSlots";
        //let apiUrl = API_BASE_URL_CUSTOM+"b_getAvailableSlots";
        return fetch(apiUrl,{
            'method':'post',
            headers: {'Content-Type':'application/json'},
            'body':JSON.stringify({merchant: MID ,date: selectedDate}),
        }).then((response) => response.json()).then((res) => {
            //console.log("res in appointment.."+JSON.stringify(res))            
            return res;
        })
        .catch((error)=>{
            console.log("error::"+JSON.stringify(error))
        })
    },
    getAddEvent : function(data){
        console.log("data from API",data)
        // let data = {
        //     "calendarId": "sathish@purplegrids.com",
        //     "timeZone": "America/Log_Angeles",
        //     "startTime": "05-09-2018 11:00",
        //     "endTime": "05-09-2018 13:00",
        //     "subject": "Appointment with",
        //     "description": "Following appointment",
        //     "Contact information": "Email "
        // }
        //let apiUrl =  API_BASE_URL_ADDEVENT+"addEvent";
        let apiUrl="https://dev.purplegrids.com/jellogateway/gcalendar/addEvent";
        return fetch(apiUrl,{
            'method':'POST',
            'body':JSON.stringify(data),
            headers: {'Content-Type':'application/json'},
        }).then( (response)  => response.json()).then((res) => {
            console.log("save successfully.."+JSON.stringify(res))            
            return res;
        })
        .catch((error)=>{
            console.log("error::"+JSON.stringify(error))
        })
    },

}


module.exports = CommonUtils; 