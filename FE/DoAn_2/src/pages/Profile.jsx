import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaArrowLeft, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import styles from "../components/profile/Profile.module.css";

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [users, setUsers] = useState(() => {
    const raw = localStorage.getItem("User");
    return raw ? JSON.parse(raw) : [];
  });
  const [me, setMe] = useState(() => {
    const raw = localStorage.getItem("CurrentAcc");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (!me) {
      navigate("/signin", { replace: true });
    } else {
      // Sync state khi user data thay đổi
      setUsername(me.username || "");
      setAvatar(me.avatar || "");
    }
  }, [me, navigate]);

  const [username, setUsername] = useState(me?.username || "");
  const [avatar, setAvatar] = useState(me?.avatar || "");
  const email = useMemo(() => me?.email || "", [me]);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");
  
  // Xử lý upload avatar từ file
  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra kích thước file (tối đa 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setMsg("Kích thước ảnh không được vượt quá 2MB!");
        setMsgType("error");
        setTimeout(() => setMsg(""), 3000);
        return;
      }
      
      // Kiểm tra định dạng file
      if (!file.type.startsWith('image/')) {
        setMsg("Vui lòng chọn file ảnh!");
        setMsgType("error");
        setTimeout(() => setMsg(""), 3000);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // reader.result là base64 string
        setMsg("Ảnh đã được tải lên thành công!");
        setMsgType("success");
        setTimeout(() => setMsg(""), 3000);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Xử lý username với giới hạn 20 ký tự
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setUsername(value);
    }
  };

  const saveProfile = (e) => {
    e.preventDefault();
    if (!me) return;
    
    // Validation: Kiểm tra username không được trống
    if (!username.trim()) {
      setMsg("Display name cannot be left blank!");
      setMsgType("error");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    
    // Validation: Kiểm tra độ dài username (tối đa 20 ký tự)
    if (username.length > 20) {
      setMsg("Display name must not exceed 20 characters!");
      setMsgType("error");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    
    const now = new Date().toISOString();
    const updated = { 
      ...me, 
      username: username.trim(), 
      avatar: avatar || undefined,
      updatedAt: now 
    };
    const nextUsers = users.map((u) => 
      u.id === me.id 
        ? { ...u, username: username.trim(), avatar: avatar || undefined, updatedAt: now }
        : u
    );
    setUsers(nextUsers);
    localStorage.setItem("User", JSON.stringify(nextUsers));
    localStorage.setItem("CurrentAcc", JSON.stringify(updated));
    setMe(updated);
    setMsg("Profile updated successfully!");
    setMsgType("success");
    setTimeout(() => setMsg(""), 3000);
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (!me) return;
    
    // Validation: Kiểm tra các trường không được trống
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMsg("Please fill in all the fields!");
      setMsgType("error");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    
    // Validation: Kiểm tra mật khẩu cũ đúng không
    if (oldPassword !== me.password) {
      setMsg("The old password is incorrect!");
      setMsgType("error");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    
    // Validation: Kiểm tra độ dài mật khẩu mới (tối thiểu 6, tối đa 50 ký tự)
    if (newPassword.length < 6) {
      setMsg("The new password must be at least 6 characters long!");
      setMsgType("error");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    
    if (newPassword.length > 50) {
      setMsg("The new password must not exceed 50 characters!");
      setMsgType("error");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    
    // Validation: Kiểm tra mật khẩu mới khác mật khẩu cũ
    if (newPassword === oldPassword) {
      setMsg("The new password must be different from the old password!");
      setMsgType("error");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    
    // Validation: Kiểm tra xác nhận mật khẩu
    if (newPassword !== confirmPassword) {
      setMsg("Password confirmation does not match!");
      setMsgType("error");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    
    const now = new Date().toISOString();
    const updated = { ...me, password: newPassword, updatedAt: now };
    const nextUsers = users.map((u) => 
      u.id === me.id ? { ...u, password: newPassword, updatedAt: now } : u
    );
    setUsers(nextUsers);
    localStorage.setItem("User", JSON.stringify(nextUsers));
    localStorage.setItem("CurrentAcc", JSON.stringify(updated));
    setMe(updated);
    setOldPassword(""); 
    setNewPassword(""); 
    setConfirmPassword("");
    setMsg("Password changed successfully!");
    setMsgType("success");
    setTimeout(() => setMsg(""), 3000);
  };

  if (!me) return null;

  return (
    <div className={styles.profilePage}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.backBtn}>
            <FaArrowLeft /> Back to Home
          </Link>
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              <img 
                src={avatar || "/img/avatar.png"} 
                alt="Profile" 
                className={styles.avatar}
              />
            </div>
            <div className={styles.profileInfo}>
              <h1 className={styles.profileName}>{username || "User"}</h1>
              <p className={styles.profileEmail}>
                <FaEnvelope /> {email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Tab Navigation */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "profile" ? styles.active : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser /> Personal Information
          </button>
          <button
            className={`${styles.tab} ${activeTab === "security" ? styles.active : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <FaLock /> Security
          </button>
        </div>

        {/* Message Alert */}
        {msg && (
          <div className={`${styles.alert} ${styles[msgType]}`}>
            {msgType === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
            <span>{msg}</span>
          </div>
        )}

        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <div className={styles.tabContent}>
            <form onSubmit={saveProfile} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <FaEnvelope className={styles.labelIcon} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className={`${styles.input} ${styles.disabled}`}
                  placeholder="your.email@example.com"
                />
                <p className={styles.helperText}>Email cannot be changed</p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <FaUser className={styles.labelIcon} />
                  Display Name
                  <span className={styles.charCount}>(Tối đa 20 ký tự: {username.length}/20)</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className={styles.input}
                  placeholder="Enter display name"
                  maxLength={20}
                />
                {username.length >= 18 && (
                  <p className={styles.warningText}>
                    You have almost used up the allowed number of characters.
                  </p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <FaUser className={styles.labelIcon} />
                  Avatar
                </label>
                <div className={styles.avatarInputGroup}>
                  <div className={styles.avatarUploadSection}>
                    <label className={styles.avatarUploadLabel}>
                      <span>📷 Upload the photo.</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileChange}
                        className={styles.avatarFileInput}
                      />
                    </label>
                    <span className={styles.orText}>or</span>
                    <input
                      type="url"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      className={styles.input}
                      placeholder="Enter the image URL (https://...)"
                    />
                    {avatar && (
                      <button
                        type="button"
                        onClick={() => setAvatar("")}
                        className={styles.removeAvatarBtn}
                      >
                        Delete Image
                      </button>
                    )}
                  </div>
                  {/* <div className={styles.avatarPreviewSmall}>
                    <img
                      src={avatar || "/img/avatar.png"}
                      alt="Avatar preview"
                      onError={(e) => {
                        e.target.src = "/img/avatar.png";
                      }}
                    />
                  </div> */}
                </div>
                <p className={styles.helperText}>
                  Maximum size: 2MB. Allowed formats: JPG, PNG, GIF.
                </p>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Save Changes
              </button>
            </form>
          </div>
        )}

        {/* Security Tab Content */}
        {activeTab === "security" && (
          <div className={styles.tabContent}>
            <form onSubmit={changePassword} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <FaLock className={styles.labelIcon} />
                  Current Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your current password"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <FaLock className={styles.labelIcon} />
                  New Password
                  <span className={styles.charCount}>(6-50 characters: {newPassword.length})</span>
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your new password"
                  maxLength={50}
                />
                {newPassword.length > 0 && newPassword.length < 6 && (
                  <p className={styles.errorText}>
                    The password must be at least 6 characters long.
                  </p>
                )}
                {newPassword.length >= 6 && newPassword === oldPassword && (
                  <p className={styles.errorText}>
                    The new password must be different from the old password.
                  </p>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <FaLock className={styles.labelIcon} />
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Confirm your new password"
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className={styles.errorText}>Passwords do not match</p>
                )}
              </div>

              <button type="submit" className={styles.submitBtn}>
                Change Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}


