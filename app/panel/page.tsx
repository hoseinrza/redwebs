import type { Metadata } from "next";
import PortalShell from "@/components/panel/PortalShell";

export const metadata: Metadata = {
  title: "پنل مشتری",
  robots: { index: false, follow: false },
};

export default function PanelPage() {
  return <PortalShell />;
}
