import Navbar from "@/components/general/Navbar";
import "./globals.css";

export const metadata = {
  title: "Adogtame",
  description: "Web App para adopción de mascotas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="winter">
      <head>
        <link rel="icon" href="/logo.webp" sizes="any" />
      </head>
      <body>
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}