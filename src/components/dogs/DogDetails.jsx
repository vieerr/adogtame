import {
  FaBirthdayCake,
  FaDog,
  FaWeightHanging,
  FaRulerHorizontal,
  FaBriefcaseMedical,
  FaHome,
} from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

import { FaLocationDot } from "react-icons/fa6";

import { IoMaleFemale } from "react-icons/io5";
import { GiComb } from "react-icons/gi";

const DogDetails = ({ dog }) => {
  return (
    <div className="container mx-auto p-4">
      {/* Carousel Section */}
      <div className="carousel w-full  mb-8">
        {dog.additionalImages.map((img, index) => (
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
                  index === 0 ? dog.additionalImages.length - 1 : index - 1
                }`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${
                  index === dog.additionalImages.length - 1 ? 0 : index + 1
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
                <FaBirthdayCake className="inline-block   h-9 w-9 stroke-current" />
              </div>
              <div className="stat-title">Edad</div>
              <div className="stat-value break-words">{"10"}</div>
              <div className="stat-desc">Años</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaDog className="inline-block   h-9 w-9 stroke-current" />
              </div>
              <div className="stat-title">Raza</div>
              <div className="stat-value">{"Mixta"}</div>
              <div className="stat-desc">Tipo de raza</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaRulerHorizontal className="inline-block   h-9 w-9 stroke-current" />
              </div>
              <div className="stat-title">Tamaño</div>
              <div className="stat-value">{"Mediano"}</div>
              <div className="stat-desc">Pequeño, Mediano, Grande</div>
            </div>
          </div>
          <div className="stats shadow w-full my-10">
            <div className="stat ">
              <div className="stat-figure text-secondary">
                <IoMaleFemale className="inline-block   h-9 w-9 stroke-current" />
              </div>
              <div className="stat-title">Género</div>
              <div className="stat-value">Masculino</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <GiComb className="inline-block   h-9 w-9 stroke-current" />
              </div>
              <div className="stat-title">Pelaje</div>
              <div className="stat-value">Corto</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaWeightHanging className="inline-block  h-9 w-9 stroke-current" />
              </div>
              <div className="stat-title">Peso</div>
              <div className="stat-value">12 KG</div>
            </div>
          </div>
          <div className="flex justify-around gap-4 mb-6">
            <div className="card bg-red-100 w-96">
              <div className="card-body">
                <h2 className="card-title">
                  Descripción Médica
                  <FaBriefcaseMedical className="inline-block ml-2 h-6 w-6 stroke-current" />
                </h2>
                <ul>
                  <li>Esterilizado: {dog.isSterilized ? "Sí" : "No"}</li>
                  <li>Vacunas al día: {dog.isVaccinated ? "Sí" : "No"}</li>
                </ul>
              </div>
            </div>

            <div className="card bg-green-100 w-96">
              <div className="card-body">
                <h2 className="card-title">
                  Ubicación
                  <FaLocationDot className="inline-block ml-2 h-6 w-6 stroke-current" />
                </h2>
                <ul>
                  <p>Ciudad: {dog.city || "Desconocida"}</p>
                  <p>Código Postal: {dog.zip || "Desconocido"}</p>
                  <p>Parroquia: {dog.parish || "Desconocida"}</p>
                </ul>
              </div>
            </div>
          </div>
          {/* Extra information */}
          <div className="flex gap-4 justify-around">
            <div className="collapse">
              <input type="checkbox" className="peer" />
              <div className="collapse-title bg-secondary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                Descripción
              </div>
              <div className="collapse-content bg-white text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                <p>{dog.description}</p>
              </div>
            </div>

            <div className="collapse">
              <input type="checkbox" className="peer" />
              <div className="collapse-title bg-secondary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                Necesidades Especiales
              </div>
              <div className="collapse-content bg-white text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                <p>{dog.specialNeeds}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col w-full gap-4">
              <button className="btn btn-success">
                Solicitar adopción
                <FaHome className="inline-block ml-2 h-6 w-6 stroke-current" />
              </button>
              <button className="btn btn-info">
                Solicitar patrocinio
                <RiMoneyDollarCircleFill className="inline-block ml-2 h-6 w-6 stroke-current" />
              </button>
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
