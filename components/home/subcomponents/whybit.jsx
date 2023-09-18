import styles from "../home.module.css";

const Whybit = () => {
  return (
    <div className={styles.whybitContainer}>
      <div className={styles.whybitfilter} />
      <div className={styles.whybitSection}>
        <div className={styles.whyBitHeading}>
          Why Bitmemoir
        </div>
        <div className={styles.whybitContent}>
          <div className={styles.demoVideo}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/YDsqedqmF84"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div
            className={styles.whyBitText}
          >
            Revolutionizing the education landscape by the issuing legitimate
            and validated credentials, eliminating any chance of duplicity,
            forgery, or tampering with documents. This transformative approach
            ensures the authentication and verification of educational records,
            leaving no room for the existence or acceptance of counterfeit or
            deceitful certificates. By implementing such a system, the education
            ecosystem undergoes a profound change, offering a secure and
            reliable means of credentialing that safeguards the integrity and
            credibility of individuals' academic achievements.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whybit;
