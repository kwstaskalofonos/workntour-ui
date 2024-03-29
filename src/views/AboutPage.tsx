import React, { useEffect, useRef, useState } from "react";
import InterCom from "@src/views/common/InterCom";
import Header from "@src/views/common/Header";
import { isMobile } from "react-device-detect";
// @ts-ignore
import plane from "@src/assets/newLandingPage/icon-airplane.svg";
// @ts-ignore
import kart from "@src/assets/newLandingPage/icon-kart.svg";
// @ts-ignore
import rocket from "@src/assets/newLandingPage/icon-rocket.svg";
// @ts-ignore
import woman from "@src/assets/newLandingPage/icon-woman.svg";
// @ts-ignore
import life from "@src/assets/newLandingPage/lifePn.png";
// @ts-ignore
import about1 from "@src/assets/newLandingPage/about-1.png";
// @ts-ignore
import about2 from "@src/assets/newLandingPage/about-2.png";
// @ts-ignore
import about21 from "@src/assets/newLandingPage/about2-1.png";
// @ts-ignore
import about22 from "@src/assets/newLandingPage/about2-2.png";
// @ts-ignore
import about23 from "@src/assets/newLandingPage/about2-3.png";
// @ts-ignore
import raf from "@src/assets/newLandingPage/rafail.png";
// @ts-ignore
import thanasis from "@src/assets/newLandingPage/thanasis.png";
// @ts-ignore
// @ts-ignore
import chris from "@src/assets/newLandingPage/chris.png";
// @ts-ignore
import dimitris from "@src/assets/newLandingPage/dimitris.png";
// @ts-ignore
import jason from "@src/assets/newLandingPage/jason.png";
import PersonDescr from "@src/views/PersonDescr";
import { logEvent } from "firebase/analytics";
import { analytics } from "@src/utilities/firebase";
import { isDevServer } from "../../webpack/env";

