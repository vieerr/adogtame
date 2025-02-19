"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit, FaDog } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const EditProfile = () => {
  const { data: session, refetch } = useSession();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    bio: "",
    ...session?.user,
  });

  useEffect(() => {
    if (session?.user) {
      setUser((prev) => ({
        ...prev,
        ...session.user,
        phone: session.user.phone || "",
        location: session.user.location || "",
        website: session.user.website || "",
        bio: session.user.bio || "",
      }));
    }
  }, [session]);

  const mutation = useMutation({
    mutationFn: (updatedUser) =>
      axios.put(
        `http://localhost:3001/users/edit/${user.id}`,
        updatedUser
      ),
    onSuccess: () => {
      refetch();
      alert("Datos actualizados correctamente!");
    },
    onError: (error) => {
      alert(`Error al actualizar: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {user && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 overflow-hidden">
            {/* Left Column */}
            <div className="ml-4 flex flex-col items-center col-span-1 w-full">
              <div>
                <div className="bg-neutral relative text-neutral-content w-44 h-44 rounded-full flex items-center justify-center text-4xl">
                  <Image
                    src={user.image}
                    fill
                    alt="user profile photo"
                    className="object-cover rounded-full"
                  />
                </div>
                <button
                  type="button"
                  className="btn bg-white border border-gray-400 btn-sm relative bottom-10 right-0 flex items-center gap-2"
                >
                  <FaEdit /> Editar
                </button>
              </div>

              <div className="w-2/3 flex items-center justify-center bg-success text-black rounded-lg py-3 mb-7">
                Rescatista Verificado
                <MdVerified size={30} fill="white" />
              </div>

              <div className="w-full px-3">
                <label className="label">
                  <span className="label-text">Biografía</span>
                </label>
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  placeholder="Escribe tu biografía aquí"
                  className="textarea w-full resize-none textarea-bordered"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn mt-5 btn-secondary"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Actualizando..." : "Actualizar Datos"}
              </button>
            </div>

            {/* Right Column */}
            <div className="col-span-3 ml-2 w-full">
              <div className="px-5 pr-10 mb-5">
                <label className="label">
                  <span className="label-text">Nombre</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="px-5 pr-10 mb-5">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="px-5 pr-10 mb-5">
                <label className="label">
                  <span className="label-text">Teléfono</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="px-5 pr-10 mb-5">
                <label className="label">
                  <span className="label-text">Ubicación</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* <div className="px-5 pr-10 mb-5">
                <label className="label">
                  <span className="label-text">Página web</span>
                </label>
                <input
                  type="text"
                  name="website"
                  value={user.website}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div> */}
            </div>

            {/* Security Section */}
            <div className="col-span-4 mt-5">
              <hr className="border-t border-gray-300" />
            </div>

            <h2 className="text-xl font-bold w-full m-4">Seguridad y privacidad</h2>

            <div className="col-span-4 mb-10 mx-20 flex mt-5 flex-col justify-evenly border-red-300 border-2 rounded-lg">
              <div className="flex justify-between p-4 border-b-2 border-gray-300">
                <div>
                  <h3 className="font-bold mb-3">Contraseña</h3>
                  <p>
                    Si tu contraseña es antigua o no es segura, te recomendamos
                    cambiarla.
                  </p>
                </div>

                <button className="btn mt-5 btn-error btn-md w-48">
                  Cambiar Contraseña
                </button>
              </div>

              <div className="flex justify-between p-4">
                <div>
                  <h3 className="font-bold mb-3">Eliminación de cuenta</h3>
                  <p>
                    Si decides eliminar tu cuenta, todos tus datos serán
                    eliminados de forma permanente
                  </p>
                </div>

                <button className="btn mt-5 btn-error btn-md w-48">
                  Eliminar cuenta
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
