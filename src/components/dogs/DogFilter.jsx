"use client";
import { useState } from "react";
import PanelCard from "./PanelCard";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const DogFilter = () => {
  const [likedDogs, setLikedDogs] = useState([]);
  const [filters, setFilters] = useState({
    breed: "any",
    age: "any",
    size: "any",
    sex: "any",
  });

  // Fetch dogs using React Query
  const {
    data: dogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dogs"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dogs`
      );
      if (!response.ok) throw new Error("Failed to fetch dogs");
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleLikeClick = (dogId) => {
    setLikedDogs((prev) =>
      prev.includes(dogId)
        ? prev.filter((id) => id !== dogId)
        : [...prev, dogId]
    );
  };

  const calculateDogAge = (birthDate) => {
    const now = moment();
    const birth = moment(birthDate);
    return now.diff(birth, "years");
  };

  const filteredDogs = dogs.filter((dog) => {
    // Breed filter
    const breedMatch = filters.breed === "any" || dog.breed === filters.breed;

    // Size filter
    const sizeMatch = filters.size === "any" || dog.size === filters.size;

    // sex filter
    const sexMatch = filters.sex === "any" || dog.sex === filters.sex;

    // Age filter
    let ageMatch = true;
    if (filters.age !== "any") {
      const age = calculateDogAge(dog.birth_date);
      switch (filters.age) {
        case "puppy":
          ageMatch = age <= 2;
          break;
        case "young":
          ageMatch = age > 2 && age <= 5;
          break;
        case "adult":
          ageMatch = age > 5 && age <= 10;
          break;
        case "senior":
          ageMatch = age > 10;
          break;
        default:
          ageMatch = true;
      }
    }

    return breedMatch && sizeMatch && sexMatch && ageMatch;
  });

  const uniqueBreeds = [
    ...new Set(dogs.map((dog) => dog.breed).filter(Boolean)),
  ];

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
          {/* Breed Filter */}
          <div className="text-center mt-4">
            <h3 className="uppercase text-md font-extrabold mb-5">Raza</h3>
            <select
              className="select bg-secondary-content mb-4 select-bordered w-full mt-2"
              value={filters.breed}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, breed: e.target.value }))
              }
            >
              <option value="any">Cualquiera</option>
              {uniqueBreeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>

          {/* Age Filter */}
          <div className="text-center mt-4">
            <h3 className="uppercase text-md font-extrabold mb-5">Edad</h3>
            <select
              className="select bg-secondary-content mb-4 select-bordered w-full mt-2"
              value={filters.age}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, age: e.target.value }))
              }
            >
              <option value="any">Cualquiera</option>
              <option value="puppy">Cachorro (0-2 años)</option>
              <option value="young">Joven (3-5 años)</option>
              <option value="adult">Adulto (6-10 años)</option>
              <option value="senior">Senior (11+ años)</option>
            </select>
          </div>

          {/* Size Filter */}
          <div className="text-center mt-4">
            <h3 className="uppercase text-md font-extrabold mb-5">Tamaño</h3>
            <select
              className="select bg-secondary-content mb-4 select-bordered w-full mt-2"
              value={filters.size}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, size: e.target.value }))
              }
            >
              <option value="any">Cualquiera</option>
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="big">Grande</option>
            </select>
          </div>

          {/* sex Filter */}
          <div className="text-center mt-4">
            <h3 className="uppercase text-md font-extrabold mb-5">Género</h3>
            <select
              className="select bg-secondary-content mb-4 select-bordered w-full mt-2"
              value={filters.sex}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sex: e.target.value }))
              }
            >
              <option value="any">Cualquiera</option>
              <option value="male">Macho</option>
              <option value="female">Hembra</option>
            </select>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DogFilter;
