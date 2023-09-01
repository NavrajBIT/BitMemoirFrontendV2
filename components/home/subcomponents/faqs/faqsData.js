import BitBenefits from "./BitBenefits";

export const faqsData = [
    {
        question: "What is Bitmemoir?",
        answer:
            "BitMemoir is a unique blockchain-based platform focusing primarily on negating the possibility of creating fake credentials or fudging the documents. The aim is to develop and nurture an ecosystem of verified documents and journey mapping an individual’s life.",
    },
    {
        question: "How does Bitmemoir Work?",
        answer:
            "BitMemoir uses blockchain technology to create Non-Fungible Tokens (NFTs) for each certificate issued. These NFTs have a QR code embedded on them, which contain unique information (meta-data) about the certificate, including the issuer, recipient, and timestamp. The certificates can be securely stored in personal digital wallets and easily downloaded and shared with others for verification purposes.",
    },
    {
        question: "What are the benefits of using Bitmemoir?",
        answer: <BitBenefits />,
    },
    {
        question: "How can I verify a certificate issued through Bitmemoir?",
        answer:
            "To verify a certificate, simply scan the QR code on the certificate or enter the blockchain transaction details i.e. the contact address and the token ID in the Verify tab. The verification process will display the certificate details and confirm its authenticity.",
    },
    {
        question: "Can BitMemoir be integrated with existing systems?",
        answer:
            "Yes, BitMemoir provides integration options to seamlessly connect with existing platforms used by your organisation. This allows for automatic data synchronization and streamlined certificate issuance. For such integration requirements, write to us at support@beimagine.tech.",
    },
    {
        question: "Is Bitmemoir compatible with different types of documents?",
        answer:
            "Yes, BitMemoir can be used to issue and verify a wide range of documents, including academic degrees, diplomas, professional certifications, office memo, event certificates, event tickets etc.",
    },
    {
        question: "Is Bitmemoir secure?",
        answer:
            "Yes, BitMemoir employs advanced blockchain technology to ensure the security and integrity of documents. The decentralized nature of blockchain makes it highly resistant to hacking or data manipulation",
    },
    {
        question:
            "Can I share my NFTs on social media platforms or professional networks?",
        answer:
            "Yes, with the integration of BitWallet, sharing of NFTs on social media platforms and professional networks becomes fairly easy.",
    },
];