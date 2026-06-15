import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aureon Growth — Growth Partner & Agencia Premium de Marketing Digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #08070d 0%, #13101e 50%, #0b0918 100%)",
          position: "relative",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Violet glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -150,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(128,84,194,0.45) 0%, transparent 60%)",
            filter: "blur(60px)",
            display: "flex",
          }}
        />
        {/* Electric blue glow */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -150,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(59,111,212,0.35) 0%, transparent 60%)",
            filter: "blur(60px)",
            display: "flex",
          }}
        />

        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(128,84,194,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(128,84,194,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Top brand bar */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #c9a961 0%, #E04E2C 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(224,78,44,0.5)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="11" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.9" />
              <circle cx="16" cy="16" r="6" fill="#1A1815" />
              <circle cx="16" cy="5" r="2" fill="#ffffff" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
            <span style={{ color: "#ffffff" }}>AUREON</span>
            <span
              style={{
                marginLeft: 8,
                background: "linear-gradient(135deg, #e8c989 0%, #c9a961 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              GROWTH
            </span>
          </div>
        </div>

        {/* Top right badge */}
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 60,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 20px",
            borderRadius: 999,
            background: "rgba(128, 84, 194, 0.12)",
            border: "1.5px solid rgba(128, 84, 194, 0.4)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#22c55e",
              display: "flex",
            }}
          />
          <div style={{ color: "#cdb6ec", fontSize: 16, fontWeight: 600, letterSpacing: 1.5 }}>
            GROWTH PARTNER
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 60,
            right: 60,
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: -3,
              lineHeight: 1,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex" }}>Transformamos marcas</div>
            <div style={{ display: "flex" }}>
              en{" "}
              <span
                style={{
                  marginLeft: 24,
                  background: "linear-gradient(135deg, #b596e3 0%, #8054c2 50%, #cdb6ec 100%)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                imperios digitales
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: 26,
              color: "#a89cc7",
              maxWidth: 900,
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Branding · Performance · IA · Automatización · Growth marketing premium
          </div>
        </div>

        {/* Bottom stats strip */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            right: 60,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 60 }}>
            {[
              { value: "+850", label: "Marcas" },
              { value: "400%", label: "ROI promedio" },
              { value: "98%", label: "Retención" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg, #b596e3 0%, #5a8bf0 100%)",
                    backgroundClip: "text",
                    color: "transparent",
                    display: "flex",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#776a93",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    display: "flex",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#cdb6ec",
              fontWeight: 600,
              display: "flex",
            }}
          >
            aureon-growth.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
