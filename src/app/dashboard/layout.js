"use client";
import Sidebar from "@/components/user/Sidebar";
import QueryProvider from "@/components/providers/QueryProvider";

const DashboardLayout = ({ children }) => {
  return (
    <QueryProvider>
      <Sidebar>
        <div className="pt-10">{children}</div>
      </Sidebar>
    </QueryProvider>
  );
};

export default DashboardLayout;
