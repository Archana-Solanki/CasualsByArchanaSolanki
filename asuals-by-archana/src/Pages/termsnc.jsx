import { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import {
    ChevronDown,
    ChevronUp,
    Scale,
    ShoppingBag,
    User,
    Shield,
    CreditCard,
    AlertTriangle,
    FileText,
    Phone,
    Mail,
    MapPin,
    Link,
    MessageCircle,
    Ban,
    ShieldAlert,
    ShieldCheck,
    SlidersHorizontal,
    X,
    Gavel,
    Edit2
} from "lucide-react";

export default function TermsConditions() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const sections = [
        {
            title: "Eligibility & Account Creation",
            icon: <User className="w-5 h-5" />,
            content: [
                "1.	By agreeing to these Terms, you confirm that you are at-least 18 (eighteen) years of age and you are fully competent to enter into and comply with the terms of this agreement. If a user is below 18 (eighteen) years of age, it is assumed that such user is accessing our website under the supervision of user’s parents or legal guardian, and that such user’s parents or legal guardian has read and agrees to the terms of this agreement.",
                "To make purchases, you must create an account by signing up with: (a) Your full name (b) Mobile number (c) Email ID (d) Shipping address",
                "You are responsible for maintaining the confidentiality of your account information and for all activities under your account."
            ]
        },
        {
            title: "Online Store Terms",
            icon: <ShoppingBag className="w-5 h-5" />,
            content: [
                "You may not use our products or services for any illegal or unauthorized purpose. You must not violate any Indian laws while using this website.",
                "Transmitting malicious software (viruses, worms, or code of any destructive nature) is strictly prohibited. Violations may result in either termination of your services or a strict legal action or both."
            ]
        },
        {
            title: "General Conditions",
            icon: <Scale className="w-5 h-5" />,
            content: [
                "We reserve the right to refuse service to anyone, for any reason, at any time.",
                "You agree not to reproduce, duplicate, copy, sell, resell or exploit any part of the service or product without our written permission.",
                "You understand that your information (excluding payment information), may be transferred and may be adjusted to meet technical requirements of networks or devices."
            ]
        },
        {
            title: "Products & Services",
            icon: <FileText className="w-5 h-5" />,
            content: [
                "Certain products or services may have limited quantities and are subject to exchange only according to our Exchange Policy",
                "We have made every effort to display as accurately as possible the colour and images of our products. We cannot guarantee that your computer monitor's or mobile phone's display of any colour will be accurate.",
                "We reserve the right to limit the sales of our product or services to any person, region, or jurisdiction, and to discontinue any product without prior notice.",
                "The descriptions of Products or product pricing are subjected to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any Product at any time."
            ]
        },
        {
            title: "ACCURACY OF BILLING AND ACCOUNT INFORMATION",
            icon: <CreditCard className="w-5 h-5" />,
            content: [
                "1.	We reserve the right to refuse any order you placed with us. We may, in our sole discretion cancel or limit quantities purchased by you. In the event that we make a change to or cancel an order, we attempt to notify you by contacting the email and/ or the phone number provided at the time of creating a login account. We reserve the right to limit or prohibit orders that, in our sole judgement, appear to be placed by dealers, resellers or distributors.",
                "2.	You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including you phone number, email address and shipping address so we can full fill your orders accurately.",
                "3.	Once an order has been shipped or dispatched from our premises, no changes to the delivery address, contact number, or any other order details will be accepted. We are not liable for delivery failures or delays resulting from incorrect or outdated information provided by the customer at the time of placing the order."
            ]
        },
        {
            title: "THIRD PARTY LINKS AND TOOLS",
            icon: <Link className="w-5 h-5" />,
            content: [
                "1.	We might provide you with access to third-party tools or “as is” without warranties. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.",
                "2.	Any use by you of the optional tools offered through the site is entirely at your own risk and discretion.",
            ]
        },
        {
            title: "USER REVIEWS, FEEDBACKS AND OTHER SUBMISSIONS",
            icon: <MessageCircle className="w-5 h-5" />,
            content: [
                "1.	If, at our request, you send certain specific submissions or without a request from us, you send creative ideas, suggestion, proposals or other materials, whether online, by email, by post mail, or otherwise, you agree that we may, at any time, without restriction, edit copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (i)	to maintain any comments in confidence,(ii)	 to pay compensation for any comments or, (iii)	 to respond to any comments.",
                "2.	We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion to be unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.",
                "3.	You agree that your comments will not violate any right of any third party, including copyright, trademark, privacy, personality or other personal or proprietary rights. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material. ",
                "4.	You may not use a false e- mail address, pretend to be someone other than yourself, or otherwise mislead us or third parties."
            ]
        },
        {
            title: "PERSONAL INFORMATION",
            icon: <User className="w-5 h-5" />,
            content: [
                "Your submission of personal information is governed by our Privacy Policy",
            ]
        },
        {
            title: "SITE ACCURACY AND ERRORS",
            icon: <AlertTriangle className="w-5 h-5" />,
            content: [
                "1.	Occasionally there may be information on our site or in the service that contains typographical errors, in accuracies or omissions that may related to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, in accuracies or omissions, and to change or update information or cancel orders accordingly.",
                "2.	We undertake no obligation to update, amend or clarify any information unless required by law. ",
            ]
        },
        {
            title: "PROHIBITED USES",
            icon: <Ban className="w-5 h-5" />,
            content: [
                "In addition to other prohibitions as set forth in the Terms, you are prohibited from using the site or its content: (a)  for any unlawful purpose,(b) to solicit others to perform or participate in any unlawful acts; (c)  to violate any laws, rules, regulations or ordinances; (d) to infringe upon or violate our intellectual property rights;  (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;(f) to submit false or misleading information; (g) to interfere with websites security (h) to collect or track the personal information of others; (i) to spam, phish, pharm pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.",
            ]
        },
        {
            title: "DISCLAIMER OF WARRANTIES; LIMIATION OF LIABLITY: ",
            icon: <ShieldAlert className="w-5 h-5" />,
            content: [
                "1.	We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.",
                "2.	All products and services are provided “as is” without warranties unless explicitly stated. ",
                "3.	In no case shall we, our employees, officers, contractors, agents, interns, suppliers, service providers or licensors by liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind including, without limitation lost profits, lost revenue, lost savings, loss data, replacement cost, or any similar damages, whether based in contract, tort ( including negligence ), strict liability or otherwise, arising from your use of any of the service or any products procured using service, or for any other claim related in any way to your use of service or any products, including , but not limited to, any errors or omissions in any content, or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusions or the limitation of liability for consequential or incidental or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.",
            ]
        },
        {
            title: "INDEMNIFICATION",
            icon: <ShieldCheck className="w-5 h-5" />,
            content: [
                "1.	You agree to indemnify, defend and hold harmless Casuals by Archana Solanki and its affiliates, partners, interns and employees from any claim or demand including reasonable attorney’s fees made by any third party due to or arising out of your breach of these Terms or the documents they incorporate by reference, or your violation of any law or the rights of a third party. ",
            ]
        },
        {
            title: "SEVERABILITY",
            icon: <SlidersHorizontal className="w-5 h-5" />,
            content: [
                "1.	In the event that any provisions of these Terms is found to be unlawful, void or unenforceable, the remainder shall remain in full effect.",
            ]
        },
        {
            title: "TERMINATION",
            icon: <X className="w-5 h-5" />,
            content: [
                "1.	The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.",
                "2.	These Terms of Service are effective unless and until terminated by either you or us. You may terminated these Terms at any time by notifying us that you no longer wish to use our service, or when you cease using our site.",
                "3.	If in our sole judgement you fail, or we suspect that you have failed, to comply with any term or provisions of these Terms, we also may terminate this agreement at any time without prior notice and you will remain liable for all amounts due up to and including the date of termination and / or accordingly may deny you access to our services (or any part thereof) ",
            ]
        },
        {
            title: "ENTIRE AGREEMENT",
            icon: <FileText className="w-5 h-5" />,
            content: [
                "1.	The failure of us to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.",
                "2.	These Terms and any policies or operating rules posted by us on this site or in respect to the service constitutes the entire agreement and understanding between you and us and governs your use of the service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us.",
                "3.	Any ambiguities in the interpretation of these Terms shall not be construed against the drafting party.",
            ]
        },
        {
            title: "GOVERNING LAW",
            icon: <Gavel className="w-5 h-5" />,
            content: [
                "These Terms and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India.",
            ]
        },
        {
            title: "CHANGES TO TERMS",
            icon: <Edit2 className="w-5 h-5" />,
            content: [
                "1.	You can review the most current version of the Terms of Service at any time at this page.",
                "2.	We reserve the right to update, change or replace any part of these Terms anytime. It is your responsibility to review our website periodically for changes. Your continued use of or access to our website or the service following any changes to these Terms constitutes acceptance of those changes.",
            ]
        },
    ];

    return (
        <>
            <Navbar />
            <Helmet>
                <title>Terms of Service | Casuals by Archana Solanki</title>
                <meta
                    name="description"
                    content="Read the Terms of Service governing the use of the Casuals by Archana Solanki website, products, services, payments, and user responsibilities."
                />
            </Helmet>

            <main className="min-h-screen bg-white text-black pt-24">
                {/* Header */}
                <div className="bg-black text-white">
                    <div className="max-w-4xl mx-auto px-6 py-16">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white text-black rounded-full mb-6">
                                <FileText className="w-10 h-10" />
                            </div>
                            <h1 className="text-5xl md:text-6xl font-light tracking-wide mb-4">
                                TERMS OF SERVICE
                            </h1>
                            <div className="w-24 h-px bg-white mx-auto mb-6"></div>
                            <p className="text-lg font-light tracking-wider opacity-90">
                                CASUALS BY ARCHANA SOLANKI
                            </p>
                            <p className="text-sm font-light opacity-70 mt-2">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>


                {/* Introduction */}
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <div className="prose prose-lg max-w-none">
                        <div className="bg-gray-50 p-8 border-l-4 border-black mb-12">
                            <p className="text-lg leading-relaxed font-light mb-4">
                                This Terms of Service Agreement ("Agreement") constitutes a legally binding contract between <strong>Casuals by Archana Solanki</strong> (hereinafter referred to as "Company", "we", "us", or "our") and any person or entity (hereinafter referred to as "you", "your", or "User") who accesses or uses our website, its services, or purchases products from us, whether directly or indirectly.
                            </p>

                            <p className="text-base leading-relaxed font-light opacity-80 mb-4">
                                Any natural or legal entity who visits our site and/or purchases something from us engages in our "Service" and agrees to be bound by the following Terms of Service (“Terms”), including additional terms and policies referenced herein and/or available via hyperlink. These Terms apply to all users of the site, including but not limited to browsers, vendors, customers, merchants, and content contributors.
                            </p>

                            <p className="text-base leading-relaxed font-light opacity-80 mb-4">
                                These Terms constitute an electronic record as defined under the applicable Indian law. This electronic record does not require any digital signatures.
                            </p>

                            <p className="text-base leading-relaxed font-light opacity-80 mb-4">
                                We strongly advise you to read these Terms of Services carefully before accessing or using our website or availing any of our services. By doing so, you agree to be bound by these Terms. If you do not agree to any part of these Terms, then you may not access the website or avail any of our services.
                            </p>

                            <p className="text-base leading-relaxed font-light opacity-80 mb-4">
                                If these Terms are considered an offer, acceptance is expressly limited to these Terms.
                            </p>

                            <p className="text-base leading-relaxed font-light opacity-80 mb-4">
                                For the purpose of these Terms, “Products” refer to a diverse range of fashion and other products listed on sale on this website to you.
                            </p>

                            <p className="text-base leading-relaxed font-light opacity-80">
                                Any new features or tools added to the current store will also be subjected to the Terms. You can review the most current version of Terms of Service at any time on this page. We reserve the right to update, change, or replace any part of the Terms by posting updates and/or changes to our website. It is your responsibility to check this page periodically. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
                            </p>

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
                                                <p key={pIndex} className="text-gray-700 leading-relaxed font-light">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Important Sections */}
                    <div className="mt-16 space-y-12">
                        {/* Governing Law */}
                        <div className="bg-black text-white p-8">
                            <h3 className="text-2xl font-light tracking-wide mb-4">GOVERNING LAW</h3>
                            <p className="font-light leading-relaxed">
                                These Terms and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India.
                            </p>
                        </div>

                        {/* Changes to Terms */}
                        <div className="bg-gray-50 p-8 border-l-4 border-black">
                            <h3 className="text-2xl font-light tracking-wide mb-4">CHANGES TO TERMS</h3>
                            <p className="font-light leading-relaxed mb-4">
                                You can review the most current version of the Terms of Service at any time at this page.
                            </p>
                            <p className="font-light leading-relaxed">
                                We reserve the right to update, change or replace any part of these Terms anytime. Your continued use of or access to our website following any changes constitutes acceptance of those changes.
                            </p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-16 bg-white border-2 border-black p-8">
                        <h3 className="text-3xl font-light tracking-wide text-center mb-8">CONTACT INFORMATION</h3>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-xl font-medium tracking-wide">GRIEVANCE OFFICER</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-3">
                                        <User className="w-5 h-5" />
                                        <span className="font-light">Veera Solanki</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Phone className="w-5 h-5" />
                                        <span className="font-light">+91 7387391363</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xl font-medium tracking-wide">BRAND CONTACT</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-3">
                                        <Mail className="w-5 h-5" />
                                        <span className="font-light">casualsbyarchanasolanki@gmail.com</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Phone className="w-5 h-5" />
                                        <span className="font-light">+91 8788292204</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}