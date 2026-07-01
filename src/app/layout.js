import { Plus_Jakarta_Sans } from "next/font/google";
import AccessibilityProvider from "@/components/layout/AccessibilityProvider";
import AccessibilityWidget from "@/components/layout/AccessibilityWidget";
import LiveChatWidget from "@/components/layout/LiveChatWidget";
import Chatbot from "@/components/ui/Chatbot";
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
      <body>
        <AccessibilityProvider>
          {children}
          <AccessibilityWidget />
          <LiveChatWidget />
          <Chatbot />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
