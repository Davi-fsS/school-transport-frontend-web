import { useEffect, useState } from "react";
import Datagrid from "../../components/datagrid/Datagrid";
import { vehicleColumns } from "../../utils/columns";
import NavBar from "../navBar/NavBar";
import { getAllVehicle } from "../../services/vehicleService";

const Vehicle = () => {

    const [rows, setRows] = useState([]);
    const [options, setOptions] = useState(0);
    const [reload, setReload] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [canRemove, setCanRemove] = useState(false);
    const [id, setId] = useState(null);
    const [details, setDetails] = useState(null);

    const requestData = async() => {
        const response = await getAllVehicle();

        if(response.status === 200){
            setRows(response.data);
        }
        else{
            setRows([]);
        }
    };

    useEffect(() => {
        requestData();
    }, []);

    return <>
        <NavBar optionSelected={4}/>
        <Datagrid 
            title="Veículos" 
            columns={vehicleColumns} 
            rows={rows} 
            openRegister={setOptions} 
            // handleRemove={handleRemove} 
            // handleDetails={handleDetails} 
            // handleOpenRegister={handleOpenRegister} 
            // handleClickCell={handleClickCell} 
            // handleReload={handleBackAndReload} 
            canEdit={canEdit} 
            canRemove={canRemove}
        />
    </>
};

export default Vehicle;