import axios from "axios";

const apiUrl = 'https://school-transport-backend-3fec5c45f086.herokuapp.com';
const _controller = apiUrl + '/device';

export const getAllDevices = async() => {
    const _endpoint = "/get-all";

    try{
        const response  = await axios.get(_controller + _endpoint);

        return response;
    }
    catch(error){
        return error.response;
    }
};

export const createDevice = async(body) => {
    const _endpoint = "/create";

    try{
        const response  = await axios.post(_controller + _endpoint, body);

        return response;
    }
    catch(error){
        return error.response;
    }
};

export const updateDevice = async(body) => {
    const _endpoint = "/update";

    try{
        const response  = await axios.put(_controller + _endpoint, body);

        return response;
    }
    catch(error){
        return error.response;
    }
};

export const deleteDevice = async(id) => {
    const _endpoint = `/delete?id=${id}`;

    try{
        const response  = await axios.delete(_controller + _endpoint);

        return response;
    }
    catch(error){
        return error.response;
    }
};