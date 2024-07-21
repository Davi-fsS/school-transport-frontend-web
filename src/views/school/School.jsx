import { DataGrid, useGridApiContext } from '@mui/x-data-grid';
import NavBar from '../navBar/NavBar';
import Datagrid from '../../components/datagrid/Datagrid';
import { schoolColumns } from '../../utils/columns';
import { useEffect, useState } from 'react';
import { getAllSchools } from '../../services/schoolService';
import RegisterSchool from './components/RegisterSchool';
import UpdateSchool from './components/UpdateSchool';

const School = () => {
    const [rows, setRows] = useState([]);
    const [options, setOptions] = useState(0);
    const [reload, setReload] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [id, setId] = useState(null);
    const [details, setDetails] = useState(null);

    useEffect(() => {
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

        requestData();
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

    const handleClickCell = (row) => {
        if(row !== undefined){
            setCanEdit(true);
            setId(row.id);
        }
        else{
            setCanEdit(false);
            setId(null);
        }
    };

    const handleBackToDatagrid = () => {
        setOptions(0);
        setCanEdit(false);
    };

    const handleBackAndReload = () => {
        setOptions(0);
        setReload(true);
        setCanEdit(false);
    };

    return <>
        <NavBar optionSelected={3}/>
        {
            options === 0 ?
            <Datagrid title="Escolas" columns={schoolColumns} rows={rows} openRegister={setOptions} handleDetails={handleDetails} handleClickCell={handleClickCell} canEdit={canEdit}/>
            :
            options === 1 ?
            <RegisterSchool handleBackPage={handleBackToDatagrid} handleBackAndReload={handleBackAndReload}/>
            :
            <UpdateSchool detail={details} handleBackPage={handleBackToDatagrid} handleBackAndReload={handleBackAndReload}/>
        }
    </> 
};

export default School;