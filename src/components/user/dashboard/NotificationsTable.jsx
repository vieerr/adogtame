import moment from "moment";
import { FaCircle } from "react-icons/fa";
import { FaUser, FaDog, FaStar, FaHeart, FaHandsHelping } from "react-icons/fa";
import { useRouter } from "next/navigation";

const NotificationsTable = ({notifications}) => {

  const router = useRouter(); 

  const addIconToNotification = (type) => {
    switch (type) {
      case "dog":
        return <FaDog size={20} />;
      case "sponsor":
        return <FaHandsHelping />;
      case "favorite":
        return <FaHeart />;
      case "user":
        return <FaUser />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-5 overflow-x-auto">
      <table className="table ">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Seleccionar Todo</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((noti) => {
            return (
              <tr key={noti._id} onClick={()=>router.replace(`/perros/${noti.dogId}`)}  className= {`${noti.isRead ? "text-gray-500":"text-black" } hover:bg-slate-100 cursor-pointer`}>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td className=" flex items-center gap-5">
                  <span>{addIconToNotification(noti.type)}</span>

                  <p className="prose">{noti.message}</p>
                </td>
                <td className="text-gray-500">
                  {moment(noti.timestamp).fromNow()}
                </td>
                <td>{!!!noti.isRead && <FaCircle fill="blue" />}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsTable;
