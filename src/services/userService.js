import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000';
const _controller = apiUrl + '/user';

export const getUserByEmail = async(email) => {
    const _endpoint = `/by-email?email=${email}`;

    try{
        const response  = await axios.get(_controller + _endpoint);

        return response;
    }
    catch(error){
        return error.response;
    }
};