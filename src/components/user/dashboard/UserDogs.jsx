import { dogs } from "@/db";
import PanelCard from "@/components/dogs/PanelCard";
import { FaDog, FaSort, FaPaw } from "react-icons/fa";

const UserDogs = () => {
  const data = dogs;

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-6">
      <div className="w-full max-w-7xl">
        {/* Top Section with Title and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
              Mis Perros ({data.length})
              <span className="text-secondary">
                <FaDog size={25} />
              </span>
            </h2>
          </div>

          {/* Filter Dropdown */}
          <label className="form-control w-full md:w-auto">
            <div className="label">
              <span className="label-text text-gray-700 font-medium flex items-center gap-2">
                <FaSort />
                Ordenar por:
              </span>
            </div>
            <select
              defaultValue={"recientes"}
              className="select select-bordered w-full md:w-64 focus:ring-2 focus:ring-secondary"
            >
              <option value="date">Más recientes</option>
              <option value="name">Nombre (A-Z)</option>
              <option value="name-desc">Nombre (Z-A)</option>
              <option value="waiting">Más días esperándote</option>
            </select>
          </label>
        </div>

        {/* Dog Cards Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          {data.length > 0 ? (
            <PanelCard
              data={data}
              cols={4}
              cardStyle="hover:transform hover:scale-105 transition-all duration-300"
            />
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <div className="flex justify-center mb-4">
                <FaPaw className="text-gray-400 text-4xl" />
              </div>
              <p className="text-gray-700 text-lg mb-4">
                Aún no tienes perros en tu lista. ¡Empieza a añadir tus
                favoritos!
              </p>
              <button className="mt-4 bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark transition-colors">
                Explorar perritos
              </button>
            </div>
          )}
        </div>

        {/* Fun Footer Note */}
        <div className="text-center mt-8 text-gray-500 text-sm flex items-center justify-center gap-2">
          <FaPaw className="text-gray-400" />
          <span>¡Cada perro merece un hogar lleno de amor!</span>
          <FaPaw className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default UserDogs;

// import { dogs } from "@/db";
// import PanelCard from "@/components/dogs/PanelCard";

// import { FaDog } from "react-icons/fa";
// const UserDogs = () => {
//   const data = dogs;

//   return (
//     <div className="w-full flex justify-start items-center flex-col">
//       <div className="flex justify-between items-end gap-5 px-16 pt-0 w-full ">
//         <h2 className="text-2xl font-light p-5 flex items-center gap-5">
//           Mis Favoritos ({data.length})
//           <span className="text-secondary">
//             <FaDog size={25}  />
//           </span>
//         </h2>
//         <label className="form-control w-full max-w-xs">
//           <div className="label">
//             <span className="label-text">Agrupar por:</span>
//           </div>
//           <select
//             defaultValue={"recientes"}
//             className="select select-bordered w-full max-w-xs"
//           >
//             <option value="date">Recientes</option>
//             <option value="perros">Nombre (A-Z)</option>
//             <option value="perros">Nombre (Z-A)</option>
//             <option value="perros">Más días esperándote</option>
//           </select>
//         </label>
//       </div>

//       <PanelCard data={data} cols={4} />
//     </div>
//   );
// };

// export default UserDogs;
