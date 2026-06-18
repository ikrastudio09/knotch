"use client";

import { useState } from "react";
import { Nunito, Inter } from "next/font/google";
import {
    ChevronDown,
    ChevronUp,
    RefreshCw,
    Package,
    Boxes,
    Clock,
    Truck,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Camera,
    RotateCcw,
    Wallet,
    Mail,
    Phone,
    UserRound,
} from "lucide-react";

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
        title: "Overview",
        icon: <RefreshCw className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "At Knotch, we strive to provide quality products and a smooth shopping experience. This Policy explains the circumstances under which exchanges, returns, and refunds may be requested and processed.",
            },
            {
                type: "p",
                text: "Knotch reserves the right to approve, reject, or modify any request in accordance with this Policy.",
            },
        ],
    },
    {
        title: "Exchange Eligibility",
        icon: <Clock className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Customers may request an exchange within seven (7) days from the date of delivery.",
            },
            {
                type: "p",
                text: "Exchanges are subject to stock availability at the time the returned product is received and inspected.",
            },
            { type: "p", text: "To be eligible for an exchange:" },
            {
                type: "list",
                items: [
                    "The product must be unused.",
                    "The product must be unworn.",
                    "The product must be unwashed.",
                    "All original tags must remain attached.",
                    "Original packaging must be intact.",
                    "The product must be returned in the same condition in which it was delivered.",
                ],
            },
            {
                type: "note",
                text: "Products showing signs of use, washing, wear, damage, alterations, stains, odours, or missing tags may be rejected.",
            },
        ],
    },
    {
        title: "Scope of Exchange",
        icon: <Package className="w-5 h-5" />,
        content: [
            {
                type: "roman",
                items: [
                    "Exchanges are permitted only for size of the same product.",
                    "Exchange for a different item, style, or colour is not permitted.",
                    "Only one exchange request will be entertained per order.",
                ],
            },
        ],
    },
    {
        title: "Stock Availability",
        icon: <Boxes className="w-5 h-5" />,
        content: [
            { type: "p", text: "All exchanges are subject to stock availability." },
            {
                type: "p",
                text: "If the requested size or replacement product is unavailable, Knotch may:",
            },
            {
                type: "list",
                items: [
                    "Offer an alternative size where available;",
                    "Offer store credit where applicable;",
                    "Offer a refund where appropriate;",
                    "Provide any other reasonable resolution at its discretion.",
                ],
            },
        ],
    },
    {
        title: "Damaged, Defective, Incorrect or Missing Products",
        icon: <Camera className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Claims relating to damaged, defective, incorrect, or missing products must be reported within seven (7) days of delivery.",
            },
            {
                type: "note",
                text: "A clear, continuous, and unedited unboxing video is strongly required for verification purposes.",
            },
            {
                type: "p",
                text: "The unboxing video must show the sealed package before opening and clearly capture the entire opening process.",
            },
            {
                type: "p",
                text: "Failure to provide sufficient evidence may result in rejection of the claim.",
            },
            {
                type: "p",
                text: "Upon successful verification, Knotch may, at its sole discretion:",
            },
            {
                type: "list",
                items: ["Provide a replacement;", "Approve an exchange;", "Issue a refund."],
            },
        ],
    },
    {
        title: "Change of Mind Requests",
        icon: <RotateCcw className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Returns or exchanges requested solely because of a change of mind are not guaranteed.",
            },
            {
                type: "p",
                text: "Such requests may be approved only at the sole discretion of Knotch.",
            },
            { type: "p", text: "If approved:" },
            {
                type: "list",
                items: [
                    "The product must be unused.",
                    "The product must be unworn.",
                    "The product must be unwashed.",
                    "Original tags must remain attached.",
                    "Original packaging must remain intact.",
                ],
            },
            {
                type: "note",
                text: "Customers shall be responsible for all shipping and courier charges associated with approved change-of-mind returns or exchanges.",
            },
        ],
    },
    {
        title: "Refund Policy",
        icon: <Wallet className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Refunds are generally considered only for verified damaged, defective, incorrect, or missing products.",
            },
            {
                type: "p",
                text: "Refunds may also be provided in situations where an approved replacement or exchange cannot be fulfilled due to stock limitations.",
            },
            {
                type: "p",
                text: "Approved refunds will be processed through the original payment method wherever reasonably possible.",
            },
        ],
    },
    {
        title: "Shipping & Courier Charges",
        icon: <Truck className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Customers are responsible for return shipping charges relating to approved discretionary exchanges or change-of-mind requests.",
            },
            {
                type: "p",
                text: "Knotch is not responsible for delays, loss, theft, or damage caused by third-party courier providers.",
            },
        ],
    },
    {
        title: "Non-Eligible Items",
        icon: <XCircle className="w-5 h-5" />,
        content: [
            { type: "p", text: "The following may not be eligible for return or exchange:" },
            {
                type: "list",
                items: [
                    "Products used, worn, washed, altered, or damaged after delivery;",
                    "Products missing original tags or packaging;",
                    "Products returned outside the applicable request period;",
                    "Products for which adequate proof cannot be provided;",
                    "Sale, discounted, promotional, or final-sale items where specified.",
                ],
            },
        ],
    },
    {
        title: "Fraud Prevention",
        icon: <AlertTriangle className="w-5 h-5" />,
        content: [
            {
                type: "p",
                text: "Knotch reserves the right to reject any request suspected of fraud, abuse, manipulation, false claims, or misuse of this Policy.",
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
        case "roman": {
            const romans = ["i", "ii", "iii", "iv", "v"];
            return (
                <ol key={key} className="space-y-2 text-gray-700 text-[15px] sm:text-base">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3">
                            <span className="text-gray-400 shrink-0">({romans[i]})</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ol>
            );
        }
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

export default function RefundExchangePolicy() {
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
                            <RefreshCw className="w-10 h-10" />
                        </div>
                        <h1 className={`${HEADING_FONT} text-4xl md:text-6xl font-light tracking-wide mb-4`}>
                            RETURN, EXCHANGE &amp; REFUND POLICY
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
                                All exchange, return, and refund requests must be raised within 7 days of
                                delivery. Claims for damaged, defective, incorrect, or missing products
                                require a clear, continuous, and unedited unboxing video for verification.
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
                            This Return, Exchange &amp; Refund Policy ("Policy") forms an integral part
                            of the Knotch Terms of Service.
                        </p>
                        <p className="text-base leading-relaxed font-light opacity-80">
                            By placing an order with Knotch, you ("you") acknowledge and agree to the
                            terms set out below.
                        </p>
                    </div>
                </div>

                {/* Quick Guide */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className={`${HEADING_FONT} font-medium text-lg mb-2`}>7 Days</h3>
                        <p className="text-gray-600 font-light text-sm">
                            Request window from delivery date
                        </p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-6 h-6" />
                        </div>
                        <h3 className={`${HEADING_FONT} font-medium text-lg mb-2`}>Size Only</h3>
                        <p className="text-gray-600 font-light text-sm">
                            Same product, different size only
                        </p>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <Camera className="w-6 h-6" />
                        </div>
                        <h3 className={`${HEADING_FONT} font-medium text-lg mb-2`}>Video Required</h3>
                        <p className="text-gray-600 font-light text-sm">
                            Unboxing video for damage/defect claims
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

                {/* Process Timeline */}
                <div className="mt-16 bg-black text-white p-8">
                    <h3 className={`${HEADING_FONT} text-2xl font-light tracking-wide text-center mb-8`}>
                        REQUEST PROCESS TIMELINE
                    </h3>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                1
                            </div>
                            <h4 className="font-medium mb-2">Submit Request</h4>
                            <p className="text-sm font-light opacity-80">Within 7 days of delivery</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                2
                            </div>
                            <h4 className="font-medium mb-2">Provide Evidence</h4>
                            <p className="text-sm font-light opacity-80">
                                Unboxing video for damage/defect claims
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                3
                            </div>
                            <h4 className="font-medium mb-2">Inspection &amp; Verification</h4>
                            <p className="text-sm font-light opacity-80">Knotch reviews the request</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                4
                            </div>
                            <h4 className="font-medium mb-2">Resolution</h4>
                            <p className="text-sm font-light opacity-80">
                                Exchange, replacement, refund, or credit
                            </p>
                        </div>
                    </div>
                </div>

                {/* Accepted / Not Accepted */}
                <div className="mt-16 grid md:grid-cols-2 gap-8">
                    <div className="bg-green-50 border border-green-200 p-6">
                        <div className="flex items-center mb-4">
                            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                            <h4 className={`${HEADING_FONT} text-lg font-medium text-green-800`}>
                                What's Accepted
                            </h4>
                        </div>
                        <ul className="space-y-2 text-green-700 font-light text-[15px]">
                            <li>• Unused, unworn, unwashed items with tags intact</li>
                            <li>• Size-only exchange requests</li>
                            <li>• Verified damage/defect/incorrect/missing claims with video proof</li>
                            <li>• Refunds via original payment method, where approved</li>
                        </ul>
                    </div>

                    <div className="bg-red-50 border border-red-200 p-6">
                        <div className="flex items-center mb-4">
                            <XCircle className="w-6 h-6 text-red-600 mr-3" />
                            <h4 className={`${HEADING_FONT} text-lg font-medium text-red-800`}>
                                What's Not Accepted
                            </h4>
                        </div>
                        <ul className="space-y-2 text-red-700 font-light text-[15px]">
                            <li>• Used, worn, washed, or altered items</li>
                            <li>• Items missing tags or original packaging</li>
                            <li>• Requests raised after 7 days</li>
                            <li>• Sale, discounted, or final-sale items (where specified)</li>
                            <li>• Claims without adequate proof</li>
                        </ul>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-16 bg-black text-white p-8 text-center">
                    <h3 className={`${HEADING_FONT} text-2xl font-light tracking-wide mb-2`}>
                        NEED HELP WITH A REQUEST?
                    </h3>
                    <p className="text-sm font-light opacity-80 mb-6">
                        Reach out and our team will guide you through the next steps.
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