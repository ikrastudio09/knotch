"use client";

import { useState } from "react";
import { Nunito, Inter } from "next/font/google";
import {
    ChevronDown,
    ChevronUp,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Lock,
    FileText,
    Globe,
    Database,
    UserPlus,
    Settings,
    Share2,
    CreditCard,
    Truck,
    Archive,
    Cookie,
    ShieldCheck,
    UserCheck,
    Scale,
    Link2,
    History,
    MapPin,
    Mail,
    Phone,
    UserRound,
} from "lucide-react";

// Headings use Nunito, body copy uses Inter — loaded via next/font and
// exposed as CSS variables, applied with Tailwind's arbitrary-value
// font utilities below.
const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "600", "700", "800"],
    variable: "--font-nunito",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-inter",
});

const HEADING_FONT = "font-[family-name:var(--font-nunito)]";
const BODY_FONT = "font-[family-name:var(--font-inter)]";

const sections = [
    {
        title: "Introduction",
        icon: <FileText className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: 'This Privacy Policy explains how Knotch ("Knotch", "we", "us", or "our") collects, uses, stores, processes, and protects information obtained from users of our website, products, and services.',
            },
            {
                type: "note",
                text: "By accessing, browsing, creating an account, placing an order, or otherwise using Knotch, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.",
            },
        ],
    },
    {
        title: "Applicability",
        icon: <Globe className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "This Privacy Policy applies to all users who access, browse, register, purchase from, or otherwise interact with the Knotch website.",
            },
            {
                type: "p",
                text: "Knotch currently operates within India. Information collected through the website is primarily processed and stored in India.",
            },
            {
                type: "note",
                text: "If you do not agree with this Privacy Policy, you should discontinue use of the website and services.",
            },
        ],
    },
    {
        title: "Information We Collect",
        icon: <Database className="w-5 h-5" />,
        content: [
            { type: "p", text: "To provide our services, we may collect information including:" },
            { type: "subheading", text: "Personal Information" },
            {
                type: "list",
                items: [
                    "Full Name",
                    "Email Address",
                    "Mobile Number",
                    "Shipping Address",
                    "Billing Address",
                    "Order History",
                    "Account Credentials",
                ],
            },
            { type: "subheading", text: "Technical Information" },
            {
                type: "list",
                items: [
                    "IP Address",
                    "Browser Information",
                    "Device Information",
                    "Operating System Information",
                    "Website Usage Data",
                ],
            },
            { type: "subheading", text: "Transaction Information" },
            { type: "list", items: ["Order Details", "Payment Status", "Purchase History"] },
            { type: "subheading", text: "Location Information" },
            {
                type: "p",
                text: "We may collect approximate location information where necessary for order fulfilment, fraud prevention, security purposes, or service improvement.",
            },
        ],
    },
    {
        title: "Account Creation",
        icon: <UserPlus className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Customers may be required to create an account to purchase products from Knotch.",
            },
            {
                type: "p",
                text: "Users are responsible for ensuring that all information provided during registration remains accurate, complete, and up to date.",
            },
        ],
    },
    {
        title: "How We Use Information",
        icon: <Settings className="w-5 h-5" />,
        content: [
            { type: "p", text: "We may use collected information to:" },
            {
                type: "list",
                items: [
                    "Create and manage customer accounts.",
                    "Process and fulfil orders.",
                    "Provide customer support.",
                    "Communicate regarding purchases and deliveries.",
                    "Improve website performance and user experience.",
                    "Prevent fraud and unauthorized activity.",
                    "Comply with legal obligations.",
                    "Conduct business analytics and internal research.",
                    "Send service-related communications.",
                ],
            },
            {
                type: "note",
                text: "In the future, Knotch may send promotional communications, newsletters, product launch announcements, offers, and marketing messages. Users may opt out of such communications where applicable.",
            },
        ],
    },
    {
        title: "Disclosure of Information",
        icon: <Share2 className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "We may share information with trusted third parties when reasonably necessary to operate our business, including:",
            },
            {
                type: "list",
                items: [
                    "Payment service providers.",
                    "Logistics and delivery partners.",
                    "Technology and hosting providers.",
                    "Customer support service providers.",
                    "Analytics and reporting providers.",
                    "Government or regulatory authorities where legally required.",
                ],
            },
            { type: "note", text: "We do not sell personal information to third parties." },
        ],
    },
    {
        title: "Payment Information",
        icon: <CreditCard className="w-5 h-5" />,
        content: [
            { type: "p", text: "Payments may be processed through third-party payment service providers such as Razorpay." },
            {
                type: "p",
                text: "Knotch does not store complete credit card, debit card, banking credentials, or payment authentication information.",
            },
            { type: "p", text: "Payment providers operate under their own privacy policies and security standards." },
        ],
    },
    {
        title: "Shipping Partners",
        icon: <Truck className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "To fulfil orders, Knotch may share necessary shipping information with logistics partners, including Shiprocket and associated courier providers.",
            },
            {
                type: "p",
                text: "Information shared is limited to what is reasonably necessary to process, ship, and deliver orders.",
            },
        ],
    },
    {
        title: "Data Retention",
        icon: <Archive className="w-5 h-5" />,
        content: [
            { type: "p", text: "Knotch retains personal information only for as long as reasonably necessary for:" },
            {
                type: "list",
                items: [
                    "Order fulfilment.",
                    "Customer support.",
                    "Legal compliance.",
                    "Fraud prevention.",
                    "Accounting and taxation requirements.",
                    "Legitimate business purposes.",
                ],
            },
            { type: "note", text: "Information may be retained for longer periods where required by applicable law." },
        ],
    },
    {
        title: "Cookies",
        icon: <Cookie className="w-5 h-5" />,
        content: [
            { type: "p", text: "Knotch maintains a separate Cookies Policy." },
            {
                type: "p",
                text: "For information regarding our use of cookies and similar technologies, please refer to the Cookies Policy available on our website.",
            },
        ],
    },
    {
        title: "Security",
        icon: <ShieldCheck className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "We implement reasonable technical, administrative, and organizational safeguards to protect information against unauthorized access, disclosure, alteration, misuse, or destruction.",
            },
            {
                type: "note",
                text: "No method of transmission over the internet or method of electronic storage is completely secure. Accordingly, Knotch cannot guarantee absolute security of information.",
            },
        ],
    },
    {
        title: "User Rights",
        icon: <UserCheck className="w-5 h-5" />,
        content: [
            { type: "p", text: "Subject to applicable law, users may:" },
            {
                type: "list",
                items: [
                    "Request access to their information.",
                    "Request correction of inaccurate information.",
                    "Request deletion of information where applicable.",
                    "Withdraw previously provided consent.",
                    "Opt out of marketing communications where available.",
                ],
            },
            { type: "p", text: "Requests may be submitted using the contact details provided below." },
        ],
    },
    {
        title: "Law Enforcement and Legal Disclosures",
        icon: <Scale className="w-5 h-5" />,
        content: [
            { type: "p", text: "Knotch may disclose information where reasonably necessary to:" },
            {
                type: "list",
                items: [
                    "Comply with legal obligations.",
                    "Respond to lawful requests.",
                    "Enforce legal rights.",
                    "Prevent fraud.",
                    "Protect users, customers, and the public.",
                ],
            },
        ],
    },
    {
        title: "Third-Party Links",
        icon: <Link2 className="w-5 h-5" />,
        content: [
            { type: "p", text: "The website may contain links to third-party websites or services." },
            { type: "p", text: "Knotch is not responsible for the privacy practices, content, or policies of third-party websites." },
        ],
    },
    {
        title: "Changes to This Policy",
        icon: <History className="w-5 h-5" />,
        content: [
            { type: "p", text: "Knotch reserves the right to modify, update, amend, or replace this Privacy Policy at any time." },
            { type: "p", text: "Updated versions become effective immediately upon publication on the website." },
            {
                type: "note",
                text: "Continued use of the website after changes constitutes acceptance of the revised Privacy Policy.",
            },
        ],
    },
    {
        title: "Governing Law and Jurisdiction",
        icon: <MapPin className="w-5 h-5" />,
        content: [
            { type: "p", text: "This Privacy Policy shall be governed by the laws of India." },
            {
                type: "p",
                text: "Any dispute arising out of or relating to this Privacy Policy shall be subject to the exclusive jurisdiction of the courts located in Sangli, Maharashtra.",
            },
        ],
    },
    {
        title: "Contact Information",
        icon: <Mail className="w-5 h-5" />,
        content: [{ type: "contact" }],
    },
];

