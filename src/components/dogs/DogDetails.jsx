import React from "react";

const DogDetails = ({ dog }) => {
  return (
    <div className="container mx-auto p-4">
      {/* Carousel Section */}
      <div className="carousel w-full  mb-8">
        {dog.crs_imgs.map((img, index) => (
          <div
            key={index}
            id={`slide${index}`}
            className="carousel-item relative w-full"
          >
            <img
              src={img}
              alt={`Perro ${index}`}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
              <a
                href={`#slide${
                  index === 0 ? dog.crs_imgs.length - 1 : index - 1
                }`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${
                  index === dog.crs_imgs.length - 1 ? 0 : index + 1
                }`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-3xl font-bold">{dog.name || "Nombre del Perro"}</h1>
      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* General Info */}
        <div className="col-span-2">
          <div className="stats shadow w-full grid-cols-3 break-words">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v1m0 2v1m0-3a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Edad</div>
              <div className="stat-value break-words">{"10"}</div>
              <div className="stat-desc">Años</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Raza</div>
              <div className="stat-value">{"Mixta"}</div>
              <div className="stat-desc">Tipo de raza</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Tamaño</div>
              <div className="stat-value">{"Mediano"}</div>
              <div className="stat-desc">Pequeño, Mediano, Grande</div>
            </div>
          </div>
          <div className="stats shadow w-full mt-5">
            <div className="stat ">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Género</div>
              <div className="stat-value">Masculino</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Pelaje</div>
              <div className="stat-value">Corto</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Peso</div>
              <div className="stat-value">12 KG</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-red-100 rounded-lg shadow">
              <h2 className="font-bold">Descripción Médica</h2>
              <ul>
                <li>Esterilizado: {dog.isSterilized ? "Sí" : "No"}</li>
                <li>Vacunas al día: {dog.isVaccinated ? "Sí" : "No"}</li>
              </ul>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg shadow">
              <h2 className="font-bold">Ubicación</h2>
              <p>Ciudad: {dog.city || "Desconocida"}</p>
              <p>Código Postal: {dog.zip || "Desconocido"}</p>
              <p>Parroquia: {dog.parish || "Desconocida"}</p>
            </div>
          </div>

          <div>
            <h2 className="font-bold">Descripción:</h2>
            <p>{dog.description || "Sin descripción disponible"}</p>
          </div>

          <div className="mt-4">
            <h2 className="font-bold">Necesidades Especiales:</h2>
            <p>{dog.specialNeeds || "Sin necesidades especiales"}</p>
          </div>
        </div>

        <div>
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col w-full gap-4">
              <button className="btn btn-success">Solicitar adopción</button>
              <button className="btn btn-info">Solicitar patrocinio</button>
            </div>
          </div>
          {/* Contact Info */}
          <div className="p-4 bg-blue-100 rounded-lg shadow">
            <h2 className="text-xl font-bold">Contacto del adoptante</h2>
            <div className="flex justify-center items-center mt-4">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogDetails;
