import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Crowncut Gems International — how we collect, use, and protect your personal data under GDPR.",
}

const Section = ({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) => (
  <div style={{ marginBottom: "2.5rem" }}>
    <h2
      style={{
        fontSize: "1.1rem",
        fontWeight: 700,
        marginBottom: "0.75rem",
        color: "#1a1a1a",
      }}
    >
      {number}. {title}
    </h2>
    <div style={{ color: "#444", lineHeight: 1.85, fontSize: "0.97rem" }}>
      {children}
    </div>
  </div>
)

const BulletList = ({ items }: { items: { label: string; text: string }[] }) => (
  <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem", marginBottom: 0 }}>
    {items.map((item, i) => (
      <li key={i} style={{ marginBottom: "0.4rem" }}>
        <strong>{item.label}:</strong> {item.text}
      </li>
    ))}
  </ul>
)

export default function PrivacyPolicyPage() {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 80 }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-9">

            {/* Header */}
            <div className="mb-5 text-center">
              <p
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#999",
                  marginBottom: "0.75rem",
                }}
              >
                Crowncut Gems International
              </p>
              <h1
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  marginBottom: "1.5rem",
                }}
              >
                Privacy Policy
              </h1>
              <div
                style={{
                  width: 48,
                  height: 2,
                  background: "#1a1a1a",
                  margin: "0 auto",
                }}
              />
            </div>

            {/* Language toggle note */}
            <p
              style={{
                color: "#777",
                fontSize: "0.88rem",
                marginBottom: "2.5rem",
                textAlign: "center",
              }}
            >
              English version followed by Swedish (
              <em>Integritetspolicy på svenska nedan</em>).
            </p>

            {/* ── ENGLISH ── */}
            <div
              style={{
                background: "#fafafa",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: 12,
                padding: "2.5rem 2.5rem",
                marginBottom: "3rem",
              }}
            >
              <Section number="1" title="Data Controller">
                <p style={{ marginBottom: "0.5rem" }}>
                  Crowncut Gems International is the data controller responsible
                  for your personal data.
                </p>
                <BulletList
                  items={[
                    { label: "Company Name", text: "Crowncut Gems International" },
                    { label: "Registration Number", text: "19950107-5577" },
                    {
                      label: "Address",
                      text: "Studiegången 8, Lgh 1103, 416 81 Göteborg, Sweden",
                    },
                    { label: "Contact Email", text: "crowncutgems@gmail.com" },
                  ]}
                />
              </Section>

              <Section number="2" title="Personal Data We Collect">
                <p>
                  We process the following categories of personal data that you
                  provide directly to us:
                </p>
                <BulletList
                  items={[
                    {
                      label: "Contact Details",
                      text: "Name, email address, phone number, and shipping address.",
                    },
                    {
                      label: "Order Information",
                      text: "Details of products purchased and payment status (note: we do not store full credit card details; these are handled by our secure payment providers).",
                    },
                    {
                      label: "Technical Data",
                      text: "IP address and cookies used to improve your website experience.",
                    },
                  ]}
                />
              </Section>

              <Section number="3" title="Purpose and Legal Basis for Processing">
                <p>We process your data for the following reasons:</p>
                <BulletList
                  items={[
                    {
                      label: "Fulfillment of Contract",
                      text: "To process orders, deliver gemstones, and provide customer support.",
                    },
                    {
                      label: "Legal Obligation",
                      text: "To comply with Swedish accounting laws (Bokföringslagen).",
                    },
                    {
                      label: "Legitimate Interest",
                      text: "To send relevant marketing updates (if you have opted-in) and improve our services.",
                    },
                  ]}
                />
              </Section>

              <Section number="4" title="Data Sharing and Transfers">
                <p>
                  We only share your data with trusted third parties necessary
                  for our operations:
                </p>
                <BulletList
                  items={[
                    {
                      label: "Logistics Partners",
                      text: "To deliver your orders.",
                    },
                    {
                      label: "Payment Providers",
                      text: "To securely process transactions.",
                    },
                    {
                      label: "Public Authorities",
                      text: "Only when required by law (e.g., the Swedish Tax Agency).",
                    },
                  ]}
                />
                <p style={{ marginTop: "0.75rem" }}>
                  We do <strong>not</strong> sell your personal data to third
                  parties.
                </p>
              </Section>

              <Section number="5" title="Data Retention">
                We store your personal data only as long as necessary for the
                purposes listed above. For example, accounting records are
                typically kept for 7 years to meet Swedish legal requirements.
              </Section>

              <Section number="6" title="Your Rights">
                <p>
                  Under the GDPR, you have the following rights regarding your
                  data:
                </p>
                <BulletList
                  items={[
                    {
                      label: "Access",
                      text: "The right to request a copy of the data we hold about you.",
                    },
                    {
                      label: "Rectification",
                      text: "The right to correct inaccurate or incomplete data.",
                    },
                    {
                      label: "Erasure",
                      text: "The right to request that we delete your data (under certain conditions).",
                    },
                    {
                      label: "Objection",
                      text: "The right to object to processing based on legitimate interest or direct marketing.",
                    },
                    {
                      label: "Withdraw Consent",
                      text: "If you have given consent (e.g., for newsletters), you can withdraw it at any time.",
                    },
                  ]}
                />
              </Section>

              <Section number="7" title="Security Measures">
                We implement appropriate technical and organizational measures,
                such as SSL encryption, to protect your data from unauthorized
                access or loss.
              </Section>
            </div>

            {/* ── SWEDISH ── */}
            <h2
              style={{
                fontWeight: 700,
                fontSize: "1.5rem",
                marginBottom: "1.5rem",
                color: "#1a1a1a",
              }}
            >
              Integritetspolicy
            </h2>
            <div
              style={{
                background: "#fafafa",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: 12,
                padding: "2.5rem 2.5rem",
              }}
            >
              <Section number="1" title="Personuppgiftsansvarig">
                <p>
                  Crowncut Gems International är personuppgiftsansvarig för dina
                  personuppgifter.
                </p>
                <BulletList
                  items={[
                    { label: "Företagsnamn", text: "Crowncut Gems International" },
                    { label: "Registreringsnummer", text: "19950107-5577" },
                    {
                      label: "Adress",
                      text: "Studiegången 8, Lgh 1103, 416 81 Göteborg, Sverige",
                    },
                    {
                      label: "Kontakt-e-postadress",
                      text: "crowncutgems@gmail.com",
                    },
                  ]}
                />
              </Section>

              <Section number="2" title="Personuppgifter vi samlar in">
                <p>
                  Vi behandlar följande kategorier av personuppgifter som du
                  lämnar direkt till oss:
                </p>
                <BulletList
                  items={[
                    {
                      label: "Kontaktuppgifter",
                      text: "Namn, e-postadress, telefonnummer och leveransadress.",
                    },
                    {
                      label: "Orderinformation",
                      text: "Information om köpta produkter och betalningsstatus (obs: vi lagrar inte fullständiga kreditkortsuppgifter; dessa hanteras av våra säkra betalningsleverantörer).",
                    },
                    {
                      label: "Tekniska uppgifter",
                      text: "IP-adress och cookies som används för att förbättra din webbplatsupplevelse.",
                    },
                  ]}
                />
              </Section>

              <Section
                number="3"
                title="Syfte och rättslig grund för behandling"
              >
                <p>Vi behandlar dina uppgifter av följande skäl:</p>
                <BulletList
                  items={[
                    {
                      label: "Uppfyllande av avtal",
                      text: "För att behandla beställningar, leverera ädelstenar och tillhandahålla kundsupport.",
                    },
                    {
                      label: "Rättslig skyldighet",
                      text: "För att följa svensk bokföringslag (Bokföringslagen).",
                    },
                    {
                      label: "Berättigat intresse",
                      text: "För att skicka relevanta marknadsföringsuppdateringar (om du har valt att delta) och förbättra våra tjänster.",
                    },
                  ]}
                />
              </Section>

              <Section number="4" title="Datadelning och överföringar">
                <p>
                  Vi delar endast dina uppgifter med betrodda tredje parter som
                  är nödvändiga för vår verksamhet:
                </p>
                <BulletList
                  items={[
                    {
                      label: "Logistikpartners",
                      text: "För att leverera dina beställningar.",
                    },
                    {
                      label: "Betalningsleverantörer",
                      text: "För att säkert behandla transaktioner.",
                    },
                    {
                      label: "Myndigheter",
                      text: "Endast när det krävs enligt lag (t.ex. Skatteverket).",
                    },
                  ]}
                />
                <p style={{ marginTop: "0.75rem" }}>
                  Vi säljer <strong>inte</strong> dina personuppgifter till
                  tredje part.
                </p>
              </Section>

              <Section number="5" title="Datalagring">
                Vi lagrar dina personuppgifter endast så länge som det är
                nödvändigt för de syften som anges ovan. Till exempel sparas
                bokföringsregister vanligtvis i 7 år för att uppfylla svenska
                lagkrav.
              </Section>

              <Section number="6" title="Dina rättigheter">
                <p>
                  Enligt GDPR har du följande rättigheter gällande dina
                  uppgifter:
                </p>
                <BulletList
                  items={[
                    {
                      label: "Åtkomst",
                      text: "Rätten att begära en kopia av de uppgifter vi har om dig.",
                    },
                    {
                      label: "Rättelse",
                      text: "Rätten att korrigera felaktiga eller ofullständiga uppgifter.",
                    },
                    {
                      label: "Radering",
                      text: "Rätten att begära att vi raderar dina uppgifter (under vissa förutsättningar).",
                    },
                    {
                      label: "Invändning",
                      text: "Rätten att invända mot behandling baserad på berättigat intresse eller direktmarknadsföring.",
                    },
                    {
                      label: "Återkalla samtycke",
                      text: "Om du har lämnat samtycke (t.ex. för nyhetsbrev) kan du när som helst återkalla det.",
                    },
                  ]}
                />
              </Section>

              <Section number="7" title="Säkerhetsåtgärder">
                Vi implementerar lämpliga tekniska och organisatoriska åtgärder,
                såsom SSL-kryptering, för att skydda dina uppgifter från
                obehörig åtkomst eller förlust.
              </Section>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
