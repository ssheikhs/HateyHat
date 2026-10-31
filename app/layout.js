import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ThemeScript from "@/components/ThemeScript";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: {
    default: "HateyHat — Community service events near you",
    template: "%s | HateyHat",
  },
  description:
    "Find, organize and join social development events in your neighbourhood — cleanups, tree plantations, blood drives and winter clothes distribution.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="hateyhat" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Toaster
          position="top-center"
          toastOptions={{
            className: "!bg-base-100 !text-base-content !border !border-base-300",
          }}
        />
      </body>
    </html>
  );
}
