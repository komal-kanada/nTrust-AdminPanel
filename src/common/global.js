import {AsyncStorage} from 'AsyncStorage'

export const token = async () => {
    if(await AsyncStorage.getItem('Login') !== undefined){
        return JSON.parse(await AsyncStorage.getItem('Login')).token
    }
};

// server
// export const API_BASE_URL = "http://158.69.205.234:3000/api/v1";
// mihir
// export const API_BASE_URL = "http://192.168.1.177:3000/api/v1";
// heroku
export const API_BASE_URL = "https://ntrust.herokuapp.com/api/v1";
// radha
// export const API_BASE_URL = "http://192.168.1.16:3000/api/v1";