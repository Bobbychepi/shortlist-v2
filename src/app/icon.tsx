import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090f",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            width: 24,
            height: 24,
            color: "#ffffff",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 5,
              top: 4,
              width: 12,
              height: 12,
              background: "currentColor",
              borderRadius: 2,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 10,
              top: 1,
              width: 2,
              height: 18,
              background: "currentColor",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 2,
              top: 9,
              width: 18,
              height: 2,
              background: "currentColor",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 2,
              bottom: 2,
              width: 5,
              height: 5,
              background: "currentColor",
              borderRadius: 1,
              transform: "rotate(45deg)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
