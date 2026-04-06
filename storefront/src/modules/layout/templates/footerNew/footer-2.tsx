"use client"

import React from "react"
import Image from "next/image"
import pay from "@assets/img/footer/footer-pay.png"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const social_data = [
  {
    id: 1,
    link: "https://wa.me/46760889995",
    icon: "fa-brands fa-whatsapp",
    title: "WhatsApp",
  },
  {
    id: 2,
    link: "https://www.instagram.com/crowncut_gems",
    icon: "fa-brands fa-instagram",
    title: "Instagram",
  },
  {
    id: 3,
    link: "https://www.tiktok.com/@crowncut.gems",
    icon: "fa-brands fa-tiktok",
    title: "TikTok",
  },
  {
    id: 4,
    link: "https://www.facebook.com/profile.php?id=61582002311999",
    icon: "fa-brands fa-facebook-f",
    title: "Facebook",
  },
]

const FooterTwo = () => {
  return (
    <footer
      className="tp-footer-unified"
      style={{ backgroundColor: "#F5F5F5", borderTop: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* Main footer */}
      <div className="container py-5" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
        <div className="row g-5">

          {/* Brand + Contact */}
          <div className="col-lg-5 col-md-6">
            <LocalizedClientLink href="/">
              <Image
                src="/assets/img/logo/crowncut-logonb.png"
                alt="Crown Cut Gems"
                width={160}
                height={160}
                style={{ objectFit: "contain", display: "block", marginBottom: "1rem" }}
              />
            </LocalizedClientLink>
            <p style={{ fontSize: "0.95rem", color: "#555", marginBottom: "1rem", maxWidth: 300 }}>
              Fine gems and jewelry curated for brilliance and everyday elegance.
            </p>
            <div style={{ fontSize: "0.95rem", color: "#444", lineHeight: 2 }}>
              <div>
                <a href="tel:+46760889995" style={{ color: "inherit", textDecoration: "none" }}>
                  +46 760 889 995
                </a>
              </div>
              <div>
                <a href="mailto:crowncutgems@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>
                  crowncutgems@gmail.com
                </a>
              </div>
              <div>
                <a
                  href="https://maps.google.com/?q=Studieg%C3%A5ngen%208%2C%2041681%2C%20Gothenburg%2C%20Sweden"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Gothenburg, Sweden
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="col-lg-3 col-md-3 col-6">
            <h6 style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1rem", letterSpacing: "0.02em" }}>Information</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.95rem", lineHeight: 2.4 }}>
              <li><LocalizedClientLink href="/our-story" style={{ color: "#555", textDecoration: "none" }}>Our Story</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/privacy-policy" style={{ color: "#555", textDecoration: "none" }}>Privacy Policy</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/terms-and-conditions" style={{ color: "#555", textDecoration: "none" }}>Terms &amp; Conditions</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/blog" style={{ color: "#555", textDecoration: "none" }}>Blog</LocalizedClientLink></li>
            </ul>
          </div>

          {/* Follow + Subscribe */}
          <div className="col-lg-4 col-md-3 col-6">
            <h6 style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1rem", letterSpacing: "0.02em" }}>Follow Us</h6>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {social_data.map((s) => (
                <a
                  key={s.id}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.title}
                  title={s.title}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "1px solid rgba(0,0,0,0.15)",
                    background: "#fff",
                    color: "#333",
                    fontSize: 18,
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", padding: "0.9rem 0", background: "#efefef" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#666" }}>
                © {new Date().getFullYear()} Crown Cut Gems. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end mt-2 mt-md-0">
              <Image src={pay} alt="payment methods" height={20} width={pay.width} style={{ width: "auto", maxWidth: "100%", opacity: 0.7 }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterTwo
