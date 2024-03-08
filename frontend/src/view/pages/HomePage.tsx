import AuthenticateMiddleware from "../../middleware/AuthenticateMiddleware";
import ResourceHelper from "../../utils/ResourceHelper";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  AuthenticateMiddleware();

  return (
    <>
      <ResourceHelper />

      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        dashboard
      </main>
    </>
  );
};

export default HomePage;
