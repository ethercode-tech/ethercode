import Head from "next/head";
import Navbar from "../components/NavbarIndex";
import Container from "../components/container";
import Footer from "../components/footer";

const Legal = () => {
  return (
    <>
      <Head>
        <title>Legal Information - EtherCode</title>
        <meta
          name="description"
          content="Legal information about EtherCode, including rights, responsibilities, and regulations regarding the use of our services in Jujuy and Argentina."
        />
        {/* ROBOTS NOFOLLOW */}
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />
        <link rel="canonical" href="https://www.ethercode.com.ar/legal" />
      </Head>

      <Navbar />
        <Container>
          <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto px-6 py-10">
              <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
                Legal Information
              </h1>

              {/* 1 */}
              <h2 className="text-3xl font-bold mb-6">1. Legal Entity</h2>
              <p className="text-lg text-gray-300 mb-10">
                EtherCode™ is a registered trademark in process before the Argentine National Institute of Industrial Property (INPI), operating under the official domain{" "}
                <a href="https://ethercode.com.ar" className="text-blue-500 hover:underline">
                  ethercode.com.ar
                </a>
                . The company is currently undergoing legal registration as a business entity in the Argentine Republic.
              </p>

              {/* 2 */}
              <h2 className="text-3xl font-bold mb-6">2. Legal Compliance</h2>
              <p className="text-lg text-gray-300 mb-10">
                All services provided by EtherCode™ comply with applicable national and local regulations, including consumer protection, personal data security, and compliance with tax and labor obligations.
              </p>

              {/* 3 */}
              <h2 className="text-3xl font-bold mb-6">3. Terms and Conditions</h2>
              <p className="text-lg text-gray-300 mb-10">
                By using our services, you agree to the Terms and Conditions that govern the use of our products and services. These can be reviewed in detail on our{" "}
                <a href="/terms" className="text-blue-500 hover:underline">Terms and Conditions</a> page.
              </p>

              {/* 4 */}
              <h2 className="text-3xl font-bold mb-6">4. Privacy Policy</h2>
              <p className="text-lg text-gray-300 mb-10">
                Protecting your personal data is our priority. Data collection and usage are carried out in accordance with our{" "}
                <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>. Please review it carefully to understand how we handle your data.
              </p>

              {/* 5 */}
              <h2 className="text-3xl font-bold mb-6">5. Data Handling in Forms</h2>
              <p className="text-lg text-gray-300 mb-10">
                By using our contact forms or any form on our website, you consent to EtherCode™ collecting and storing the information you provide. This data will be used solely for the stated purposes, such as responding to your inquiries or providing requested services.
              </p>
              <p className="text-lg text-gray-300 mb-10">
                All data is handled in accordance with our{" "}
                <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>. We do not share your personal information with third parties without prior consent, unless required by law.
              </p>
              <p className="text-lg text-gray-300 mb-10">
                You have the right to access, correct, or request the deletion of your data at any time. To exercise these rights, please contact us at{" "}
                <a href="mailto:ethercode@gmail.com" className="text-blue-500 hover:underline">ethercode@gmail.com</a>.
              </p>

              {/* 6 */}
              <h2 className="text-3xl font-bold mb-6">6. Intellectual Property Rights</h2>
              <p className="text-lg text-gray-300 mb-10">
                All content on our website, including text, graphics, logos, and software, is the property of EtherCode™ or its licensors and is protected under applicable intellectual property laws. Reproduction, distribution, or modification of this content is strictly prohibited without prior written consent from EtherCode™.
              </p>

              {/* 7 */}
              <h2 className="text-3xl font-bold mb-6">7. Legal Contact</h2>
              <p className="text-lg text-gray-300 mb-10">
                For any legal inquiries or further information about our policies, please contact us at{" "}
                <a href="mailto:ethercode@gmail.com" className="text-blue-500 hover:underline">ethercode@gmail.com</a>.
              </p>
            </div>
          </section>
        </Container>
      <Footer />
    </>
  );
};

export default Legal;
