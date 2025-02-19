"use client";

import { FaEdit } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

const AddDog = () => {
  const [user, setUser] = useState(null);
  const { data: session, refetch } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!!!session) {
      router.push("/user/sign-in");
    } else {
      setUser(session.user);
    }
  }, [session, router]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    birth_date: "",
    breed: "",
    size: "",
    fur: "",
    sex: "",
    weight: "",
    sterilized: false,
    vaccinated: false,
    pfp: null,
  });

  // Image upload mutation
  const uploadImageMutation = useMutation({
    mutationFn: async (imageFile) => {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error uploading image");
      return response.json();
    },
  });

  // Dog submission mutation
  const createDogMutation = useMutation({
    mutationFn: async (dogData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dogData),
      });

      if (!response.ok) throw new Error("Error al registrar el perro");
      return response.json();
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        pfp: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First upload image
      const { imageUrl } = await uploadImageMutation.mutateAsync(formData.pfp);

      // Then create dog with image URL n add user
      await createDogMutation.mutateAsync({
        ...formData,
        owner: {
          userId: user.id,
          name: user.name,
          pfp: user.image,
        },
        pfp: imageUrl,
      });
      refetch();

    } catch (error) {
      console.error("Error:", error);
    }
  };
  const isPending =
    uploadImageMutation.isPending || createDogMutation.isPending;

  return (
    <div>
      {user && (
        <div className="w-full mt-10 flex justify-center gap-4">
          <div id="user-dogs" className="flex flex-col gap-4">
            <div
              id="user-info"
              className="card card-bordered p-5 bg-base-100 shadow-xl col-span-1 flex flex-row justify-center items-center gap-5"
            >
              <img
                src={user?.image}
                alt="Profile Picture"
                className="w-16 h-16 rounded-full"
              />
              <div className="flex flex-col gap-2">
                <p className="prose font-bold">{user.name}</p>
                <p className="prose font-extralight capitalize text-xs text-gray-500">
                  {user.type}
                </p>
              </div>
            </div>
            <div
              id="user-dogs-list"
              className="card card-bordered p-5 bg-base-100 shadow-xl col-span-1 w-80 flex"
            >
              <div className="flex flex-col gap-4">
                <h2>
                  <span className="font-bold">Mis Perros</span>
                </h2>
                <button className="btn btn-outline btn-md">
                  Registrar nuevo
                </button>
                <div className="h-80 overflow-y-scroll overflow-x-hidden flex flex-col gap-4">
                  {user?.dogs ? (
                    user.dogs.map((dog) => (
                      <div
                      
                        key={dog.dogId}
                        className="card card-bordered flex flex-row shadow-md mx-2 p-3 items-center justify-evenly gap-3"
                      >
                        <img
                          src={dog.pfp}
                          alt={dog.name}
                          className="rounded-full w-12 h-12"
                        />
                        <Link href={`/perros/${dog.dogId}`} className="text-sm truncate">{dog.name}</Link>
                        <button className="btn btn-square btn-secondary btn-md btn-ghost p-0 m-0">
                          <FaEdit />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-80">
                      <p>No tienes perros registrados</p>
                    </div>
                  )}
                </div>
                <button className="btn btn-outline btn-md">
                  Regresar al Inicio
                </button>
              </div>
            </div>
          </div>
          <div id="add-dog-form">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold mb-6">
                  Registrar Nuevo Perro
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Nombre</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="input input-bordered"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Ubicación</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        className="input input-bordered"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Fecha de Nacimiento</span>
                      </label>
                      <input
                        type="date"
                        name="birth_date"
                        className="input input-bordered"
                        value={formData.birth_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Raza</span>
                      </label>
                      <input
                        type="text"
                        name="breed"
                        className="input input-bordered"
                        value={formData.breed}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Tamaño</span>
                      </label>
                      <select
                        name="size"
                        className="select select-bordered"
                        value={formData.size}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar tamaño</option>
                        <option value="small">Pequeño</option>
                        <option value="medium">Mediano</option>
                        <option value="big">Grande</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Pelaje</span>
                      </label>
                      <select
                        name="fur"
                        className="select select-bordered"
                        value={formData.fur}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar Pelaje</option>
                        <option value="short">Corto</option>
                        <option value="medium">Medio</option>
                        <option value="long">Largo</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Sexo</span>
                      </label>
                      <select
                        name="sex"
                        className="select select-bordered"
                        value={formData.sex}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar sexo</option>
                        <option value="male">Macho</option>
                        <option value="female">Hembra</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Peso (kg)</span>
                      </label>
                      <input
                        type="number"
                        name="weight"
                        className="input input-bordered"
                        value={formData.weight}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text">¿Está esterilizado?</span>
                      <input
                        type="checkbox"
                        name="sterilized"
                        className="checkbox checkbox-secondary"
                        checked={formData.sterilized}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text">
                        ¿Tiene las vacunas al día?
                      </span>
                      <input
                        type="checkbox"
                        name="vaccinated"
                        className="checkbox checkbox-secondary"
                        checked={formData.vaccinated}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>

                  <div className="form-control pt-6">
                    <label className="label">
                      <span className="label-text">Imagen de perfil</span>
                    </label>
                    <input
                      type="file"
                      name="pfp"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input file-input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button
                      type="submit"
                      className={`btn btn-primary ${
                        isPending ? "loading" : ""
                      }`}
                      disabled={isPending}
                    >
                      {isPending ? "Registrando..." : "Registrar Perro"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default AddDog;
