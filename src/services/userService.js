import axios from "axios";

const apiUrl = 'https://school-transport-backend-3fec5c45f086.herokuapp.com';
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

export const getAllDrivers = async() => {
    const _endpoint = `/get-all-drivers`;

    try{
        const response  = await axios.get(_controller + _endpoint);

        return response;
    }
    catch(error){
        return error.response;
    }
};

export const getDriversWithoutVehicle = async() => {
    const _endpoint = `/get-drivers-without-vehicle`;

    try{
        const response  = await axios.get(_controller + _endpoint);

        return response;
    }
    catch(error){
        return error.response;
    }
};

export const updateUserUuid = async(body) => {
    const _endpoint = '/update-uuid';

    try{
        const response  = await axios.put(_controller + _endpoint, body);

        return response;
    }
    catch(error){
        return error.response;
    }
};

export const updateDriver = async(body) => {
    const _endpoint = `/update`;

    try{
        const response  = await axios.put(_controller + _endpoint, body);

        return response;
    }
    catch(error){
        return error.response;
    }
};

export const deleteDriver = async(id) => {
    const _endpoint = `/delete?user_id=${id}`;

    try{
        const response  = await axios.delete(_controller + _endpoint);

        return response;
    }
    catch(error){
        return error.response;
    }
};

export const createUser = async(body) => {
    const _endpoint = `/create`;

    try{
        const response  = await axios.post(_controller + _endpoint, body);

        return response;
    }
    catch(error){
        return error.response;
    }
};

export const updateUser = async(body) => {
    const _endpoint = `/update`;

    try{
        const response  = await axios.put(_controller + _endpoint, body);

        return response;
    }
    catch(error){
        return error.response;
    }
};


export const getUserDetails = async(id) => {
    const _endpoint = `/details?user_id=${id}`;

    try{
        const response  = await axios.get(_controller + _endpoint);

        return response;
    }
    catch(error){
        return error.response;
    }
};