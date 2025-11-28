// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

          {/* Smooth Fade + Slide Transition */}
          <AnimatePresence mode="wait">
            {role === "lead" ? (
              <motion.div
                key="manager"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <ManagerView />
              </motion.div>
            ) : (
              <motion.div
                key="employee"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <EmployeeView />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
