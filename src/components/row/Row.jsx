import styles from "./style.module.scss";

const Row = ({children, ...rest}) => {
    return <div className={styles.rowContainer} {...rest}>
        {children}
    </div>
};

export default Row;