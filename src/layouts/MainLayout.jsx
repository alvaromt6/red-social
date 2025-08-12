import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";

export const MainLayout = () => {
  return (
    <div className="h-screen bg-black text-white">
      <Sidebar/>
      <Outlet/>
    </div>
  );
};