import { DataGrid, useGridApiContext } from '@mui/x-data-grid';
import NavBar from '../navBar/NavBar';
import Datagrid from '../../components/datagrid/Datagrid';
import { schoolColumns } from '../../utils/columns';
import { useEffect, useState } from 'react';
import { getAllSchools } from '../../services/schoolService';

const School = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const requestData = async() => {
            const response = await getAllSchools();

            if(response.status === 200){
                setRows(response.data);
            }   
            else{
                setRows([]);
            }
        };

        requestData();
    }, []);

    return <>
        <NavBar optionSelected={3}/>
        <Datagrid title="Escolas" columns={schoolColumns} rows={rows}/>
    </> 
};

export default School;