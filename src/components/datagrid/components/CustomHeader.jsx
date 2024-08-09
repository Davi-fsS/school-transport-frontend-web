import * as React from 'react';
import { DataGrid, GridHeader } from '@mui/x-data-grid';
import styles from "../style.module.scss";

const CustomHeader = () => {

    return (
        <GridHeader className={styles.header}>
            {/* Seu conteúdo personalizado do cabeçalho aqui */}
        </GridHeader>
    );
};

export default CustomHeader;
