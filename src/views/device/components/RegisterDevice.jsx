import { useContext, useEffect, useState } from "react";
import Input from "../../../components/input/Input";
import Row from "../../../components/row/Row";
import styles from "./style.module.scss";
import { toast } from "react-toastify";
import toastConfigs from "../../../utils/toastConfigs";
import ReactLoading from "react-loading";
import { getAddressInfosByCEP } from "../../../services/cepService";
import { createPoint, createSchool } from "../../../services/pointService";
import { ArrowBack } from "@mui/icons-material";
import { pointTypeEnum } from "../../../utils/pointTypeEnum";
import { createDevice } from "../../../services/deviceService";
import { getAllDrivers } from "../../../services/userService";
import firebase from "firebase/compat/app";
import { auth } from "../../../firebase/firebase";
import { AuthContext } from "../../providers/AuthProvider";

const RegisterDevice = ({handleBackPage, handleBackAndReload}) => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");

    const [driversList, setDriversList] = useState([]);
    const [driverSelected, setDriverSelected] = useState(null);

    const [loading, setLoading] = useState(false);

    const { userData } = useContext(AuthContext);

    useEffect(() => {
        const requestDriverList = async() => {
            const response = await getAllDrivers();

            if(response.status === 200){
                const formatDrivers = response.data.map(item => ({
                    value: item.id,
                    label: `${item.name} (${item.cpf})`
                }));

                setDriversList(formatDrivers);
            }   
            else{
                setDriversList([]);
            }
        };

        requestDriverList();
    }, []);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleCode = (e) => {
        setCode(e.target.value);
    };

    const verifyFieldsFilled = () => {
        if(name.length === 0) return "Digite o nome";

        if(code.length !== 16) return "Digite o código";

        if(driverSelected === null || driverSelected === "") return "Escolha um condutor";

        return true;
    };

    const cleanAllFields = () => {
        setName("");
        setCode("");
        setDriverSelected(null);
    };

    const handleRegister = async() => {
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

        const body = {
            name: name,
            code: code,
            device_user_id: parseInt(driverSelected),
            user_id: userData.id
        };
        
        setLoading(true);

        const response = await createDevice(body);

        if(response.status === 201){
            toast.success("Dispositivo criado com sucesso!", toastConfigs);
            cleanAllFields();
            handleBackAndReload();
        }
        else{
            toast.error(response.data.detail, toastConfigs);
        }

        setLoading(false);
    };

    return <div className={styles.container}>
        <div className={styles.header}>
            <ArrowBack className={styles.icon} titleAccess="Voltar" onClick={handleBackPage}/>
            <h3 className={styles.title}>Cadastro Dispositivo</h3>
        </div>
        <div className={styles.userFieldsContainer}>
            <h4>Dados do Dispositivo</h4>
            <Row>
                <Input placeholder="Nome" handleOnChange={handleName} value={name} required={true}/>
                <Input placeholder="Código" handleOnChange={handleCode} value={code} required={true}/>
            </Row>    
            <Row style={{justifyContent: "center", gap: 5}}>
                Selecione o condutor:
                <select value={driverSelected} onChange={option => setDriverSelected(option.target.value)}>
                    <option value="">Selecione um condutor</option>
                    {
                        driversList?.map(item => {
                            return <option key={item.value} value={item.value}>
                                {item.label}
                            </option>;
                        })
                    }
                </select>
                <span style={{color: "red"}}>*</span>
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
    </div>
};

export default RegisterDevice;