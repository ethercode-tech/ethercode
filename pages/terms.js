import Head from "next/head";
import Navbar from "../components/NavbarIndex";
import Container from "../components/container";
import Footer from "../components/footer";

const Terms = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions - EtherCode</title>
        <meta
          name="description"
          content="Review the terms and conditions of use for the services and website of EtherCode."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />
        <link rel="canonical" href="https://www.ethercode.com.ar/terms" />
      </Head>
      <Navbar />
      <Container>
        <div className="flex flex-col pt-32">
          <section className="dark:bg-gray-900 flex-grow overflow-y-auto">
            <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
              Terms and Conditions
            </h2>

            <p className="text-lg text-gray-300 mb-8">
              These Terms and Conditions govern your use of the website{" "}
              <a href="https://ethercode.com.ar" className="text-blue-500 underline hover:text-blue-700">ethercode.com.ar</a> and any products or services offered by EtherCode™. By accessing or using our platform, you agree to be bound by these terms.
            </p>

            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              1. Acceptance of Terms
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              By accessing this website and using our services, you acknowledge that you have read, understood, and accepted these Terms and Conditions. If you do not agree with any part of these terms, you must refrain from using our services.
            </p>

            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              2. Modifications to the Terms
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              EtherCode™ reserves the right to update or modify these Terms at any time without prior notice. Your continued use of the website after any changes implies your acceptance of the revised Terms.
            </p>

            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              3. Use of Services
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              You agree to use our services only for lawful purposes and in accordance with these Terms. Misuse of our website, systems, or intellectual property may result in restricted access and legal consequences.
            </p>

            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              4. Intellectual Property
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              All content on this site, including code, images, text, graphics, trademarks, and software, is the property of EtherCode™ or its licensors and is protected by applicable intellectual property laws. Unauthorized reproduction, modification, or distribution is strictly prohibited.
            </p>

            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              5. User Responsibilities
            </h3>
            <ul className="list-disc ml-8 mb-8 text-lg text-gray-300">
              <li>Provide accurate and truthful information in all interactions with EtherCode™.</li>
              <li>Respect other users and not engage in harmful or illegal behavior.</li>
              <li>Use the platform in accordance with technical and ethical standards.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              6. Limitation of Liability
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              EtherCode™ shall not be held liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services, including but not limited to data loss, service interruptions, or third-party breaches.
            </p>

            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              7. External Links
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              Our website may include links to third-party websites. We are not responsible for the content, policies, or practices of these external sites.
            </p>

            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              8. Termination
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              We reserve the right to suspend or terminate your access to the website or our services at our sole discretion, without prior notice, in case of violation of these Terms or applicable laws.
            </p>

            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              9. Governing Law
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              These Terms and Conditions shall be governed and interpreted in accordance with the laws of the Argentine Republic. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in San Salvador de Jujuy.
            </p>

            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              10. Contact
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              If you have any questions about these Terms and Conditions, please contact us at{" "}
              <a href="mailto:ethercode@gmail.com" className="text-blue-500 hover:underline">ethercode@gmail.com</a>.
            </p>

            <p className="text-lg text-gray-300">
              Last updated: March 3, 2024
            </p>
          </section>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Terms;
