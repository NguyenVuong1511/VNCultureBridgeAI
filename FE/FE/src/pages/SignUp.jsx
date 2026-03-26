// src/pages/SignUp.jsx
import AuthLeft from "../components/auth/AuthLeft";
import AuthForm from "../components/auth/AuthForm";
import styles from "../components/auth/Auth.module.css";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className={styles.authPage}>
      <AuthLeft />
      <div className={styles.authRight}>
        <AuthForm type="signup" />
        <Link to="/" className={styles.link}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
