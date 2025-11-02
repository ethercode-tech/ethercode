import { Disclosure } from "@headlessui/react";
import ChatWhatsapp from "./buttonWhatsapp";
import ButtonTop from "./buttonTop";
import ChatBotButton from "../components/chatBotButton";

const ChatWidget = () => {
  return (
    <div className="space-y-2 mb-2 ">
      <Disclosure>
        {({ open }) => (
          <>
            {/* Subir  */}
            {/* <ScrollLink
              activeClass="active"
              to="inicio"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <Disclosure.Button
                className={`fixed z-40 flex items-center justify-center transition duration-300 rounded-full shadow-lg right-5 bottom-20 w-14 h-14  focus:outline-none  text-white bg-transparent ease`}
              >
                <svg
                  className="w-6 h-6 text-white font-bold"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                  ></path>
                </svg>
              </Disclosure.Button>
            </ScrollLink> */}

            <ButtonTop />
            <ChatWhatsapp />
            {/* <ChatBotButton /> */}
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default ChatWidget;