const AboutPage: React.FunctionComponent = () => {
  useEffect(() => {
    if (!isDevServer) {
      logEvent(analytics, "about_page", {
        content_type: "string",
      });
    }
  }, []);

  const chrisDesc = () => {
    return (
      <p className={"is-size-7 p-1 has-text-justify"}>
        Christos is a skilled informatics professional with a degree from Athens
        University of Economics & Business. At Workntour, he plays a key role in
        setting the technical direction for product development with a focus on
        mobile app development. Christos brings extensive experience from
        working at technology companies and startups in Greece. His passion for
        cutting-edge technology solutions makes him a valuable asset to the
        team.
      </p>
    );
  };

  const rafDesc = () => {
    return (
      <p className={"is-size-7 p-1 has-text-justify"}>
        Rafail is a accomplished professional with a unique combination of legal
        and maritime expertise. Holding a Bachelor's in Law from Maastricht
        University and a Master's in Maritime from the Erasmus University of
        Rotterdam. As a key member of the team, he is responsible for setting
        goals, executing business development strategies, and leveraging his
        extensive background in yachting to drive success. Rafail's expertise
        and leadership make him a valuable asset to the Workntour team.
      </p>
    );
  };

  const thanDesc = () => {
    return (
      <p className={"is-size-7 p-1 has-text-justify"}>
        Thanasis is a talented computer engineer with a degree from the
        University of Patras and a Master's in Business Administration from the
        University of Pafos. Thanasis is responsible for implementing the
        backend of the company's web and mobile applications, and ensuring
        seamless technical operation. His dedication to his craft and commitment
        to delivering high-quality solutions make him a valuable asset to the
        Workntout team.
      </p>
    );
  };

  const dimitrisDesc = () => {
    return (
      <p className={"is-size-7 p-1 has-text-justify"}>
        Dimitris is a highly qualified computer science professional with a
        degree from the Dept. of Informatics and Telecommunications, NKUA. He
        brings extensive experience to the table as a Web Software Engineer and
        is currently serving in this capacity at Workntour. In this role,
        Dimitris is responsible for ensuring the seamless frontend
        implementation of the company's web application using the React
        framework.
      </p>
    );
  };

  const jasonDesc = () => {
    return (
      <p className={"is-size-7 p-1 has-text-justify"}>
        Jason holds a Bachelor's degree in International Business and a Master's
        degree in International Business - Strategy and Innovation issued by the
        Maastricht University. Alongside his role as a Director of Sales and
        Operations with acos cosmetics ltd., he is responsible for setting up
        Workntour's strategic orientation. His tasks include but are not limited
        to Strategic Planning, Strategic Consulting, PR and Communications.
      </p>
    );
  };

  const mobileView = () => {
    return (
      <React.Fragment>
        <div className={"column is-4"}>
          <p style={{ color: "#383350" }} className={"is-size-6 mt-5"}>
            We help hosts find affordable assistance in a variety of fields.
          </p>
          <p style={{ color: "#383350" }} className={"is-size-6 mt-5"}>
            We help travelers cover their needs when traveling for longer
            periods of time.
          </p>
          <p style={{ color: "#383350" }} className={"is-size-6 mt-5"}>
            We want remote areas and local communities to be able to attract
            more tourists.
          </p>
          <p style={{ color: "#383350" }} className={"is-size-6 mt-5"}>
            Workntour seeks to encourage personal and professional development
            by making travel accessible to all, to promote the Collaborative
            Economy, the exchange of Cultures and the "Live like a local"
            mentality.
          </p>
        </div>
        <div className={"column is-4"}>
          <img src={about2} />
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <InterCom />
      <section className={"section is-medium about-page-top-background pt-1"}>
        <div className={"columns mt-5"}>
          <div className={"column is-2"} />
          <div className={"column"}>
            <p
              style={{ position: "relative" }}
              className={"has-text-primary is-size-4 has-text-weight-semibold"}
            >
              Love for traveling
              <img
                style={{ position: "absolute", top: "13px" }}
                src={plane}
                width={20}
                height={20}
              />
            </p>
          </div>
          <div className={"column is-1"}></div>
          <div className={"column"}>
            <p
              style={{ position: "relative" }}
              className={"has-text-info is-size-4 has-text-weight-semibold"}
            >
              Innovation seekers
              <img
                style={{ position: "absolute", top: "10px" }}
                src={rocket}
                width={20}
                height={20}
              />
            </p>
          </div>
        </div>
        {!isMobile && (
          <div className={"columns is-centered"}>
            <div className={"column is-three-quarters has-text-centered"}>
              <img src={life} width={"55%"} height={10} />
            </div>
          </div>
        )}
        <div className={"columns mt-5"}>
          <div className={"column is-2"} />
          <div className={"column"}>
            <p
              style={{ position: "relative" }}
              className={"has-text-primary is-size-4 has-text-weight-semibold"}
            >
              Friendship oriented
              <img
                style={{ position: "absolute", top: "13px" }}
                src={woman}
                width={20}
                height={20}
              />
              <img
                style={{ position: "absolute", top: "13px", left: "233px" }}
                src={woman}
                width={20}
                height={20}
              />
            </p>
          </div>
          <div className={"column is-1"}></div>
          <div className={"column"}>
            <p
              style={{ position: "relative" }}
              className={"has-text-info is-size-4 has-text-weight-semibold"}
            >
              Experience driven
              <img
                style={{ position: "absolute", top: "10px" }}
                src={kart}
                width={20}
                height={20}
              />
            </p>
          </div>
        </div>
      </section>
      <section className={"section"}>
        <div className={"columns is-centered is-vcentered columnsFlex"}>
          <div className={"column is-4"}>
            <p
              style={{ color: "#383350" }}
              className={"is-size-3 has-text-weight-semibold"}
            >
              What is Workntour
            </p>
            <p style={{ color: "#383350" }} className={"is-size-6 mt-5"}>
              Workntour is an Online Marketplace that aims to revolutionize
              Tourism by connecting tourists and local communities, allowing
              travelers to offer their time, skills and expertise in exchange
              for accommodation and board.
            </p>
          </div>
          <div className={"column is-4"}>
            <img src={about1} className="resizeImages" />
          </div>
        </div>

        <div
          className={
            "columns is-centered is-vcentered" +
            (isMobile ? "" : "reverseColumnsFlex")
          }
        >
          {isMobile ? (
            mobileView()
          ) : (
            <React.Fragment>
              <div className={"column is-4"}>
                <img src={about2} className="resizeImages" />
              </div>
              <div className={"column is-4"}>
                <p style={{ color: "#383350" }} className={"is-size-6 mt-5"}>
                  We help hosts find affordable assistance in a variety of
                  fields.
                </p>
                <p style={{ color: "#383350" }} className={"is-size-6 mt-5"}>
                  We help travelers cover their needs when traveling for longer
                  periods of time.
                </p>
                <p style={{ color: "#383350" }} className={"is-size-6 mt-5"}>
                  We want remote areas and local communities to be able to
                  attract more tourists.
                </p>
                <p style={{ color: "#383350" }} className={"is-size-6 mt-5"}>
                  Workntour seeks to encourage personal and professional
                  development by making travel accessible to all, to promote the
                  Collaborative Economy, the exchange of Cultures and the "Live
                  like a local" mentality.
                </p>
              </div>
            </React.Fragment>
          )}
        </div>
      </section>

      <section style={{ backgroundColor: "rgba(182, 255, 251, 0.14)" }}>
        <section className={"section"}>
          <div className={"columns is-centered mt-5"}>
            <div className={"column is-two-thirds"}>
              <div style={{ position: "relative" }}>
                <div className={"box"}>
                  <div className={"columns"}>
                    <div className={"column"}>
                      <p
                        className={"is-size-2 has-text-weight-semibold"}
                        style={{ color: "rgba(224, 220, 255, 1)" }}
                      >
                        Why
                      </p>
                      <div
                        style={{ height: "3px", width: "90px" }}
                        className={"background-linear container ml-0"}
                      />
                      <p className={"is-size-6 has-text-weight-semibold mt-3"}>
                        Because we believe that exploring the world while
                        sharing your skills and culture with local communities
                        is the ultimate key to happiness!
                      </p>
                      {isMobile && (
                        <img src={about23} width={200} height={100} />
                      )}
                    </div>
                    <div className={"column is-4"} />
                  </div>
                </div>
                {!isMobile && (
                  <img
                    style={{ position: "absolute", left: "70%", top: "-37%" }}
                    src={about23}
                    width={200}
                    height={100}
                  />
                )}
              </div>

              <div style={{ position: "relative" }} className={"mt-6"}>
                <div className={"box"}>
                  <div className={"columns"}>
                    <div className={"column is-5"} />
                    <div className={"column"}>
                      <p
                        className={"is-size-2 has-text-weight-semibold"}
                        style={{ color: "rgba(224, 220, 255, 1)" }}
                      >
                        How
                      </p>
                      <div
                        style={{ height: "3px", width: "90px" }}
                        className={"background-linear container ml-0"}
                      />
                      <p className={"is-size-6 has-text-weight-semibold mt-3"}>
                        We connect travelers with local communities so that
                        tourists can offer their skills for a few hours a day,
                        in exchange for accommodation and board.
                      </p>
                      {isMobile && (
                        <img src={about22} width={200} height={100} />
                      )}
                    </div>
                  </div>
                </div>
                {!isMobile && (
                  <img
                    style={{ position: "absolute", left: "2%", top: "7%" }}
                    src={about22}
                    width={200}
                    height={100}
                  />
                )}
              </div>

              <div style={{ position: "relative" }} className={"mt-6"}>
                <div className={"box"}>
                  <div className={"columns"}>
                    <div className={"column"}>
                      <p
                        className={"is-size-2 has-text-weight-semibold"}
                        style={{ color: "rgba(224, 220, 255, 1)" }}
                      >
                        What
                      </p>
                      <div
                        style={{ height: "3px", width: "90px" }}
                        className={"background-linear container ml-0"}
                      />
                      <p className={"is-size-6 has-text-weight-semibold mt-3"}>
                        Our online marketplace will allow travelers to contact
                        the hosts of their choice, discuss the specifics of the
                        opportunity offered and the accommodation and food
                        provided, carry out a short video interview through our
                        platform and conduct preliminary training if needed. Our
                        travelers will also be able to book travel insurance and
                        transportation tickets on discount.
                      </p>
                      {isMobile && (
                        <img src={about21} width={200} height={100} />
                      )}
                    </div>
                    <div className={"column is-4"} />
                  </div>
                </div>
                {!isMobile && (
                  <img
                    style={{ position: "absolute", left: "70%", top: "-20%" }}
                    src={about21}
                    width={200}
                    height={100}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section className={"section is-medium about-page-last-background"}>
          <div className={"is-flex is-justify-content-center mt-6 mb-6"}>
            <p className={"has-text-weight-bold is-size-3 has-text-center"}>
              Meet our team
            </p>
          </div>

          <div className={"columns is-multiline is-centered"}>
            <div
              className={"column is-one-third-tablet is-one-quarter-widescreen"}
            >
              <PersonDescr
                key={"member-1"}
                src={raf}
                name={"Rafail Roumeliotis"}
                position={"Co-founder & CEO"}
                description={rafDesc()}
              />
            </div>
            <div
              className={"column is-one-third-tablet is-one-quarter-widescreen"}
            >
              <PersonDescr
                key={"member-2"}
                src={chris}
                name={"Xristos Petimezas"}
                position={"Co-founder & CTO"}
                description={chrisDesc()}
              />
            </div>
            <div
              className={"column is-one-third-tablet is-one-quarter-widescreen"}
            >
              <PersonDescr
                key={"member-3"}
                src={thanasis}
                name={"Thanasis Bethanis"}
                position={"Co-founder & COO"}
                description={thanDesc()}
              />
            </div>
            <div
              className={
                "column is-one-third-tablet is-one-quarter-widescreen is-centered"
              }
            >
              <PersonDescr
                key={"member-4"}
                src={dimitris}
                name={"Dimitris Sitaras"}
                position={"Web Software Engineer"}
                description={dimitrisDesc()}
              />
            </div>
            <div
              className={
                "column  is-one-third-tablet is-one-quarter-widescreen is-centered"
              }
            >
              <PersonDescr
                key={"member-4"}
                src={jason}
                name={"Jason Kalientzidis"}
                position={"Strategic Communications"}
                description={jasonDesc()}
              />
            </div>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
};

export default AboutPage;
