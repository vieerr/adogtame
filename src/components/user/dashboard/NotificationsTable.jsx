import moment from "moment";
import { FaCircle } from "react-icons/fa";
import { FaUser, FaDog, FaStar, FaHeart, FaHandsHelping } from "react-icons/fa";

const NotificationsTable = () => {
  const notifications = [
    {
      id: 1,
      type: "dog",
      message:
        "Un nuevo perro ha sido publicado: 'Max' (Labrador Retriever). ¡Échale un vistazo!",
      userId: 123, // ID del usuario que publicó el perro
      dogId: 456, // ID del perro publicado
      timestamp: "2023-10-25T10:15:30Z",
      isRead: false,
    },
    {
      id: 2,
      type: "sponsor",
      message:
        "¡Felicidades! 'Luna' (Chihuahua) ha recibido un patrocinio de $50 de parte de @MariaG.",
      userId: 789, // ID del usuario que recibió el patrocinio
      dogId: 101, // ID del perro patrocinado
      sponsorId: 112, // ID del usuario que patrocinó
      timestamp: "2023-10-24T14:20:45Z",
      isRead: true,
    },
    {
      id: 3,
      type: "favorite",
      message:
        "A @JuanP le ha gustado tu publicación de 'Rex' (Pastor Alemán).",
      userId: 123, // ID del usuario que publicó el perro
      dogId: 202, // ID del perro favorito
      favoritedBy: 113, // ID del usuario que lo marcó como favorito
      timestamp: "2023-10-23T09:05:12Z",
      isRead: false,
    },
    {
      id: 4,
      type: "dog",
      message:
        "¡Nueva solicitud de adopción! @LauraM quiere adoptar a 'Bella' (Golden Retriever).",
      userId: 123, // ID del usuario que publicó el perro
      dogId: 303, // ID del perro solicitado
      requesterId: 114, // ID del usuario que solicitó la adopción
      timestamp: "2023-10-22T18:30:00Z",
      isRead: false,
    },
    {
      id: 5,
      type: "dog",
      message:
        "¡Felicidades! Tu solicitud para adoptar a 'Rocky' (Bulldog) ha sido aprobada.",
      userId: 114, // ID del usuario que solicitó la adopción
      dogId: 404, // ID del perro adoptado
      timestamp: "2023-10-21T12:10:15Z",
      isRead: true,
    },
    {
      id: 6,
      type: "sponsor",
      message:
        "¡Increíble! 'Luna' (Chihuahua) ha alcanzado su meta de patrocinio de $200.",
      userId: 789, // ID del usuario que publicó el perro
      dogId: 101, // ID del perro patrocinado
      timestamp: "2023-10-20T16:45:00Z",
      isRead: false,
    },
    {
      id: 7,
      type: "user",
      message: "@AnaR ha empezado a seguirte.",
      userId: 123, // ID del usuario que fue seguido
      followerId: 115, // ID del nuevo seguidor
      timestamp: "2023-10-19T08:00:00Z",
      isRead: true,
    },
    {
      id: 8,
      type: "dog",
      message:
        "¡Gran noticia! 'Bella' (Golden Retriever) ha encontrado un hogar.",
      userId: 123, // ID del usuario que publicó el perro
      dogId: 303, // ID del perro adoptado
      timestamp: "2023-10-18T20:00:00Z",
      isRead: false,
    },
    {
      id: 9,
      type: "user",
      message:
        "@CarlosL ha comentado en tu publicación de 'Rex' (Pastor Alemán): '¡Qué hermoso perro!'",
      userId: 123, // ID del usuario que publicó el perro
      dogId: 202, // ID del perro comentado
      commenterId: 116, // ID del usuario que comentó
      timestamp: "2023-10-17T11:25:00Z",
      isRead: false,
    },
    {
      id: 12,
      type: "dog",
      message:
        "El estado de 'Rocky' (Bulldog) ha sido actualizado: ahora está esterilizado.",
      userId: 123, // ID del usuario que publicó el perro
      dogId: 404, // ID del perro actualizado
      timestamp: "2023-10-14T17:00:00Z",
      isRead: false,
    },
  ];

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
              <tr key={noti.id} className= {`${noti.isRead ? "text-gray-500":"text-black" } hover:bg-slate-100 cursor-pointer`}>
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
