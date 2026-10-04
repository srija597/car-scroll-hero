import "./globals.css";

export const metadata = {
  title: "Welcome ITZFIZZ | Scroll Experience",
  description: "A scroll-driven ride through the ITZFIZZ service improvements.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
