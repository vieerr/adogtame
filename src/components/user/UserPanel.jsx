import { MdVerified } from "react-icons/md";

// pass user as prop
const UserPanel = () => {
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
    <div className="container grid-cols-4 mt-10">
      {/* header */}
      <div>
        <h2 className="text-2xl ml-10 flex items-center gap-5">
          {user.name}
          {user.isRescuer && <MdVerified size={25} />}
        </h2>
      </div>
      {/* <div className="col-span-1">
        <div className="drawer md:drawer-open">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            </div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className="col-span-3">{/* panel-view */}</div>
    </div>
  );
};

export default UserPanel;
