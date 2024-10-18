import { useEffect } from "react";
import { useAppContext } from "../../../utils/AppContext";
import { homePage } from "../../../utils/api/apiCalls";
import Navbar from "./Navbar";
import UserLoanDetails from "./UserLoanDetails";

const HomePage = () => {
  const { setUser } = useAppContext();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await homePage();
        if (res.success) {
          setUser(res.data);
        } else {
          console.error("Failed to fetch profile data:", res.message);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [setUser]);

  return (
    <div className="bg-gray-800 min-h-screen text-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 md:px-10 py-5">
        <div className="md:w-3/4 mx-auto">
          <UserLoanDetails />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
