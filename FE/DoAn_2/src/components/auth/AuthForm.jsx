// src/components/auth/AuthForm.jsx
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { useState, useEffect } from "react";
import logo from "/img/Logo.png"; // 👈 thay bằng logo thật của bạn

export default function AuthForm({ type = "signin" }) {
  const isSignIn = type === "signin";
  const navigate = useNavigate(); // 👈 Hook điều hướng

  // ✅ State lưu email, password và trạng thái hiển thị thông báo lỗi
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  // Reset form khi chuyển đổi giữa signin và signup
  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
    setShowError(false);
  }, [type]);

  const signin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("User")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    
    if(email === "admin@vnculturebridge.vn" && password === "admin123456") {
      localStorage.setItem("CurrentAcc", JSON.stringify({
        id: crypto.randomUUID(),
        username: "Admin",
        email: "admin@vnculturebridge.vn",
        password: "admin123456",
        avatar: undefined,
        role: "admin",
      }));
      setShowError(false);
      // ✅ Chuyển hướng sau 1 giây (cho cảm giác mượt)
      setTimeout(() => {
        navigate("/"); // 👈 chuyển về trang chủ
      }, 300);
    }
    else {
      if (foundUser) {
        localStorage.setItem("CurrentAcc", JSON.stringify(foundUser));
        setShowError(false);
        // ✅ Chuyển hướng sau 1 giây (cho cảm giác mượt)
        setTimeout(() => {
          navigate("/"); // 👈 chuyển về trang chủ
        }, 300);
      } else {
        // ❌ Sai tài khoản hoặc mật khẩu → hiện thông báo lỗi
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    }
  };
  // ✅ Hàm xử lý đăng ký
  const signup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("User")) || [];

    const isEmailExist = users.some((u) => u.email === email);
    if (isEmailExist) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Tạo user mới với đầy đủ thông tin
    const now = new Date().toISOString();
    const newUser = {
      id: crypto.randomUUID(),
      username,
      email,
      password,
      avatar: undefined, // Avatar có thể thêm sau ở trang Profile
      role: undefined, // Mặc định không có role (user thường)
      createdAt: now,
      updatedAt: now,
    };

    users.push(newUser);
    localStorage.setItem("User", JSON.stringify(users));
    localStorage.setItem("CurrentAcc", JSON.stringify(newUser));

    // Reset form
    setUsername("");
    setEmail("");
    setPassword("");
    
    alert("Tạo tài khoản thành công!");
    navigate("/");
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2>{isSignIn ? "Sign In" : "Create Account"}</h2>
      </div>

      <form className={styles.form} onSubmit={isSignIn ? signin : signup}>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Username"
            required
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email address"
          required
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
      </form>

      {/* ✅ Hiển thị lỗi khi showError = true */}
      {showError && (
        <p className={styles.notification}>
          {isSignIn
            ? "Email or password is incorrect!"
            : "The account already exists!"}
        </p>
      )}

      <p className={styles.text}>
        {isSignIn ? (
          <>
            Don’t have an account?{" "}
            <Link to="/signup" className={styles.link}>
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link to="/signin" className={styles.link}>
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
