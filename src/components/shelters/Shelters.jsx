"use client";

import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { FaMapMarkerAlt, FaDog, FaHandHoldingHeart } from "react-icons/fa";

moment.locale("es");

const Shelters = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["shelters"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/shelters/get-all`
      );
      if (!response.ok) throw new Error("Shelters not found");
      return response.json();
    },
    staleTime: 1000 * 60,
  });

  if (isPending)
    return <div className="text-center py-8">Cargando refugios...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="w-full leading-10 mx-auto text-center bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Refugios</h1>

          <p className="text-gray-600 text-lg w-3/4 text-center mx-auto">
            Organizaciones comprometidas con el rescate, rehabilitación y
            cuidado de animales en situación de calle o en peligro. Conoce a
            algunos de los refugios verificados de{" "}
            <span className="text-secondary font-semibold">Adogtame</span>.
          </p>
          <Link className="btn btn-secondary btn-outline my-6" href="/refugios/sign-up" replace>
            Crear cuenta de refugio
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {data?.map((shelter) => (
          <div
            key={shelter._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <Link
                href={`/users/${shelter._id}`}
                replace
                className="flex flex-col items-center mb-4"
              >
                <img
                  src={shelter.image}
                  alt={shelter.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-secondary/20 mb-4"
                />
                <h2 className="text-xl font-bold text-gray-800 text-center">
                  {shelter.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1 text-center">
                  Miembro de Adogtame desde:{" "}
                  <span className="font-medium text-secondary block">
                    {moment(shelter.createdAt).format("D [de] MMMM [de] YYYY")}
                  </span>
                </p>
              </Link>
              {shelter.location && (
                <div className="flex items-center justify-center text-gray-600 mt-2">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{shelter.location}</span>
                </div>
              )}
              {shelter.dogs?.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Peludos rescatados ({shelter.dogs.length})
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {shelter.dogs.slice(0, 3).map((dog) => (
                      <Link
                        href={`/perros/${dog.dogId}`}
                        replace
                        key={dog.dogId}
                        className="flex flex-col items-center group"
                      >
                        <img
                          src={dog.pfp}
                          alt={dog.name}
                          className="w-16 h-16 rounded-lg object-cover mb-1 transition-transform group-hover:scale-105"
                        />
                        <span className="text-xs text-gray-600 font-medium">
                          {dog.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cool Features Section */}
      <h2 className="text-2xl font-bold shadow-md py-4 text-center text-secondary mb-4 mt-16">
        Características de los Refugios
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div className="bg-gradient-to-br from-secondary/10 to-primary/5 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg mr-4">
              <FaDog className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Estadísticas de Rescate
            </h3>
          </div>
          <p className="text-gray-600">
            Cada refugio muestra estadísticas sobre los animales rescatados,
            adoptados y en cuidado.
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary/10 to-primary/5 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg mr-4">
              <FaMapMarkerAlt className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Ubicación en Mapa
            </h3>
          </div>
          <p className="text-gray-600">
            Integración con mapas para ubicar fácilmente los refugios cerca de
            ti.
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary/10 to-primary/5 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg mr-4">
              <FaHandHoldingHeart className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Programas de Voluntariado
            </h3>
          </div>
          <p className="text-gray-600">
            Información sobre cómo colaborar como voluntario en los refugios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shelters;
