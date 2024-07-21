import { DataGrid, useGridApiContext } from '@mui/x-data-grid';
import NavBar from '../navBar/NavBar';
import Datagrid from '../../components/datagrid/Datagrid';
import { schoolColumns } from '../../utils/columns';
import { useEffect, useState } from 'react';
import { deleteSchool, getAllSchools, removeSchool } from '../../services/schoolService';
import RegisterSchool from './components/RegisterSchool';
import UpdateSchool from './components/UpdateSchool';
import toastConfigs from '../../utils/toastConfigs';
import { toast } from 'react-toastify';

const School = () => {
    const [rows, setRows] = useState([]);
    const [options, setOptions] = useState(0);
    const [reload, setReload] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [canRemove, setCanRemove] = useState(false);
    const [id, setId] = useState(null);
    const [details, setDetails] = useState(null);

    const requestData = async() => {
        const response = await getAllSchools();

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
            setDetails(detail);
            setOptions(2);
        }
        else{
            setDetails(null);
            setOptions(0);
        }
    };

    const handleRemove = async() => {
        const response = await deleteSchool(id);

        if(response.status === 200){
            toast.success("Escola removida com sucesso!", toastConfigs);
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
        <NavBar optionSelected={3}/>
        {
            options === 0 ?
            <Datagrid title="Escolas" columns={schoolColumns} rows={rows} openRegister={setOptions} handleRemove={handleRemove} handleDetails={handleDetails} handleOpenRegister={handleOpenRegister} handleClickCell={handleClickCell} handleReload={handleBackAndReload} canEdit={canEdit} canRemove={canRemove}/>
            :
            options === 1 ?
            <RegisterSchool handleBackPage={handleBackToDatagrid} handleBackAndReload={handleBackAndReload}/>
            :
            <UpdateSchool detail={details} handleBackPage={handleBackToDatagrid} handleBackAndReload={handleBackAndReload}/>
        }
    </> 
};

export default School;