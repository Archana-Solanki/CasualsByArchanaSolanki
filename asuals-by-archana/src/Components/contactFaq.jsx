import React, { useState } from "react";

const faqs = [
  "What is cold-pressed oil?",
  "Are your oils really chemical-free?",
  "Where do you source your seeds from?",
  "How should I store the oil?",
  "What is the shelf life of your oils?",
  "Can I use these oils for cooking at high temperatures?",
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
        <div className="rounded-2xl shadow p-6 h-full flex flex-col">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-6 tracking-wide leading-snug">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          {faqs.map((question, index) => (
            <div key={index} className="border-b py-3">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left flex justify-between items-center font-medium"
              >
                <span>{question}</span>
                <span className="text-xl">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="text-sm text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Contact & Map Section */}
        <div className="h-full flex flex-col">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between min-h-full">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-6 tracking-wide leading-snug">
                CONTACT US
              </h2>

              <p className="text-gray-700 font-semibold">
                We’re excited to connect with you!
              </p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://api.whatsapp.com/send/?phone=918788292204&amp;text&amp;type=phone_number&amp;app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-white font-semibold py-2 rounded-lg col-span-1 bg-green-700 hover:bg-green-800"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/archanasolanki_6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-white font-semibold py-2 rounded-lg col-span-1"
                  style={{
                    background: "linear-gradient(to right, #e1306c, #f58529)",
                  }}
                >
                  Instagram
                </a>
                <a
                  href="https://www.google.com/search?q=Fashion+Designer+Archana+Solanki+Reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-white font-semibold py-2 rounded-lg col-span-1"
                  style={{
                    background:
                      "linear-gradient(180deg, #1e3c72, #2a5298, #3b8dbd)",
                  }}
                >
                  Google Review
                </a>
                <a
                  href="https://www.facebook.com/share/16yDssGCwi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-white font-semibold py-2 rounded-lg col-span-1 bg-blue-600 hover:bg-blue-700"
                >
                  Facebook
                </a>
                <a
                  href="https://pin.it/295TL0ZlA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-white font-semibold py-2 rounded-lg col-span-2 bg-red-600 hover:bg-red-700"
                >
                  Pinterest
                </a>
              </div>
            </div>
            <div className="text-gray-700 text-center">
              <div className="text-[15px] text-gray-800 leading-snug font-[Inter,sans-serif]">
                <strong className="text-[17px] font-bold font-family[Playfair_Display,serif]">  
                  Casuals By Archana
                </strong>
                <br />
                Plot No. 46, Parvati Industrial Estate,
                <br />
                C.T.S No. 4008, Opposite Adinath Society,
                <br />
                Behind Laxmi Co-op Bank, Pune – Satara Road,
                <br />
                Pune – 411009, Maharashtra.
                <br />
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
