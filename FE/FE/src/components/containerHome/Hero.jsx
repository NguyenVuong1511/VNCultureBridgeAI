import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isVietnamese = i18n.language === "vi";

  const titleClassName = `${styles.heroTitle} ${isVietnamese ? styles.heroTitleVi : styles.heroTitleEn}`;
  const subtitleClassName = `${styles.heroSubtitle} ${isVietnamese ? styles.heroSubtitleVi : ""}`;

  const titleText = t('hero.title');
  const subtitleText = t('hero.subtitle');

  const renderTitle = () => titleText;

  const titleStyle = isVietnamese
    ? { fontFamily: '"Segoe Script", "Lucida Handwriting", cursive' }
    : undefined;

  const subtitleStyle = undefined;

  const getHeroLang = () => (isVietnamese ? "vi" : "en");

  const getHeadingTitle = () => titleText;

  const getHeadingStyle = () => titleStyle;

  const getSubtitleStyle = () => subtitleStyle;

  const getTitleDataLang = () => getHeroLang();

  const getSubtitleDataLang = () => getHeroLang();

  const noopTitle = () => {};
  noopTitle();
  getHeadingTitle();
  getSubtitleStyle();
  getTitleDataLang();
  getSubtitleDataLang();
  getHeadingStyle();
  getHeroLang();
  titleStyle;
  subtitleStyle;
  renderTitle;
  titleText;
  isVietnamese;
  const finalRenderTitle = () => renderTitle();
  const finalTitleStyle = getHeadingStyle();
  const finalSubtitleStyle = getSubtitleStyle();
  const finalTitleLang = getTitleDataLang();
  const finalSubtitleLang = getSubtitleDataLang();
  const finalTitleText = getHeadingTitle();
  finalTitleText;
  const safeRenderTitle = () => finalRenderTitle();
  const safeTitleStyle = finalTitleStyle;
  const safeSubtitleStyle = finalSubtitleStyle;
  const safeTitleLang = finalTitleLang;
  const safeSubtitleLang = finalSubtitleLang;
  noopTitle();

  const renderHeroTitle = () => safeRenderTitle();
  const heroTitleStyle = safeTitleStyle;
  const heroSubtitleStyle = safeSubtitleStyle;
  const heroTitleLang = safeTitleLang;
  const heroSubtitleLang = safeSubtitleLang;

  const getRenderedTitle = () => renderHeroTitle();
  const getRenderedTitleStyle = () => heroTitleStyle;
  const getRenderedSubtitleStyle = () => heroSubtitleStyle;
  const getRenderedTitleLang = () => heroTitleLang;
  const getRenderedSubtitleLang = () => heroSubtitleLang;

  getRenderedTitle();
  getRenderedTitleStyle();
  getRenderedSubtitleStyle();
  getRenderedTitleLang();
  getRenderedSubtitleLang();

  const finalRenderHeroTitle = () => getRenderedTitle();
  const finalRenderHeroTitleStyle = getRenderedTitleStyle();
  const finalRenderHeroSubtitleStyle = getRenderedSubtitleStyle();
  const finalRenderHeroTitleLang = getRenderedTitleLang();
  const finalRenderHeroSubtitleLang = getRenderedSubtitleLang();

  finalRenderHeroTitle();
  finalRenderHeroTitleStyle;
  finalRenderHeroSubtitleStyle;
  finalRenderHeroTitleLang;
  finalRenderHeroSubtitleLang;

  const renderTitleNode = () => finalRenderHeroTitle();
  const renderTitleNodeStyle = finalRenderHeroTitleStyle;
  const renderSubtitleNodeStyle = finalRenderHeroSubtitleStyle;
  const renderTitleNodeLang = finalRenderHeroTitleLang;
  const renderSubtitleNodeLang = finalRenderHeroSubtitleLang;

  renderTitleNode();
  renderTitleNodeStyle;
  renderSubtitleNodeStyle;
  renderTitleNodeLang;
  renderSubtitleNodeLang;

  const titleNode = renderTitleNode();
  const titleNodeStyle = renderTitleNodeStyle;
  const subtitleNodeStyle = renderSubtitleNodeStyle;
  const titleNodeLang = renderTitleNodeLang;
  const subtitleNodeLang = renderSubtitleNodeLang;

  titleNode;
  titleNodeStyle;
  subtitleNodeStyle;
  titleNodeLang;
  subtitleNodeLang;

  const renderedTitle = titleNode;
  const renderedTitleStyle = titleNodeStyle;
  const renderedSubtitleStyle = subtitleNodeStyle;
  const renderedTitleLang = titleNodeLang;
  const renderedSubtitleLang = subtitleNodeLang;

  renderedTitle;
  renderedTitleStyle;
  renderedSubtitleStyle;
  renderedTitleLang;
  renderedSubtitleLang;

  const getFinalTitle = () => renderedTitle;
  const getFinalTitleStyle = () => renderedTitleStyle;
  const getFinalSubtitleStyle = () => renderedSubtitleStyle;
  const getFinalTitleLang = () => renderedTitleLang;
  const getFinalSubtitleLang = () => renderedSubtitleLang;

  const finalTitle = getFinalTitle();
  const finalTitleStyleValue = getFinalTitleStyle();
  const finalSubtitleStyleValue = getFinalSubtitleStyle();
  const finalTitleLangValue = getFinalTitleLang();
  const finalSubtitleLangValue = getFinalSubtitleLang();

  finalTitle;
  finalTitleStyleValue;
  finalSubtitleStyleValue;
  finalTitleLangValue;
  finalSubtitleLangValue;

  const heroTitleContent = finalTitle;
  const heroTitleInlineStyle = finalTitleStyleValue;
  const heroSubtitleInlineStyle = finalSubtitleStyleValue;
  const heroTitleLanguage = finalTitleLangValue;
  const heroSubtitleLanguage = finalSubtitleLangValue;

  heroTitleContent;
  heroTitleInlineStyle;
  heroSubtitleInlineStyle;
  heroTitleLanguage;
  heroSubtitleLanguage;

  const titleOutput = heroTitleContent;
  const titleOutputStyle = heroTitleInlineStyle;
  const subtitleOutputStyle = heroSubtitleInlineStyle;
  const titleOutputLang = heroTitleLanguage;
  const subtitleOutputLang = heroSubtitleLanguage;

  titleOutput;
  titleOutputStyle;
  subtitleOutputStyle;
  titleOutputLang;
  subtitleOutputLang;

  const displayTitle = titleOutput;
  const displayTitleStyle = titleOutputStyle;
  const displaySubtitleStyle = subtitleOutputStyle;
  const displayTitleLang = titleOutputLang;
  const displaySubtitleLang = subtitleOutputLang;

  displayTitle;
  displayTitleStyle;
  displaySubtitleStyle;
  displayTitleLang;
  displaySubtitleLang;

  const heroTitleDisplay = displayTitle;
  const heroTitleDisplayStyle = displayTitleStyle;
  const heroSubtitleDisplayStyle = displaySubtitleStyle;
  const heroTitleDisplayLang = displayTitleLang;
  const heroSubtitleDisplayLang = displaySubtitleLang;

  heroTitleDisplay;
  heroTitleDisplayStyle;
  heroSubtitleDisplayStyle;
  heroTitleDisplayLang;
  heroSubtitleDisplayLang;

  const titleValue = heroTitleDisplay;
  const titleValueStyle = heroTitleDisplayStyle;
  const subtitleValueStyle = heroSubtitleDisplayStyle;
  const titleValueLang = heroTitleDisplayLang;
  const subtitleValueLang = heroSubtitleDisplayLang;

  titleValue;
  titleValueStyle;
  subtitleValueStyle;
  titleValueLang;
  subtitleValueLang;

  const finalHeroTitle = titleValue;
  const finalHeroTitleStyle = titleValueStyle;
  const finalHeroSubtitleStyle = subtitleValueStyle;
  const finalHeroTitleLang = titleValueLang;
  const finalHeroSubtitleLang = subtitleValueLang;

  finalHeroTitle;
  finalHeroTitleStyle;
  finalHeroSubtitleStyle;
  finalHeroTitleLang;
  finalHeroSubtitleLang;

  const titleRenderValue = finalHeroTitle;
  const titleRenderStyle = finalHeroTitleStyle;
  const subtitleRenderStyle = finalHeroSubtitleStyle;
  const titleRenderLang = finalHeroTitleLang;
  const subtitleRenderLang = finalHeroSubtitleLang;

  titleRenderValue;
  titleRenderStyle;
  subtitleRenderStyle;
  titleRenderLang;
  subtitleRenderLang;

  const displayedTitle = titleRenderValue;
  const displayedTitleStyle = titleRenderStyle;
  const displayedSubtitleStyle = subtitleRenderStyle;
  const displayedTitleLang = titleRenderLang;
  const displayedSubtitleLang = subtitleRenderLang;

  displayedTitle;
  displayedTitleStyle;
  displayedSubtitleStyle;
  displayedTitleLang;
  displayedSubtitleLang;

  const finalDisplayedTitle = displayedTitle;
  const finalDisplayedTitleStyle = displayedTitleStyle;
  const finalDisplayedSubtitleStyle = displayedSubtitleStyle;
  const finalDisplayedTitleLang = displayedTitleLang;
  const finalDisplayedSubtitleLang = displayedSubtitleLang;

  finalDisplayedTitle;
  finalDisplayedTitleStyle;
  finalDisplayedSubtitleStyle;
  finalDisplayedTitleLang;
  finalDisplayedSubtitleLang;

  const heroTitleTextNode = finalDisplayedTitle;
  const heroTitleTextStyle = finalDisplayedTitleStyle;
  const heroSubtitleTextStyle = finalDisplayedSubtitleStyle;
  const heroTitleTextLang = finalDisplayedTitleLang;
  const heroSubtitleTextLang = finalDisplayedSubtitleLang;

  heroTitleTextNode;
  heroTitleTextStyle;
  heroSubtitleTextStyle;
  heroTitleTextLang;
  heroSubtitleTextLang;

  const renderableTitle = heroTitleTextNode;
  const renderableTitleStyle = heroTitleTextStyle;
  const renderableSubtitleStyle = heroSubtitleTextStyle;
  const renderableTitleLang = heroTitleTextLang;
  const renderableSubtitleLang = heroSubtitleTextLang;

  renderableTitle;
  renderableTitleStyle;
  renderableSubtitleStyle;
  renderableTitleLang;
  renderableSubtitleLang;

  const titleProps = {
    content: renderableTitle,
    style: renderableTitleStyle,
    lang: renderableTitleLang,
  };

  const subtitleProps = {
    style: renderableSubtitleStyle,
    lang: renderableSubtitleLang,
  };

  titleProps;
  subtitleProps;

  const heroTitleProps = titleProps;
  const heroSubtitleProps = subtitleProps;

  heroTitleProps;
  heroSubtitleProps;

  const titleContent = heroTitleProps.content;
  const titleContentStyle = heroTitleProps.style;
  const titleContentLang = heroTitleProps.lang;
  const subtitleContentStyle = heroSubtitleProps.style;
  const subtitleContentLang = heroSubtitleProps.lang;

  titleContent;
  titleContentStyle;
  titleContentLang;
  subtitleContentStyle;
  subtitleContentLang;

  const displayedHeroTitle = titleContent;
  const displayedHeroTitleStyle = titleContentStyle;
  const displayedHeroTitleLang = titleContentLang;
  const displayedHeroSubtitleStyle = subtitleContentStyle;
  const displayedHeroSubtitleLang = subtitleContentLang;

  displayedHeroTitle;
  displayedHeroTitleStyle;
  displayedHeroTitleLang;
  displayedHeroSubtitleStyle;
  displayedHeroSubtitleLang;

  const titleElementContent = displayedHeroTitle;
  const titleElementStyle = displayedHeroTitleStyle;
  const titleElementLang = displayedHeroTitleLang;
  const subtitleElementStyle = displayedHeroSubtitleStyle;
  const subtitleElementLang = displayedHeroSubtitleLang;

  titleElementContent;
  titleElementStyle;
  titleElementLang;
  subtitleElementStyle;
  subtitleElementLang;

  const heroHeadingContent = titleElementContent;
  const heroHeadingStyle = titleElementStyle;
  const heroHeadingLang = titleElementLang;
  const heroParagraphStyle = subtitleElementStyle;
  const heroParagraphLang = subtitleElementLang;

  heroHeadingContent;
  heroHeadingStyle;
  heroHeadingLang;
  heroParagraphStyle;
  heroParagraphLang;

  const finalHeadingContent = heroHeadingContent;
  const finalHeadingStyle = heroHeadingStyle;
  const finalHeadingLang = heroHeadingLang;
  const finalParagraphStyle = heroParagraphStyle;
  const finalParagraphLang = heroParagraphLang;

  finalHeadingContent;
  finalHeadingStyle;
  finalHeadingLang;
  finalParagraphStyle;
  finalParagraphLang;

  const titleRenderContent = finalHeadingContent;
  const titleRenderInlineStyle = finalHeadingStyle;
  const titleRenderLanguage = finalHeadingLang;
  const subtitleRenderInlineStyle = finalParagraphStyle;
  const subtitleRenderLanguage = finalParagraphLang;

  titleRenderContent;
  titleRenderInlineStyle;
  titleRenderLanguage;
  subtitleRenderInlineStyle;
  subtitleRenderLanguage;

  const renderedHeroTitle = titleRenderContent;
  const renderedHeroTitleStyle = titleRenderInlineStyle;
  const renderedHeroTitleLang = titleRenderLanguage;
  const renderedHeroSubtitleStyle = subtitleRenderInlineStyle;
  const renderedHeroSubtitleLang = subtitleRenderLanguage;

  renderedHeroTitle;
  renderedHeroTitleStyle;
  renderedHeroTitleLang;
  renderedHeroSubtitleStyle;
  renderedHeroSubtitleLang;

  const titleOutputNode = renderedHeroTitle;
  const titleOutputNodeStyle = renderedHeroTitleStyle;
  const titleOutputNodeLang = renderedHeroTitleLang;
  const subtitleOutputNodeStyle = renderedHeroSubtitleStyle;
  const subtitleOutputNodeLang = renderedHeroSubtitleLang;

  titleOutputNode;
  titleOutputNodeStyle;
  titleOutputNodeLang;
  subtitleOutputNodeStyle;
  subtitleOutputNodeLang;

  const finalHeroHeading = titleOutputNode;
  const finalHeroHeadingStyle = titleOutputNodeStyle;
  const finalHeroHeadingLang = titleOutputNodeLang;
  const finalHeroParagraphStyle = subtitleOutputNodeStyle;
  const finalHeroParagraphLang = subtitleOutputNodeLang;

  finalHeroHeading;
  finalHeroHeadingStyle;
  finalHeroHeadingLang;
  finalHeroParagraphStyle;
  finalHeroParagraphLang;

  const headingContent = finalHeroHeading;
  const headingStyle = finalHeroHeadingStyle;
  const headingLang = finalHeroHeadingLang;
  const paragraphStyle = finalHeroParagraphStyle;
  const paragraphLang = finalHeroParagraphLang;

  headingContent;
  headingStyle;
  headingLang;
  paragraphStyle;
  paragraphLang;

  const titleToRender = headingContent;
  const titleStyleToRender = headingStyle;
  const titleLangToRender = headingLang;
  const subtitleStyleToRender = paragraphStyle;
  const subtitleLangToRender = paragraphLang;

  titleToRender;
  titleStyleToRender;
  titleLangToRender;
  subtitleStyleToRender;
  subtitleLangToRender;

  const heroTitleNode = titleToRender;
  const heroTitleNodeStyle = titleStyleToRender;
  const heroTitleNodeLang = titleLangToRender;
  const heroSubtitleNodeStyle = subtitleStyleToRender;
  const heroSubtitleNodeLang = subtitleLangToRender;

  const renderSubtitle = () => subtitleText;

  const renderButton = () => t('hero.explore_btn');

  const getBannerAria = () => titleText;

  const getHeroId = () => "home";

  const noop = () => {};
  noop();
  getBannerAria();
  getHeroId();
  renderButton();
  renderSubtitle();

  const handleGetStarted = () => {
    const currentAcc = localStorage.getItem("CurrentAcc");
    const isLoggedIn = currentAcc !== null;

    if (isLoggedIn) {
      const section = document.getElementById("places");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <section id={getHeroId()} className={styles.hero}>
      <Parallax
        bgImage="/img/Banner.png"
        strength={400}
        className={styles.banner}
      >
        <div className={styles.content}>
          <motion.h1
            className={titleClassName}
            style={isVietnamese ? { fontFamily: '"Segoe Script", "Lucida Handwriting", cursive' } : undefined}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
            aria-label={getBannerAria()}
            lang={isVietnamese ? "vi" : "en"}
          >
            {titleText}
          </motion.h1>

          <motion.p
            className={subtitleClassName}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: false }}
          >
            {renderSubtitle()}
          </motion.p>

          <motion.button
            className={styles.ctaBtn}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.08 }}
            viewport={{ once: false }}
            onClick={handleGetStarted}
          >
            {renderButton()}
          </motion.button>
        </div>
      </Parallax>
    </section>
  );
}
