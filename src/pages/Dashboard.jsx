import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import ManagerView from "../components/manager/ManagerView";
import EmployeeView from "../components/employee/EmployeeView";
import { fetchMembers } from "../redux/slices/membersSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const role = useSelector((s) => s.role.currentRole);

  useEffect(() => {
    dispatch(fetchMembers());
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6">
          {role === "lead" ? <ManagerView /> : <EmployeeView />}
        </div>
      </div>
    </div>
  );
}
