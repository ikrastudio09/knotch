"use client";

import { useState } from "react";
import { Nunito, Inter } from "next/font/google";
import {
    ChevronDown,
    ChevronUp,
    AlertTriangle,
    Cookie,
    HelpCircle,
    Layers,
    Target,
    Share2,
    Settings,
    Database,
    ShieldCheck,
    History,
    Mail,
    MessageCircle,
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
        title: "General",
        icon: <Cookie className="w-5 h-5" />,
        content: [
            {
                type: "roman",
                items: [
                    "This Cookie Policy explains what cookies are and how we use them on our website.",
                    "Cookies help us improve your browsing experience, analyze website traffic, and provide personalized services.",
                    "By continuing to browse or use our website, you consent to our use of cookies as described in this Policy.",
                ],
            },
        ],
    },
    {
        title: "What Are Cookies",
        icon: <HelpCircle className="w-5 h-5" />,
        content: [
            {
                type: "roman",
                items: [
                    "Cookies are small text files that are stored on your device (computer, mobile phone, tablet, or other internet-enabled device) when you visit a website.",
                    "Cookies help websites recognize your device and remember certain information about your visit, such as preferences and actions.",
                    "Cookies may be temporary (session cookies) or remain on your device until deleted or expired (persistent cookies).",
                ],
            },
        ],
    },
    {
        title: "Types of Cookies We Use",
        icon: <Layers className="w-5 h-5" />,
        content: [
            {
                type: "romanNamed",
                items: [
                    {
                        name: "Essential Cookies",
                        text: "These cookies are necessary for the proper functioning of our website. They enable core functions such as account login, shopping cart management, checkout, and security.",
                    },
                    {
                        name: "Performance and Analytics Cookies",
                        text: "These cookies help us understand how visitors interact with our website by collecting information such as page visits, traffic sources, and user behavior.",
                    },
                    {
                        name: "Functional Cookies",
                        text: "These cookies allow the website to remember choices you make, such as language preference, saved cart items, or login details, to improve your experience.",
                    },
                    {
                        name: "Advertising and Marketing Cookies",
                        text: "These cookies may be used to show advertisements or promotional content that may be relevant to your interests.",
                    },
                ],
            },
        ],
    },
    {
        title: "Purpose of Cookies",
        icon: <Target className="w-5 h-5" />,
        content: [
            { type: "p", text: "We may use cookies for the following purposes:" },
            {
                type: "roman",
                items: [
                    "To enable website functionality and improve performance.",
                    "To remember your preferences and settings.",
                    "To analyze traffic, usage patterns, and customer interactions.",
                    "To improve our products, services, and user experience.",
                    "To provide relevant offers, promotions, and advertisements.",
                    "To detect fraudulent or suspicious activity and enhance security.",
                ],
            },
        ],
    },
    {
        title: "Third-Party Cookies",
        icon: <Share2 className="w-5 h-5" />,
        content: [
            {
                type: "roman",
                items: [
                    "We may allow trusted third-party service providers such as payment gateways, analytics providers, and advertising partners to place cookies on our website.",
                    "These third parties may collect information regarding your interaction with our website in accordance with their own privacy policies.",
                    "We do not control third-party cookies and are not responsible for their practices.",
                ],
            },
        ],
    },
    {
        title: "Managing Cookies",
        icon: <Settings className="w-5 h-5" />,
        content: [
            {
                type: "roman",
                items: [
                    "Most web browsers automatically accept cookies by default.",
                    "You may choose to disable, block, or delete cookies through your browser settings.",
                    "Please note that disabling certain cookies may affect website functionality and may prevent some services from working properly.",
                ],
            },
        ],
    },
    {
        title: "Data Collected Through Cookies",
        icon: <Database className="w-5 h-5" />,
        content: [
            { type: "p", text: "Cookies may collect information such as:" },
            {
                type: "roman",
                items: [
                    "IP address",
                    "Browser type and version",
                    "Device information",
                    "Operating system",
                    "Pages visited and time spent on the website",
                    "Referring website or source",
                    "Shopping preferences and cart activity",
                ],
            },
        ],
    },
    {
        title: "Data Security",
        icon: <ShieldCheck className="w-5 h-5" />,
        content: [
            {
                type: "roman",
                items: [
                    "Information collected through cookies is handled with reasonable security measures to prevent unauthorized access, misuse, or disclosure.",
                    "While we take appropriate safeguards, no internet transmission or storage system is completely secure.",
                ],
            },
        ],
    },
    {
        title: "Changes to Cookie Policy",
        icon: <History className="w-5 h-5" />,
        content: [
            {
                type: "roman",
                items: [
                    "We reserve the right to update, modify, or change this Cookie Policy at any time.",
                    "Changes will be effective immediately upon posting on our website.",
                    "It is your responsibility to review the latest version of this Policy periodically.",
                ],
            },
        ],
    },
    {
        title: "Contact Information",
        icon: <Mail className="w-5 h-5" />,
        content: [{ type: "cookieContact" }],
    },
];

