const Sidebar = ({children}) => {
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
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <a>Editar perfil</a>
          </li>
          <li>
            <a>Notificaciones</a>
          </li>
          <li>
            <a>Tus perros en adopción</a>
          </li>
          <li>
            <a>Favoritos</a>
          </li>
          <li>
            <a>Patrocinados</a>
          </li>
          <button className="btn">
            <a>Cerrar sesión</a>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
