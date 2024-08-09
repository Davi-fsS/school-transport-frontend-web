import { useEffect, useState } from "react";
import Datagrid from "../../components/datagrid/Datagrid";
import { vehicleColumns } from "../../utils/columns";
import NavBar from "../navBar/NavBar";
import { getAllVehicle, removeVehicle } from "../../services/vehicleService";
import RegisterVehicle from "./components/RegisterVehicle";
import UpdateVehicle from "./components/UpdateVehicle";
import { toast } from "react-toastify";
import toastConfigs from "../../utils/toastConfigs";

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

        setReload(false);
    };

    useEffect(() => {
        requestData();
    }, []);

    useEffect(() => {
        if(reload){
            setTimeout(() => {
                requestData();
            }, 1000);
        }
    }, [reload]);

    const handleDetails = async() => {
        const detail = rows.find(r => r.id === id);

        if(detail !== undefined){
            setDetails(detail);
            setOptions(2);
        }
        else{
            setDetails(null);
            setOptions(0);
        }
    };

    const handleRemove = async() => {
        const response = await removeVehicle(id);

        if(response.status === 200){
            toast.success("Veículo removido com sucesso!", toastConfigs);
            setCanEdit(false);
            setCanRemove(false);
            setReload(true);
        }
        else{
            toast.error(response.data, toastConfigs);
        }
    };

    const handleOpenRegister = () => {
        setOptions(1);
    };

    const handleClickCell = (row) => {
        if(row !== undefined){
            setCanEdit(true);
            setCanRemove(true);
            setId(row.id);
        }
        else{
            setCanEdit(false);
            setCanRemove(false);
            setId(null);
        }
    };

    const handleBackToDatagrid = () => {
        setOptions(0);
        setCanEdit(false);
        setCanRemove(false);
    };

    const handleBackAndReload = () => {
        setOptions(0);
        setReload(true);
        setCanEdit(false);
        setCanRemove(false);
    };


    return <>
        <NavBar optionSelected={4}/>
        {
            options === 0 ?
                <Datagrid 
                    title="Veículos" 
                    columns={vehicleColumns} 
                    rows={rows} 
                    openRegister={setOptions} 
                    handleRemove={handleRemove} 
                    handleDetails={handleDetails} 
                    handleOpenRegister={handleOpenRegister} 
                    handleClickCell={handleClickCell} 
                    handleReload={handleBackAndReload} 
                    canEdit={canEdit} 
                    canRemove={canRemove}
                />
            :
            options === 1 ?
            <RegisterVehicle handleBackPage={handleBackToDatagrid} handleBackAndReload={handleBackAndReload}/>
            :
            <UpdateVehicle detail={details} handleBackPage={handleBackToDatagrid} handleBackAndReload={handleBackAndReload}/>
        }
    </>
};

export default Vehicle;