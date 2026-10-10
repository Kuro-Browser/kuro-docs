import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="shell-main min-h-dvh">
        <Topbar />
        {children}
      </div>
    </>
  );
}
