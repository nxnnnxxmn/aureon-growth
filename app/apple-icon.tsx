import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          background: "linear-gradient(135deg, #1A1815 0%, #2D2825 100%)",
          position: "relative",
        }}
      >
        {/* AUREON micro watermark */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 18,
            display: "flex",
            fontSize: 9,
            fontWeight: 600,
            color: "rgba(201, 169, 97, 0.35)",
            letterSpacing: 3,
            fontFamily: "system-ui, sans-serif",
            textTransform: "uppercase",
          }}
        >
          AUREON
        </div>

        {/* Outer orbit ring */}
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "2px solid #c9a961",
            display: "flex",
          }}
        />

        {/* Inner orbit ring */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 48,
            width: 84,
            height: 84,
            borderRadius: "50%",
            border: "1.5px solid #E04E2C",
            opacity: 0.5,
            display: "flex",
          }}
        />

        {/* Core sphere */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #E04E2C 0%, #A53B1F 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 24px rgba(224,78,44,0.45)",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "rgba(251,248,241,0.85)",
              display: "flex",
            }}
          />
        </div>

        {/* Orbit nodes */}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 86,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#c9a961",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 129,
            left: 129,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#c9a961",
            opacity: 0.8,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
