import { useEffect, useState } from "react";
import { deleteSchool, getAllSchools } from "../../services/schoolService";
import RegisterDriver from "./components/RegisterDriver";
import { toast } from "react-toastify";
import toastConfigs from "../../utils/toastConfigs";
import { driverColumns, schoolColumns } from "../../utils/columns";
import NavBar from "../navBar/NavBar";
import Datagrid from "../../components/datagrid/Datagrid";
import { deleteDriver, getAllDrivers, getUserDetails } from "../../services/userService";
import UpdateDriver from "./components/UpdateDriver";

const Driver = () => {
    const [rows, setRows] = useState([]);
    const [options, setOptions] = useState(0);
    const [reload, setReload] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [canRemove, setCanRemove] = useState(false);
    const [id, setId] = useState(null);
    const [details, setDetails] = useState(null);

    const requestData = async() => {
        const response = await getAllDrivers();

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
            }, 1500);
        }
    }, [reload]);

    const handleDetails = async() => {
        const detail = rows.find(r => r.id === id);

        if(detail !== undefined){
            const details = await getUserDetails(detail.id)

            if(details.status === 200){
                setDetails(details.data);
                setOptions(2);
            }
            else{
                toast.error("Erro ao buscar os detalhes", toastConfigs);
                setDetails(null);
                setOptions(0);    
            }
        }
        else{
            setDetails(null);
            setOptions(0);
        }
    };

    const handleRemove = async() => {
        const response = await deleteDriver(id);

        if(response.status === 200){
            toast.success("Condutor removido com sucesso!", toastConfigs);
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
        <NavBar optionSelected={2}/>
        {
            options === 0 ?
            <Datagrid title="Motoristas" columns={driverColumns} rows={rows} openRegister={setOptions} handleRemove={handleRemove} handleDetails={handleDetails} handleOpenRegister={handleOpenRegister} handleClickCell={handleClickCell} handleReload={handleBackAndReload} canEdit={canEdit} canRemove={canRemove}/>
            :
            options === 1 ?
            <RegisterDriver handleBackPage={handleBackToDatagrid} handleBackAndReload={handleBackAndReload}/>
            :
            <UpdateDriver detail={details} handleBackPage={handleBackToDatagrid} handleBackAndReload={handleBackAndReload}/>
        }
    </> 
};

export default Driver;