const ROMANS = ["i", "ii", "iii", "iv", "v", "vi", "vii"];

function renderBlock(block, key) {
    switch (block.type) {
        case "roman":
            return (
                <ol key={key} className="space-y-2 text-gray-700 text-[15px] sm:text-base">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3">
                            <span className="text-gray-400 shrink-0">({ROMANS[i]})</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ol>
            );
        case "romanNamed":
            return (
                <ol key={key} className="space-y-3 text-gray-700 text-[15px] sm:text-base">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3">
                            <span className="text-gray-400 shrink-0">({ROMANS[i]})</span>
                            <span>
                                <span className={`${HEADING_FONT} font-bold text-gray-900`}>
                                    {item.name}
                                </span>{" "}
                                — {item.text}
                            </span>
                        </li>
                    ))}
                </ol>
            );
        case "note":
            return (
                <div key={key} className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-800 font-medium text-sm">{block.text}</p>
                </div>
            );
        case "cookieContact":
            return (
                <div key={key} className="grid sm:grid-cols-2 gap-5">
                    <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-black mt-0.5 shrink-0" />
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">Email ID</p>
                            <a
                                href="mailto:knotch99@gmail.com"
                                className="text-[15px] text-gray-800 hover:underline"
                            >
                                knotch99@gmail.com
                            </a>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MessageCircle className="w-5 h-5 text-black mt-0.5 shrink-0" />
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">WhatsApp</p>
                            <a
                                href="https://wa.me/918983985787"
                                className="text-[15px] text-gray-800 hover:underline"
                            >
                                +91 89839 85787
                            </a>
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

export default function CookiePolicy() {
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
                            <Cookie className="w-10 h-10" />
                        </div>
                        <h1 className={`${HEADING_FONT} text-4xl md:text-6xl font-light tracking-wide mb-4`}>
                            COOKIE POLICY
                        </h1>
                        <div className="w-24 h-px bg-white mx-auto mb-6"></div>
                        <p className={`${HEADING_FONT} text-lg font-light tracking-wider opacity-90`}>
                            KNOTCH
                        </p>
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
                                By continuing to browse or use this website, you consent to our use of
                                cookies as described in this Policy. You can disable or delete cookies
                                anytime through your browser settings, though some features may stop
                                working properly.
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
                            This Cookie Policy ("Policy") forms part of the terms governing your access
                            to and use of Knotch ("we", "our", "us"). By accessing or using our website,
                            you ("you", "your", "user") agree to the use of cookies in accordance with
                            this Policy.
                        </p>
                        <p className="text-base leading-relaxed font-light opacity-80">
                            Please read this Policy carefully to understand how we use cookies and
                            similar technologies.
                        </p>
                    </div>
                </div>

                {/* Quick Guide */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <Layers className="w-6 h-6" />
                        </div>
                        <h3 className={`${HEADING_FONT} font-medium text-lg mb-2`}>4 Cookie Types</h3>
                        <p className="text-gray-600 font-light text-sm">
                            Essential, performance, functional &amp; ads
                        </p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <Settings className="w-6 h-6" />
                        </div>
                        <h3 className={`${HEADING_FONT} font-medium text-lg mb-2`}>You're In Control</h3>
                        <p className="text-gray-600 font-light text-sm">
                            Manage cookies via browser settings
                        </p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <Share2 className="w-6 h-6" />
                        </div>
                        <h3 className={`${HEADING_FONT} font-medium text-lg mb-2`}>Trusted Partners Only</h3>
                        <p className="text-gray-600 font-light text-sm">
                            Used by select third-party providers
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

                {/* How Cookies Work */}
                <div className="mt-16 bg-black text-white p-8">
                    <h3 className={`${HEADING_FONT} text-2xl font-light tracking-wide text-center mb-8`}>
                        HOW COOKIES WORK ON THIS SITE
                    </h3>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                1
                            </div>
                            <h4 className="font-medium mb-2">You Visit</h4>
                            <p className="text-sm font-light opacity-80">A cookie file is created or read</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                2
                            </div>
                            <h4 className="font-medium mb-2">We Recognize You</h4>
                            <p className="text-sm font-light opacity-80">
                                Preferences, cart &amp; login remembered
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                3
                            </div>
                            <h4 className="font-medium mb-2">We Learn &amp; Improve</h4>
                            <p className="text-sm font-light opacity-80">Traffic and usage are analyzed</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                4
                            </div>
                            <h4 className="font-medium mb-2">You Stay In Control</h4>
                            <p className="text-sm font-light opacity-80">Manage anytime via browser settings</p>
                        </div>
                    </div>
                </div>

                {/* Essential vs Optional */}
                <div className="mt-16 grid md:grid-cols-2 gap-8">
                    <div className="bg-green-50 border border-green-200 p-6">
                        <div className="flex items-center mb-4">
                            <ShieldCheck className="w-6 h-6 text-green-600 mr-3" />
                            <h4 className={`${HEADING_FONT} text-lg font-medium text-green-800`}>
                                Always Active — Essential
                            </h4>
                        </div>
                        <ul className="space-y-2 text-green-700 font-light text-[15px]">
                            <li>• Account login &amp; authentication</li>
                            <li>• Shopping cart management</li>
                            <li>• Checkout processing</li>
                            <li>• Core website security</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-6">
                        <div className="flex items-center mb-4">
                            <Settings className="w-6 h-6 text-blue-600 mr-3" />
                            <h4 className={`${HEADING_FONT} text-lg font-medium text-blue-800`}>
                                Optional — You Decide
                            </h4>
                        </div>
                        <ul className="space-y-2 text-blue-700 font-light text-[15px]">
                            <li>• Performance &amp; analytics cookies</li>
                            <li>• Functional preference cookies</li>
                            <li>• Advertising &amp; marketing cookies</li>
                            <li>• Disable anytime in browser settings</li>
                        </ul>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-16 bg-black text-white p-8 text-center">
                    <h3 className={`${HEADING_FONT} text-2xl font-light tracking-wide mb-2`}>
                        QUESTIONS ABOUT COOKIES?
                    </h3>
                    <p className="text-sm font-light opacity-80 mb-6">
                        Reach out with any questions, concerns, or requests regarding this Policy.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href="mailto:knotch99@gmail.com"
                            className="flex items-center gap-2 hover:underline"
                        >
                            <Mail className="w-5 h-5" /> knotch99@gmail.com
                        </a>
                        <a
                            href="https://wa.me/918983985787"
                            className="flex items-center gap-2 hover:underline"
                        >
                            <MessageCircle className="w-5 h-5" /> +91 89839 85787
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}