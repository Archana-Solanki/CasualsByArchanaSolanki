import React, { useState } from "react";
import Logo from "../assets/Logo.png";

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  return (
    <div>
      <footer className="w-full bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
                <img src={Logo} className="h-8 me-3" alt="FlowBite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Casuals By Archana Solanki
                </span>
              </a>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={() => openModal("terms")}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:underline">
                Terms & Conditions
              </button>
            </div>
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2025{" "}
              <a className="hover:underline">Casuals By Archana Solanki</a>. All
              Rights Reserved.
            </span>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 sm:text-center">
              Developed by{" "}
              <a
                href="https://radigitalsolution.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-medium"
              >
                RA Digital Solution
              </a>{" "}
              | Contact:{" "}
              <a href="tel:+918788292204" className="hover:underline">
                +91 8983985787
              </a>
            </div>

          </div>
        </div>

      </footer>

      {/* Modal Overlay */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full mx-4 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {activeModal === "terms" && "Terms & Conditions"}
                  {activeModal === "exchange" && "Exchange Policy"}
                  {activeModal === "privacy" && "Privacy Policy"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                {/* Terms & Conditions Content */}
                {activeModal === "terms" && (
                  <>
                    <p>
                      Welcome to Casuals By Archana Solanki. By accessing and
                      using our website, you agree to comply with and be bound
                      by the following terms and conditions.
                    </p>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      General Terms
                    </h3>
                    <p>
                      All products and services are subject to availability. We
                      reserve the right to modify or discontinue any product or
                      service without prior notice.
                    </p>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Related Policies
                    </h3>
                    <p>Please also review our related policies:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <button
                        onClick={() => openModal("exchange")}
                        className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
                      >
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                          Exchange Policy
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Learn about our product exchange procedures and
                          conditions.
                        </p>
                      </button>
                      <button
                        onClick={() => openModal("privacy")}
                        className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
                      >
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                          Privacy Policy
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Information about how we collect and use your personal
                          data.
                        </p>
                      </button>
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Contact
                    </h3>
                    <p>
                      If you have any questions about these terms and
                      conditions, please contact us through our customer service
                      channels.
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last updated: January 2025
                    </p>
                  </>
                )}

                {/* Exchange Policy Content */}
                {activeModal === "exchange" && (
                  <>
                    <p>
                      This Exchange Policy (‘Policy’) forms part of the terms of
                      service governing purchases made from Casuals by Archana
                      Solanki (‘we’, ‘our’, ‘us’). By purchasing from our
                      website, the consumer (‘you’) agree to the conditions set
                      out below.
                    </p>
                    <p>
                      <b>Please note:</b> We currently do not have a return
                      policy and a refund policy.
                    </p>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION A – GENERAL
                    </h3>
                    <p>
                      We allow exchanges to ensure you get the right fit. Please
                      read this policy carefully as it outlines the conditions
                      under which exchanges are accepted.
                    </p>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION B – ELIGIBILITY FOR EXCHANGE
                    </h3>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>
                        You may request an exchange within 7 (seven) days from
                        the date you receive the product.
                      </li>
                      <li>
                        Requests received after 7 (seven) days will not be
                        processed.
                      </li>
                    </ul>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION C – SCOPE OF EXCHANGE
                    </h3>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>
                        Exchanges are permitted only for size of the same
                        product.
                      </li>
                      <li>
                        Exchange for a different item, style, or colour is not
                        permitted.
                      </li>
                      <li>
                        Only one exchange request will be entertained per order.
                      </li>
                    </ul>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION D – CONDITION OF PRODUCTS
                    </h3>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>
                        The item must be returned in its original condition,
                        unused, unwashed, and with all original tags and
                        packaging intact.
                      </li>
                      <li>
                        Products showing signs of wear, damage, alteration, or
                        with missing tags will not be accepted.
                      </li>
                      <li>
                        We also request you to record a clear video while
                        opening the courier package. If you do not provide this
                        video as proof, your exchange request will not be
                        entertained.
                        <b>NOTE:</b> It is the customer’s responsibility to
                        ensure that the video is clear, continuous, and
                        unedited, showing the package in sealed condition before
                        opening. Any unclear or tampered video proof will not be
                        accepted.
                      </li>
                    </ul>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION E – SHIPPING & COURIER COSTS
                    </h3>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>
                        The customer is responsible for bearing all courier
                        charges, both for sending the product back to us and for
                        receiving the exchanged product.
                      </li>
                      <li>
                        After we receive and inspect the returned item, the
                        replacement will be shipped within 3–4 working days.
                      </li>
                      <li>
                        We are not liable for any loss, damage, or delay caused
                        by third-party courier services during either leg of
                        shipping (return from you to us, and replacement from us
                        to you).
                      </li>
                    </ul>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION F – STOCK AVAILABILITY
                    </h3>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>
                        Exchanges are subject to the availability of the
                        requested size at the time the returned product is
                        received and approved.
                      </li>
                      <li>
                        If the requested size is unavailable, our team will
                        inform you of the next steps.
                      </li>
                    </ul>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION G – NON-ELIGIBLE ITEMS
                    </h3>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>
                        Products sold under sale/discounts are not eligible for
                        exchange.
                      </li>
                      <li>
                        Products that are add ons’ (this might include buttons,
                        cloth pieces or any such add ons) are not subjected to
                        exchange.
                      </li>
                    </ul>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION H – SELF-SHIPPING INSTRUCTIONS
                    </h3>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>
                        If your exchange request is approved, you will be
                        required to self-ship the product to us.
                      </li>
                      <li>
                        You can do this by visiting your nearest courier service
                        provider and booking the shipment to our warehouse
                        address, which will be shared with you through our
                        official email ID.
                      </li>
                      <li>
                        Ensure that the product is securely packed to avoid any
                        damage in transit.
                      </li>
                      <li>
                        The package must include your order number, name, and
                        contact details inside for quick processing.
                      </li>
                      <li>
                        When sending an item back for exchange, customers must
                        provide valid tracking information. This is mandatory to
                        ensure safe delivery and to avoid any delays or issues
                        with processing the exchange.
                      </li>
                      <li>
                        Approved exchanges should be shipped within 2–3 working
                        days after confirmation.
                      </li>
                      <li>
                        We reserve the right to update or change our exchange
                        policy at any time. It is the customer’s responsibility
                        to review the latest policy before initiating an
                        exchange.
                      </li>
                      <li>
                        Once we receive and verify the returned product, we will
                        dispatch the exchanged size within 3–4 working days.
                        <b>NOTE:</b> We are not responsible for packages that
                        are lost, delayed, or damaged during self-shipping. The
                        courier service chosen by you will be solely responsible
                        for safe delivery.
                      </li>
                    </ul>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      For more details, please refer to our{" "}
                      <button
                        onClick={() => openModal("terms")}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Terms & Conditions
                      </button>
                    </p>
                  </>
                )}

                {/* Privacy Policy Content */}
                {activeModal === "privacy" && (
                  <>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION A – GENERAL
                    </h3>
                    <p>
                      1.1 This Privacy Policy is to provide you (‘You’ or ‘Your’
                      or ‘User’ or ‘Users’) information of the data usage by our
                      website <b>casualsbyarchanasolanki.in</b>. The term
                      User/User(s) means any individual or entity which uses,
                      accesses or browses Casuals by Archana Solanki and/or
                      purchases Products from Casuals by Archana Solanki
                      (Hereinafter referred to as ‘We’ or ‘Us’ or ‘Our’).
                    </p>
                    <p>
                      1.2 You are required to read this Privacy Policy carefully
                      since Your use of Casuals by Archana Solanki (hereinafter
                      referred to as ‘Website’ or ‘Site’) implies knowledge,
                      understanding and acceptance of all terms of this Privacy
                      Policy.
                    </p>
                    <p>
                      1.3 In this Privacy Policy, We set out the types of
                      information that We may collect, the purpose of collection
                      of the information, how We collect, use, disclose,
                      transfer and store Your information so that you can make
                      an informed decision in relation to the sharing of your
                      personal information with Us.
                    </p>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION B – APPLICABILITY
                    </h3>
                    <p>
                      2.1 You may be able to access or browse Casuals by Archana
                      Solanki from outside the geographical territories of the
                      Republic of India, however, please note that the Products
                      listed the site are not offered for sale outside the
                      geographical territories of the Republic of India. Your
                      Information will primarily be collected, stored and
                      processed in India and will be governed by the applicable
                      laws (including data protection and privacy laws) that are
                      different from those that apply in the country in which
                      you are located.
                    </p>
                    <p>
                      2.2 This document is an electronic record and is governed
                      by the provisions of the applicable law. This electronic
                      record is generated by a computer system and does not
                      require any physical or digital signatures.
                    </p>
                    <p>
                      2.3 You may be asked to provide your information anytime
                      you visit, access, use or browse our site. We may share
                      information and use it consistent with the provisions of
                      this Privacy Policy. We may also combine it with other
                      information to provide and improve our Products, services,
                      content and advertising. Please familiarize yourself with
                      our Privacy Policy. If you do not agree with any
                      provisions of the Terms or this Privacy Policy, we advise
                      you to not use or access Casuals by Archana Solanki.
                    </p>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION C – TYPE OF INFORMATION COLLECTED
                    </h3>
                    <p>
                      3.1 This Privacy Policy sets out the type of information
                      collected from the Users. You may at any time withdraw
                      your consent for collection and use of your Information
                      including Personal Information or Sensitive Personal Data/
                      Information. However, please note that if you withdraw
                      your consent, we may no longer be able to provide you with
                      the corresponding service for which you have withdrawn
                      your consent. It is hereby clarified that your decision to
                      withdraw your consent will not affect the processing of
                      Information based on your previous consent prior to the
                      withdrawal.
                    </p>
                    <p>
                      3.2 When you use our Site, We collect and store
                      information shared by You. Our primary goal in doing so is
                      for the purposes of providing our services. In general,
                      the User can browse the Site without revealing any
                      personal information about Yourself. However, to fully use
                      our Site, You will need to signup, where You may be
                      required to provide Us with Your name, contact number,
                      email id, password, billing information, shipping
                      information, bank account details and other personal
                      information as indicated in the forms throughout the Site.
                      You always have the option to not provide information by
                      choosing not to use a particular service or feature on the
                      Site.
                    </p>
                    <p>
                      3.3 We may automatically track certain information like
                      the URL that You just came from (whether this URL is on
                      our Site or not), which URL you go to next (whether this
                      URL is on our Site or not), your computer browser
                      information, and your IP address, based upon your
                      activities on our Site.
                    </p>
                    <p>
                      3.4 You agree that We may also collect information such as
                      location as and when suitable to us.
                    </p>
                    <p>
                      <b>NOTE:</b> You agree to provide information which shall
                      be true, correct, up to date and accurate.
                    </p>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION D – USAGE OF COLLECTED INFORMATION
                    </h3>
                    <p>
                      4.1 We may collect, use or process your information
                      including Personal Information and Sensitive Personal
                      Data/ Information for the following purposes:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>
                        For creating and giving you access to your registered
                        account on Casuals by Archana Solanki.
                      </li>
                      <li>
                        To validate and process your request for the provision
                        of Products or accessing of Casuals by Archana Solanki.
                      </li>
                      <li>
                        To assist merchants to handle and fulfil your orders.
                      </li>
                      <li>
                        To develop, deliver, process and improve our Products,
                        services, content in order to personalize and improve
                        your experience.
                      </li>
                      <li>
                        To inform you about our Products, services, offers,
                        discounts, updates, promotional initiatives, upcoming
                        events, that may be of your interest, including
                        providing you information in relation to your order
                        confirmations, invoices, delivery status, technical
                        notices, security alerts, etc.
                      </li>
                      <li>
                        For our internal business analytical and research
                        purposes such as auditing, data analysis and research to
                        improve our Products, services and customer
                        communications.
                      </li>
                      <li>
                        To meet any legal or regulatory requirement or comply
                        with a request from any governmental or judicial
                        authority.
                      </li>
                      <li>
                        To provide you with recommendation about Products you
                        may be interested in.
                      </li>
                      <li>
                        To provide you with marketing communications and
                        advertising that we believe may be of interest for you.
                      </li>
                      <li>
                        To resolve any request, dispute, grievance or complaint
                        raised by you in relation to your use of Casuals by
                        Archana Solanki.
                      </li>
                      <li>
                        To detect or monitor any fraudulent or illegal activity
                        on our website.
                      </li>
                    </ul>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION E – DISCLOSURE OF INFORMATION
                    </h3>
                    <p>
                      5.1 We may from time to time be required to disclose the
                      Information collected from you to our trusted third-party
                      service providers who assist us in order to facilitate the
                      provision of certain services in relation to your purchase
                      of Products on our Site.
                    </p>
                    <p>
                      5.2 We ensure that such third-party service providers are
                      bound by reasonable confidentiality obligations and comply
                      with applicable laws.
                    </p>
                    <p>
                      5.3 To the extent permitted under applicable laws, we may
                      disclose your Information if we believe it is necessary
                      for legal or regulatory reasons.
                    </p>
                    <p>
                      5.4 We may disclose or transfer your Information as part
                      of reorganization, asset sale, or transfer to third
                      parties with adequate confidentiality and security
                      measures.
                    </p>
                    <p>
                      5.5 A third-party payment gateway provider may be required
                      to collect financial information such as credit/debit card
                      numbers or bank details. All Financial Information is
                      transacted securely with encryption. Verification is
                      solely your responsibility, and we bear no liability for
                      issues with third-party providers.
                    </p>
                    <p>
                      5.6 You are strongly advised to exercise reasonable
                      discretion while providing sensitive data on the internet.
                    </p>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION F – COOPERATION WITH LAW & GOVERNING LAW
                    </h3>
                    <p>
                      6.1 We cooperate with law enforcement and may disclose
                      information if required for criminal investigations,
                      fraud, or legal activities.
                    </p>
                    <p>
                      6.2 This Privacy Policy is governed by the laws of India.
                      You agree to the exclusive jurisdiction of the courts of
                      Pune, Maharashtra.
                    </p>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION G – SECURITY
                    </h3>
                    <p>
                      1.1 <b>Secure Server Software:</b> We use SSL encryption
                      to protect your data during transmission and ensure
                      customer data is protected against unauthorized access.
                    </p>
                    <p>
                      1.2 <b>Privacy Guarantee:</b> Employees violating policies
                      face disciplinary action. Only authorized employees have
                      access to your information.
                    </p>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION H – CHANGES IN POLICY
                    </h3>
                    <p>
                      1.1 Your visit and disputes are subject to this Privacy
                      Policy and Terms & Conditions. We may change policies
                      anytime and will post updates accordingly.
                    </p>

                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      SECTION I – USER RIGHTS
                    </h3>
                    <p>
                      You have control over your personal information. You can
                      request a copy of your data or withdraw consent at any
                      time.
                    </p>
                    <p>
                      <b>Contact:</b>
                    </p>
                    <p>Email: casualsbyarchanasolanki@gmail.com</p>
                    <p>WhatsApp: +91 8788292204</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      For more details, please refer to our{" "}
                      <button
                        onClick={() => openModal("terms")}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Terms & Conditions
                      </button>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
