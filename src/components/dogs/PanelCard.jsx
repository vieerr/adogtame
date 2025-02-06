'use client';
import { useState } from 'react';
import CardDog from './CardDog';

const PanelCard = () => {
    const [likedDogs, setLikedDogs] = useState([]);

    const handleLikeClick = (dogId) => {
        setLikedDogs((prevLikedDogs) =>
            prevLikedDogs.includes(dogId)
                ? prevLikedDogs.filter((id) => id !== dogId)
                : [...prevLikedDogs, dogId]
        );
    };

    const dogs = [
        { id: 1, name: 'Olivier', image: '/perro1.jpeg', age: 20, sexo: "Macho", esterilizado: true },
        { id: 2, name: 'Mathew', image: '/perro2.jpg',age:19, sexo:"Macho", esterilizado: true},
        { id: 3, name: 'Antonik', image: '/images.jpg',age:19, sexo:"Hembra", esterilizado: true},
        { id: 4, name: 'Nimbus', image: '/perro4.jpg', age: 8, sexo: "Macho", esterilizado: false },
        { id: 5, name: 'Fredo', image: '/perro5.jpeg', age: 4, sexo: 'Hembra', esterilizado: true }
        // Agrega más perros aquí según sea necesario
    ];

    return (
        <div className="flex justify-center p-4">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl items-start">
                {dogs.map((dog) => (
                    <CardDog
                        key={dog.id}
                        dog={dog}
                        isLiked={likedDogs.includes(dog.id)}
                        onLikeClick={handleLikeClick}
                    />
                ))}
            </div>
        </div>
    );
};


export default PanelCard;
