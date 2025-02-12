import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { FaUser, FaStar, FaHeart, FaHandsHelping } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineExitToApp } from "react-icons/md";

const Sidebar = ({ children }) => {
  const user = {
    id: 1231,
    name: "John Doe",
    pfp: "https://example.com/pfp.webp",
    birthday: "01/01/2001",
    phone: "123-456-7890",
    email: "jhon_doe@gmail.com",
    isRescuer: true,
    favoriteDogs: [
      {
        id: 123,
        name: "Fido",
        mainImg: "/perro1.webp",
        age: 3,
        sex: "macho",
        sterilized: true,
      },
    ],
    dogs: [
      {
        id: 123,
        name: "Fido",
        mainImg: "/perro2.webp",
        age: 3,
        sex: "macho",
        sterilized: true,
      },
    ],
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };
  return (
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
            <Link href={"/dashboard/edit-profile"} className="text-lg hover:bg-primary-focus hover:text-white rounded-lg ">
              <FaUser size={20} />
              Editar perfil
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/notifications"} className="text-lg hover:bg-primary-focus hover:text-white rounded-lg ">
              <IoNotifications size={20} />
              Notificaciones
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/your-dogs"} className="text-lg hover:bg-primary-focus hover:text-white rounded-lg ">
              <FaStar size={20} />
              Tus perros en adopción
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/favorite-dogs"} className="text-lg hover:bg-primary-focus hover:text-white rounded-lg ">
              <FaHeart size={20} />
              Favoritos
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/sponsored-dogs"} className="text-lg hover:bg-primary-focus hover:text-white rounded-lg ">
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
  );
};

export default Sidebar;
