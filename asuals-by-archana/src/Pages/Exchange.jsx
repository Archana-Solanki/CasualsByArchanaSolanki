import { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import { ChevronDown, ChevronUp, RefreshCw, Package, Clock, Truck, AlertTriangle, CheckCircle, XCircle, Camera } from "lucide-react";

export default function ExchangePolicy() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const sections = [
        {
            title: "General",
            icon: <RefreshCw className="w-5 h-5" />,
            content: [
                "We allow exchanges to ensure you get the right fit. Please read this policy carefully as it outlines the conditions under which exchanges are accepted."
            ]
        },
        {
            title: "Eligibility for Exchange",
            icon: <Clock className="w-5 h-5" />,
            content: [
                "You may request an exchange within 7 (seven) days from the date you receive the product.",
                "Requests received after 7 (seven) days will not be processed."
            ]
        },
        {
            title: "Scope of Exchange",
            icon: <Package className="w-5 h-5" />,
            content: [
                "Exchanges are permitted only for size of the same product.",
                "Exchange for a different item, style, or colour is not permitted.",
                "Only one exchange request will be entertained per order."
            ]
        },
        {
            title: "Condition of Products",
            icon: <CheckCircle className="w-5 h-5" />,
            content: [
                "The item must be returned in its original condition, unused, unwashed, and with all original tags and packaging intact.",
                "Products showing signs of wear, damage, alteration, or with missing tags will not be accepted.",
                "We also request you to record a clear video while opening the courier package. If you do not provide this video as proof, your exchange request will not be entertained.",
                "NOTE: It is the customer's responsibility to ensure that the video is clear, continuous, and unedited, showing the package in sealed condition before opening. Any unclear or tampered video proof will not be accepted."
            ]
        },
        {
            title: "Shipping & Courier Costs",
            icon: <Truck className="w-5 h-5" />,
            content: [
                "The customer is responsible for bearing all courier charges, both for sending the product back to us and for receiving the exchanged product.",
                "After we receive and inspect the returned item, the replacement will be shipped within 3 - 4 working days.",
                "We are not liable for any loss, damage, or delay caused by third party courier services during either leg of shipping (return from you to us, and replacement from us to you)."
            ]
        },
        {
            title: "Stock Availability",
            icon: <Package className="w-5 h-5" />,
            content: [
                "Exchanges are subject to the availability of the requested size at the time the returned product is received and approved.",
                "If the requested size is unavailable, our team will inform you of the next steps."
            ]
        },
        {
            title: "Non-Eligible Items",
            icon: <XCircle className="w-5 h-5" />,
            content: [
                "Products sold under sale/discounts are not eligible for exchange.",
                "Products that are add ons' (this might include buttons, cloth pieces or any such add ons) are not subjected to exchange."
            ]
        },
        {
            title: "Self-Shipping Instructions",
            icon: <Truck className="w-5 h-5" />,
            content: [
                "If your exchange request is approved, you will be required to self-ship the product to us.",
                "You can do this by visiting your nearest courier service provider and booking the shipment to our warehouse address, which will be shared with you through our official email ID.",
                "Ensure that the product is securely packed to avoid any damage in transit.",
                "The package must include your order number, name, and contact details inside for quick processing.",
                "When sending an item back for exchange, customers must provide valid tracking information. This is mandatory to ensure safe delivery and to avoid any delays or issues with processing the exchange.",
                "Approved exchanges should be shipped within 2–3 working days after confirmation.",
                "We reserve the right to update or change our exchange policy at any time. It is the customer's responsibility to review the latest policy before initiating an exchange.",
                "Once we receive and verify the returned product, we will dispatch the exchanged size within 3 - 4 working days.",
                "NOTE: We are not responsible for packages that are lost, delayed, or damaged during self-shipping. The courier service chosen by you will be solely responsible for safe delivery."
            ]
        }
    ];

    return (
        <>
            <Navbar />
            <Helmet>
                <title>Exchange Policy | Casuals by Archana Solanki</title>
                <meta
                    name="description"
                    content="Read the Exchange Policy of Casuals by Archana Solanki. Learn about eligibility, timelines, conditions, shipping responsibilities, and size exchange rules."
                />
            </Helmet>
            <main className="min-h-screen bg-white text-black pt-24">
                {/* Header */}
                <div className="bg-black text-white">
                    <div className="max-w-4xl mx-auto px-6 py-16">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white text-black rounded-full mb-6">
                                <RefreshCw className="w-10 h-10" />
                            </div>
                            <h1 className="text-5xl md:text-6xl font-light tracking-wide mb-4">
                                EXCHANGE POLICY
                            </h1>
                            <div className="w-24 h-px bg-white mx-auto mb-6"></div>
                            <p className="text-lg font-light tracking-wider opacity-90">
                                CASUALS BY ARCHANA SOLANKI
                            </p>
                            <p className="text-sm font-light opacity-70 mt-2">
                                Ensuring the perfect fit for your style
                            </p>
                        </div>
                    </div>
                </div>

                {/* Important Notice */}
                <div className="bg-red-50 border-l-4 border-red-500 mx-auto max-w-4xl mt-8">
                    <div className="p-6">
                        <div className="flex items-center">
                            <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                            <div>
                                <h3 className="text-lg font-medium text-red-800">Important Notice</h3>
                                <p className="text-red-700 mt-1">
                                    We currently do not have a return policy and a refund policy. Only exchanges are permitted under the conditions outlined below.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-6 py-16">
                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none mb-12">
                        <div className="bg-gray-50 p-8 border-l-4 border-black">
                            <p className="text-lg leading-relaxed font-light mb-4">
                                This Exchange Policy (‘Policy’) forms part of the terms of service governing purchases made from Casuals by Archana Solanki (‘we’, ‘our’, ‘us’).
                            </p>
                            <p className="text-base leading-relaxed font-light opacity-80">
                                By purchasing from our website, the consumer (‘you’) agree to the conditions set out below.
                            </p>


                        </div>
                    </div>

                    {/* Quick Exchange Guide */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="font-medium text-lg mb-2">7 Days</h3>
                            <p className="text-gray-600 font-light">Exchange window from delivery date</p>
                        </div>
                        <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="w-6 h-6" />
                            </div>
                            <h3 className="font-medium text-lg mb-2">Size Only</h3>
                            <p className="text-gray-600 font-light">Same product, different size only</p>
                        </div>
                        <div className="bg-white border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <Camera className="w-6 h-6" />
                            </div>
                            <h3 className="font-medium text-lg mb-2">Video Required</h3>
                            <p className="text-gray-600 font-light">Unboxing video mandatory</p>
                        </div>
                    </div>

                    {/* Expandable Sections */}
                    <div className="space-y-4">
                        {sections.map((section, index) => (
                            <div key={index} className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                                <button
                                    onClick={() => toggleSection(index)}
                                    className="w-full px-8 py-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-black text-white">
                                            {section.icon}
                                        </div>
                                        <h3 className="text-xl font-light tracking-wide text-left">
                                            SECTION {String.fromCharCode(65 + index)} - {section.title.toUpperCase()}
                                        </h3>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {openSection === index ? (
                                            <ChevronUp className="w-6 h-6 text-gray-600" />
                                        ) : (
                                            <ChevronDown className="w-6 h-6 text-gray-600" />
                                        )}
                                    </div>
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <div className="px-8 pb-8">
                                        <div className="pl-12 space-y-4">
                                            {section.content.map((paragraph, pIndex) => (
                                                <div key={pIndex}>
                                                    {paragraph.startsWith('NOTE:') ? (
                                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                                                            <p className="text-yellow-800 font-medium text-sm">
                                                                {paragraph}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-700 leading-relaxed font-light">
                                                            {paragraph}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Exchange Process Timeline */}
                    <div className="mt-16 bg-black text-white p-8">
                        <h3 className="text-2xl font-light tracking-wide text-center mb-8">EXCHANGE PROCESS TIMELINE</h3>

                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                    1
                                </div>
                                <h4 className="font-medium mb-2">Request Exchange</h4>
                                <p className="text-sm font-light opacity-80">Within 7 days of delivery</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                    2
                                </div>
                                <h4 className="font-medium mb-2">Self-Ship Product</h4>
                                <p className="text-sm font-light opacity-80">Ship within 2-3 working days</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                    3
                                </div>
                                <h4 className="font-medium mb-2">Inspection</h4>
                                <p className="text-sm font-light opacity-80">We verify product condition</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                                    4
                                </div>
                                <h4 className="font-medium mb-2">New Size Shipped</h4>
                                <p className="text-sm font-light opacity-80">Within 3-4 working days</p>
                            </div>
                        </div>
                    </div>

                    {/* Important Reminders */}
                    <div className="mt-16 grid md:grid-cols-2 gap-8">
                        <div className="bg-green-50 border border-green-200 p-6">
                            <div className="flex items-center mb-4">
                                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                                <h4 className="text-lg font-medium text-green-800">What's Accepted</h4>
                            </div>
                            <ul className="space-y-2 text-green-700 font-light">
                                <li>• Original condition with tags</li>
                                <li>• Unused and unwashed items</li>
                                <li>• Clear unboxing video</li>
                                <li>• Size exchanges only</li>
                            </ul>
                        </div>

                        <div className="bg-red-50 border border-red-200 p-6">
                            <div className="flex items-center mb-4">
                                <XCircle className="w-6 h-6 text-red-600 mr-3" />
                                <h4 className="text-lg font-medium text-red-800">What's Not Accepted</h4>
                            </div>
                            <ul className="space-y-2 text-red-700 font-light">
                                <li>• Sale/discounted items</li>
                                <li>• Add-on items (buttons, etc.)</li>
                                <li>• Different style/color requests</li>
                                <li>• Items without original tags</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}