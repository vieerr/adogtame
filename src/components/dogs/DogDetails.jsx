import {
  FaBirthdayCake,
  FaDog,
  FaWeightHanging,
  FaRulerHorizontal,
  FaBriefcaseMedical,
  FaHome,
  FaUser,
  FaPhone,
  FaHandsHelping,
} from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { IoMaleFemale } from "react-icons/io5";
import { GiComb } from "react-icons/gi";
import moment from "moment";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
const userTypeMap = {
  rescuer: {
    label: "Rescatista",
    icon: <FaHandsHelping className="w-4 h-4 mr-2" />,
  },
  user: { label: "Usuario", icon: <FaUser className="w-4 h-4 mr-2" /> },
  shelter: { label: "Refugio", icon: <FaHome className="w-4 h-4 mr-2" /> },
};

// Modal component for displaying and handling requests (works for both adoption and sponsor)
const RequestModal = ({ dogId, type, onClose }) => {
  // Determine endpoint based on type
  const endpoint =
    type === "adoption"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/requests/adoptions/${dogId}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/requests/sponsors/${dogId}`;

  // Fetch the list of requests
  const {
    data: requests,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [type, dogId],
    queryFn: async () => {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Error al cargar solicitudes");
      return res.json();
    },
    enabled: !!dogId,
  });

  // Mutation to update a request status
  const updateRequestMutation = useMutation({
    mutationFn: async ({ requestId, updatedRequest }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/requests/${requestId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedRequest),
        }
      );
      if (!res.ok) throw new Error("Error al actualizar la solicitud");
      return res.json();
    },
    onSuccess: () => {
      refetch();
    },
  });

  // Handler for updating request status
  const handleUpdate = (requestId, status) => {
    updateRequestMutation.mutate({
      requestId,
      updatedRequest: { status },
    });
  };

  const statusMap = {
    pending: "Pendiente",
    approved: "Aprobado",
    rejected: "Rechazado",
  };

  return (
    <>
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96 max-h-full overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">
            Solicitudes de {type === "adoption" ? "adopción" : "patrocinio"}
          </h3>
          {isLoading && <p>Cargando solicitudes...</p>}
          {isError && <p>Error al cargar solicitudes.</p>}
          {requests && requests.length === 0 && (
            <p>No hay solicitudes pendientes.</p>
          )}
          {requests &&
            requests.map((request) => (
              <div
                key={request._id}
                className="border p-4 mb-3 rounded-md flex justify-between items-center"
              >
                <div>
                  {/* Assuming request.user is populated with a name property */}
                  <p className="font-semibold">
                    {request.user_name || "Usuario desconocido"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Estado: {statusMap[request.status]}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(request._id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleUpdate(request._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          <div className="mt-4 flex justify-end">
            <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const DogDetails = ({ dog }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [adoptionModal, setAdoptionModal] = useState(false);
  const [sponsorModal, setSponsorModal] = useState(false);

  useEffect(() => {
    setUser(session?.user);
    setIsOwner(session?.user?.id === dog.owner.userId);
  }, [session, dog.owner.userId]);

  const { mutate: createNotification } = useMutation({
    mutationFn: async (notification) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/user/${dog.owner.userId}`,
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

  const { mutate: createRequest } = useMutation({
    mutationFn: async (request) => {
      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      }).then((res) => res.json());
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

    // Create a notification and request for adoption
    createNotification({
      message: `${session?.user?.name} ha solicitado adoptar a ${dog.name}.`,
      type: "adoptions",
      dogId: dog._id,
    });

    createRequest({
      dog: dog._id,
      user: session?.user?.id,
      user_name: session?.user?.name,
      owner: dog.owner.userId,
      type: "adoption",
    });
  };

  const handleSponsor = () => {
    const message = `Hola, vi a ${dog.name} en Adogtame y me gustaría patrocinarlo.`;
    const phoneNumber = dog.owner.phone;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    // Create a notification and request for sponsorship
    createNotification({
      message: `${session?.user?.name} ha solicitado patrocinar a ${dog.name}.`,
      type: "sponsors",
      dogId: dog._id,
    });

    createRequest({
      dog: dog._id,
      user: session?.user?.id,
      user_name: session?.user?.name,
      owner: dog.owner.userId,
      type: "sponsor",
    });
  };

  const handleAdoptionList = () => {
    setAdoptionModal(true);
  };

  const handleSponsorList = () => {
    setSponsorModal(true);
  };

  const allImages = [dog.pfp, ...dog.photos].filter(Boolean);
  const sizeMap = { small: "Pequeño", medium: "Mediano", big: "Grande" };
  const furMap = { short: "Corto", medium: "Medio", long: "Largo" };
  const genderMap = { male: "Macho", female: "Hembra" };

  return (
    <div className="container mx-auto p-4 h-screen">
      {/* Carousel Section */}
      <div className="carousel mt-5 w-full flex justify-center mb-8 h-2/4">
        {allImages.length > 0 ? (
          allImages.map((img, index) => (
            <div
              key={index}
              id={`slide${index}`}
              className="carousel-item relative w-full bg-gray-800 "
            >
              <img
                src={img}
                alt={`${dog.name} ${index}`}
                className="w-full object-contain rounded-lg"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a
                  href={`#slide${
                    index === 0 ? allImages.length - 1 : index - 1
                  }`}
                  className="btn btn-circle"
                >
                  ❮
                </a>
                <a
                  href={`#slide${
                    index === allImages.length - 1 ? 0 : index + 1
                  }`}
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
              <div className="stat-value text-3xl break-words whitespace-normal">
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
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <button
                onClick={isOwner ? handleAdoptionList : handleAdoption}
                className={`btn btn-secondary btn-block ${
                  session ? "" : "btn-disabled"
                }`}
              >
                <FaHome className="text-xl" />
                {isOwner ? "Solicitudes de adopción" : "Solicitar adopción"}
              </button>
              <button
                onClick={isOwner ? handleSponsorList : handleSponsor}
                className={`btn btn-success btn-block ${
                  session ? "" : "btn-disabled"
                }`}
              >
                <RiMoneyDollarCircleFill className="text-xl" />
                {isOwner ? "Solicitudes de patrocinio" : "Patrocinar"}
              </button>
            </div>
          </div>
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
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-bold">{dog.owner?.name}</span>
                    {dog.owner.type === user? "": (
                      <div className="badge badge-secondary my-3 font-bold text-md badge-lg flex items-center">
                        {userTypeMap[user?.type]?.icon}
                        {userTypeMap[user?.type]?.label}
                      </div>
                    )}
                  </div>
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
      {/* Modals */}
      {adoptionModal && (
        <RequestModal
          dogId={dog._id}
          type="adoption"
          onClose={() => setAdoptionModal(false)}
        />
      )}
      {sponsorModal && (
        <RequestModal
          dogId={dog._id}
          type="sponsor"
          onClose={() => setSponsorModal(false)}
        />
      )}
    </div>
  );
};

export default DogDetails;
