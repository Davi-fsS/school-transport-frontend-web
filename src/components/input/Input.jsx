import { Search } from "@mui/icons-material";
import styles from "./style.module.scss";

const Input = ({button, placeholder, value, handleOnChange, required, disabled}) => {
    return <div className={styles.inputContainer}>
        <label>{placeholder} {required && <span className={styles.required}>*</span>}</label>
        <input onChange={handleOnChange} value={value} disabled={disabled}/>
        {
            button ? <button style={button.disabled ? {opacity: .5} : null} onClick={button.action} disabled={button.disabled}>
                <Search className={styles.icon}/>
            </button> : null
        }
    </div>
};

export default Input;