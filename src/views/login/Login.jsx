import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import toastConfigs from "../../utils/toastConfigs";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { getUserByEmail } from "../../services/userService";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState("password");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(showPassword){
            setPasswordVisibility("text");
        }
        else{
            setPasswordVisibility("password");
        }
    }, [showPassword]);
    
    const handleShowPasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginAdmin = async(e) => {
        setLoading(true);

        e.preventDefault();
        const user = await getUserByEmail(email);

        if(user.status === 200){
            if(user.data.user_type_id === 1){
                await handleFirebaseLogin();
            }
            else{
                toast.error("Credencias inválidas", toastConfigs);
            }
        }
        else{
            toast.error("Credenciais inválidas", toastConfigs);
        }

        setLoading(false);
    };

    const handleFirebaseLogin = async() => {
        try{
            const user = await signInWithEmailAndPassword(auth, email, password);

            if(user){
                toast.success("Login realizado com sucesso!", toastConfigs);
                navigate("/homepage");
            }
        }
        catch(error){
            toast.error("Credenciais inválidas", toastConfigs);
        }
    };

    return <div className={styles.pageContainer}>
        <div className={styles.pageContent}>
            <h3 className={styles.title}>Login Administrador</h3>
            <div className={styles.loginContent}>
                <input type="text" value={email} placeholder="Email" onChange={handleEmail}/>
                <div className={styles.inputPassword}>
                    <input type={passwordVisibility} value={password} placeholder="Senha" onChange={handlePassword}/>
                    <div className={styles.icon} onClick={handleShowPasswordVisibility}>
                        {
                            showPassword ? 
                                <VisibilityOffIcon />
                                :
                                <VisibilityIcon  />
                        }
                    </div>
                </div>
            </div>
            <button type="submit" style={!(email && password) ? {opacity: 0.5} : null} className={styles.button} onClick={handleLoginAdmin} disabled={!(email && password)}>
                {
                    loading ? <ReactLoading color="#fff" type="bubbles" width={"40%"} height={"100%"}/> : "Entrar"
                }
            </button>
        </div>
    </div>
};

export default Login;