"use client";

import { FaEdit } from "react-icons/fa";
// Add these imports at the top
import Image from "next/image";
import { FiX, FiUpload } from "react-icons/fi";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

const userTypeMap = {
  rescuer: { label: "Rescatista" },
  user: { label: "Usuario" },
  shelter: { label: "Refugio" },
};

const AddDog = () => {
  const [user, setUser] = useState(null);
  const [editingDog, setEditingDog] = useState(null);
  const { data: session, refetch } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!session) {
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
    photos: [],
  });

  const handleEditDog = (dog) => {
    setEditingDog(dog.dogId);
    setFormData({
      name: dog.name,
      location: dog.location,
      birth_date: dog.birth_date.split("T")[0],
      breed: dog.breed,
      size: dog.size,
      fur: dog.fur,
      sex: dog.sex,
      weight: dog.weight.toString(),
      sterilized: dog.sterilized,
      vaccinated: dog.vaccinated,
      pfp: dog.pfp,
      photos: dog.photos || [],
    });
  };

  const cancelEdit = () => {
    setEditingDog(null);
    setFormData({
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
      photos: [],
    });
  };

  const uploadImageMutation = useMutation({
    mutationFn: async (imageFiles) => {
      const uploadPromises = imageFiles.map(async (file) => {
        if (typeof file === "string") return file; // Already uploaded URL
        const formData = new FormData();
        formData.append("image", file);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) throw new Error("Error uploading image");
        return response.json().then((data) => data.imageUrl);
      });
      return Promise.all(uploadPromises);
    },
  });

  const createDogMutation = useMutation({
    mutationFn: async (dogData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dogs`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dogData),
        }
      );
      if (!response.ok) throw new Error("Error al registrar el perro");
      return response.json();
    },
    onSuccess: () => {
      refetch();

      // cancelEdit();
    },
  });

  const updateDogMutation = useMutation({
    mutationFn: async (dogData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dogs/${editingDog}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dogData),
        }
      );
      if (!response.ok) throw new Error("Error al actualizar el perro");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user?.id]);
      cancelEdit();
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        pfp: files[0],
      }));
    }
  };

  const handleExtraImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.photos.length > 2) {
      alert("Máximo 2 imágenes adicionales");
      return;
    }

    const newImages = await uploadImageMutation.mutateAsync(files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newImages],
    }));
  };

  const removeExtraImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload main image if it's a new file
      const pfpUrl =
        typeof formData.pfp === "string"
          ? formData.pfp
          : (await uploadImageMutation.mutateAsync([formData.pfp]))[0];

      // Upload any new extra images
      const existingphotos = formData.photos.filter(
        (img) => typeof img === "string"
      );
      const newExtraImages = formData.photos.filter(
        (img) => typeof img !== "string"
      );
      const uploadedExtraphotos =
        newExtraImages.length > 0
          ? await uploadImageMutation.mutateAsync(newExtraImages)
          : [];

      const dogData = {
        ...formData,
        pfp: pfpUrl,
        photos: [...existingphotos, ...uploadedExtraphotos],
        owner: {
          userId: user.id,
          name: user.name,
          pfp: user.image,
          type: user.type,
        },
      };
      console.log({ dogData });

      if (editingDog) {
        await updateDogMutation.mutateAsync(dogData);
      } else {
        await createDogMutation.mutateAsync(dogData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isPending =
    uploadImageMutation.isPending ||
    createDogMutation.isPending ||
    updateDogMutation.isPending;
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
                  {userTypeMap[user.type].label}
                  {userTypeMap[user.type].label}
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
                <button onClick={cancelEdit} className="btn btn-outline btn-md">
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
                        <Link
                          href={`/perros/${dog.dogId}`}
                          className="text-sm truncate"
                        >
                          {dog.name}
                        </Link>
                        <button
                          onClick={() => handleEditDog(dog)}
                          className="btn btn-square btn-secondary btn-md btn-ghost p-0 m-0"
                        >
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
                  {editingDog ? "Editar Perro" : "Registrar Nuevo Perro"}
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
                    <div className="flex items-center gap-4">
                      <div className="relative group">
                        <div className="w-20 h-20 rounded-full border-2 border-dashed border-base-300 flex items-center justify-center overflow-hidden">
                          {formData.pfp ? (
                            typeof formData.pfp === "string" ? (
                              <Image
                                src={formData.pfp}
                                alt="Vista previa"
                                width={80}
                                height={80}
                                className="object-cover"
                              />
                            ) : (
                              <Image
                                src={URL.createObjectURL(formData.pfp)}
                                alt="Vista previa"
                                width={80}
                                height={80}
                                className="object-cover"
                              />
                            )
                          ) : (
                            <FiUpload className="text-2xl text-base-content/30" />
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="pfpUpload"
                          required={!editingDog}
                        />
                        <label
                          htmlFor="pfpUpload"
                          className="absolute inset-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity bg-base-300/50 flex items-center justify-center"
                        >
                          <FiUpload className="text-xl text-primary" />
                        </label>
                      </div>
                      {formData.pfp && (
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, pfp: null }))
                          }
                          className="btn btn-circle btn-sm btn-ghost"
                        >
                          <FiX className="text-lg" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="form-control pt-6">
                    <label className="label">
                      <span className="label-text">
                        Imágenes adicionales (max 2)
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {formData.photos.map((img, index) => (
                        <div key={index} className="relative group">
                          <div className="w-20 h-20 rounded-lg border-2 border-dashed border-base-300 overflow-hidden">
                            {typeof img === "string" ? (
                              <Image
                                src={img}
                                alt={`Extra ${index + 1}`}
                                width={80}
                                height={80}
                                className="object-cover"
                              />
                            ) : (
                              <Image
                                src={URL.createObjectURL(img)}
                                alt={`Extra ${index + 1}`}
                                width={80}
                                height={80}
                                className="object-cover"
                              />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeExtraImage(index)}
                            className="absolute top-0 right-0 btn btn-circle btn-xs btn-ghost"
                          >
                            <FiX className="text-sm" />
                          </button>
                        </div>
                      ))}
                      {formData.photos.length < 2 && (
                        <div className="relative group">
                          <div className="w-20 h-20 rounded-lg border-2 border-dashed border-base-300 flex items-center justify-center">
                            <FiUpload className="text-2xl text-base-content/30" />
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleExtraImagesChange}
                              className="hidden"
                              id="extraImagesUpload"
                            />
                            <label
                              htmlFor="extraImagesUpload"
                              className="absolute inset-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity bg-base-300/50 flex items-center justify-center"
                            >
                              <FiUpload className="text-xl text-primary" />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-6 gap-2">
                    {editingDog && (
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="btn btn-ghost"
                        disabled={isPending}
                      >
                        Cancelar
                      </button>
                    )}
                    <button
                      type="submit"
                      className={`btn btn-primary ${
                        isPending ? "loading" : ""
                      }`}
                      disabled={isPending}
                    >
                      {isPending
                        ? "Guardando..."
                        : editingDog
                        ? "Actualizar Perro"
                        : "Registrar Perro"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDog;
