import axios from "axios";

const apiUrl = 'https://school-transport-backend-3fec5c45f086.herokuapp.com';
const _controller = apiUrl + '/vehicle';

export const createVehicle = async(body) => {
    const _endpoint = `/create`;

    try{
        const response  = await axios.post(_controller + _endpoint, body);

        return response;
    }
    catch(error){
        return error.response;
    }
};