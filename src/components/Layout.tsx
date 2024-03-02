import type { ReactNode } from "react";
import Header from "./Header";
import Meta from "./Meta";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Meta />
      <main className="min-w-screen flex min-h-screen flex-col items-center gap-6 bg-zinc-900 p-4 font-sans">
        <Header />
        {children}
        <Footer />
      </main>
      <Analytics />
      <Toaster
        toastOptions={{
          style: {
            background: "#27272a",
            color: "#fce7f3",
          },
          position: "top-right",
          duration: 1500,
        }}
      />
    </>
  );
}
