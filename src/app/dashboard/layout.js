import Sidebar from "@/components/user/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Sidebar>{children}</Sidebar>)
    </>
  );
};

export default DashboardLayout;
