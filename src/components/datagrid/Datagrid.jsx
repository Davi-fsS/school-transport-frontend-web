import { DataGrid } from "@mui/x-data-grid";
import styles from "./style.module.scss";

const Datagrid = ({title, rows, columns, handleClickCell, handleDetails, canEdit, openRegister}) => {
    const handleOpenRegister = () => {
        openRegister(1);
    };

    return <div className={styles.datagridContainer}>
        <div className={styles.datagridContent}>
            <div className={styles.datagridButtons}>
                <h2 className={styles.title}>{title}</h2>
                <div>
                    {
                        canEdit && <button className={styles.buttonEdit} onClick={handleDetails}>Editar</button>
                    }
                    <button className={styles.buttonRegister} onClick={handleOpenRegister}>Cadastrar</button>
                </div>
            </div>
            <DataGrid 
                rows={rows} 
                columns={columns}
                onCellClick={handleClickCell}
            />
        </div> 
    </div>
};

export default Datagrid;