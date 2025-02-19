import {
  FaBirthdayCake,
  FaDog,
  FaWeightHanging,
  FaRulerHorizontal,
  FaBriefcaseMedical,
  FaHome,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { IoMaleFemale } from "react-icons/io5";
import { GiComb } from "react-icons/gi";
import moment from "moment";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";

const DogDetails = ({ dog }) => {
  const { data: session } = useSession();

  // Mutation to create a new notification matching your Mongoose schema
  const { mutate: createNotification } = useMutation({
    mutationFn: async (notification) => {
      return fetch(
        `http://localhost:3001/notifications/user/${dog.owner.userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notification),
        }
      ).then((res) => res.json());
    },
    onSuccess: () => {
      console.log("Notificación creada exitosamente");
    },
    onError: (err) => {
      console.error("Error creando la notificación", err);
    },
  });

  const calculateAge = (birthDate) => {
    const now = moment();
    const birth = moment(birthDate);
    const years = now.diff(birth, "year");
    const months = now.subtract(years, "years").diff(birth, "months");

    let ageString = [];
    if (years > 0) ageString.push(`${years} ${years === 1 ? "año" : "años"}`);
    if (months > 0)
      ageString.push(`${months} ${months === 1 ? "mes" : "meses"}`);

    return ageString.join(" y ") || "Recién nacido";
  };

  const handleAdoption = () => {
    const message = `Hola, vi a ${dog.name} en Adogtame y me gustaría adoptarlo.`;
    const phoneNumber = dog.owner.phone;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    // Create a notification for the adoption request including the dogId
    createNotification({
      message: `${session?.user?.name} ha solicitado adoptar a ${dog.name}.`,
      type: "adoptions",
      dogId: dog._id,
    });
  };

  const handleSponsor = () => {
    const message = `Hola, vi a ${dog.name} en Adogtame y me gustaría patrocinarlo.`;
    const phoneNumber = dog.owner.phone;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    // Create a notification for the sponsorship request including the dogId
    createNotification({
      message: `${session?.user?.name} ha solicitado patrocinar a ${dog.name}.`,
      type: "sponsors",
      dogId: dog._id,
    });
  };

  const allImages = [dog.pfp, ...dog.photos].filter(Boolean);
  const sizeMap = { small: "Pequeño", medium: "Mediano", big: "Grande" };
  const furMap = { short: "Corto", medium: "Medio", long: "Largo" };
  const genderMap = { male: "Macho", female: "Hembra" };

  return (
    <div className="container mx-auto p-4">
      {/* Carousel Section */}
      <div className="carousel w-full mb-8 h-96">
        {allImages.length > 0 ? (
          allImages.map((img, index) => (
            <div
              key={index}
              id={`slide${index}`}
              className="carousel-item relative w-full"
            >
              <img
                src={img}
                alt={`${dog.name} ${index}`}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a
                  href={`#slide${index === 0 ? allImages.length - 1 : index - 1}`}
                  className="btn btn-circle"
                >
                  ❮
                </a>
                <a
                  href={`#slide${index === allImages.length - 1 ? 0 : index + 1}`}
                  className="btn btn-circle"
                >
                  ❯
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-96 flex items-center justify-center bg-base-300 rounded-lg">
            <div className="text-center">
              <div className="text-2xl">🐾</div>
              <p className="mt-2">No hay fotos disponibles</p>
            </div>
          </div>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-6">{dog.name}</h1>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* General Info */}
        <div className="col-span-2">
          <div className="stats shadow w-full grid-cols-3">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaBirthdayCake className="text-3xl" />
              </div>
              <div className="stat-title">Edad</div>
              <div className="stat-value text-3xl">
                {calculateAge(dog.birth_date)}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaDog className="text-3xl" />
              </div>
              <div className="stat-title">Raza</div>
              <div className="stat-value break-words whitespace-normal">
                {dog.breed}
              </div>
              <div className="stat-desc">Tipo de raza</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaRulerHorizontal className="text-3xl" />
              </div>
              <div className="stat-title">Tamaño</div>
              <div className="stat-value">{sizeMap[dog.size]}</div>
              <div className="stat-desc">Pequeño, Mediano, Grande</div>
            </div>
          </div>

          <div className="stats shadow w-full my-6">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <IoMaleFemale className="text-3xl" />
              </div>
              <div className="stat-title">Género</div>
              <div className="stat-value">{genderMap[dog.sex]}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <GiComb className="text-3xl" />
              </div>
              <div className="stat-title">Pelaje</div>
              <div className="stat-value">{furMap[dog.fur]}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaWeightHanging className="text-3xl" />
              </div>
              <div className="stat-title">Peso</div>
              <div className="stat-value">{dog.weight} KG</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="card bg-base-100 shadow-md flex-1">
              <div className="card-body">
                <h2 className="card-title">
                  <FaBriefcaseMedical className="text-primary" />
                  Estado Médico
                </h2>
                <div className="space-y-2">
                  <p>Esterilizado: {dog.sterilized ? "Sí ✅" : "No ❌"}</p>
                  <p>Vacunado: {dog.vaccinated ? "Sí ✅" : "No ❌"}</p>
                  {dog.specialNeeds?.length > 0 && (
                    <p>Necesidades especiales: {dog.specialNeeds.join(", ")}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md flex-1">
              <div className="card-body">
                <h2 className="card-title">
                  <FaLocationDot className="text-primary" />
                  Ubicación
                </h2>
                <p className="text-lg">{dog.location}</p>
                {dog.adopted && (
                  <div className="badge badge-success gap-2 mt-2">
                    ¡Ya adoptado!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {dog.characteristics?.length > 0 && (
            <div className="collapse collapse-arrow bg-base-200 mb-4">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Características
              </div>
              <div className="collapse-content">
                <ul className="list-disc pl-6">
                  {dog.characteristics.map((char, index) => (
                    <li key={index}>{char}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Action Section */}
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <button
                onClick={handleAdoption}
                className={`btn btn-secondary btn-block ${session ? "" : "btn-disabled"}`}
              >
                <FaHome className="text-xl" />
                Solicitar adopción
              </button>
              <button
                onClick={handleSponsor}
                className={`btn btn-success btn-block ${session ? "" : "btn-disabled"}`}
              >
                <RiMoneyDollarCircleFill className="text-xl" />
                Solicitar patrocinio
              </button>
            </div>
          </div>

          {/* Owner Section */}
          <div className="card bg-base-100 shadow-md mt-6">
            <div className="card-body">
              <h2 className="card-title">
                <FaUser className="text-primary mr-2" />
                Dueño/Rescatista
              </h2>

              <Link
                href={`/users/${dog.owner.userId}`}
                replace
                className="flex items-center gap-4 mt-4"
              >
                <div className="avatar">
                  <div className="w-16 rounded-full bg-base-300">
                    {dog.owner?.pfp ? (
                      <img src={dog.owner.pfp} alt="Profile" />
                    ) : (
                      <FaUser className="w-8 h-8 m-4" />
                    )}
                  </div>
                </div>

                <div className="space-y-2 flex">
                  {dog.owner?.name && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{dog.owner.name}</span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>

          {dog.sponsors?.length > 0 && (
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">Patrocinadores</h2>
                <div className="space-y-2">
                  {dog.sponsors.map((sponsor, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img src={sponsor.logo} alt={sponsor.name} />
                        </div>
                      </div>
                      <span>{sponsor.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DogDetails;
