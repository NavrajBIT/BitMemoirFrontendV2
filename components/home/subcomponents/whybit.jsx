import style from "../home.module.css";

const Whybit = () => {
  return (
    <div className={style.whybitContainer}>
      <div className={style.whybitfilter} />
      <div className={style.whybitSection}>
        <div
          className="whybitmemoirHeading"
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Why Bitmemoir
        </div>
        <div className={style.whybitContent}>
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              maxWidth: "var(--max-width-form)",
            }}
          >
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
            style={{
              fontSize: "1.1rem",
              textAlign: "justify",
              maxWidth: "var(--max-width-form)",
            }}
          >
            Revolutionizing the education landscape by the issuing legitimate
            and validated credentials, eliminating any chance of duplicity,
            forgery, or tampering with documents.
            <br />
            <br />
            This transformative approach ensures the authentication and
            verification of educational records, leaving no room for the
            existence or acceptance of counterfeit or deceitful certificates.
            <br />
            <br />
            By implementing such a system, the education ecosystem undergoes a
            profound change, offering a secure and reliable means of
            credentialing that safeguards the integrity and credibility of
            individuals' academic achievements.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whybit;
