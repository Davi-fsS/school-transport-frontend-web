import { useState } from "react";
import Input from "../../../components/input/Input";
import Row from "../../../components/row/Row";
import styles from "./style.module.scss";
import { toast } from "react-toastify";
import toastConfigs from "../../../utils/toastConfigs";
import { getAddressInfosByCEP } from "../../../services/cepService";
import { createPoint, createSchool } from "../../../services/pointService";
import { ArrowBack } from "@mui/icons-material";
import { pointTypeEnum } from "../../../utils/pointTypeEnum";

const RegisterSchool = ({handleBackPage, handleBackAndReload}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cep, setCep] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleCEP = (e) => {
        setCep(e.target.value);
    };

    const handleSearchCEP = async() => {
        if(cep.length !== 8){
            toast.error("Digite um CEP válido", toastConfigs);
            return;
        }

        const request = await getAddressInfosByCEP(cep);

        setStreet(request.logradouro);
        setNeighborhood(request.bairro);
        setCity(request.localidade);
        setState(request.uf);
    };

    const handleStreet = (e) => {
        setStreet(e.target.value);
    };

    const handleNumber = (e) => {
        setNumber(e.target.value);
    };

    const handleNeighborhood = (e) => {
        setNeighborhood(e.target.value);
    };

    const handleCity = (e) => {
        setCity(e.target.value);
    };

    const handleState = (e) => {
        setState(e.target.value);
    };

    const verifyFieldsFilled = () => {
        if(cep.length === 0) return;

        if(street.length === 0) return;

        if(number.length === 0) return;

        if(neighborhood.length === 0) return;

        if(city.length === 0) return;
        
        if(state.length === 0) return;

        return true;
    };

    const cleanAllFields = () => {
        setCep("");
        setStreet("");
        setNumber("");
        setNeighborhood("");
        setCity("");
        setState("");
        setName("");
        setDescription("");
    };

    const handleRegister = async() => {
        const isAllFilled = verifyFieldsFilled();

        if(!isAllFilled){
            toast.error("Preencha todos os dados corretamente", toastConfigs);
            return;
        }

        const body = {
            name: name,
            address: `${street}, ${number}`, 
            city: city, 
            neighborhood: neighborhood, 
            state: state,
            description: description,
            point_type_id: pointTypeEnum.ESCOLA
        };
        
        const response = await createPoint(body);

        if(response.status === 201){
            toast.success("Escola criada com sucesso!", toastConfigs);
            cleanAllFields();
            handleBackAndReload();
        }
        else{
            toast.error(response.data, toastConfigs);
        }
    };

    const buttonCep = {
        action: () => handleSearchCEP(),
        disabled: cep.length !== 8
    };

    return <div className={styles.container}>
        <div className={styles.header}>
            <ArrowBack className={styles.icon} titleAccess="Voltar" onClick={handleBackPage}/>
            <h3 className={styles.title}>Cadastro Escola</h3>
        </div>
        <div className={styles.userFieldsContainer}>
            <h4>Dados do Endereço</h4>
            <Row>
                <Input placeholder="Nome" handleOnChange={handleName} value={name}/>
                <Input placeholder="Descrição" handleOnChange={handleDescription} value={description}/>
            </Row>  
            <Row>
                <Input button={buttonCep} placeholder="CEP" handleOnChange={handleCEP} value={cep}/>
                <Input placeholder="Rua" handleOnChange={handleStreet} value={street}/>
            </Row>      
            <Row>
                <Input placeholder="Número" handleOnChange={handleNumber} value={number}/>
                <Input placeholder="Bairro" handleOnChange={handleNeighborhood} value={neighborhood}/>
            </Row>    
            <Row>
                <Input placeholder="Cidade" handleOnChange={handleCity} value={city}/>
                <Input placeholder="Estado" handleOnChange={handleState} value={state}/>
            </Row>     
        </div>

        <button onClick={handleRegister} className={styles.buttonRegister}>Enviar</button>
    </div>
};

export default RegisterSchool;