import React from "react"
import Link from "next/link"
// internal

import { Email, Location } from "@svg"
import pay from "@assets/img/footer/footer-pay.png"

const social_data = [
  {
    id: 1,
    link: "https://www.facebook.com/hamed.y.hasan0",
    icon: "fa-brands fa-facebook-f",
    title: "Facebook",
  },
  {
    id: 2,
    link: "https://twitter.com/HamedHasan75",
    icon: "fa-brands fa-twitter",
    title: "Twitter",
  },
  {
    id: 3,
    link: "nkedin.com/in/hamed-hasan/",
    icon: "fa-brands fa-linkedin-in",
    title: "Linkedin",
  },
  {
    id: 4,
    link: "https://vimeo.com/",
    icon: "fa-brands fa-vimeo-v",
    title: "Vimeo",
  },
]

const FooterTwo = () => {
  return (
    <>
      <footer>
        <div
          className="tp-footer-area tp-footer-style-2 tp-footer-style-3 tp-footer-style-4 tp-footer-unified"
          data-bg-color="#F5F5F5"
          style={{ backgroundColor: `rgb(245, 245, 245)` }}
        >
          <div className="tp-footer-top pt-95 pb-40">
            <div className="container">
              <div className="row">
                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                  <div className="tp-footer-widget footer-col-4-1 mb-50">
                    <div className="tp-footer-logo">
                      <Link href="/">
                        <img
                          src="/assets/img/logo/crowncut-logonb.png"
                          alt="logo"
                          width={200}
                          height={200}
                          style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "contain",
                            display: "block",
                          }}
                        />
                      </Link>
                    </div>
                    <div className="tp-footer-widget-content">
                      
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-8 col-sm-6">
                  <div className="tp-footer-widget footer-col-4-2 mb-50">
                    <h4 className="tp-footer-widget-title">Contact Us</h4>
                    <div className="tp-footer-widget-content">
                      <div className="tp-footer-talk mb-20">
                        <h4>Crowncut Gems International</h4>
                        <p className="mb-10">We’d love to hear from you.</p>
                        <p className="mb-10">
                          For inquiries about gemstones, orders, or partnerships,
                          please reach out using the details below.
                        </p>
                        <p>
                          <strong>Phone / WhatsApp:</strong>{" "}
                          <a href="tel:+46760889995">076 088 99 95</a>
                        </p>
                      </div>
                      <div className="tp-footer-contact">
                        <div className="tp-footer-contact-item d-flex align-items-start">
                          <div className="tp-footer-contact-icon">
                            <span>
                              <Email />
                            </span>
                          </div>
                          <div className="tp-footer-contact-content">
                            <p>
                              <a href="mailto:crowncutgems@gmail.com">
                                crowncutgems@gmail.com
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="tp-footer-contact-item d-flex align-items-start">
                          <div className="tp-footer-contact-icon">
                            <span>
                              <Location />
                            </span>
                          </div>
                          <div className="tp-footer-contact-content">
                            <p>
                              <a
                                href="https://maps.google.com/?q=Studieg%C3%A5ngen%208%2C%2041681%2C%20Gothenburg%2C%20Sweden"
                                target="_blank"
                              >
                                Studiegången 8<br />41681 Gothenburg, Sweden
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="mb-0">
                        You may also use our contact form and our team will respond
                        within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-5">
                  <div className="tp-footer-widget footer-col-4-3 mb-50">
                    <h4 className="tp-footer-widget-title">Infomation</h4>
                    <div className="tp-footer-widget-content">
                      <ul>
                        <li>
                          <a href="#">Our Story</a>
                        </li>
                        <li>
                          <a href="#">Careers</a>
                        </li>
                        <li>
                          <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="#">Terms & Conditions</a>
                        </li>
                        <li>
                          <a href="#">Latest News</a>
                        </li>
                        <li>
                          <a href="#">Contact Us</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-7">
                  <div className="tp-footer-widget footer-col-4-4 mb-50">
                    <h4 className="tp-footer-widget-title">Subcribe.</h4>
                    <div className="tp-footer-widget-content">
                      <div className="tp-footer-subscribe">
                        <p>Our conversation is just getting started</p>
                        <div className="tp-footer-subscribe-form mb-30">
                          <form action="#">
                            <div className="tp-footer-subscribe-input">
                              <input
                                type="email"
                                placeholder="Enter Your Email"
                              />
                              <button type="submit">Subscribe</button>
                            </div>
                          </form>
                        </div>
                        <div className="tp-footer-social-4 tp-footer-social">
                          <h4 className="tp-footer-social-title-4">
                            Follow Us On
                          </h4>
                          {social_data.map((s) => (
                            <a href={s.link} key={s.id} target="_blank">
                              <i className={s.icon}></i>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-footer-bottom">
            <div className="container">
              <div className="tp-footer-bottom-wrapper">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="tp-footer-copyright">
                      <p>
                        © {new Date().getFullYear()} All Rights Reserved | Next
                        js Template by
                        <Link href="/">❤</Link>.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tp-footer-payment text-md-end">
                      <p>
                        <img src={pay.src} alt="pay" style={{ height: "auto", width: "auto", maxWidth: "100%" }} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default FooterTwo
