import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Auth.module.css";
import logo from "/img/Logo.png";
import { authApi } from "../../api/authApi";

const mapCurrentAcc = (user) => ({
  id: user.id,
  username: user.fullName || user.username,
  email: user.email,
  avatar: null,
  role: user.roles?.some((role) => String(role).toLowerCase().includes("admin")) ? "admin" : "user",
});

export default function AuthForm({ type = "signin" }) {
  const { t } = useTranslation();
  const isSignIn = type === "signin";
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
    setErrorMessage("");
  }, [type]);

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 3000);
  };

  const handleSuccess = (data) => {
    localStorage.setItem("AccessToken", data.accessToken);
    localStorage.setItem("CurrentAcc", JSON.stringify(mapCurrentAcc(data.user)));
    setTimeout(() => navigate("/"), 300);
  };

  const signin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      showError(t("auth.errors.required_signin"));
      return;
    }

    setIsSubmitting(true);
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("CurrentAcc");

    const result = await authApi.login({
      username: username.trim(),
      password,
    });

    setIsSubmitting(false);

    if (!result?.success || !result?.data) {
      showError(result?.message || t("auth.errors.invalid_credentials"));
      return;
    }

    handleSuccess(result.data);
  };

  const signup = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password) {
      showError(t("auth.errors.required_signup"));
      return;
    }

    setIsSubmitting(true);
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("CurrentAcc");

    const result = await authApi.register({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    setIsSubmitting(false);

    if (!result?.success || !result?.data) {
      showError(result?.message || t("auth.errors.signup_failed"));
      return;
    }

    handleSuccess(result.data);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2>{isSignIn ? t("auth.signin_title") : t("auth.signup_title")}</h2>
      </div>

      <form className={styles.form} onSubmit={isSignIn ? signin : signup}>
        <input
          type="text"
          placeholder={t("auth.username")}
          required
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        {!isSignIn && (
          <input
            type="email"
            placeholder={t("auth.email")}
            required
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        )}

        <input
          type="password"
          placeholder={t("auth.password")}
          required
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isSignIn ? "current-password" : "new-password"}
        />

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? t("auth.processing") : isSignIn ? t("auth.signin_button") : t("auth.signup_button")}
        </button>
      </form>

      {errorMessage && <p className={styles.notification}>{errorMessage}</p>}

      <p className={styles.text}>
        {isSignIn ? (
          <>
            {t("auth.no_account")} {" "}
            <Link to="/signup" className={styles.link}>
              {t("auth.signup_link")}
            </Link>
          </>
        ) : (
          <>
            {t("auth.have_account")} {" "}
            <Link to="/signin" className={styles.link}>
              {t("auth.signin_link")}
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
