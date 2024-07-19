import { useState } from "react";
import NavBar from "../navBar/NavBar";
import styles from "./style.module.scss";
import Row from "../../components/row/Row";
import Input from "../../components/input/Input";
import { getAddressInfosByCEP } from "../../services/cepService";
import { toast } from "react-toastify";
import toastConfigs from "../../utils/toastConfigs";

const RegisterDriver = () => {
    const [name, setName] = useState("");
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

    return <>
        <NavBar optionSelected={2}/>
        <div className={styles.container}>
            <h3 className={styles.title}>Cadastro Motorista</h3>

            <div className={styles.userFieldsContainer}>
                <h4>Dados do Usuário</h4>
                <Row>
                    <Input labelName="Nome" placeholder="Digite o nome" handleOnChange={handleName} value={name}/>
                    <Input labelName="CNH" placeholder="Digite a CNH" handleOnChange={handleCNH} value={cnh}/>
                </Row>      
                <Row>
                    <Input labelName="CPF" placeholder="Digite o CPF" handleOnChange={handleCPF} value={cpf}/>
                    <Input labelName="RG" placeholder="Digite o RG" handleOnChange={handleRG} value={rg}/>
                </Row>    
                <Row>
                    <Input labelName="Telefone" placeholder="Digite o telefone" handleOnChange={handlePhone} value={phone}/>
                </Row>              
            </div>

            <div className={styles.userFieldsContainer}>
                <h4>Dados do Endereço</h4>
                <Row>
                    <Input labelName="CEP" placeholder="Digite o CEP" handleOnChange={handleCEP} value={cep}/>
                    <button onClick={handleSearchCEP}>buscar</button>
                    <Input labelName="Rua" placeholder="Digite a rua" handleOnChange={handleStreet} value={street}/>
                </Row>      
                <Row>
                    <Input labelName="Número" placeholder="Digite o número" handleOnChange={handleNumber} value={number}/>
                    <Input labelName="Bairro" placeholder="Digite o bairro" handleOnChange={handleNeighborhood} value={neighborhood}/>
                </Row>    
                <Row>
                    <Input labelName="Cidade" placeholder="Digite a cidade" handleOnChange={handleCity} value={city}/>
                    <Input labelName="Estado" placeholder="Digite o estado" handleOnChange={handleState} value={state}/>
                </Row>     
            </div>
        </div>
    </>
};

export default RegisterDriver;