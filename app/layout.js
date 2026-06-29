import { Dynalight, Hurricane, Engagement, Cookie } from "next/font/google";
import "./globals.css";

const dynalight = Dynalight({
  variable: "--font-dynalight",
  weight: "400",
  subsets: ["latin"],
});

const hurricane = Hurricane({
  variable: "--font-hurricane",
  weight: "400",
  subsets: ["latin"],
});

const engagement = Engagement({
  variable: "--font-engagement",
  weight: "400",
  subsets: ["latin"],
});

const cookie = Cookie({
  variable: "--font-cookie",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rafey & Minahil | Nikkah Ceremony 2026",
  description:
    "Join us for the Nikkah Ceremony of Rafey & Minahil on 8th August 2026 at Emerald Banquet Hall, Lahore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dynalight.variable} ${hurricane.variable} ${engagement.variable} ${cookie.variable}`}>
      <body>{children}</body>
    </html>
  );
}
