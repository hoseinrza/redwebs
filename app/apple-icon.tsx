import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c41f36",
          borderRadius: 40,
        }}
      >
        <svg width="98" height="98" viewBox="0 0 64 64" fill="none">
          <path d="M35 12L18 36h11l-2 16 19-24H35l2-16z" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
