import {AsyncStorage} from 'AsyncStorage'

export const token = async () => {
    if(await AsyncStorage.getItem('Login') !== undefined){
        return JSON.parse(await AsyncStorage.getItem('Login')).token
    }
};

// heroku
export const API_BASE_URL = "https://ntrust.herokuapp.com/api/v1";