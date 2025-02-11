import NotificationsTable from "./NotificationsTable";

import { FaSearch } from "react-icons/fa";

const Notifications = () => {
  return (
    <div className="pt-10 w-full">
      <h2 className="text-xl p-5 flex items-center gap-5 font-light">
        Notificaciones
      </h2>
      <div className="flex items-end gap-5 p-5 pt-0 w-full">
        <div className="join">
          <button className="btn join-item">Todo</button>
          <button className="btn join-item">No leídos</button>
        </div>
        <div className="w-full ml-5">
          <label className="input input-bordered flex w-full pr-0">
            <input type="text" className="grow" placeholder="Search" />

            <button className="btn btn-square  ">
              <FaSearch />
            </button>
          </label>
        </div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Agrupar por:</span>
          </div>
          <select defaultValue={"date"} className="select select-bordered w-full max-w-xs">
            <option value="date">Fecha</option>
            <option value="perros" >Perros</option>
          </select>
        </label>
      </div>
      <NotificationsTable/>
    </div>
  );
};

export default Notifications;
