import { useSelector } from "react-redux";

function Notification() {
  const notification = useSelector((state) => state.notifications);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (notification === null) {
    return null;
  }

  return <div style={style}>{notification}</div>;
}

export default Notification;
