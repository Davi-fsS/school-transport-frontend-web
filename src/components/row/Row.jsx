import styles from "./style.module.scss";

const Row = ({children}) => {
    return <div className={styles.rowContainer}>
        {children}
    </div>
};

export default Row;