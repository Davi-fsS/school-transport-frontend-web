import { useState } from "react";
import NavBar from "../navBar/NavBar";
import styles from "./style.module.scss";
import Row from "../../components/row/Row";
import Input from "../../components/input/Input";
import { getAddressInfosByCEP } from "../../services/cepService";
import { toast } from "react-toastify";
import toastConfigs from "../../utils/toastConfigs";
import { createUser } from "../../services/userService";
import { userTypeEnum } from "../../utils/userTypeEnum";

const RegisterDriver = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cnh, setCNH] = useState("");
    const [cpf, setCPF] = useState("");
    const [rg, setRG] = useState("");
    const [phone, setPhone] = useState("");
    const [cep, setCep] = useState("");

    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleCNH = (e) => {
        setCNH(e.target.value);
    };

    const handleCPF = (e) => {
        setCPF(e.target.value);
    };

    const handleRG = (e) => {
        setRG(e.target.value);
    };

    const handlePhone = (e) => {
        setPhone(e.target.value);
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
        if(name.length === 0) return;

        if(email.length === 0) return;

        if(cnh.length === 0) return;

        if(cpf.length === 0) return;

        if(rg.length === 0) return;

        if(phone.length === 0) return;

        if(cep.length === 0) return;

        if(street.length === 0) return;

        if(number.length === 0) return;

        if(neighborhood.length === 0) return;

        if(city.length === 0) return;
        
        if(state.length === 0) return;

        return true;
    };

    const cleanAllFields = () => {
        setName("");
        setEmail("");
        setCNH("");
        setCPF("");
        setRG("");
        setPhone("");
        setCep("");
        setStreet("");
        setNumber("");
        setNeighborhood("");
        setCity("");
        setState("");
    };

    const handleRegister = async() => {
        const isAllFilled = verifyFieldsFilled();

        if(!isAllFilled){
            toast.error("Preencha todos os dados corretamente", toastConfigs);
            return;
        }

        const body = {
            name: name,
            email: email,
            cpf: cpf.replace(/\D/g, ''),
            cnh: cnh,
            rg: rg,
            phone: phone.replace(/\D/g, ''),
            user_type_id: userTypeEnum.MOTORISTA,
            address: {
                address: `${street}, ${number}`, 
                city: city, 
                neighborhood: neighborhood, 
                state: state
            }
        };
        
        const response = await createUser(body);

        if(response.status === 201){
            toast.success(response.data, toastConfigs);
            cleanAllFields();
        }
        else{
            toast.error(response.data, toastConfigs);
        }
    };

    return <>
        <NavBar optionSelected={2}/>
        <div className={styles.container}>
            <h3 className={styles.title}>Cadastro Motorista</h3>

            <div className={styles.userFieldsContainer}>
                <h4>Dados do Usuário</h4>
                <Row>
                    <Input placeholder="Nome" handleOnChange={handleName} value={name}/>
                    <Input placeholder="Email" handleOnChange={handleEmail} value={email}/>
                </Row>      
                <Row>
                    <Input placeholder="CNH" handleOnChange={handleCNH} value={cnh}/>
                    <Input placeholder="CPF" handleOnChange={handleCPF} value={cpf}/>
                </Row>    
                <Row>
                    <Input placeholder="RG" handleOnChange={handleRG} value={rg}/>
                    <Input placeholder="Telefone" handleOnChange={handlePhone} value={phone}/>
                </Row>              
            </div>

            <div className={styles.userFieldsContainer}>
                <h4>Dados do Endereço</h4>
                <Row>
                    <Input placeholder="CEP" handleOnChange={handleCEP} value={cep}/>
                    <button onClick={handleSearchCEP}>buscar</button>
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
    </>
};

export default RegisterDriver;