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

    const [veridicy, setVeridicy] = useState(false);
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
        if(name.length === 0) return "Digite o nome";

        if(cnh.length === 0) return "Digite a CNH";

        if(cpf.length === 0) return "Digite o CPF";

        if(rg.length === 0) return "Digite o RG";

        if(phone.length === 0) return "Digite o telefone";

        if(detail.points?.length > 0){    
            if(street.length === 0) return;
    
            if(number.length === 0) return;
    
            if(neighborhood.length === 0) return;
    
            if(city.length === 0) return;
            
            if(state.length === 0) return;
        }

        if(!veridicy) return "Necessário confirmar veridicidade";

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

        if(isAllFilled !== true){
            setLoading(false);
            if(isAllFilled !== undefined){
                toast.error(isAllFilled, toastConfigs);
                return;
            }

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
                    <Input placeholder="Nome" handleOnChange={handleName} value={name} required={true}/>
                    <Input placeholder="Email" handleOnChange={handleEmail} value={email} disabled={true}/>
                </Row>      
                <Row>
                    <Input placeholder="CNH" handleOnChange={handleCNH} value={cnh} required={true}/>
                    <Input placeholder="CPF" handleOnChange={handleCPF} value={cpf} required={true}/>
                </Row>    
                <Row>
                    <Input placeholder="RG" handleOnChange={handleRG} value={rg} required={true}/>
                    <Input placeholder="Telefone" handleOnChange={handlePhone} value={phone} required={true}/>
                </Row>           
            </div>

            {
                hasPoint && <div className={styles.userFieldsContainer}>
                    <h4>Dados do Endereço</h4>
                    <Row>
                        <Input button={buttonCep} placeholder="CEP" handleOnChange={handleCEP} value={cep}/>
                        <Input placeholder="Rua" handleOnChange={handleStreet} value={street} required={true}/>
                    </Row>      
                    <Row>
                        <Input placeholder="Número" handleOnChange={handleNumber} value={number} required={true}/>
                        <Input placeholder="Bairro" handleOnChange={handleNeighborhood} value={neighborhood} required={true}/>
                    </Row>    
                    <Row>
                        <Input placeholder="Cidade" handleOnChange={handleCity} value={city} required={true}/>
                        <Input placeholder="Estado" handleOnChange={handleState} value={state} required={true}/>
                    </Row>     
                </div>
            }

            <div className={styles.userFieldsContainer}>
                <Row>
                    <div>
                        <input
                            type="checkbox"
                            value={veridicy}
                            onChange={(e) => setVeridicy(e.target.checked)}
                        />
                        <label>Confirma que as informações são verídicas</label>
                    </div>
                </Row>      
            </div>

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