export default function Loading() {
  return (
    <div className="container py-8">
      <div className="row g-4">
        <div className="col-lg-6">
          <div
            className="rounded"
            style={{ width: "100%", paddingBottom: "100%", background: "#f0f0f0", animation: "pulse 1.5s ease-in-out infinite" }}
          />
        </div>
        <div className="col-lg-6 d-flex flex-column gap-3 pt-4">
          <div style={{ height: 32, width: "60%", background: "#f0f0f0", borderRadius: 4, animation: "pulse 1.5s ease-in-out infinite" }} />
          <div style={{ height: 24, width: "30%", background: "#f0f0f0", borderRadius: 4, animation: "pulse 1.5s ease-in-out infinite" }} />
          <div style={{ height: 16, width: "80%", background: "#f0f0f0", borderRadius: 4, animation: "pulse 1.5s ease-in-out infinite" }} />
          <div style={{ height: 16, width: "70%", background: "#f0f0f0", borderRadius: 4, animation: "pulse 1.5s ease-in-out infinite" }} />
          <div style={{ height: 48, width: "50%", background: "#f0f0f0", borderRadius: 8, marginTop: 16, animation: "pulse 1.5s ease-in-out infinite" }} />
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
    </div>
  )
}
