import { Poppins, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../utils/theme-provider";
const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const josefin = Josefin_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${josefin.variable}`}
    >
      <body
        className={`${poppins.className} min-h-screen bg-white text-neutral-900 antialiased transition-colors duration-300 dark:bg-white dark:text-neutral-900`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}