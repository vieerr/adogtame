"use client";

import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";

moment.locale("es");

const Rescuers = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["rescuers"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/rescuers/get-all`
      );
      if (!response.ok) throw new Error("Rescuers not found");
      return response.json();
    },
    staleTime: 1000 * 60,
  });

  if (isPending)
    return <div className="text-center py-8">Cargando rescatistas...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-8">
      <div className=" text-center mb-12">
        <div className="w-full leading-10 mx-auto text-center bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Rescatistas</h1>

          <p className="text-gray-600 text-lg w-3/4 text-center mx-auto">
            Personas independientes comprometidas con el bienestar animal que
            mediante sus propios medios y recursos, rescatan, rehabilitan y
            cuidan animales en situación de calle o en peligro. Conoce a algunos
            de los rescatistas verificados de{" "}
            <span className="text-secondary font-semibold">Adogtame</span>.
          </p>
          <div className="flex my-5 justify-evenly">
            <a href="#how-to" className="btn btn-secondary btn-md">
              ¿Cómo puedo convertirme en rescatista?
            </a>
            <a href="#benefits" className="btn btn-secondary btn-md ml-4">
              Beneficios de ser rescatista
            </a>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {data?.map((rescuer) => (
          <div
            key={rescuer._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <Link
                href={`/users/${rescuer._id}`}
                replace
                className="flex flex-col items-center mb-4"
              >
                <img
                  src={rescuer.image}
                  alt={rescuer.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-secondary/20 mb-4"
                />
                <h2 className="text-xl font-bold text-gray-800 text-center">
                  {rescuer.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1 text-center">
                  Miembro de Adogtame desde:{" "}
                  <span className="font-medium text-secondary block">
                    {moment(rescuer.createdAt).format("D [de] MMMM [de] YYYY")}
                  </span>
                </p>
              </Link>
              {rescuer.dogs?.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Peludos rescatados ({rescuer.dogs.length})
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {rescuer.dogs.slice(0, 3).map((dog) => (
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
      <h2
        id="how-to"
        className="text-2xl font-bold shadow-md py-4 text-center text-secondary mb-4"
      >
        Cómo convertirme en rescatista
      </h2>
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical ">
        <li>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">Primer paso</time>
            <div className="text-lg font-black">
              Registro de cuenta en Adogtame
            </div>
            Toma menos de 10 segundos y es completamente gratis.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end md:mb-10">
            <time className="font-mono italic">Segundo paso</time>
            <div className="text-lg font-black">
              Publicar al menos a 3 perritos
            </div>
            Sube fotos, descripciones y demás datos de los perritos que estás
            cuidando o rescatando actualmente.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="font-mono italic">Tercer paso</time>
            <div className="text-lg font-black">Solicitud de verificación</div>
            Nuestro equipo leerá tu historia y revisará tu perfil para poder
            verificar tu cuenta
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end md:mb-10">
            <time className="font-mono italic">Cuarto paso</time>
            <div className="text-lg font-black">
              Felicidades, ahora eres un rescatista verificado de Adogtame
            </div>
          </div>
          <hr />
        </li>
      </ul>
      {/* New Benefits Section */}
      <h2
        id="benefits"
        className="text-2xl font-bold shadow-md py-4 text-center text-secondary mb-4 mt-16"
      >
        Beneficios de ser Rescatista
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div className="bg-gradient-to-br from-secondary/10 to-primary/5 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg mr-4">
              <svg
                className="w-8 h-8 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Cuenta Verificada
            </h3>
          </div>
          <p className="text-gray-600">
            Mayor seguridad y credibilidad en tus procesos de adopción con
            nuestro sistema de verificación.
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary/10 to-primary/5 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg mr-4">
              <svg
                className="w-8 h-8 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Programa de Patrocinios
            </h3>
          </div>
          <p className="text-gray-600">
            Recibe apoyo económico directo de personas interesadas en ayudar a
            tus perritos rescatados y a tí
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary/10 to-primary/5 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg mr-4">
              <svg
                className="w-8 h-8 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Visibilidad Prioritaria
            </h3>
          </div>
          <p className="text-gray-600">
            Tus perritos aparecerán primeros en búsquedas y tendrán destacado
            especial en la plataforma.
          </p>
        </div>
        <div className="bg-gradient-to-br from-secondary/10 to-primary/5 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg mr-4">
              <svg
                className="w-8 h-8 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Seguridad Avanzada
            </h3>
          </div>
          <p className="text-gray-600">
            Contamos con un sistema de seguridad avanzado para proteger tus
            datos y los de tus perritos rescatados.
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary/10 to-primary/5 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg mr-4">
              <svg
                className="w-8 h-8 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Soporte Prioritario
            </h3>
          </div>
          <p className="text-gray-600">
            Atención preferencial en nuestro centro de ayuda y respuesta en
            menos de 24 horas.
          </p>
        </div>
        <div className="bg-gradient-to-br from-secondary/10 to-primary/5 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-secondary/20 p-3 rounded-lg mr-4">
              <svg
                className="w-8 h-8 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Más beneficios proximamente
            </h3>
          </div>
          <p className="text-gray-600">
            Estamos trabajando en más beneficios para nuestros rescatistas
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rescuers;
