import { DataGrid, useGridApiContext } from '@mui/x-data-grid';
import NavBar from '../navBar/NavBar';
import Datagrid from '../../components/datagrid/Datagrid';
import { deviceColumns, schoolColumns } from '../../utils/columns';
import { useEffect, useState } from 'react';
import { deletePoint, getAllSchools } from '../../services/pointService';
import RegisterSchool from './components/RegisterSchool';
import UpdateSchool from './components/UpdateSchool';
import toastConfigs from '../../utils/toastConfigs';

import { toast } from 'react-toastify';
import { deleteDevice, getAllDevices } from '../../services/deviceService';
import moment from 'moment';

const Device = () => {
    const [rows, setRows] = useState([]);
    const [options, setOptions] = useState(0);
    const [reload, setReload] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [canRemove, setCanRemove] = useState(false);
    const [id, setId] = useState(null);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const requestData = async() => {
        const response = await getAllDevices();

        if(response.status === 200){
            const responseFormatted = response.data.map(item => ({
                id: item.id,
                name: item.name,
                code: item.code,
                driver: item.user.name,
                creation_date: moment(item.creation_date).format("DD/MM/YY HH:mm")
            }));
            setRows(responseFormatted);
        }   
        else{
            setRows([]);
        }

        setReload(false);
        setLoading(false);
    };

    useEffect(() => {
        requestData();
    }, []);

    useEffect(() => {
        if(reload){
            requestData();
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
        setLoading(true);

        const response = await deleteDevice(id);

        if(response.status === 200){
            toast.success("Dispositivo removido com sucesso!", toastConfigs);
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
        setLoading(true);
        setOptions(0);
        setReload(true);
        setCanEdit(false);
        setCanRemove(false);
    };

    return <>
        <NavBar optionSelected={5}/>
        {
            options === 0 ?
            <Datagrid title="Dispositivos" loading={loading} columns={deviceColumns} rows={rows} openRegister={setOptions} handleRemove={handleRemove} handleDetails={handleDetails} handleOpenRegister={handleOpenRegister} handleClickCell={handleClickCell} handleReload={handleBackAndReload} canEdit={canEdit} canRemove={canRemove}/>
            :
            options === 1 ?
            <RegisterSchool handleBackPage={handleBackToDatagrid} handleBackAndReload={handleBackAndReload}/>
            :
            <UpdateSchool detail={details} handleBackPage={handleBackToDatagrid} handleBackAndReload={handleBackAndReload}/>
        }
    </> 
};

export default Device;