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
        { id: 1, name: 'Olivier', image: '/perro1.jpeg', age: 20, description: "Antonick's Bitch", esterilizado: 'CASTRADO' },
        { id: 2, name: 'Mathew', image: '/perro2.jpg',age:19, description:"Glo Glo glo", esterilizado: 'Infertil'},
        { id: 3, name: 'Antonik', image: '/images.jpg',age:19, description:"Glo Glo glo", esterilizado: 'Infertil'},
        { id: 4, name: 'Nimbus', image: '/perro4.jpg', age: 8, description: 'Perro sordo rescatado del maltrato en el sur de Quito', esterilizado: 'CASTRADO' },
        { id: 5, name: 'Fredo', image: '/perro5.jpeg', age: 4, description: 'Detonala Fredo', esterilizado: 'No disponible' }
        // Agrega más perros aquí según sea necesario
    ];

    return (
        <div className="flex justify-center p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
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
