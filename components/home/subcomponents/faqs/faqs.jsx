import Accordian from "@/components/subcomponents/accordian/accordian";
const FAQ = ({ ln }) => {
  const faqs = [
    {
      question: {
        en: "What is Bitmemoir?",
        es: "¿Qué es BitMemoir?",
        ar: "ما هو Bitmemoir؟",
      },
      answer: {
        en: "BitMemoir is a unique blockchain-based platform focusing primarily on negating the possibility of creating fake credentials or fudging the documents. The aim is to develop and nurture an ecosystem of verified documents and journey mapping an individual’s life.",
        es: "BitMemoir es una plataforma única basada en blockchain que tiene como objetivo emitir credenciales verificables y auténticas o manipular documentos. El objetivo es desarrollar y nutrir un ecosistema de documentos verificados y mapas de viaje de la vida de un individuo.",
        ar: "BitMemoir عبارة عن منصة فريدة من نوعها تعتمد على blockchain وتركز بشكل أساسي على إلغاء إمكانية إنشاء بيانات اعتماد مزيفة أو تزوير المستندات. الهدف هو تطوير ورعاية نظام بيئي من الوثائق التي تم التحقق منها ورحلة رسم خرائط حياة الفرد.",
      },
    },
    {
      question: {
        en: "How does Bitmemoir Work?",
        es: "¿Cómo funciona Bitmemoir?",
        ar: "كيف يعمل Bitmemoir؟",
      },
      answer: {
        en: "BitMemoir uses blockchain technology to create Non-Fungible Tokens (NFTs) for each certificate issued. These NFTs have a QR code embedded on them, which contain unique information (meta-data) about the certificate, including the issuer, recipient, and timestamp. The certificates can be securely stored in personal digital wallets and easily downloaded and shared with others for verification purposes.",
        es: "BitMemoir utiliza la tecnología blockchain para crear tokens no fungibles (NFT) para cada certificado emitido. Estos NFT tienen un código QR integrado, que contiene información única (metadatos) sobre el certificado, incluido el emisor, el destinatario y la marca de tiempo. Los certificados pueden almacenarse de forma segura en billeteras digitales personales y descargarse y compartirse fácilmente con otras personas con fines de verificación.",
        ar: "يستخدم BitMemoir تقنية blockchain لإنشاء رموز غير قابلة للاستبدال (NFTs) لكل شهادة تم إصدارها. تحتوي NFTs هذه على رمز QR مضمن عليها، والذي يحتوي على معلومات فريدة (بيانات تعريفية) حول الشهادة، بما في ذلك المُصدر والمستلم والطابع الزمني. يمكن تخزين الشهادات بشكل آمن في محافظ رقمية شخصية ويمكن تنزيلها ومشاركتها بسهولة مع الآخرين لأغراض التحقق.",
      },
    },
    {
      question: {
        en: "What are the benefits of using Bitmemoir?",
        es: "¿Cuáles son los beneficios de utilizar Bitmemoir?",
        ar: "ما هي فوائد استخدام Bitmemoir؟",
      },
      answer: {
        en: <BitBenefits ln={"en"} />,
        es: <BitBenefits ln={"es"} />,
        ar: <BitBenefits ln={"ar"} />,
      },
    },
    {
      question: {
        en: "How can I verify a certificate issued through Bitmemoir?",
        es: "¿Cómo puedo verificar un certificado emitido a través de Bitmemoir?",
        ar: "كيف يمكنني التحقق من الشهادة الصادرة من خلال Bitmemoir؟",
      },
      answer: {
        en: "To verify a certificate, simply scan the QR code on the certificate or enter the blockchain transaction details i.e. the contact address and the token ID in the Verify tab. The verification process will display the certificate details and confirm its authenticity.",
        es: "Para verificar un certificado, simplemente escanee el código QR en el certificado o ingrese los detalles de la transacción de blockchain, es decir, la dirección de contacto y el ID del token en la pestaña Verificar. El proceso de verificación mostrará los detalles del certificado y confirmará su autenticidad.",
        ar: 'للتحقق من الشهادة، ما عليك سوى مسح رمز الاستجابة السريعة الموجود على الشهادة أو إدخال تفاصيل معاملة blockchain، أي عنوان جهة الاتصال ومعرف الرمز المميز في علامة التبويب "التحقق". ستعرض عملية التحقق تفاصيل الشهادة وتؤكد صحتها.',
      },
    },
    {
      question: {
        en: "Can BitMemoir be integrated with existing systems?",
        es: "¿Se puede integrar BitMemoir con los sistemas existentes?",
        ar: "هل يمكن دمج BitMemoir مع الأنظمة الحالية؟",
      },
      answer: {
        en: "Yes, BitMemoir provides integration options to seamlessly connect with existing platforms used by your organisation. This allows for automatic data synchronization and streamlined certificate issuance. For such integration requirements, write to us at support@beimagine.tech.",
        es: "Sí, BitMemoir ofrece opciones de integración para conectarse sin problemas con las plataformas existentes utilizadas por su organización. Esto permite la sincronización automática de datos y la emisión de certificados optimizada. Para dichos requisitos de integración, escríbanos a support@beimagine.tech.",
        ar: "نعم، يوفر BitMemoir خيارات تكامل للاتصال بسلاسة مع الأنظمة الأساسية الحالية التي تستخدمها مؤسستك. وهذا يسمح بمزامنة البيانات تلقائيًا وإصدار الشهادات بشكل مبسط. بالنسبة لمتطلبات التكامل هذه، راسلنا على support@beimagine.tech.",
      },
    },
    {
      question: {
        en: "Is Bitmemoir compatible with different types of documents?",
        es: "¿Bitmemoir es compatible con diferentes tipos de documentos?",
        ar: "هل Bitmemoir متوافق مع أنواع مختلفة من المستندات؟",
      },
      answer: {
        en: "Yes, BitMemoir can be used to issue and verify a wide range of documents, including academic degrees, diplomas, professional certifications, office memo, event certificates, event tickets etc.",
        es: "Sí, BitMemoir se puede utilizar para emitir y verificar una amplia gama de documentos, incluidos títulos académicos, diplomas, certificaciones profesionales, memorandos de oficina, certificados de eventos, entradas para eventos, etc.",
        ar: "نعم، يمكن استخدام BitMemoir لإصدار مجموعة واسعة من المستندات والتحقق منها، بما في ذلك الدرجات الأكاديمية والدبلومات والشهادات المهنية ومذكرات المكتب وشهادات الأحداث وتذاكر الأحداث وما إلى ذلك.",
      },
    },
    {
      question: {
        en: "Is Bitmemoir secure?",
        es: "¿Es seguro Bitmemoir?",
        ar: "هل Bitmemoir آمن؟",
      },
      answer: {
        en: "Yes, BitMemoir employs advanced blockchain technology to ensure the security and integrity of documents. The decentralized nature of blockchain makes it highly resistant to hacking or data manipulation",
        es: "Sí, BitMemoir emplea tecnología blockchain avanzada para garantizar la seguridad e integridad de los documentos. La naturaleza descentralizada de blockchain la hace altamente resistente a la piratería o manipulación de datos.",
        ar: "نعم، تستخدم BitMemoir تقنية blockchain المتقدمة لضمان أمان وسلامة المستندات. إن الطبيعة اللامركزية لـ blockchain تجعلها شديدة المقاومة للقرصنة أو التلاعب بالبيانات",
      },
    },
    {
      question: {
        en: "Can I share my NFTs on social media platforms or professional networks?",
        es: "¿Puedo compartir mis NFT en plataformas de redes sociales o redes profesionales?",
        ar: "هل يمكنني مشاركة NFTs الخاصة بي على منصات التواصل الاجتماعي أو الشبكات المهنية؟",
      },
      answer: {
        en: "Yes, with the integration of BitWallet, sharing of NFTs on social media platforms and professional networks becomes fairly easy.",
        es: "Sí, con la integración de BitWallet, compartir NFT en plataformas de redes sociales y redes profesionales se vuelve bastante fácil.",
        ar: "نعم، مع تكامل BitWallet، تصبح مشاركة NFTs على منصات التواصل الاجتماعي والشبكات المهنية أمرًا سهلاً إلى حد ما.",
      },
    },
  ];
  return (
    <section
      style={{
        backgroundColor: "var(--primary-110)",
        position: "relative",
        padding: "var(--padding-main)",
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          textAlign: "center",
          transform: "translateY(-50%)",
        }}
      >
        {ln === "en" && "FAQ's"}
        {ln === "es" && "Preguntas frecuentes"}
        {ln === "ar" && "الأسئلة الشائعة"}
      </div>
      <div>
        {faqs.map((faq, index) => {
          return (
            <Accordian
              heading={faq.question[ln]}
              text={faq.answer[ln]}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
};
export default FAQ;

const BitBenefits = ({ ln }) => {
  return (
    <div>
      {ln === "en" && "BitMemoir offers the following benefits:"}
      {ln === "es" && "BitMemoir ofrece los siguientes beneficios:"}
      {ln === "ar" && "يقدم BitMemoir المزايا التالية:"}
      <div
        style={{
          padding: "var(--padding-light)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--padding-light)",
        }}
      >
        <p>
          {ln === "en" &&
            "A. Enhanced security: BitMemoir leverages blockchain technology to ensure that certificates cannot be tampered with or forged."}
          {ln === "es" &&
            "A. Seguridad mejorada: BitMemoir aprovecha la tecnología blockchain para garantizar que los certificados no puedan ser manipulados ni falsificados."}
          {ln === "ar" &&
            "ج: الأمان المحسّن: تستفيد BitMemoir من تقنية blockchain لضمان عدم إمكانية التلاعب بالشهادات أو تزويرها."}
        </p>
        <p>
          {ln === "en" &&
            "B. Easy verification: Certificates can be easily verified by scanning the QR code or accessing the blockchain record."}
          {ln === "es" &&
            "B. Verificación sencilla: los certificados se pueden verificar fácilmente escaneando el código QR o accediendo al registro de blockchain."}
          {ln === "ar" &&
            "ب. التحقق السهل: يمكن التحقق من الشهادات بسهولة عن طريق مسح رمز الاستجابة السريعة أو الوصول إلى سجل blockchain."}
        </p>
        <p>
          {ln === "en" &&
            "C. Portability: Digital certificates can be stored in personal digital wallets and shared with other parties for verification purposes"}
          {ln === "es" &&
            "C. Portabilidad: los certificados digitales se pueden almacenar en billeteras digitales personales y compartir con otras partes con fines de verificación."}
          {ln === "ar" &&
            "ج. قابلية النقل: يمكن تخزين الشهادات الرقمية في محافظ رقمية شخصية ومشاركتها مع أطراف أخرى لأغراض التحقق"}
        </p>
        <p>
          {ln === "en" &&
            "D. Efficient issuance: BitMemoir streamlines the certificate issuance process, saving time and resources for the users."}
          {ln === "es" &&
            "D. Emisión eficiente: BitMemoir agiliza el proceso de emisión de certificados, ahorrando tiempo y recursos a los usuarios."}
          {ln === "ar" &&
            "د. الإصدار الفعال: يعمل BitMemoir على تبسيط عملية إصدار الشهادة، مما يوفر الوقت والموارد للمستخدمين."}
        </p>
        <p>
          {ln === "en" &&
            "E. Transparency: The blockchain record provides a transparent and immutable audit trail of document issuance and verification."}
          {ln === "es" &&
            "D. Emisión eficiente: BitMemoir agiliza el proceso de emisión de certificados, ahorrando tiempo y recursos a los usuarios."}
          {ln === "ar" &&
            "د. الإصدار الفعال: يعمل BitMemoir على تبسيط عملية إصدار الشهادة، مما يوفر الوقت والموارد للمستخدمين."}
        </p>
      </div>
    </div>
  );
};
