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
      "We deliver to most areas. If your pincode is unserviceable, we’ll contact you.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, you’ll receive a tracking ID by email or on your registered phone number once shipped.",
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
    <div id="contact" className="p-8 md:p-16 font-sans">
      <div className="grid md:grid-cols-2 gap-10 items-stretch md:mx-28">
        {/* FAQ Section */}
        <div className="rounded-2xl shadow p-6 h-[450px] flex flex-col overflow-y-scroll">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-6 tracking-wide leading-snug">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          {faqs.map((item, index) => (
            <div key={index} className="border-b py-3">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left flex justify-between items-center font-medium"
              >
                <span>{item.question}</span>
                <span className="text-xl">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
              )}
            </div>
          ))}

        </div>

        {/* Contact & Map Section */}
        <div className="h-[450px] flex flex-col">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between min-h-full">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-black x`tracking-wide leading-snug text-center">
                CONTACT US
              </h2>

              <p className="text-gray-700 font-bold text-center mb-16">
                We’re excited to connect with you!
              </p>
              <div className="grid grid-cols-5 gap-4">
                <a
                  href="https://api.whatsapp.com/send/?phone=918788292204&amp;text&amp;type=phone_number&amp;app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-white font-semibold p-3 rounded-lg bg-green-700 hover:bg-green-800"
                >
                  <FaWhatsapp size={24} />
                </a>

                <a
                  href="https://www.instagram.com/archanasolanki_6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-white font-semibold p-3 rounded-lg"
                  style={{
                    background: "linear-gradient(to right, #e1306c, #f58529)",
                  }}
                >
                  <FaInstagram size={24} />
                </a>

                <a
                  href="https://www.google.com/search?q=Fashion+Designer+Archana+Solanki+Reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-white font-semibold p-3 rounded-lg"
                  style={{
                    background: "linear-gradient(180deg, #1e3c72, #2a5298, #3b8dbd)",
                  }}
                >
                  <FaGoogle size={24} />
                </a>

                <a
                  href="https://www.facebook.com/share/16yDssGCwi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-white font-semibold p-3 rounded-lg bg-blue-600 hover:bg-blue-700"
                >
                  <FaFacebook size={24} />
                </a>

                <a
                  href="https://pin.it/295TL0ZlA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-white font-semibold p-3 rounded-lg bg-red-600 hover:bg-red-700"
                >
                  <FaPinterest size={24} />
                </a>
              </div>


            </div>
            <div className="text-gray-700 text-center">
              <div className="text-[15px] text-gray-800 leading-snug font-[Inter,sans-serif]">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4 tracking-wide leading-snug text-center">
                  CASUALS BY ARCHANA SOLANKI
                </h2>
                <p className="font-semibold text-center leading-relaxed">
                  Plot No. 46, Parvati Industrial Estate,<br />
                  C.T.S No. 4008, Opposite Adinath Society,<br />
                  Behind Laxmi Co-op Bank, Pune – Satara Road,<br />
                  Pune – 411009, Maharashtra.
                </p>

                <span className="text-black text-center font-semibold block mt-2 text-lg md:text-xl tracking-wide font-[Inter,sans-serif]">
                  +91 87882 92204 / +91 73873 91363
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqContactSection;
