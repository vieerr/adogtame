import NotificationsTable from "./NotificationsTable";

import { FaSearch, FaBell } from "react-icons/fa";

const Notifications = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-col justify-between items-left mb-8 bg-white p-6 mx-10 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
          Notificaciones 
          <span className="text-secondary">
            <FaBell size={25} />
          </span>
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
            <select
              defaultValue={"date"}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="date">Fecha</option>
              <option value="perros">Perros</option>
            </select>
          </label>
        </div>
      </div>

      <NotificationsTable />
    </div>
  );
};

export default Notifications;
