import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "ECOTECH CORE: IT Consulting, Sovereign AI & Autonomous Defense Systems";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#111111",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.16)",
            paddingBottom: "28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "-0.04em",
              }}
            >
              ECOTECH CORE
            </span>
          </div>
          <span
            style={{
              fontSize: "20px",
              color: "#A3A3A3",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            CORE · TITAN117 · DEFENSE · SEO
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: "-0.05em",
              maxWidth: "980px",
            }}
          >
            Where sovereign software comes to life.
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#B5B5B5",
              maxWidth: "860px",
              lineHeight: 1.4,
            }}
          >
            IT Consulting · Local-First AI Teams · Closed-Door Multilingual Chat
            · Multi-Drone Swarm Control
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#8A8A8A",
          }}
        >
          <span>ecotechcore.com</span>
          <span>Zero-Trust · Local-First · Search-Dominant</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
