import { useState } from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        setTimeout(() => {
            navigate("/homepage")
        }, 1000);
    };

    return <div className={styles.pageContainer}>
        <div className={styles.pageContent}>
            <h3 className={styles.title}>Realize seu Login</h3>
            <div>
                <input type="text" value={email} placeholder="Digite seu email" onChange={handleEmail}/>
                <input type="text" value={password} placeholder="Digite sua senha" onChange={handlePassword}/>
            </div>
            <button onClick={handleLogin} disabled={!(email && password)}>Entrar</button>
        </div>
    </div>
};

export default Login;