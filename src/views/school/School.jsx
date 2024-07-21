import { DataGrid, useGridApiContext } from '@mui/x-data-grid';
import NavBar from '../navBar/NavBar';
import Datagrid from '../../components/datagrid/Datagrid';
import { schoolColumns } from '../../utils/columns';
import { useEffect, useState } from 'react';
import { getAllSchools } from '../../services/schoolService';
import RegisterSchool from './components/RegisterSchool';

const School = () => {
    const [rows, setRows] = useState([]);
    const [openRegister, setOpenRegister] = useState(false);
    const [reload, setReload] = useState(false);

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

    const handleBackToDatagrid = () => {
        setOpenRegister(false);
    };

    const handleBackAndReload = () => {
        setOpenRegister(false);
        setReload(true);
    };

    return <>
        <NavBar optionSelected={3}/>
        {
            !openRegister ?
            <Datagrid title="Escolas" columns={schoolColumns} rows={rows} openRegister={setOpenRegister}/>
            :
            <RegisterSchool handleBackPage={handleBackToDatagrid} handleBackAndReload={handleBackAndReload}/>
        }
    </> 
};

export default School;