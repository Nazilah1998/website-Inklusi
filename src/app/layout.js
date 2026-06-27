import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "Layanan Inklusi Kemenag Barito Utara",
  description: "Portal Layanan Inklusi Kementerian Agama Kabupaten Barito Utara",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
