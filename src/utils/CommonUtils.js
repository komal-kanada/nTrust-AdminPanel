

import { API_BASE_URL_CUSTOM, API_BASE_URL_ADDEVENT } from '../common/globals.jsx';


const CommonUtils = {
    getProduct : function(){
        let apiUrl = API_BASE_URL_CUSTOM+"b_getProduct";
        return fetch(apiUrl,{
            method:'GET',
        }).then((response) => response.json()).then((res) => {
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