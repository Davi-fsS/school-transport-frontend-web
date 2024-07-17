import { useState } from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        setLoading(true);

        setTimeout(() => {
            navigate("/homepage");
            setLoading(false);
        }, 1000);
    };

    return <div className={styles.pageContainer}>
        <div className={styles.pageContent}>
            <h3 className={styles.title}>Realize seu Login</h3>
            <div className={styles.loginContent}>
                <input type="text" value={email} placeholder="Digite seu email" onChange={handleEmail}/>
                <input type="text" value={password} placeholder="Digite sua senha" onChange={handlePassword}/>
            </div>
            <button style={!(email && password) ? {opacity: 0.5} : null} className={styles.button} onClick={handleLogin} disabled={!(email && password)}>
                {
                    loading ? <ReactLoading color="#fff" type="bubbles" width={"40%"} height={"100%"}/> : "Entrar"
                }
            </button>
        </div>
    </div>
};

export default Login;