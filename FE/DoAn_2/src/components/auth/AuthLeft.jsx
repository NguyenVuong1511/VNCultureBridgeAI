import { useState, useEffect } from "react";
import styles from "./Auth.module.css";

export default function AuthLeft() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // Preload image để tối ưu
        const img = new Image();
        img.src = "/img/Vn.webp";
        img.onload = () => setImageLoaded(true);
        img.onerror = () => setImageError(true);
    }, []);

    return (
        <div 
            className={`${styles.authLeft} ${imageLoaded ? styles.loaded : ''} ${imageError ? styles.error : ''}`}
        >
            {/* Loading placeholder - chỉ hiển thị khi chưa load */}
            {!imageLoaded && !imageError && (
                <div className={styles.imagePlaceholder}>
                    <div className={styles.skeleton}></div>
                </div>
            )}
        </div>
    );
}