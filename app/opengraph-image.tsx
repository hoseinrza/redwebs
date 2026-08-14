import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#3d0b12",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(226,55,74,0.45), transparent 45%), radial-gradient(circle at 15% 15%, rgba(196,31,54,0.4), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 140,
            height: 140,
            borderRadius: 32,
            background: "#c41f36",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="76" height="76" viewBox="0 0 64 64" fill="none">
            <path d="M35 12L18 36h11l-2 16 19-24H35l2-16z" fill="#ffffff" />
          </svg>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -1,
          }}
        >
          redwebs.ir
        </div>

        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            color: "#f7a4ac",
          }}
        >
          Websites built to bring you customers
        </div>
      </div>
    ),
    { ...size }
  );
}
