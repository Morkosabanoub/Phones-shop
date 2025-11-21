import { Outlet } from "react-router-dom";
import DashNavBar from "../components/DashNav-bar/DashNav-bar";
import SideDashnav from "../components/SideDashnav/SideDashnav";

export default function LandingDash() {
  return (
    <div className="LandingDash" >
      <DashNavBar />
      <SideDashnav />
      <div className="Dash-outlet">
        <Outlet />
      </div>
    </div>
  );

}
