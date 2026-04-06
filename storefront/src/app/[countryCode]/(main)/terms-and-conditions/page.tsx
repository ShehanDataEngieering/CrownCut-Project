import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for purchases made via the Crowncut Gems International website.",
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

const BulletList = ({ items }: { items: { label?: string; text: string }[] }) => (
  <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem", marginBottom: 0 }}>
    {items.map((item, i) => (
      <li key={i} style={{ marginBottom: "0.4rem" }}>
        {item.label ? (
          <>
            <strong>{item.label}:</strong> {item.text}
          </>
        ) : (
          item.text
        )}
      </li>
    ))}
  </ul>
)

export default function TermsAndConditionsPage() {
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
                Terms &amp; Conditions
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

            {/* Language note */}
            <p
              style={{
                color: "#777",
                fontSize: "0.88rem",
                marginBottom: "2.5rem",
                textAlign: "center",
              }}
            >
              English version followed by Swedish (
              <em>Allmänna Villkor på svenska nedan</em>).
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
              <Section number="1" title="General">
                <p>
                  These terms apply to all purchases made via the Crowncut Gems
                  International website. By placing an order, you agree to these
                  terms.
                </p>
                <BulletList
                  items={[
                    { label: "Company", text: "Crowncut Gems International" },
                    {
                      label: "Location",
                      text: "Studiegången 8, 416 81 Göteborg, Sweden",
                    },
                  ]}
                />
              </Section>

              <Section number="2" title="Pricing and Payment">
                <BulletList
                  items={[
                    { text: "All prices are displayed in SEK." },
                    { text: "Prices include VAT unless otherwise stated." },
                    {
                      text: "We reserve the right to adjust prices due to market fluctuations in gemstone values or typographical errors.",
                    },
                  ]}
                />
              </Section>

              <Section number="3" title="Shipping and Delivery">
                <BulletList
                  items={[
                    { text: "We ship worldwide from Gothenburg." },
                    {
                      label: "Insurance",
                      text: "Due to the high value of gemstones, all shipments are fully insured until they reach the customer.",
                    },
                    {
                      label: "Delivery Time",
                      text: "For gemstones currently available in our Gothenburg studio, standard delivery within Sweden is typically 5–7 business days. In cases where a specific gemstone must be sourced and imported to Sweden, delivery times will vary and are subject to discussion, confirmed with you directly prior to finalizing your order. Delivery times for orders outside of Sweden vary by destination and will be calculated at checkout.",
                    },
                  ]}
                />
              </Section>

              <Section number="4" title="Right of Withdrawal (Returns)">
                <BulletList
                  items={[
                    {
                      text: "In accordance with the Swedish Distance Contracts Act, you have a 14-day right of withdrawal from the day you receive the item.",
                    },
                    {
                      label: "Condition",
                      text: "The gemstone must be returned in its original, unaltered condition with all original certificates/packaging.",
                    },
                    {
                      label: "Custom Orders",
                      text: "The right of withdrawal does not apply to custom-cut gems or specially ordered items.",
                    },
                  ]}
                />
              </Section>

              <Section number="5" title="Complaints and Warranty">
                <BulletList
                  items={[
                    {
                      text: "If a product is defective, you have a right to complain under the Swedish Consumer Sales Act (Konsumentköplagen).",
                    },
                    {
                      text: "Please inspect your gemstone upon arrival and contact us immediately if there are discrepancies.",
                    },
                  ]}
                />
              </Section>

              <Section number="6" title="Limitation of Liability">
                Crowncut Gems International is not liable for indirect damages or
                delays caused by circumstances beyond our control (Force Majeure),
                such as postal strikes or customs delays.
              </Section>

              <Section number="7" title="Governing Law">
                Any disputes shall be settled in accordance with Swedish law and
                by a Swedish court.
              </Section>

              <Section number="8" title="Gemstone Certificates">
                <BulletList
                  items={[
                    {
                      label: "Authenticity",
                      text: "All stones sold with a third-party certificate (e.g. GIA) are guaranteed to match the provided report.",
                    },
                    {
                      label: "Valuation",
                      text: "Certificates are for identification purposes and do not represent a financial appraisal unless specifically stated.",
                    },
                    {
                      label: "Loss of Certificate",
                      text: "If a gemstone is returned without its original certificate, a replacement fee will be deducted from the refund to cover re-certification costs.",
                    },
                  ]}
                />
              </Section>

              <Section number="9" title="Custom Cutting and Bespoke Services">
                <BulletList
                  items={[
                    {
                      label: "Non-Refundable",
                      text: "Pursuant to the Swedish Distance Contracts Act (Distansavtalslagen), the 14-day right of withdrawal does not apply to clearly personalized items. This includes gemstones cut to specific customer dimensions or bespoke jewelry.",
                    },
                    {
                      label: "Approval Process",
                      text: "For custom cuts, the customer must approve the rough material and design template before work begins. Once cutting starts, the order cannot be canceled.",
                    },
                    {
                      label: "Variation",
                      text: "Please note that natural gemstones may have slight internal variations. We aim for the highest precision, but minor natural inclusions are part of the stone's character.",
                    },
                  ]}
                />
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
              Allmänna Villkor
            </h2>
            <div
              style={{
                background: "#fafafa",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: 12,
                padding: "2.5rem 2.5rem",
              }}
            >
              <Section number="1" title="Allmänt">
                <p>
                  Dessa villkor gäller för alla köp som görs via Crowncut Gems
                  Internationals webbplats. Genom att göra en beställning
                  godkänner du dessa villkor.
                </p>
                <BulletList
                  items={[
                    { label: "Företag", text: "Crowncut Gems International" },
                    {
                      label: "Adress",
                      text: "Studiegången 8, 416 81 Göteborg, Sverige",
                    },
                  ]}
                />
              </Section>

              <Section number="2" title="Priser och Betalning">
                <BulletList
                  items={[
                    { text: "Alla priser visas i SEK." },
                    {
                      text: "Priser inkluderar moms om inget annat anges.",
                    },
                    {
                      text: "Vi förbehåller oss rätten att justera priser vid marknadsförändringar eller felskrivningar.",
                    },
                  ]}
                />
              </Section>

              <Section number="3" title="Frakt och Leverans">
                <BulletList
                  items={[
                    { text: "Vi skickar varor från Göteborg." },
                    {
                      label: "Försäkring",
                      text: "På grund av ädelstenarnas höga värde är alla försändelser fullt försäkrade fram till leverans.",
                    },
                    {
                      label: "Leveranstid",
                      text: "För ädelstenar som för närvarande finns tillgängliga i vår studio i Göteborg är standardleveransen inom Sverige vanligtvis 5–7 arbetsdagar. I de fall där en specifik ädelsten måste anskaffas och importeras till Sverige varierar leveranstiderna och är föremål för diskussion — bekräftas direkt med dig innan din beställning slutförs. Leveranstider för beställningar utanför Sverige varierar beroende på destination och beräknas i kassan.",
                    },
                  ]}
                />
              </Section>

              <Section number="4" title="Ångerrätt">
                <BulletList
                  items={[
                    {
                      text: "Enligt Distansavtalslagen har du 14 dagars ångerrätt från det att du tagit emot varan.",
                    },
                    {
                      label: "Villkor",
                      text: "Ädelstenen måste returneras i sitt ursprungliga, oförändrade skick med alla originalcertifikat och förpackningar.",
                    },
                    {
                      label: "Specialbeställningar",
                      text: "Ångerrätten gäller inte för specialslipade stenar eller beställningsvaror.",
                    },
                  ]}
                />
              </Section>

              <Section number="5" title="Reklamation">
                <BulletList
                  items={[
                    {
                      text: "Om en produkt är felaktig har du rätt att reklamera enligt Konsumentköplagen.",
                    },
                    {
                      text: "Inspektera din ädelsten vid ankomst och kontakta oss omedelbart vid eventuella fel.",
                    },
                  ]}
                />
              </Section>

              <Section number="6" title="Ansvarsbegränsning">
                Crowncut Gems International ansvarar inte för indirekta skador
                eller förseningar som beror på omständigheter utanför vår
                kontroll (Force Majeure), såsom poststrejker eller
                tullförseningar.
              </Section>

              <Section number="7" title="Tillämplig lag">
                Eventuella tvister ska avgöras i enlighet med svensk lag och av
                svensk domstol.
              </Section>

              <Section number="8" title="Ädelstenscertifikat">
                <BulletList
                  items={[
                    {
                      label: "Äkthet",
                      text: "Alla stenar som säljs med ett tredjepartscertifikat (t.ex. GIA) garanteras motsvara den bifogade rapporten.",
                    },
                    {
                      label: "Värdering",
                      text: "Certifikat är för identifieringsändamål och utgör inte en ekonomisk värdering om inget annat uttryckligen anges.",
                    },
                    {
                      label: "Förlust av certifikat",
                      text: "Om en ädelsten returneras utan sitt ursprungliga certifikat dras en ersättningsavgift av från återbetalningen för att täcka kostnaderna för omcertifiering.",
                    },
                  ]}
                />
              </Section>

              <Section number="9" title="Specialslipning och Beställningsvaror">
                <BulletList
                  items={[
                    {
                      label: "Ingen ångerrätt",
                      text: "Enligt Distansavtalslagen gäller inte den 14-dagars ångerrätten för varor som är tydligt personligt utformade. Detta inkluderar ädelstenar som slipats enligt kundens specifika önskemål eller specialtillverkade smycken.",
                    },
                    {
                      label: "Godkännandeprocess",
                      text: "Vid specialslipning ska kunden godkänna råmaterialet och designmallen innan arbetet påbörjas. När slipningen har påbörjats kan beställningen inte avbrytas.",
                    },
                    {
                      label: "Variationer",
                      text: "Observera att naturliga ädelstenar kan ha små interna variationer. Vi strävar efter högsta precision, men mindre naturliga inneslutningar är en del av stenens karaktär.",
                    },
                  ]}
                />
              </Section>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
