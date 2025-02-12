import { dogs } from "@/db";
import PanelCard from "@/components/dogs/PanelCard";
import { FaHeart, FaSort } from "react-icons/fa";

const FavoriteDogs = () => {
  const data = dogs;

  return (
    <div className="w-full min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter and Count Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-md border border-rose-50">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold text-rose-900 flex items-center gap-3">
              <FaHeart className="text-rose-600" />
              Favoritos ({data.length})
            </h2>
          </div>

          <label className="form-control w-full md:w-auto">
            <div className="label">
              <span className="label-text text-rose-900 font-medium flex items-center gap-2">
                <FaSort />
                Ordenar por:
              </span>
            </div>
            <select
              defaultValue={"recientes"}
              className="select select-bordered w-full md:w-64 focus:ring-2 focus:ring-rose-300"
            >
              <option value="date">Más recientes</option>
              <option value="name">Nombre (A-Z)</option>
              <option value="name-desc">Nombre (Z-A)</option>
              <option value="waiting">Más días esperándote</option>
            </select>
          </label>
        </div>

        {/* Dog Cards Section */}
        <section className="bg-white rounded-2xl p-6 shadow-lg border border-rose-50">
          {data.length > 0 ? (
            <PanelCard
              data={data}
              cols={4}
              cardStyle="hover:transform hover:scale-105 transition-all duration-300"
            />
          ) : (
            <div className="text-center py-12 bg-rose-50 rounded-xl">
              <p className="text-rose-800 text-lg">
                Aún no tienes favoritos. ¡Empieza a añadir peludos a tu lista!
              </p>
              <button className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors">
                Ver perritos
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default FavoriteDogs;

// import { dogs } from "@/db";
// import PanelCard from "@/components/dogs/PanelCard";

// import { FaHeart } from "react-icons/fa";
// const FavoriteDogs = () => {
//   const data = dogs;

//   return (
//     <div className="w-full flex justify-start items-center flex-col">
//       <div className="flex justify-between items-end gap-5 px-16 pt-0 w-full ">
//         <h2 className="text-2xl font-light p-5 flex items-center gap-5">
//           Mis Favoritos ({data.length})
//           <FaHeart size={25} fill="red"/>
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

// export default FavoriteDogs;
