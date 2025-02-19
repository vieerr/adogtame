"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaDog,
  FaArrowRight,
} from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const userTypeMap = {
  rescuer: {
    label: "Rescatista",
  },
  user: { label: "Usuario" },
  shelter: { label: "Refugio" },
};

const UserProfile = () => {
  const params = useParams();
  const id = params.id;

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`
      );
      if (!response.ok) throw new Error("User not found");
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ImSpinner8 className="animate-spin text-4xl text-primary" />
      </div>
    );

  if (isError)
    return (
      <div className="w-full h-screen flex items-center justify-center text-error">
        Error loading user profile
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Section */}
      <div className="card bg-base-100 shadow-md mb-8">
        <div className="card-body ">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              <div className="avatar">
                <div className="w-24 rounded-xl">
                  <img
                    src={user?.image || "/default-avatar.png"}
                    alt="Profile"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="text-2xl font-bold flex items-center gap-2">
                <div className="flex flex-col">
                  <h2 className="flex items-center gap-2">
                    {user?.name}{" "}
                    {user.type !== "user" && (
                      <FaCheckCircle className="text-success" />
                    )}
                  </h2>

                  <span className="text-sm font-light text-neutral-content block">
                    {userTypeMap[user.type].label}
                  </span>
                </div>
                <div></div>
              </div>

              <p className="text-gray-700">
                {user?.description || "Sin descripción"}
              </p>
            </div>
            <div className="space-y-3 flex flex-col justify-center ">
              <div className="flex items-center gap-2">
                <FaPhone className="text-lg" />
                <span>{user?.phone || "No hay teléfono registrado"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-lg" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dog Cards Section */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaDog /> Available Dogs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user?.dogs.map((dog) => (
          <div
            key={dog.dogId}
            className="card bg-base-100 shadow-lg hover:bg-base-200  duration-100  transition-all"
          >
            <Link href={`/perros/${dog.dogId}`} replace className="card-body">
              <div className=" h-52 w-full relative mb-4">
                <Image
                  alt={`Imagen de perfil del perro ${dog.name}`}
                  src={dog?.pfp}
                  fill
                />
              </div>
              <div className="space-y-2">
                <div className=" h-4 w-3/4">{dog.name}</div>
                <div className=" h-4 w-1/2"></div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="btn btn-md btn-ghost">
                  Ver más
                  <FaArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
