import axios from "axios";

export const getAddressInfosByCEP = async(cep) => {
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    try{
        const response  = await axios.get(apiUrl);

        if(response.status === 200){
            return response.data;
        }
    }
    catch(error){
        return error.response;
    }
};