import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setOnlineStatus(false);
    const handleOnline = () => setOnlineStatus(true);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return onlineStatus;
};

const OnlineStatusIndicator = () => {
  const onlineStatus = useOnlineStatus();

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
        onlineStatus ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <p className="text-center">
        {onlineStatus ? "You are online" : "You are offline"}
      </p>
    </div>
  );
};

export default OnlineStatusIndicator;
