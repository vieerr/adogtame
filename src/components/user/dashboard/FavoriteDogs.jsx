"use client";
import { dogs } from "@/db";
import PanelCard from "@/components/dogs/PanelCard";
import { FaHeart, FaSort } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";

const FavoriteDogs = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(session?.user);
  }, [session]);

  return (
    <div>
      {user && (
        <div className="w-full min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter and Count Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-md border border-rose-50">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <h2 className="text-2xl font-semibold text-rose-900 flex items-center gap-3">
                  <FaHeart className="text-rose-600" />
                  Favoritos ({user.favorites.length})
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
              {user.favorites.length > 0 ? (
                <PanelCard
                  data={user.favorites}
                  cols={4}
                  cardStyle="hover:transform hover:scale-105 transition-all duration-300"
                />
              ) : (
                <div className="text-center py-12 bg-rose-50 rounded-xl">
                  <p className="text-rose-800 text-lg">
                    Aún no tienes favoritos. ¡Empieza a añadir peludos a tu
                    lista!
                  </p>
                  <Link
                    replace
                    href={"/perros"}
                    className="mt-5 btn bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors"
                  >
                    Ver perritos
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteDogs;
