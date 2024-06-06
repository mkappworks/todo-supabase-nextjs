import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 56,
  height: 56,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 32,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f44336",
          color: "#ffffff",
          borderRadius: "20%",
        }}
      >
        TN
      </div>
    ),
    {
      ...size,
    },
  );
}
