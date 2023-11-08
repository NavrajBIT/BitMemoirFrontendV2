import Image from "next/image";
import style from "../home.module.css";
import { text } from "../translation";

const products = [
  {
    title: { en: "NFT Utility", es: "Utilidad NFT", ar: "فائدة NFT" },
    description: {
      en: "Unlock new and unique possibilities in the digital realm by enabling unique digital ownership and facilitating seamless transactions with enhanced provenance, scarcity, and programmability.",
      es: "Desbloquee posibilidades nuevas y únicas en el ámbito digital permitiendo una propiedad digital única y facilitando transacciones fluidas con mayor procedencia, escasez y programabilidad.",
      ar: "أطلق العنان لإمكانيات جديدة وفريدة من نوعها في المجال الرقمي من خلال تمكين الملكية الرقمية الفريدة وتسهيل المعاملات السلسة مع تعزيز المصدر والندرة وقابلية البرمجة.",
    },
  },
  {
    title: {
      en: "NFT as Souvenirs",
      es: "NFT como souvenirs",
      ar: "NFT كتذكارات",
    },
    description: {
      en: "A modern way to collect and preserve memories and create a lasting connection between the brands and its customers, allowing owning and commemorating unique moments, events, or experiences in a secure and verifiable way.",
      es: "Una forma moderna de recopilar y preservar recuerdos y crear una conexión duradera entre las marcas y sus clientes, permitiendo poseer y conmemorar momentos, eventos o experiencias únicas de forma segura y verificable.",
      ar: "طريقة حديثة لجمع الذكريات والحفاظ عليها وإنشاء اتصال دائم بين العلامات التجارية وعملائها، مما يسمح بامتلاك اللحظات أو الأحداث أو التجارب الفريدة والاحتفال بها بطريقة آمنة ويمكن التحقق منها.",
    },
  },
  {
    title: { en: "Dynamic NFTs", es: "NFT dinámicas", ar: "NFTs الديناميكية" },
    description: {
      en: "Bring interactivity and programmability to the world of digital collectibles. This initiative will enable NFTs to change, adapt, and respond to various conditions or inputs, thereby, offering a unique experience, creating new possibilities for engagement and creativity within the NFT ecosystem.",
      es: "Lleve la interactividad y la programabilidad al mundo de los coleccionables digitales. Esta iniciativa permitirá a las NFT cambiar, adaptarse y responder a diversas condiciones o entradas, ofreciendo así una experiencia única y creando nuevas posibilidades de participación y creatividad dentro del ecosistema NFT.",
      ar: "جلب التفاعل وقابلية البرمجة إلى عالم المقتنيات الرقمية. وستمكن هذه المبادرة NFTs من التغيير والتكيف والاستجابة لمختلف الظروف أو المدخلات، وبالتالي تقديم تجربة فريدة من نوعها، وخلق إمكانيات جديدة للمشاركة والإبداع داخل النظام البيئي NFT.s",
    },
  },
  {
    title: {
      en: "Non Custodial wallet",
      es: "Cartera sin custodia",
      ar: "المحفظة غير الاحتجازية",
    },
    description: {
      en: "Owing to the increasing need of a NFT-friendly decentralised wallet, we present, BitWallet, which is both NFT and crypto friendly and with a super-simple UI/UX, will enhance the overall web3 experience for users.",
      es: "Debido a la creciente necesidad de una billetera descentralizada compatible con NFT, presentamos BitWallet, que es compatible tanto con NFT como con criptomonedas y con una UI/UX súper simple, mejorará la experiencia web3 general para los usuarios.",
      ar: "نظرًا للحاجة المتزايدة إلى محفظة لا مركزية صديقة لـ NFT، نقدم لك BitWallet، وهي صديقة لـ NFT والعملات المشفرة مع واجهة مستخدم/UX فائقة البساطة، ستعزز تجربة web3 الشاملة للمستخدمين.",
    },
  },
  {
    title: {
      en: "Digital Credentials",
      es: "Credenciales digitales",
      ar: "أوراق الاعتماد الرقمية",
    },
    description: {
      en: "A secure and verifiable way to represent and authenticate individuals qualifications, skills, and achievements.Offering digital credentials will offer convenience, efficiency, and trust, revolutionizing the way credentials are issued, shared, and verified.",
      es: "Una forma segura y verificable de representar y autenticar las calificaciones, habilidades y logros de las personas. Ofrecer credenciales digitales ofrecerá comodidad, eficiencia y confianza, revolucionando la forma en que se emiten, comparten y verifican las credenciales.",
      ar: "طريقة آمنة ويمكن التحقق منها لتمثيل مؤهلات الأفراد ومهاراتهم وإنجازاتهم والمصادقة عليها. وسيوفر تقديم بيانات الاعتماد الرقمية الراحة والكفاءة والثقة، مما سيحدث ثورة في طريقة إصدار بيانات الاعتماد ومشاركتها والتحقق منها.",
    },
  },
  {
    title: {
      en: "Authentication and Verification",
      es: "Autenticación y Verificación",
      ar: "المصادقة والتحقق",
    },
    description: {
      en: "Negate the possibility of fake or fudged documents by verifying and authenticating the metadata of the digital documents using BitMemoir’s Verification service",
      es: "Evite la posibilidad de documentos falsos o falsificados verificando y autenticando los metadatos de los documentos digitales utilizando el servicio de verificación de BitMemoir.",
      ar: "تخلص من احتمالية وجود مستندات مزورة أو مزورة عن طريق التحقق من البيانات الوصفية للمستندات الرقمية والمصادقة عليها باستخدام خدمة التحقق من BitMemoir",
    },
  },
  {
    title: {
      en: "NFT Loyalty Programme",
      es: "Programa de fidelización NFT",
      ar: "برنامج الولاء NFT",
    },
    description: {
      en: "A unique initiative that enables using Non-fungible tokens (NFTs) as loyalty/reward points and coupons to engage with the customers. These NFTs may either be redeemed for multiple rewards from brands or further transferred to family, friends or acquaintances as a gift, giving brands an increased customer base.",
      es: "Una iniciativa única que permite el uso de tokens no fungibles (NFT) como puntos de fidelidad/recompensa y cupones para interactuar con los clientes. Estos NFT pueden canjearse por múltiples recompensas de marcas o transferirse a familiares, amigos o conocidos como regalo, brindando a las marcas una mayor base de clientes.",
      ar: "مبادرة فريدة تتيح استخدام الرموز غير القابلة للاستبدال (NFTs) كنقاط ولاء/مكافأة وكوبونات للتواصل مع العملاء. يمكن استبدال NFTs هذه بمكافآت متعددة من العلامات التجارية أو نقلها إلى العائلة أو الأصدقاء أو المعارف كهدية، مما يمنح العلامات التجارية قاعدة عملاء متزايدة.",
    },
  },
  {
    title: {
      en: "Skills Passport",
      es: "Pasaporte de habilidades",
      ar: "جواز سفر المهارات",
    },
    description: {
      en: "An initiative towards creating a digital repository of verified documents and credentials for students,mapping their interests and skills, allowing them to create profiles that highlight their unique skill sets and experiences.",
      es: "Una iniciativa para crear un depósito digital de documentos y credenciales verificados para estudiantes, mapeando sus intereses y habilidades, permitiéndoles crear perfiles que destaquen sus habilidades y experiencias únicas.",
      ar: "مبادرة تهدف إلى إنشاء مستودع رقمي للمستندات وأوراق الاعتماد التي تم التحقق منها للطلاب، ورسم خرائط لاهتماماتهم ومهاراتهم، مما يسمح لهم بإنشاء ملفات تعريف تسلط الضوء على مجموعات مهاراتهم وخبراتهم الفريدة.",
    },
  },
  {
    title: {
      en: "Medical Passport",
      es: "Pasaporte médico",
      ar: "جواز السفر الطبي",
    },
    description: {
      en: "An effort towards mapping the medical history, creating a repository of medical documents and making the tracking of past medical conditions and diagnosis easier, thus helping in correct medical diagnosis and advice.",
      es: "Un esfuerzo por mapear el historial médico, crear un repositorio de documentos médicos y facilitar el seguimiento de enfermedades y diagnósticos pasados, ayudando así a un correcto diagnóstico y asesoramiento médico.",
      ar: "جهد نحو رسم خريطة للتاريخ الطبي، وإنشاء مستودع للوثائق الطبية، وتسهيل تتبع الحالات الطبية السابقة والتشخيص، وبالتالي المساعدة في التشخيص والمشورة الطبية الصحيحة.",
    },
  },
];
const ProductSuite = ({ ln }) => {
  return (
    <section className={style.productSuiteContainer}>
      <div className={style.productSuite}>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            position: "absolute",
            top: "-1rem",
            left: "var(--padding-main)",
            color: "var(--primary-50)",
          }}
        >
          {text["Product Suite"][ln]}
        </div>
        <DesktopFeatures ln={ln} />
        <MobileFeatures ln={ln} />
      </div>
    </section>
  );
};
export default ProductSuite;

