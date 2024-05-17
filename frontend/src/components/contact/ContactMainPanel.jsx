import { useEffect, useState } from "react";
import ContactTable from "./ContactTable";
import toast, { Toaster } from "react-hot-toast";
import { userTypeState, timeoutToastState } from "../../atoms/atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import TimeoutModal from "../authentication/TimeoutModal";

const ContactMainPanel = () => {
  const [toastTriggered, setToastTriggered] = useRecoilState(timeoutToastState);
  const [modalIsOpen, setIsOpen] = useState(false);
  const userType = useRecoilValue(userTypeState);

  useEffect(() => {
    // Trigger the toast only if it hasn't been triggered before
    if (!toastTriggered && userType === "admin") {
      const toastId = toast(
        "Please do the data entry within 2 minutes. All the changes will be lost after that",
        {
          duration: 120000, // 120 seconds (2 minutes) in milliseconds
          position: "top-center",

          style: { backgroundColor: "#FFF1D8", width: 550 },
        }
      );

      // Clear the toast after 2 minutes
      const timeout = setTimeout(() => {
        toast.dismiss(toastId);
        setToastTriggered(false); // Reset toastTriggered state
        setIsOpen(true);
      }, 120000);

      // Set toastTriggered to true to prevent multiple toasts
      setToastTriggered(true);

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeout);
    }
  }, [userType]);

  return (
    <div className="mainpanel">
      {modalIsOpen && <TimeoutModal modalIsOpen={modalIsOpen} />}
      <Toaster
        containerStyle={{
          left: 250,
        }}
      />
      <ContactTable />
    </div>
  );
};

export default ContactMainPanel;
