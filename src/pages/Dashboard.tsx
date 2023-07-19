import DashboardLayout from "../features/dashboard/DashboardLayout";
import PageHeader from "../ui/headers/PageHeader";

const Dashboard = () => {
  return (
    <main>
      <PageHeader
        header="Dashboard"
        paragraph="A graphical representation and overview of a business."
      />
      <DashboardLayout />
    </main>
  );
};

export default Dashboard;