const Illustration = () => (
  <div className={style.imageContainer}>
    <Image fill src={"/assets/images/productSuite.svg"} alt="Product Suite" />
  </div>
);

const Feature = ({ index, ln }) => (
  <div className={style.feature}>
    <div className={style.featureHeading}>{products[index]["title"][ln]}</div>
    <div className={style.featureDescription}>
      {products[index]["description"][ln]}
    </div>
  </div>
);

const DesktopFeatures = ({ ln }) => {
  return (
    <div className={style.desktopfeaturesContainer}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "var(--padding-main)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-main)",
          }}
        >
          <Feature index={1} ln={ln} />
          <Feature index={2} ln={ln} />
          <Feature index={3} ln={ln} />
        </div>
        <Illustration />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--padding-main)",
          }}
        >
          <Feature index={4} ln={ln} />
          <Feature index={5} ln={ln} />
          <Feature index={6} ln={ln} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "var(--padding-main)",
        }}
      >
        <Feature index={4} ln={ln} />
        <Feature index={5} ln={ln} />
        <Feature index={6} ln={ln} />
      </div>
    </div>
  );
};
const MobileFeatures = ({ ln }) => {
  return (
    <div className={style.mobilefeaturesContainer}>
      <Illustration />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "var(--padding-main)",
        }}
      >
        {products.map((_, index) => (
          <Feature index={index} ln={ln} key={"mobile-feature-" + index} />
        ))}
      </div>
    </div>
  );
};
