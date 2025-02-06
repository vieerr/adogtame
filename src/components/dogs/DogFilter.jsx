'use client'
import { useState } from "react";
import PanelCard from "./PanelCard";
import { dogs } from "@/db";

const DogFilter = () => {
    const [likedDogs, setLikedDogs] = useState([]);
    const [filter, setFilter] = useState('');

    const handleLikeClick = (dogId) => {
        setLikedDogs((prevLikedDogs) =>
            prevLikedDogs.includes(dogId)
                ? prevLikedDogs.filter((id) => id !== dogId)
                : [...prevLikedDogs, dogId]
        );
    };
    // const data = [
    //     { id: 1, name: 'Olivier', image: '/perro1.jpeg', age: 20, sexo: "Macho", esterilizado: true },
    //     { id: 2, name: 'Mathew', image: '/perro2.jpg', age: 19, sexo: "Macho", esterilizado: true },
    //     { id: 3, name: 'Antonik', image: '/images.jpg', age: 19, sexo: "Hembra", esterilizado: true },
    //     { id: 4, name: 'Nimbus', image: '/perro4.jpg', age: 8, sexo: "Macho", esterilizado: false },
    //     { id: 5, name: 'Fredo', image: '/perro5.jpeg', age: 4, sexo: 'Hembra', esterilizado: true },
    //     { id: 6, name: 'Bella', image: '/perro1.jpeg', age: 3, sexo: 'Hembra', esterilizado: true },
    //     { id: 7, name: 'Charlie', image: '/perro1.jpeg', age: 5, sexo: 'Macho', esterilizado: false },
    //     { id: 8, name: 'Max', image: '/perro1.jpeg', age: 2, sexo: 'Macho', esterilizado: true },
    //     { id: 9, name: 'Luna', image: '/perro1.jpeg', age: 1, sexo: 'Hembra', esterilizado: false },
    //     { id: 10, name: 'Rocky', image: '/perro1.jpeg', age: 6, sexo: 'Macho', esterilizado: true },
    //     { id: 11, name: 'Lucy', image: '/perro1.jpeg', age: 4, sexo: 'Hembra', esterilizado: true },
    //     { id: 12, name: 'Daisy', image: '/perro1.jpeg', age: 7, sexo: 'Hembra', esterilizado: false },
    //     { id: 13, name: 'Bailey', image: '/perro1.jpeg', age: 3, sexo: 'Macho', esterilizado: true },
    //     { id: 14, name: 'Molly', image: '/perro1.jpeg', age: 5, sexo: 'Hembra', esterilizado: true },
    //     { id: 15, name: 'Buddy', image: '/perro1.jpeg', age: 2, sexo: 'Macho', esterilizado: false },
    //     { id: 16, name: 'Maggie', image: '/perro1.jpeg', age: 6, sexo: 'Hembra', esterilizado: true },
    //     { id: 17, name: 'Oscar', image: '/perro1.jpeg', age: 4, sexo: 'Macho', esterilizado: true },
    //     { id: 18, name: 'Chloe', image: '/perro1.jpeg', age: 1, sexo: 'Hembra', esterilizado: false },
    //     { id: 19, name: 'Toby', image: '/perro1.jpeg', age: 3, sexo: 'Macho', esterilizado: true },
    //     { id: 20, name: 'Coco', image: '/perro1.jpeg', age: 5, sexo: 'Hembra', esterilizado: true }
    //     // Agrega más perros aquí según sea necesario
    // ];

    const filteredDogs = dogs.filter(dog => {
        if (!filter) return true;
        return dog.sexo.toLowerCase().includes(filter.toLowerCase());
    });


    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content h-full ">
                <PanelCard 
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
                        <select defaultValue={"any"} className="select bg-secondary-content mb-4 select-bordered w-full mt-2">
                            <option value={"any"}>
                                Cualquiera
                            </option>
                            <option>Raza 1</option>
                            <option>Raza 2</option>
                        </select>
                    </div>
                    <div className="text-center mt-4">
                        <h3 className="uppercase text-md font-extrabold mb-5">Edad</h3>
                        <select defaultValue={""} className="select bg-secondary-content mb-4 select-bordered w-full mt-2">
                            <option  value={""}>
                                Cualquiera
                            </option>
                            <option>Edad 1</option>
                            <option>Edad 2</option>
                        </select>
                    </div>
                    <div className="text-center mt-4">
                        <h3 className="uppercase text-md font-extrabold mb-5">Tamaño</h3>
                        <select defaultValue={""} className="select bg-secondary-content mb-4 select-bordered w-full mt-2">
                            <option  value={""}>
                                Cualquiera
                            </option>
                            <option>Tamaño 1</option>
                            <option>Tamaño 2</option>
                        </select>
                    </div>
                    <div className="text-center mt-4">
                        <h3 className="uppercase text-md font-extrabold mb-5">Género</h3>
                        <select className="select bg-secondary-content mb-4 select-bordered w-full mt-2" value={filter} 
                            onChange={(e) => setFilter(e.target.value)}>
                            <option  value={""}>
                                Cualquiera
                            </option>
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
