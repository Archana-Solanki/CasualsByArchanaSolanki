import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaPinterest, FaGoogle } from "react-icons/fa";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Add your selected product to cart, choose your size and colour, pay and complete checkout.",
  },
  {
    question: "Do I need an account to order?",
    answer: "Yes, you will need to make an account to order.",
  },
  {
    question: "Is Cash on Delivery (COD) available?",
    answer: "No, at this point COD is not available.",
  },
  {
    question: "Are online payments safe on your website?",
    answer: "Yes, it is very safe.",
  },
  {
    question: "Do you charge GST?",
    answer: "Yes, prices listed are inclusive of all applicable taxes.",
  },
  {
    question: "When will my order ship?",
    answer: "Orders are shipped within 2 working days of confirmation.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 8–10 days, depending on your location.",
  },
  {
    question: "Do you ship to all pincodes in India?",
    answer:
      "We deliver to most areas. If your pincode is unserviceable, we'll contact you.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, you'll receive a tracking ID by email or on your registered phone number once shipped.",
  },
  {
    question:
      "Can I redirect my package to a different address after shipping?",
    answer: "Once dispatched, the delivery address cannot be changed.",
  },
  {
    question: "What happens if my package is damaged during delivery?",
    answer: "Please record an unboxing video and contact us immediately.",
  },
  {
    question: "Do you have a return policy?",
    answer: "No, we currently do not accept returns. Only size exchanges are available.",
  },
  {
    question: "How many days do I have to request an exchange?",
    answer: "Within 7 (seven) days of receiving your order.",
  },
   {
    question: "What fabrics do you use?",
    answer: "We use high - quality fabrics chosen for comfort and durability.",
  },
   {
    question: "Are the colours shown on the website accurate?",
    answer: "We try to display colours as accurately as possible, but minor variations may occur due to screen settings.",
  },
  {
    question: "What happens if my order is lost in transit?",
    answer: "We will coordinate with the courier to resolve the issue.",
  },
  {
    question: "Do you store my payment details?",
    answer: "We assure that all the payment details stored with us is safe.",
  },
];

function FaqContactSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="contact" className="px-4 sm:px-6 md:px-8 lg:px-16 py-8 md:py-16 font-sans bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* FAQ Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-auto lg:h-[500px] xl:h-[550px] flex flex-col">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-black mb-4 sm:mb-6 tracking-wide leading-tight text-center lg:text-left">
                FREQUENTLY ASKED QUESTIONS
              </h2>

              <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-2 sm:space-y-3">
                  {faqs.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <button
                        onClick={() => toggle(index)}
                        className="w-full text-left flex justify-between items-start gap-3 font-medium text-sm sm:text-base text-gray-800 hover:text-black transition-colors duration-200 py-2"
                      >
                        <span className="flex-1 leading-relaxed">{item.question}</span>
                        <span className="text-lg sm:text-xl text-gray-600 flex-shrink-0 w-6 h-6 flex items-center justify-center">
                          {openIndex === index ? "−" : "+"}
                        </span>
                      </button>
                      {openIndex === index && (
                        <div className="mt-2 overflow-hidden">
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-0 pr-6">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Info Section */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 h-auto lg:h-[500px] xl:h-[550px] flex flex-col">
              {/* Contact Header */}
              <div className="text-center mb-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-black mb-2 tracking-wide leading-tight">
                  CONTACT US
                </h2>
                <p className="text-gray-700 font-medium text-sm sm:text-base">
                  We're excited to connect with you!
                </p>
              </div>

              {/* Social Media Links */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">Follow Us</h3>
                <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4 max-w-sm mx-auto">
                  <a
                    href="https://api.whatsapp.com/send/?phone=918788292204&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-white font-semibold p-2 sm:p-3 rounded-lg bg-green-600 hover:bg-green-700 transition-colors duration-200 aspect-square"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="text-lg sm:text-xl md:text-2xl" />
                  </a>

                  <a
                    href="https://www.instagram.com/archanasolanki_6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-white font-semibold p-2 sm:p-3 rounded-lg transition-all duration-200 hover:scale-105 aspect-square"
                    style={{
                      background: "linear-gradient(45deg, #e1306c, #f58529)",
                    }}
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-lg sm:text-xl md:text-2xl" />
                  </a>

                  <a
                    href="https://www.google.com/search?q=Fashion+Designer+Archana+Solanki+Reviews"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-white font-semibold p-2 sm:p-3 rounded-lg transition-all duration-200 hover:scale-105 aspect-square"
                    style={{
                      background: "linear-gradient(135deg, #1e3c72, #2a5298, #3b8dbd)",
                    }}
                    aria-label="Google"
                  >
                    <FaGoogle className="text-lg sm:text-xl md:text-2xl" />
                  </a>

                  <a
                    href="https://www.facebook.com/share/16yDssGCwi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-white font-semibold p-2 sm:p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 aspect-square"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="text-lg sm:text-xl md:text-2xl" />
                  </a>

                  <a
                    href="https://pin.it/295TL0ZlA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-white font-semibold p-2 sm:p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 aspect-square"
                    aria-label="Pinterest"
                  >
                    <FaPinterest className="text-lg sm:text-xl md:text-2xl" />
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2 text-center">Business Hours</h3>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="space-y-1 text-xs sm:text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Monday - Saturday:</span>
                      <span className="font-medium">10:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium">11:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              {/* <div className="mb-4">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-blue-800">Free Shipping</div>
                    <div className="text-xs text-blue-600">On orders above ₹999</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-green-800">Size Exchange</div>
                    <div className="text-xs text-green-600">Within 7 days</div>
                  </div>
                </div>
              </div> */}

              {/* Business Information */}
              <div className="text-center space-y-3 mt-auto">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-black tracking-wide leading-tight">
                  CASUALS BY ARCHANA SOLANKI
                </h3>
                
                <div className="space-y-2">
                  <address className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed not-italic">
                    Plot No. 46, Parvati Industrial Estate,<br className="hidden sm:inline" />
                    <span className="sm:hidden"> </span>C.T.S No. 4008, Opposite Adinath Society,<br className="hidden sm:inline" />
                    <span className="sm:hidden"> </span>Behind Laxmi Co-op Bank, Pune – Satara Road,<br className="hidden sm:inline" />
                    <span className="sm:hidden"> </span>Pune – 411009, Maharashtra.
                  </address>

                  <div className="space-y-1">
                    <a 
                      href="tel:+918788292204" 
                      className="block text-black font-semibold text-sm sm:text-base tracking-wide hover:text-blue-600 transition-colors duration-200"
                    >
                      +91 87882 92204
                    </a>
                    <a 
                      href="tel:+917387391363" 
                      className="block text-black font-semibold text-sm sm:text-base tracking-wide hover:text-blue-600 transition-colors duration-200"
                    >
                      +91 73873 91363
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqContactSection;