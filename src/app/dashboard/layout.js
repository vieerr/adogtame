import Sidebar from "@/components/user/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <Sidebar>
      <div className="pt-10">{children}</div>
    </Sidebar>
  );
};

export default DashboardLayout;
