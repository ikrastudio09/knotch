"use client";

import { useState } from "react";
import { Nunito, Inter } from "next/font/google";
import {
    ChevronDown,
    ChevronUp,
    AlertTriangle,
    CheckCircle,
    XCircle,
    FileText,
    UserCheck,
    UserPlus,
    Shirt,
    Eye,
    ShoppingCart,
    Tag,
    CreditCard,
    Truck,
    RefreshCw,
    Wallet,
    ShieldCheck,
    Ban,
    Copyright,
    MessageSquare,
    Link2,
    Lock,
    AlertCircle,
    Scale,
    ShieldAlert,
    CloudLightning,
    XOctagon,
    Layers,
    Hand,
    FileCheck,
    Landmark,
    MapPin,
    History,
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
                text: 'Welcome to Knotch ("knotch", "we", "us", or "our"). These Terms of Service govern your access to and use of the Knotch website, products, services, content, communications, and purchases. By accessing the website, creating an account, placing an order, or otherwise using our services, you agree to be bound by these Terms.',
            },
            {
                type: "note",
                text: "If you do not agree to these Terms, you must not access or use the website or services.",
            },
            {
                type: "p",
                text: "Knotch is an independent online brand that may offer apparel, accessories, lifestyle products, merchandise, and additional products and services in the future.",
            },
        ],
    },
    {
        title: "Eligibility",
        icon: <UserCheck className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "You represent that you are at least 18 years of age or are using the website under the supervision of a parent or legal guardian.",
            },
            {
                type: "p",
                text: "You further represent that you have the legal capacity to enter into a binding agreement.",
            },
        ],
    },
    {
        title: "Account Registration",
        icon: <UserPlus className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "To access certain features or place orders, you may be required to provide your name, email address, phone number, shipping address, billing information, and other relevant details.",
            },
            { type: "p", text: "You are responsible for:" },
            {
                type: "list",
                items: [
                    "Maintaining the confidentiality of your account.",
                    "Restricting unauthorized access.",
                    "Ensuring all information provided is accurate and current.",
                ],
            },
        ],
    },
    {
        title: "Products and Services",
        icon: <Shirt className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Knotch may sell apparel, fashion products, accessories, lifestyle products, and other merchandise. Product availability is subject to change without notice.",
            },
            { type: "p", text: "We reserve the right to:" },
            {
                type: "list",
                items: [
                    "Modify or discontinue products.",
                    "Limit quantities.",
                    "Refuse or cancel orders.",
                    "Restrict sales to specific customers or regions.",
                ],
            },
        ],
    },
    {
        title: "Product Information",
        icon: <Eye className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "We strive to display products accurately. However, actual colours, textures, prints, sizing, and appearance may vary due to screens, lighting, photography, manufacturing processes, and other factors.",
            },
            { type: "note", text: "Minor variations shall not be considered defects." },
        ],
    },
    {
        title: "Orders",
        icon: <ShoppingCart className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "An order placed through the website is only an offer to purchase. Knotch reserves the right to accept, reject, cancel, or limit any order at its discretion.",
            },
            { type: "p", text: "Orders may be cancelled due to:" },
            {
                type: "list",
                items: [
                    "Product unavailability.",
                    "Pricing errors.",
                    "Suspected fraud.",
                    "Abuse of promotions.",
                    "Violation of these Terms.",
                ],
            },
        ],
    },
    {
        title: "Pricing",
        icon: <Tag className="w-5 h-5" />,
        content: [
            { type: "p", text: "All prices are displayed in Indian Rupees unless stated otherwise." },
            {
                type: "p",
                text: "Prices may change without prior notice. In the event of a pricing error, Knotch may cancel affected orders and issue refunds where appropriate.",
            },
        ],
    },
    {
        title: "Payments",
        icon: <CreditCard className="w-5 h-5" />,
        content: [
            { type: "p", text: "Payments may be processed through Razorpay or other authorised payment providers." },
            { type: "p", text: "Accepted methods may include:" },
            {
                type: "list",
                items: ["UPI", "Credit Cards", "Debit Cards", "Net Banking", "Wallets", "Cash on Delivery (COD)"],
            },
            {
                type: "note",
                text: "Additional COD charges may apply and will be displayed at checkout where applicable.",
            },
        ],
    },
    {
        title: "Shipping and Delivery",
        icon: <Truck className="w-5 h-5" />,
        content: [
            { type: "p", text: "Knotch currently ships within India." },
            { type: "p", text: "Orders may be shipped through Shiprocket and associated courier partners." },
            {
                type: "p",
                text: "Delivery timelines are estimates only and are not guaranteed. Delays may occur due to courier issues, weather conditions, public holidays, operational disruptions, government restrictions, or events beyond our control.",
            },
            { type: "p", text: "Customers are responsible for providing accurate delivery information." },
            {
                type: "note",
                text: "Once an order has been dispatched, changes to shipping details may not be possible.",
            },
        ],
    },
    {
        title: "Returns, Exchanges, and Refunds",
        icon: <RefreshCw className="w-5 h-5" />,
        content: [
            { type: "subheading", text: "Damaged or Defective Products" },
            {
                type: "p",
                text: "Claims relating to damaged, defective, incorrect, or missing products must be reported within seven (7) days of delivery.",
            },
            {
                type: "note",
                text: "A clear and continuous unboxing video recorded from the moment the sealed package is opened is strongly required for verification purposes.",
            },
            { type: "p", text: "Failure to provide sufficient evidence may result in rejection of the claim." },
            { type: "p", text: "If a claim is verified, Knotch may provide, at its sole discretion:" },
            { type: "list", items: ["A replacement;", "An exchange;", "A refund;"] },
            { type: "subheading", text: "Exchanges" },
            { type: "p", text: "Exchanges are subject to stock availability." },
            {
                type: "p",
                text: "If replacement stock is unavailable, Knotch may offer an alternative solution including a refund.",
            },
            { type: "subheading", text: "Change of Mind" },
            { type: "p", text: "Returns based solely on a change of mind are not guaranteed." },
            { type: "p", text: "If approved:" },
            {
                type: "list",
                items: [
                    "Products must be unused.",
                    "Products must be unworn.",
                    "Products must be unwashed.",
                    "Original tags must remain attached.",
                    "Original packaging must be intact.",
                ],
            },
            { type: "note", text: "Customers may be required to bear return shipping charges." },
        ],
    },
    {
        title: "Refunds",
        icon: <Wallet className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Approved refunds will be processed through the original payment method whenever reasonably possible.",
            },
            {
                type: "p",
                text: "Refund processing times may vary depending on payment providers, banks, financial institutions, and operational requirements.",
            },
        ],
    },
    {
        title: "Customer Responsibilities",
        icon: <ShieldCheck className="w-5 h-5" />,
        content: [
            { type: "p", text: "You agree:" },
            {
                type: "list",
                items: [
                    "Not to misuse the website.",
                    "Not to engage in fraudulent activities.",
                    "Not to provide false information.",
                    "Not to interfere with website operations.",
                    "Not to violate applicable laws.",
                ],
            },
        ],
    },
    {
        title: "Prohibited Activities",
        icon: <Ban className="w-5 h-5" />,
        content: [
            { type: "p", text: "You may not:" },
            {
                type: "list",
                items: [
                    "Use the website for unlawful purposes.",
                    "Transmit malware.",
                    "Attempt unauthorized access.",
                    "Harass others.",
                    "Scrape content.",
                    "Impersonate another person.",
                    "Infringe intellectual property rights.",
                    "Circumvent website security.",
                ],
            },
        ],
    },
    {
        title: "Intellectual Property",
        icon: <Copyright className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "All logos, branding, trademarks, graphics, designs, product images, website layouts, content, text, videos, and related materials are owned by or licensed to Knotch.",
            },
            {
                type: "note",
                text: "No content may be copied, reproduced, distributed, modified, sold, republished, or exploited without prior written permission.",
            },
        ],
    },
    {
        title: "User Submissions",
        icon: <MessageSquare className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "By submitting reviews, feedback, suggestions, photographs, testimonials, comments, or other content, you grant Knotch a worldwide, non-exclusive, royalty-free licence to use, reproduce, modify, publish, distribute, and display such content.",
            },
        ],
    },
    {
        title: "Third-Party Services",
        icon: <Link2 className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "The website may contain links to third-party websites, tools, applications, payment providers, or services.",
            },
            { type: "p", text: "Knotch is not responsible for the content, policies, products, or services of third parties." },
        ],
    },
    {
        title: "Privacy",
        icon: <Lock className="w-5 h-5" />,
        content: [
            { type: "p", text: "Use of the website is also subject to the Knotch Privacy Policy." },
            {
                type: "p",
                text: "By using the website, you consent to the collection, processing, and use of information as described in the applicable Privacy Policy.",
            },
        ],
    },
    {
        title: "Disclaimer of Warranties",
        icon: <AlertCircle className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: 'The website, products, and services are provided on an "AS IS" and "AS AVAILABLE" basis.',
            },
            { type: "p", text: "Knotch does not warrant that:" },
            {
                type: "list",
                items: [
                    "The website will be uninterrupted.",
                    "The website will be error-free.",
                    "The website will be secure at all times.",
                    "Defects will always be corrected immediately.",
                ],
            },
        ],
    },
    {
        title: "Limitation of Liability",
        icon: <Scale className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "To the maximum extent permitted by law, Knotch shall not be liable for indirect, incidental, special, punitive, exemplary, or consequential damages.",
            },
            {
                type: "p",
                text: "This includes loss of profits, loss of data, loss of business opportunities, loss of goodwill, or other commercial damages.",
            },
            {
                type: "note",
                text: "In any event, Knotch's aggregate liability shall not exceed the amount paid by the customer for the order giving rise to the claim.",
            },
        ],
    },
    {
        title: "Indemnification",
        icon: <ShieldAlert className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "You agree to indemnify and hold harmless Knotch and its operators from any claims, damages, liabilities, costs, expenses, and legal fees arising from:",
            },
            {
                type: "list",
                items: [
                    "Your breach of these Terms.",
                    "Your misuse of the website.",
                    "Your violation of applicable laws.",
                    "Your violation of third-party rights.",
                ],
            },
        ],
    },
    {
        title: "Force Majeure",
        icon: <CloudLightning className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Knotch shall not be liable for delays or failures caused by circumstances beyond reasonable control, including:",
            },
            {
                type: "list",
                items: [
                    "Natural disasters.",
                    "Floods.",
                    "Fires.",
                    "Pandemics.",
                    "Government actions.",
                    "Internet failures.",
                    "Cyber incidents.",
                    "Courier disruptions.",
                    "Labour disputes.",
                ],
            },
        ],
    },
    {
        title: "Termination",
        icon: <XOctagon className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Knotch may suspend, restrict, or terminate access to the website at any time without prior notice if it believes a user has violated these Terms or applicable laws.",
            },
        ],
    },
    {
        title: "Severability",
        icon: <Layers className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "If any provision of these Terms is held invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.",
            },
        ],
    },
    {
        title: "No Waiver",
        icon: <Hand className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Failure by Knotch to enforce any provision shall not constitute a waiver of that provision or any other rights.",
            },
        ],
    },
    {
        title: "Entire Agreement",
        icon: <FileCheck className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "These Terms, together with any policies published by Knotch, constitute the entire agreement between the user and Knotch regarding website use and purchases.",
            },
        ],
    },
    {
        title: "Governing Law",
        icon: <Landmark className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "These Terms shall be governed by and construed in accordance with the laws of India.",
            },
        ],
    },
    {
        title: "Jurisdiction",
        icon: <MapPin className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts located in Sangli, Maharashtra.",
            },
        ],
    },
    {
        title: "Changes to Terms",
        icon: <History className="w-5 h-5" />,
        content: [
            { type: "p", text: "Knotch reserves the right to modify these Terms at any time." },
            { type: "p", text: "Updated versions become effective immediately upon publication on the website." },
            { type: "note", text: "Continued use of the website constitutes acceptance of revised Terms." },
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

export default function TermsOfService() {
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
                            <FileText className="w-10 h-10" />
                        </div>
                        <h1 className={`${HEADING_FONT} text-4xl md:text-6xl font-light tracking-wide mb-4`}>
                            TERMS OF SERVICE
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
                                By accessing the website, creating an account, placing an order, or
                                otherwise using our services, you agree to be bound by these Terms. If
                                you do not agree, you must not access or use the website or services.
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
                            These Terms of Service ("Terms") govern your access to and use of the
                            Knotch website, products, services, content, communications, and
                            purchases.
                        </p>
                        <p className="text-base leading-relaxed font-light opacity-80">
                            Knotch is an independent online brand that may offer apparel, accessories,
                            lifestyle products, merchandise, and additional products and services in
                            the future.
                        </p>
                    </div>
                </div>

                {/* Quick Guide */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserCheck className="w-6 h-6" />
                        </div>
                        <h3 className={`${HEADING_FONT} font-medium text-lg mb-2`}>18+ to Use</h3>
                        <p className="text-gray-600 font-light text-sm">
                            Or with parental/guardian supervision
                        </p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <h3 className={`${HEADING_FONT} font-medium text-lg mb-2`}>Secure Payments</h3>
                        <p className="text-gray-600 font-light text-sm">
                            Processed via Razorpay &amp; authorised providers
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
                                        SECTION {index + 1} — {section.title.toUpperCase()}
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

                {/* How These Terms Apply */}
                <div className="mt-16 bg-black text-white p-8">
                    <h3 className={`${HEADING_FONT} text-2xl font-light tracking-wide text-center mb-8`}>
                        HOW THESE TERMS APPLY
                    </h3>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                1
                            </div>
                            <h4 className="font-medium mb-2">You Access or Order</h4>
                            <p className="text-sm font-light opacity-80">
                                Browsing, registering, or purchasing
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                2
                            </div>
                            <h4 className="font-medium mb-2">You Agree to These Terms</h4>
                            <p className="text-sm font-light opacity-80">
                                Continued use means acceptance
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                3
                            </div>
                            <h4 className="font-medium mb-2">We Provide the Service</h4>
                            <p className="text-sm font-light opacity-80">
                                Orders, payments, shipping &amp; support
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                4
                            </div>
                            <h4 className="font-medium mb-2">Terms Govern Any Dispute</h4>
                            <p className="text-sm font-light opacity-80">
                                Indian law, Sangli courts
                            </p>
                        </div>
                    </div>
                </div>

                {/* Responsibilities / Prohibited */}
                <div className="mt-16 grid md:grid-cols-2 gap-8">
                    <div className="bg-green-50 border border-green-200 p-6">
                        <div className="flex items-center mb-4">
                            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                            <h4 className={`${HEADING_FONT} text-lg font-medium text-green-800`}>
                                Your Responsibilities
                            </h4>
                        </div>
                        <ul className="space-y-2 text-green-700 font-light text-[15px]">
                            <li>• Keep your account confidential and secure</li>
                            <li>• Provide accurate, current information</li>
                            <li>• Use the website lawfully and in good faith</li>
                            <li>• Avoid fraudulent activity or false claims</li>
                            <li>• Respect Knotch's intellectual property</li>
                        </ul>
                    </div>

                    <div className="bg-red-50 border border-red-200 p-6">
                        <div className="flex items-center mb-4">
                            <XCircle className="w-6 h-6 text-red-600 mr-3" />
                            <h4 className={`${HEADING_FONT} text-lg font-medium text-red-800`}>
                                Prohibited Activities
                            </h4>
                        </div>
                        <ul className="space-y-2 text-red-700 font-light text-[15px]">
                            <li>• Unlawful use of the website</li>
                            <li>• Transmitting malware or attempting unauthorized access</li>
                            <li>• Harassing others or impersonation</li>
                            <li>• Scraping content or circumventing security</li>
                            <li>• Infringing intellectual property rights</li>
                        </ul>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-16 bg-black text-white p-8 text-center">
                    <h3 className={`${HEADING_FONT} text-2xl font-light tracking-wide mb-2`}>
                        QUESTIONS ABOUT THESE TERMS?
                    </h3>
                    <p className="text-sm font-light opacity-80 mb-6">
                        For support, legal communications, complaints, or questions, reach our
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