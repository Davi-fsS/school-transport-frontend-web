import { DataGrid } from "@mui/x-data-grid";
import styles from "./style.module.scss";

const Datagrid = ({title, rows, columns, handleReload, handleClickCell, handleRemove, handleDetails, handleOpenRegister, canEdit, canRemove}) => {
    return <div className={styles.datagridContainer}>
        <div className={styles.datagridContent}>
            <div className={styles.datagridButtons}>
                <h2 className={styles.title}>{title}</h2>
                <div>
                    {
                        canRemove && <button className={styles.buttonRemove} onClick={handleRemove}>Remover</button>
                    }
                    {
                        canEdit && <button className={styles.buttonEdit} onClick={handleDetails}>Editar</button>
                    }
                    <button className={styles.buttonRegister} onClick={handleOpenRegister}>Cadastrar</button>
                    <button className={styles.buttonReload} onClick={handleReload}>Recarregar</button>
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