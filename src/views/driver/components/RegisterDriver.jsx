import { useState } from "react";
import { getAddressInfosByCEP } from "../../../services/cepService";
import { toast } from "react-toastify";
import toastConfigs from "../../../utils/toastConfigs";
import { createUser } from "../../../services/userService";
import { ArrowBack } from "@mui/icons-material";
import ReactLoading from "react-loading";
import Row from "../../../components/row/Row";
import Input from "../../../components/input/Input";
import styles from "./style.module.scss";
import { userTypeEnum } from "../../../utils/userTypeEnum";
import { vehicleTypeEnum } from "../../../utils/vehicleTypeEnum";
import { createVehicle } from "../../../services/vehicleService";
import { pointTypeEnum } from "../../../utils/pointTypeEnum";

const RegisterDriver = ({handleBackPage, handleBackAndReload}) => {
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

    const [plate, setPlate] = useState("");
    const [model, setModel] = useState("");
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");

    const [hasVehicle, setHasVehicle] = useState(false);
    const [nextPage, setNextPage] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const handlePlate = (e) => {
        setPlate(e.target.value.toUpperCase());
    };

    const handleModel = (e) => {
        setModel(e.target.value);
    };

    const handleYear = (e) => {
        setYear(e.target.value);
    };

    const handleColor = (e) => {
        setColor(e.target.value);
    };

    const verifyFirstPageFilledFields = () => {
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

    const verifySecondPageFilledFields = () => {
        if(plate.length === 0) return;

        if(year.length === 0) return;

        if(color.length === 0) return;

        if(model.length === 0) return;

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

    const handleToNextPage = () => {
        const isFirstPageFilled = verifyFirstPageFilledFields();

        if(!isFirstPageFilled){
            toast.error("Preencha todos os dados corretamente", toastConfigs);
            setNextPage(false);
            return;
        }
        else{
            setNextPage(true);
        }
    };

    const handleRegister = async() => {
        setLoading(true);

        if(hasVehicle){
            const isSecondPageFilled = verifySecondPageFilledFields();

            if(!isSecondPageFilled){
                toast.error("Preencha todos os dados corretamente", toastConfigs);
                setLoading(false);
                return;
            }

            const userBody = {
                name: name,
                email: email,
                cpf: cpf.replace(/\D/g, ''),
                cnh: cnh,
                rg: rg,
                phone: phone.replace(/\D/g, ''),
                user_type_id: userTypeEnum.MOTORISTA,
                address: {
                    name: `Casa de ${name}`,
                    address: `${street}, ${number}`, 
                    city: city, 
                    neighborhood: neighborhood, 
                    state: state,
                    description: `Endereço principal de ${name}`,
                    point_type_id: pointTypeEnum.RESIDÊNCIA
                }
            };
            
            const creationUser = await createUser(userBody);

            if(creationUser.status === 201){
                const vehicleBody = {
                    plate: plate,
                    vehicle_type_id: vehicleTypeEnum.VAN_ESCOLAR,
                    color: color,
                    model: model,
                    year: year,
                    user_id: creationUser.data
                }

                const creationVehicle = await createVehicle(vehicleBody);

                if(creationVehicle.status === 201){
                    toast.success("Usuário criado com sucesso!", toastConfigs);
                    cleanAllFields();
                    handleBackAndReload();
                }
                else{
                    toast.error(creationVehicle.data, toastConfigs);
                }
            }
            else{
                toast.error(creationUser.data, toastConfigs);
            }

            setLoading(false);
        }
        else{
            const isFirstPageFilled = verifyFirstPageFilledFields();

            if(!isFirstPageFilled){
                toast.error("Preencha todos os dados corretamente", toastConfigs);
                setLoading(false);
                return;
            }

            const userBody = {
                name: name,
                email: email,
                cpf: cpf.replace(/\D/g, ''),
                cnh: cnh,
                rg: rg,
                phone: phone.replace(/\D/g, ''),
                user_type_id: userTypeEnum.MOTORISTA,
                address: {
                    name: `Casa de ${name}`,
                    address: `${street}, ${number}`, 
                    city: city, 
                    neighborhood: neighborhood, 
                    state: state,
                    description: `Endereço principal de ${name}`,
                    point_type_id: pointTypeEnum.RESIDÊNCIA
                }
            };
        
            const creationUser = await createUser(userBody);

            if(creationUser.status === 201){
                toast.success("Usuário criado com sucesso!", toastConfigs);
                cleanAllFields();
                handleBackAndReload();
            }
            else{
                toast.error(creationUser.data, toastConfigs);
            }

            setLoading(false);
        }
    };

    const buttonCep = {
        action: () => handleSearchCEP(),
        disabled: cep.length !== 8
    };

    return <>
        <div className={styles.container}>
            <div className={styles.header}>
                <ArrowBack className={styles.icon} titleAccess="Voltar" onClick={handleBackPage}/>
                <h3 className={styles.title}>Cadastro Motorista</h3>
            </div>
            {
                !nextPage ? <>
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

                    <div className={styles.userFieldsContainer}>
                        <Row>
                            <div>
                                <input
                                    type="checkbox"
                                    value={hasVehicle}
                                    onChange={(e) => setHasVehicle(e.target.checked)}
                                />
                                <label>Deseja criar um veículo a este usuário?</label>
                            </div>
                        </Row>      
                    </div>

                    {
                        hasVehicle ? 
                            <button onClick={handleToNextPage} className={styles.buttonRegister}>
                                Avançar
                            </button>
                        :
                        <button onClick={handleRegister} className={styles.buttonRegister}>
                            <div className={styles.loadingContainer}>
                                {
                                    loading ?
                                        <ReactLoading color="#fff" type="bubbles" className={styles.loadingContent}/> 
                                    :
                                        "Enviar"
                                }
                            </div>
                        </button>
                    }
                </>
                :
                <>
                    <div className={styles.userFieldsContainer}>
                        <h4>Dados do Veículo</h4>
                        <Row>
                            <Input placeholder="Placa" handleOnChange={handlePlate} value={plate}/>
                            <Input placeholder="Modelo" handleOnChange={handleModel} value={model}/>
                        </Row>      
                        <Row>
                            <Input placeholder="Color" handleOnChange={handleColor} value={color}/>
                            <Input placeholder="Ano" handleOnChange={handleYear} value={year}/>
                        </Row>   
                    </div>

                    <button onClick={handleRegister} className={styles.buttonRegister}>
                        <div className={styles.loadingContainer}>
                            {
                                loading ?
                                    <ReactLoading color="#fff" type="bubbles" className={styles.loadingContent}/> 
                                :
                                    "Enviar"
                            }
                        </div>
                    </button>
                </>
            }
            

        </div>
    </>
};

export default RegisterDriver;