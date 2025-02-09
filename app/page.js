"use client";
import { useState } from "react";
import "./api/route";

import { faArrowTurnUp, faBolt } from "@fortawesome/free-solid-svg-icons";

import {
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faNodeJs,
  faPhp,
  faLaravel,
  faPython,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";

// If loading a variable font, you don't need to specify the font weight
import { Poppins } from "next/font/google";
import { Syne } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  preload: false,
});
const syne = Syne({ weight: "variable", preload: false });

export default function Home() {
  const [messageInput, setMessageInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "How can I help you learn more about Nathan and his Resume?",
    },
  ]);

  const submitForm = async (e) => {
    e.preventDefault();
    let newMessages = [...messages, { role: "user", content: messageInput }];
    setMessages(newMessages);
    setMessageInput("");

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await response.text();

      // Check if the response text is empty
      if (!text) {
        throw new Error("Empty response");
      }

      // Parse the response text as JSON
      const apiMessage = JSON.parse(text);

      if (!apiMessage.message) {
        throw new Error("Invalid response format");
      }

      setMessages([
        ...newMessages,
        { role: "assistant", content: apiMessage.message },
      ]);
    } catch (error) {
      console.error("There was an error:", error);
      // Optionally, handle the error in the UI
    }
  };

  // Open Menu on Mobile
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // CloseMenu on Mobile when nav link is clicked|Tapped
  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        .logo-text {
          font-family: ${syne.style.fontFamily}, sans-serif;
          font-weight: ${syne.style.fontWeight};
        }
        body,
        p,
        div,
        span,
        a,
        li,
        ul,
        ol,
        table,
        th,
        td {
          font-family: ${poppins.style.fontFamily}, sans-serif;
          font-weight: ${poppins.style.fontWeight};
        }
      `}</style>

      <Head>
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main>
        <header>
          <a href="#" className="logo-holder">
            <div className="logo">NP</div>
            <div className="logo-text">Nathan Portfolio</div>
          </a>
          <nav>
            <ul id="menu" className={menuOpen ? "active" : ""}>
              <li>
                <a href="#" onClick={closeMobileMenu}>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  onClick={closeMobileMenu}
                  className="menu-item"
                >
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" onClick={closeMobileMenu}>
                  Projects
                </a>
              </li>
              <li>
                <a href="#chatbot" onClick={closeMobileMenu}>
                  Chatbot
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+233546101828"
                  className="button"
                  onClick={closeMobileMenu}
                >
                  Contact me
                </a>
              </li>
            </ul>

            <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
              <img src="imgs/menu.png" width={24} height={24} />
            </a>
          </nav>
        </header>

        <section className="hero container">
          <div className="hero-purple">
            <h1>
              <small>Hi I'm</small>
              Nathan Yennupiak
            </h1>
            <p>
              Experienced Fullstack Developer in Ghana, currently pursuing an
              MPhil in Computer Science. Specializing in web and mobile app
              development, I create dynamic, user-friendly interfaces and robust
              backend systems. Passionate about integrating AI, such as ChatGPT,
              into projects to solve real-world challenges and deliver
              high-quality solutions.
            </p>

            <div className="call-to-action">
              <a
                href="/imgs/NATHAN YENNUPIAK ALI-CV.pdf"
                className="button black"
              >
                View Resume
              </a>
              <a href="https://wa.me/+233546101828" className="button white">
                Contact Me
              </a>
            </div>
            <div className="social-links">
              <a href="https://github.com/Nathan-Yennupiak">
                <img src="./imgs/github.png" alt="Github" width="48px" />
                <p>Github</p>
              </a>
              <a href="#">
                <img src="./imgs/linkedin.png" alt="LinkedIn" width="48px" />
                <p>LinkedIn</p>
              </a>
            </div>
          </div>
          <div className="hero-yellow">
            <img
              src="./imgs/nathan-dev.jpg"
              alt="Nathan Yennupiak"
              width="70%"
            />
          </div>
        </section>

        <section className="logos container">
          <div className="marquee">
            <div className="track">
              {/* <!--Repeat Images for marquee to be infinite--> */}
              <img src="imgs/html.png" alt="HTML" />
              <img src="imgs/css.png" alt="CSS" />
              <img src="imgs/javascript.png" alt="JS" />
              <img src="imgs/sass.png" alt="sass" />
              <img src="imgs/react.png" alt="React" />
              <img src="imgs/nextjs.png" alt="NextJS" />
              <img src="imgs/azure.png" alt="Azure" />
              <img src="imgs/vscode.png" alt="VS code" />
              {/* <!--Repeat Images--> */}
              <img src="imgs/html.png" alt="HTML" />
              <img src="imgs/css.png" alt="CSS" />
              <img src="imgs/javascript.png" alt="JS" />
              <img src="imgs/sass.png" alt="sass" />
              <img src="imgs/react.png" alt="React" />
              <img src="imgs/nextjs.png" alt="NextJS" />
              <img src="imgs/azure.png" alt="Azure" />
              <img src="imgs/vscode.png" alt="VS code" />
            </div>
          </div>
        </section>

        <section id="skills" className="skills container">
          <h2>
            <small>About Me</small>
            Skills
          </h2>

          <div className="holder-purple">
            <div className="left-column">
              <h3>Frontend</h3>
              <ul>
                <div>
                  <FontAwesomeIcon icon={faHtml5} />
                  <li>HTML</li>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCss3Alt} />
                  <li>CSS</li>
                </div>
                <div>
                  <FontAwesomeIcon icon={faJs} />
                  <li>Javascript</li>
                </div>
                <div>
                  <FontAwesomeIcon icon={faReact} />
                  <li>React</li>
                </div>
                <div>
                  <FontAwesomeIcon icon={faReact} />
                  <li>Next Js</li>
                </div>
              </ul>

              <h3>Backend</h3>
              <ul>
                <div>
                  <FontAwesomeIcon icon={faNodeJs} />
                  <li>Node.Js</li>
                </div>
                <div>
                  <FontAwesomeIcon icon={faPhp} />
                  <li>PHP</li>
                </div>
                <div>
                  <FontAwesomeIcon icon={faLaravel} />
                  <li>Laravel</li>
                </div>
                <div>
                  <FontAwesomeIcon icon={faPython} />
                  <li>Python</li>
                </div>
                <div>
                  <FontAwesomeIcon icon={faBolt} />
                  <li>Fast Api</li>
                </div>
              </ul>
            </div>
            <div className="right-column">
              {/* <h3>A bit about me</h3> */}
              <img
                src="./imgs/fullstack.png"
                alt="Nathan Yennupiak"
                width="100%"
                height="80%"
                className="header-image"
              />
            </div>
          </div>
        </section>

        <section className="work-experience container">
          <h2>
            <small>Recent</small>
            Professional Experience
          </h2>
          <div className="jobs">
            <article>
              <figure>
                <div>
                  <img src="imgs/BranPolymath.jpg" alt="Workplace -1" width="100%" />
                </div>
                <figcaption>Amplified Communications</figcaption>
              </figure>
              <h3>Amplified Communications</h3>
              Software Engineer
              <div>2023-Present</div>
              <p>
                • Designed and developed the company's official website,
                <br />
                • Built full-stack applications for inventory management and
                client projects, handling front-end and back-end development.
                <br />
                • Designed and developed RESTful APIs, making it easy for
                frontend apps to communicate with the backend.
                <br />
              </p>
            </article>
            <article>
              <figure>
                <div>
                  <img src="imgs/BranPolymath.jpg" alt="Workplace -2" width="100%" />
                </div>
                <figcaption>Bit-Alpha Innovations</figcaption>
              </figure>
              <h3>Bit-Alpha Innovations</h3>
              Backend Developer
              <div>2022-2023</div>
              <p>
                • Built and maintained the backend for various web applications,
                ensuring they were fast and scalable.
                <br />
                • Designed and developed RESTful APIs, making it easy for
                frontend apps to communicate with the backend.
                <br />• Handled database management, optimizing queries and
                ensuring data integrity.
              </p>
            </article>
            <article>
              <figure>
                <div>
                  <img
                    src="imgs/BranPolymath.jpg"
                    alt="Workplace -3"
                    width="100%"
                  />
                </div>
                <figcaption>University of Cape Coast-NSS</figcaption>
              </figure>
              <h3>University of Cape Coast-NSS</h3>
              Software Engineer
              <div>2021-2022</div>
              <p>
                • Tutored students on software development concepts, Microsoft
                Suite, and Google Workspace. <br />
                • Developed an automated script to efficiently enter results
                from Alison into an Excel sheet, significantly reducing manual
                effort and processing time. <br />• Collaborated with faculty
                and IT teams to enhance the security and performance of
                university portals.
              </p>
            </article>
          </div>
        </section>

        <section id="projects" className="bento container">
          <h2>
            <small>Previous</small>
            Projects
          </h2>
          <div className="bento-grid">
            <a
              href="https://mymoviesearchplus.netlify.app/"
              target="_blank"
              className="bento-item"
            >
              <img src="imgs/movieapp.png" alt="Movie App" width="100%" />
            </a>
            <a
              href="https://dreamoracleai.netlify.app/"
              target="_blank"
              className="bento-item"
            >
              <img src="imgs/dreamapp.png" alt="Dream Oracle AI" width="100%" />
            </a>
            <a
              href="https://sumariza.netlify.app/"
              target="_blank"
              className="bento-item"
            >
              <img src="imgs/summariza.png" alt="Summariza" width="100%" />
            </a>

            <a
              href="https://brandpolymath.netlify.app/"
              target="_blank"
              className="bento-item"
            >
              <img src="imgs/portfolio.png" alt="Portfolio" width="100%" />
            </a>
          </div>
        </section>

        <section id="chatbot" className="chatbot container">
          <h2>
            <small>Talk to me</small>
            Portfolio Chatbot
          </h2>
          <div className="chatbot-purple">
            <div className="chat-info">
              <h3>Azure AI Chatbot</h3>
              <p>
                I've put together a chatbot here which knows all my skills, work
                experience and has a copy of my CV/Resume. You can use it to ask
                questions about me to get a better idea of who I am and what
                I've done.
              </p>
              <p>
                You can also download my resume here if you want to take a look
                at it. I'm currently looking for new opportunities so if you
                have a project you think I'd be a good fit for, please get in
                touch...
              </p>
              <a
                href="/imgs/NATHAN YENNUPIAK ALI-CV.pdf"
                className="button black"
              >
                Download Resume
              </a>
            </div>
            <div className="chat-box">
              <div className="scroll-area">
                <ul id="chat-log">
                  {messages.map((message, index) => (
                    <li key={index} className={`${message.role}`}>
                      <span className={`avatar`}>
                        {message.role === "user" ? "You" : "AI"}
                      </span>
                      <div className="message">{message.content}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <form
                onSubmit={submitForm}
                className="chat-message"
                id="chat-form"
              >
                <input
                  type="text"
                  placeholder="Hi Nathan, what skills are you best at?"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button className="button black">Send</button>
              </form>
            </div>
          </div>
        </section>

        <a id="myBtn" href="#top">
          <FontAwesomeIcon icon={faArrowTurnUp} />
          {/* <p>Scroll to Top</p> */}
        </a>
      </main>

      <footer className="container foot">
        <p>Copyright ©2024 BrandPolymath</p>
      </footer>
    </>
  );
}
