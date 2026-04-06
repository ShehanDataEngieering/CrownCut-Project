"use client"

import { useEffect, useState } from "react"

const PRIVACY_POLICY_PATH = "/privacy-policy"

const CookieConsent = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted")
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 2rem)",
        maxWidth: "560px",
        backgroundColor: "#fff",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "1rem",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        padding: "1.5rem",
        zIndex: 9999,
        fontFamily: "inherit",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "#1a1a1a",
            margin: 0,
          }}
        >
          We Value Your Privacy
        </p>
        <button
          onClick={handleDecline}
          aria-label="Close"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9ca3af",
            fontSize: "1.1rem",
            lineHeight: 1,
            padding: "0.1rem 0.25rem",
          }}
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <p
        style={{
          fontSize: "0.825rem",
          color: "#4b5563",
          lineHeight: 1.65,
          margin: "0 0 0.5rem 0",
        }}
      >
        We use cookies to enhance your browsing experience, analyze site
        traffic, and deliver personalized content. Your privacy is important
        to us.
      </p>

      {/* Link */}
      <div style={{ marginBottom: "1.25rem" }}>
        <a
          href={PRIVACY_POLICY_PATH}
          style={{
            fontSize: "0.8rem",
            color: "#111",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
        >
          Learn about how we use cookies and our Privacy Policy
        </a>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          onClick={handleAccept}
          style={{
            flex: 1,
            backgroundColor: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "9999px",
            padding: "0.6rem 1.25rem",
            fontSize: "0.825rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          style={{
            flex: 1,
            backgroundColor: "transparent",
            color: "#111",
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: "9999px",
            padding: "0.6rem 1.25rem",
            fontSize: "0.825rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Decline
        </button>
      </div>
    </div>
  )
}

export default CookieConsent