function renderBlock(block, key) {
    switch (block.type) {
        case "subheading":
            return (
                <h4
                    key={key}
                    className={`${HEADING_FONT} text-sm font-bold uppercase tracking-wide text-gray-900 pt-2`}
                >
                    {block.text}
                </h4>
            );
        case "list":
            return (
                <ul
                    key={key}
                    className="list-disc list-outside pl-5 space-y-2 text-gray-700 text-[15px] sm:text-base"
                >
                    {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            );
        case "note":
            return (
                <div key={key} className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-800 font-medium text-sm">{block.text}</p>
                </div>
            );
        case "contact":
            return (
                <div key={key} className="grid sm:grid-cols-2 gap-5">
                    <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-black mt-0.5 shrink-0" />
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">Email</p>
                            <a
                                href="mailto:knotch99@gmail.com"
                                className="text-[15px] text-gray-800 hover:underline"
                            >
                                knotch99@gmail.com
                            </a>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-black mt-0.5 shrink-0" />
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                Contact Number
                            </p>
                            <a
                                href="tel:+918983985787"
                                className="text-[15px] text-gray-800 hover:underline"
                            >
                                +91 89839 85787
                            </a>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 sm:col-span-2">
                        <UserRound className="w-5 h-5 text-black mt-0.5 shrink-0" />
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                Grievance Officer
                            </p>
                            <p className="text-[15px] text-gray-800">Aditya Baldawa</p>
                        </div>
                    </div>
                </div>
            );
        default:
            return (
                <p key={key} className="text-gray-700 leading-relaxed font-light text-[15px] sm:text-base">
                    {block.text}
                </p>
            );
    }
}

export default function PrivacyPolicy() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    return (
        <main className={`${nunito.variable} ${inter.variable} ${BODY_FONT} min-h-screen bg-white text-black`}>
            {/* Header */}
            <div className="bg-black text-white">
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white text-black rounded-full mb-6">
                            <Lock className="w-10 h-10" />
                        </div>
                        <h1 className={`${HEADING_FONT} text-4xl md:text-6xl font-light tracking-wide mb-4`}>
                            PRIVACY POLICY
                        </h1>
                        <div className="w-24 h-px bg-white mx-auto mb-6"></div>
                        <p className={`${HEADING_FONT} text-lg font-light tracking-wider opacity-90`}>
                            KNOTCH
                        </p>
                        <p className="text-sm font-light opacity-70 mt-2">Last Updated: 16/06/2026</p>
                    </div>
                </div>
            </div>

            {/* Important Notice */}
            <div className="bg-red-50 border-l-4 border-red-500 mx-auto max-w-4xl mt-8">
                <div className="p-6">
                    <div className="flex items-center">
                        <AlertTriangle className="w-6 h-6 text-red-500 mr-3 shrink-0" />
                        <div>
                            <h3 className={`${HEADING_FONT} text-lg font-medium text-red-800`}>
                                Important Notice
                            </h3>
                            <p className="text-red-700 mt-1 text-[15px]">
                                Knotch does not sell your personal information to third parties. We
                                collect only what is reasonably necessary to process orders, prevent
                                fraud, and improve your experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Introduction */}
                <div className="mb-12">
                    <div className="bg-gray-50 p-8 border-l-4 border-black">
                        <p className="text-lg leading-relaxed font-light mb-4">
                            This Privacy Policy explains how Knotch collects, uses, stores, processes,
                            and protects information obtained from users of our website, products,
                            and services.
                        </p>
                        <p className="text-base leading-relaxed font-light opacity-80">
                            By accessing, browsing, creating an account, placing an order, or
                            otherwise using Knotch, you agree to the terms set out below.
                        </p>
                    </div>
                </div>

                {/* Quick Guide */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className={`${HEADING_FONT} font-medium text-lg mb-2`}>India-Based</h3>
                        <p className="text-gray-600 font-light text-sm">
                            Data processed &amp; stored in India
                        </p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className={`${HEADING_FONT} font-medium text-lg mb-2`}>No Data Sold</h3>
                        <p className="text-gray-600 font-light text-sm">
                            We never sell personal information
                        </p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className={`${HEADING_FONT} font-medium text-lg mb-2`}>Sangli Jurisdiction</h3>
                        <p className="text-gray-600 font-light text-sm">
                            Disputes governed by Indian law
                        </p>
                    </div>
                </div>

                {/* Expandable Sections */}
                <div className="space-y-4">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <button
                                onClick={() => toggleSection(index)}
                                className="w-full px-5 sm:px-8 py-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                            >
                                <div className="flex items-center gap-4 text-left">
                                    <div className="p-2 bg-black text-white shrink-0">{section.icon}</div>
                                    <h3 className={`${HEADING_FONT} text-base sm:text-xl font-light tracking-wide`}>
                                        SECTION {String.fromCharCode(65 + index)} —{" "}
                                        {section.title.toUpperCase()}
                                    </h3>
                                </div>
                                <div className="flex-shrink-0 ml-3">
                                    {openSection === index ? (
                                        <ChevronUp className="w-6 h-6 text-gray-600" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-gray-600" />
                                    )}
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openSection === index ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="px-5 sm:px-8 pb-8">
                                    <div className="pl-0 sm:pl-12 space-y-4">
                                        {section.content.map((block, i) => renderBlock(block, i))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* How We Handle Your Data */}
                <div className="mt-16 bg-black text-white p-8">
                    <h3 className={`${HEADING_FONT} text-2xl font-light tracking-wide text-center mb-8`}>
                        HOW WE HANDLE YOUR DATA
                    </h3>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                1
                            </div>
                            <h4 className="font-medium mb-2">We Collect</h4>
                            <p className="text-sm font-light opacity-80">
                                Account, order &amp; technical details
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                2
                            </div>
                            <h4 className="font-medium mb-2">We Use It</h4>
                            <p className="text-sm font-light opacity-80">
                                Fulfil orders, prevent fraud, improve service
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                3
                            </div>
                            <h4 className="font-medium mb-2">We Share Only When Necessary</h4>
                            <p className="text-sm font-light opacity-80">
                                Trusted partners like Razorpay &amp; Shiprocket
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                4
                            </div>
                            <h4 className="font-medium mb-2">We Protect &amp; Retain</h4>
                            <p className="text-sm font-light opacity-80">
                                Reasonable safeguards, limited retention
                            </p>
                        </div>
                    </div>
                </div>

                {/* What We Do / Don't Do */}
                <div className="mt-16 grid md:grid-cols-2 gap-8">
                    <div className="bg-green-50 border border-green-200 p-6">
                        <div className="flex items-center mb-4">
                            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                            <h4 className={`${HEADING_FONT} text-lg font-medium text-green-800`}>
                                What We Do
                            </h4>
                        </div>
                        <ul className="space-y-2 text-green-700 font-light text-[15px]">
                            <li>• Collect only what's needed to serve you</li>
                            <li>• Store and process data primarily within India</li>
                            <li>• Share data only with trusted operational partners</li>
                            <li>• Honour access, correction &amp; deletion requests</li>
                        </ul>
                    </div>

                    <div className="bg-red-50 border border-red-200 p-6">
                        <div className="flex items-center mb-4">
                            <XCircle className="w-6 h-6 text-red-600 mr-3" />
                            <h4 className={`${HEADING_FONT} text-lg font-medium text-red-800`}>
                                What We Don't Do
                            </h4>
                        </div>
                        <ul className="space-y-2 text-red-700 font-light text-[15px]">
                            <li>• Sell your personal information</li>
                            <li>• Store your complete card or banking details</li>
                            <li>• Share data beyond what's necessary to deliver service</li>
                            <li>• Guarantee absolute security — no system can</li>
                        </ul>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-16 bg-black text-white p-8 text-center">
                    <h3 className={`${HEADING_FONT} text-2xl font-light tracking-wide mb-2`}>
                        QUESTIONS ABOUT YOUR DATA?
                    </h3>
                    <p className="text-sm font-light opacity-80 mb-6">
                        For access, correction, deletion, or any other privacy request, reach our
                        Grievance Officer directly.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href="mailto:knotch99@gmail.com"
                            className="flex items-center gap-2 hover:underline"
                        >
                            <Mail className="w-5 h-5" /> knotch99@gmail.com
                        </a>
                        <a href="tel:+918983985787" className="flex items-center gap-2 hover:underline">
                            <Phone className="w-5 h-5" /> +91 89839 85787
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}