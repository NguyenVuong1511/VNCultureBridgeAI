import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./FooterDetail.module.css";

export default function FooterDetail() {
  const { t } = useTranslation();

  return (
    <div className={styles.bottom}>
      <p>© 2025 <span>VNCultureBridge AI</span> | {t("footer.bottom_credit")}</p>
    </div>
  );
}
