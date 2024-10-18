import AdminLoanDetails from "./AdminLoanDetails";
import AdminNavbar from "./AdminNavbar";

const AdminHomePage = () => {
  return (
    <div className="bg-gray-800 min-h-screen text-gray-100 max-w-full">
      <AdminNavbar />
      <div className="md:flex md:space-x-5 px-4 md:px-5 py-5">
        <div className="">
          <AdminLoanDetails />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
