"use client";
import { useState } from "react";
import PanelCard from "./PanelCard";
import { useQuery } from "@tanstack/react-query";

const DogFilter = () => {
  const [likedDogs, setLikedDogs] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch dogs using React Query
  const {
    data: dogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dogs"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dogs`);
      if (!response.ok) throw new Error("Failed to fetch dogs");
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleLikeClick = (dogId) => {
    setLikedDogs((prevLikedDogs) =>
      prevLikedDogs.includes(dogId)
        ? prevLikedDogs.filter((id) => id !== dogId)
        : [...prevLikedDogs, dogId]
    );
  };

  const filteredDogs = dogs.filter((dog) => {
    if (!filter) return true;
    return dog.sexo.toLowerCase().includes(filter.toLowerCase());
  });

  if (isLoading)
    return <div className="text-center p-8">Cargando perros...</div>;
  if (isError)
    return (
      <div className="text-center p-8 text-error">Error cargando perros</div>
    );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content h-full ">
        <PanelCard
          cols={4}
          data={filteredDogs}
          likedDogs={likedDogs}
          onLikeClick={handleLikeClick}
        />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 p-4">
          <div className="text-center mt-4">
            <h3 className="uppercase text-md font-extrabold mb-5">Raza</h3>
            <select
              defaultValue={"any"}
              className="select bg-secondary-content mb-4 select-bordered w-full mt-2"
            >
              <option value={"any"}>Cualquiera</option>
              <option>Raza 1</option>
              <option>Raza 2</option>
            </select>
          </div>
          <div className="text-center mt-4">
            <h3 className="uppercase text-md font-extrabold mb-5">Edad</h3>
            <select
              defaultValue={""}
              className="select bg-secondary-content mb-4 select-bordered w-full mt-2"
            >
              <option value={""}>Cualquiera</option>
              <option>Edad 1</option>
              <option>Edad 2</option>
            </select>
          </div>
          <div className="text-center mt-4">
            <h3 className="uppercase text-md font-extrabold mb-5">Tamaño</h3>
            <select
              defaultValue={""}
              className="select bg-secondary-content mb-4 select-bordered w-full mt-2"
            >
              <option value={""}>Cualquiera</option>
              <option>Tamaño 1</option>
              <option>Tamaño 2</option>
            </select>
          </div>
          <div className="text-center mt-4">
            <h3 className="uppercase text-md font-extrabold mb-5">Género</h3>
            <select
              className="select bg-secondary-content mb-4 select-bordered w-full mt-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value={""}>Cualquiera</option>
              <option>Macho</option>
              <option>Hembra</option>
            </select>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DogFilter;
