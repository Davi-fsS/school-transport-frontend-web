import { DataGrid } from "@mui/x-data-grid";
import styles from "./style.module.scss";
import ReactLoading from "react-loading";
import { Add, Delete, Edit, Replay } from "@mui/icons-material";
import CustomHeader from "./components/CustomHeader";

const Datagrid = ({title, rows, columns, handleReload, handleClickCell, handleRemove, handleDetails, handleOpenRegister, canEdit, canRemove, loading}) => {
    return <div className={styles.datagridContainer}>
        <div className={styles.datagridContent}>
            <div className={styles.datagridButtons}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.iconContainer}>
                    {
                        canRemove && <Delete className={styles.icon} titleAccess="Remover" onClick={handleRemove}/>
                    }
                    {
                        canEdit && <Edit className={styles.icon} titleAccess="Editar" onClick={handleDetails}/>
                    }
                    <Add className={styles.icon} titleAccess="Cadastrar" onClick={handleOpenRegister}/>
                    <Replay className={styles.icon} titleAccess="Recarregar" onClick={handleReload}/>
                </div>
            </div>
            <DataGrid 
                rows={rows} 
                columns={columns}
                onCellClick={handleClickCell}
                loading={loading}
                sx={{
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#BC6C19',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        color: 'white',
                        fontWeight: 'bold'
                    },
                }}
            />
        </div> 
    </div>
};

export default Datagrid;