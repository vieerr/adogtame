"use client";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { FaUser, FaStar, FaHeart, FaHandsHelping, FaDashcube } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineExitToApp } from "react-icons/md";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const Sidebar = ({ children }) => {
  const { data: session } = useSession();

  const [user, setUser] = useState();

  useEffect(() => {
    setUser(session?.user);
  }, [session]);

  return (
    <div>
      {user && (
        <div className="drawer md:drawer-open">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">{children}</div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-gradient-to-b from-secondary to-primary text-primary-content min-h-full w-80 p-8 space-y-2 shadow-xl">
              <div className="mb-8 ">
                <h2 className="text-2xl mt-4 flex font-bold items-center gap-5">
                  {user.name}
                  {user.isRescuer && <MdVerified size={25} />}
                </h2>
              </div>
              <li>
                <Link
                  href={"/dashboard"}
                  className="text-lg hover:bg-primary-focus hover:text-white rounded-lg "
                >
                  <MdDashboard size={20} />
                  Panel de usuario
                </Link>
              </li>{" "}
              <li>
                <Link
                  href={"/dashboard/edit-profile"}
                  className="text-lg hover:bg-primary-focus hover:text-white rounded-lg "
                >
                  <FaUser size={20} />
                  Editar perfil
                </Link>
              </li>
              <li>
                <Link
                  href={"/dashboard/notifications"}
                  className="text-lg hover:bg-primary-focus hover:text-white rounded-lg "
                >
                  <IoNotifications size={20} />
                  Notificaciones
                </Link>
              </li>
              <li>
                <Link
                  href={"/dashboard/your-dogs"}
                  className="text-lg hover:bg-primary-focus hover:text-white rounded-lg "
                >
                  <FaStar size={20} />
                  Tus perros en adopción
                </Link>
              </li>
              <li>
                <Link
                  href={"/dashboard/favorite-dogs"}
                  className="text-lg hover:bg-primary-focus hover:text-white rounded-lg "
                >
                  <FaHeart size={20} />
                  Favoritos
                </Link>
              </li>
              <li>
                <Link
                  href={"/dashboard/sponsored-dogs"}
                  className="text-lg hover:bg-primary-focus hover:text-white rounded-lg "
                >
                  <FaHandsHelping size={20} />
                  Patrocinados
                </Link>
              </li>
              <div className="divider  my-4"></div>
              <li className="mt-auto">
                <button className="btn btn-ghost hover:bg-error hover:text-white rounded-lg ">
                  <MdOutlineExitToApp size={20} />
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default Sidebar;
