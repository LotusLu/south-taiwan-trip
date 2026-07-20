import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://lotuslu.github.io/south-taiwan-trip/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "中南部四天三夜小旅行｜南行手帖",
  description: "從五股出發，慢遊台南與台中的四天三夜自駕行程；手機快速切換每天行程、景點資訊與地圖導航。",
  openGraph: {
    title: "中南部四天三夜小旅行",
    description: "台南・台中｜一路吃，一路慢慢走",
    url: siteUrl,
    siteName: "南行手帖",
    locale: "zh_TW",
    type: "website",
    images: [{ url: "og.jpg", width: 1200, height: 630, alt: "中南部四天三夜小旅行" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "中南部四天三夜小旅行",
    description: "台南・台中｜一路吃，一路慢慢走",
    images: ["og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
