import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "#1A1815",
          position: "relative",
        }}
      >
        {/* Orbit ring */}
        <div
          style={{
            position: "absolute",
            top: 5,
            left: 5,
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "1.5px solid #c9a961",
            display: "flex",
          }}
        />
        {/* Core sphere */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #E04E2C 0%, #A53B1F 100%)",
            display: "flex",
          }}
        />
        {/* Orbit node */}
        <div
          style={{
            position: "absolute",
            top: 3,
            left: 14,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#c9a961",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
