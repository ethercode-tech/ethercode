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
          content="Legal information from EtherCode, including rights, responsibilities, and regulations for using our services in Jujuy and Argentina."
        />
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

            <h2 className="text-3xl font-bold mb-6">1. Legal Entity</h2>
            <p className="text-lg text-gray-300 mb-10">
              EtherCode is a registered corporation in the Argentine Republic under the legal name <strong>EtherCode S.R.L.</strong> As such, it is subject to national laws and regulations, including but not limited to the Argentine Penal Code and the Personal Data Protection Law (Law No. 25.326).
            </p>

            <h2 className="text-3xl font-bold mb-6">2. Legal Compliance</h2>
            <p className="text-lg text-gray-300 mb-10">
              All services offered by EtherCode S.R.L. comply with local and national regulations. This includes consumer rights protection, data security, and compliance with tax and labor obligations.
            </p>

            <h2 className="text-3xl font-bold mb-6">3. Terms and Conditions</h2>
            <p className="text-lg text-gray-300 mb-10">
              By using EtherCode services, you agree to our Terms and Conditions, which govern the use of our products and services. These terms can be reviewed in detail on our{" "}
              <a href="/terms" className="text-blue-500 hover:underline">
                Terms and Conditions
              </a>{" "}
              page.
            </p>

            <h2 className="text-3xl font-bold mb-6">4. Privacy Policy</h2>
            <p className="text-lg text-gray-300 mb-10">
              Protecting your personal data is our priority. The collection and use of your information are governed by our{" "}
              <a href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              . We encourage you to read it carefully to understand how we manage your data.
            </p>

            <h2 className="text-3xl font-bold mb-6">5. Data Handling in Forms</h2>
            <p className="text-lg text-gray-300 mb-10">
              By using our contact forms or any other form on our website, you agree that the information you provide will be collected and stored by EtherCode S.R.L. This information will be used exclusively for the purposes stated in the form, such as responding to your inquiries or providing the requested services.
            </p>
            <p className="text-lg text-gray-300 mb-10">
              All submitted data will be treated in accordance with our{" "}
              <a href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              . We do not share your personal data with third parties without your prior consent, except when required by law.
            </p>
            <p className="text-lg text-gray-300 mb-10">
              You have the right to access, correct, or request the deletion of your data at any time. To exercise these rights, please contact us via email at{" "}
              <a
                href="mailto:ethercode@gmail.com"
                className="text-blue-500 hover:underline"
              >
                ethercode@gmail.com
              </a>
              .
            </p>

            <h2 className="text-3xl font-bold mb-6">6. Intellectual Property Rights</h2>
            <p className="text-lg text-gray-300 mb-10">
              All content on our website, including text, graphics, logos, and software, is the property of EtherCode S.R.L. or its licensors and is protected by applicable intellectual property laws. Reproduction, distribution, or modification of this content without prior written authorization from EtherCode S.R.L. is strictly prohibited.
            </p>

            <h2 className="text-3xl font-bold mb-6">7. Legal Contact</h2>
            <p className="text-lg text-gray-300 mb-10">
              For any legal inquiries or if you require more information about our policies, please contact us at{" "}
              <a
                href="mailto:ethercode@gmail.com"
                className="text-blue-500 hover:underline"
              >
                ethercode@gmail.com
              </a>
              .
            </p>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
};

export default Legal;
