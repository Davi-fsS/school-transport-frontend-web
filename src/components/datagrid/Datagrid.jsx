import { DataGrid } from "@mui/x-data-grid";
import styles from "./style.module.scss";

const Datagrid = ({title, rows, columns, handleDetails}) => {
    return <div className={styles.datagridContainer}>
        <div className={styles.datagridContent}>
            <div className={styles.datagridButtons}>
                <h2 className={styles.title}>{title}</h2>
                <button className={styles.buttonRegister}>Cadastrar</button>
            </div>
            <DataGrid 
                rows={rows} 
                columns={columns}
                onCellClick={handleDetails}
            />
        </div> 
    </div>
};

export default Datagrid;