import { useEffect, useState } from "react";
import Input from "../../../components/input/Input";
import Row from "../../../components/row/Row";
import styles from "./style.module.scss";
import { toast } from "react-toastify";
import toastConfigs from "../../../utils/toastConfigs";
import ReactLoading from "react-loading";
import { ArrowBack } from "@mui/icons-material";
import { updateVehicle } from "../../../services/vehicleService";
import { vehicleTypeEnum } from "../../../utils/vehicleTypeEnum";
import { getDriversWithoutVehicle } from "../../../services/userService";

const UpdateVehicle = ({detail, handleBackPage, handleBackAndReload}) => {
    const [plate, setPlate] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");
    
    const [driversList, setDriversList] = useState([]);
    const [driverSelected, setDriverSelected] = useState(null);

    const [loading, setLoading] = useState(false);

    const requestDriverList = async() => {
        const response = await getDriversWithoutVehicle();

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

    useEffect(() => {
        setPlate(detail.plate);
        setModel(detail.model);
        setYear(detail.year);
        setColor(detail.color);

        requestDriverList();

        const actualDriver = {
            value: detail.user_id,
            label: `${detail.user_name} (atual)`
        };

        setDriverSelected(actualDriver.value);

        driversList.push(actualDriver);

    }, [detail]);

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

    const verifyFieldsFilled = () => {
        if(plate.length === 0) return;

        if(plate.length !== 7) return "Digite uma placa válida";

        if(model.length === 0) return;

        if(year.length === 0) return;

        if(color.length === 0) return;

        if(driverSelected === null || driverSelected === "") return "Escolha um condutor";

        return true;
    };

    const cleanAllFields = () => {
        setPlate("");
        setModel("");
        setYear("");
        setColor("");
        setDriverSelected(null);
    };

    const handleUpdate = async() => {
        const isAllFilled = verifyFieldsFilled();

        if(isAllFilled !== true){
            if(isAllFilled !== undefined){
                toast.error(isAllFilled, toastConfigs);
                return;
            }

            toast.error("Preencha todos os dados corretamente", toastConfigs);
            return;
        }

        const vehicleBody = {
            id: detail?.id,
            plate: plate,
            vehicle_type_id: vehicleTypeEnum.VAN_ESCOLAR,
            color: color,
            model: model,
            year: year,
            user_id: parseInt(driverSelected)
        }
        
        setLoading(true);

        const response = await updateVehicle(vehicleBody);

        if(response.status === 200){
            toast.success("Veículo editado com sucesso!", toastConfigs);
            cleanAllFields();
            handleBackAndReload();
        }
        else{
            toast.error(response.data, toastConfigs);
        }

        setLoading(false);
    };

    useEffect(() => console.log(driverSelected) , [driverSelected])

    return <div className={styles.container}>
        <div className={styles.header}>
            <ArrowBack className={styles.icon} titleAccess="Voltar" onClick={handleBackPage}/>
            <h3 className={styles.title}>Editar Veículo</h3>
        </div>
        <div className={styles.userFieldsContainer}>
            <h4>Dados do Veículo</h4>
            <Row>
                <Input placeholder="Placa" handleOnChange={handlePlate} value={plate}/>
                <Input placeholder="Modelo" handleOnChange={handleModel} value={model}/>
            </Row>  
            <Row>
                <Input placeholder="Ano" handleOnChange={handleYear} value={year}/>
                <Input placeholder="Cor" handleOnChange={handleColor} value={color}/>
            </Row>
            <Row>
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
};

export default UpdateVehicle;