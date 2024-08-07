import { useEffect, useState } from "react";
import Input from "../../../components/input/Input";
import Row from "../../../components/row/Row";
import styles from "./style.module.scss";
import { toast } from "react-toastify";
import toastConfigs from "../../../utils/toastConfigs";
import { getAddressInfosByCEP } from "../../../services/cepService";
import { createSchool, updateSchool } from "../../../services/pointService";
import { ArrowBack } from "@mui/icons-material";
import { createUser, updateUser } from "../../../services/userService";
import ReactLoading from "react-loading";
import { userTypeEnum } from "../../../utils/userTypeEnum";

const UpdateDriver = ({detail, handleBackPage, handleBackAndReload}) => {
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cnh, setCNH] = useState("");
    const [cpf, setCPF] = useState("");
    const [rg, setRG] = useState("");
    const [phone, setPhone] = useState("");

    const [hasPoint, setHasPoint] = useState(false);
    const [cep, setCep] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = detail?.user
        
        setId(user.id);
        setName(user.name);
        setEmail(user.email);
        setCNH(user.cnh);
        setCPF(user.cpf);
        setRG(user.rg);

        const userPhone = detail?.phone[0];

        setPhone(userPhone?.phone);

        if(detail.points?.length > 0){
            const userPoint = detail.points[0]

            setHasPoint(true);
            
            const address = userPoint.address.split(",");
            
            setStreet(address[0]);
            setNumber(address[1]);
            setNeighborhood(userPoint.neighborhood);
            setCity(userPoint.city);
            setState(userPoint.state);
        }
        else{
            setHasPoint(false);
        }

    }, [detail]);

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

        if(detail.points?.length > 0){    
            if(street.length === 0) return;
    
            if(number.length === 0) return;
    
            if(neighborhood.length === 0) return;
    
            if(city.length === 0) return;
            
            if(state.length === 0) return;
        }


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

    const handleUpdate = async() => {
        const isAllFilled = verifyFieldsFilled();

        if(!isAllFilled){
            toast.error("Preencha todos os dados corretamente", toastConfigs);
            return;
        }

        const userBody = {
            id: id,
            name: name,
            email: email,
            cpf: cpf.replace(/\D/g, ''),
            cnh: cnh,
            rg: rg,
            user_type_id: userTypeEnum.MOTORISTA,
        };
        
        setLoading(true);

        const response = await updateUser(userBody);

        if(response.status === 200){
            toast.success("Motorista atualizado com sucesso", toastConfigs);
            cleanAllFields();
            handleBackAndReload();
        }
        else{
            toast.error(response.data.detail, toastConfigs);
        }

        setLoading(false);
    };

    const buttonCep = {
        action: () => handleSearchCEP(),
        disabled: cep.length !== 8
    };

    return <>
        <div className={styles.container}>
            <div className={styles.header}>
                <ArrowBack className={styles.icon} titleAccess="Voltar" onClick={handleBackPage}/>
                <h3 className={styles.title}>Editar Motorista</h3>
            </div>
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

            {
                hasPoint && <div className={styles.userFieldsContainer}>
                    <h4>Dados do Endereço</h4>
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
            }

            <button onClick={handleUpdate} className={styles.buttonRegister}>
                <div className={styles.loadingContainer}>
                    {
                        loading ?
                            <ReactLoading color="#fff" type="bubbles" className={styles.loadingContent}/> 
                        :
                            "Enviar"
                    }
                </div>
            </button>
        </div>
    </>
};

export default UpdateDriver;