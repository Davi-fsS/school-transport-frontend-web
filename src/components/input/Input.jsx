import styles from "./style.module.scss";

const Input = ({labelName, placeholder, value, handleOnChange}) => {
    return <div className={styles.inputContainer}>
        <label>{labelName}</label>
        <input placeholder={placeholder} onChange={handleOnChange} value={value}/>
    </div>
};

export default Input;