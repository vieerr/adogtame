"use client";
import { useState } from "react";
import CardDog from "./CardDog";
import { dogs } from "@/db";

const PanelCard = ({data}) => {
  const [likedDogs, setLikedDogs] = useState([]);

  const handleLikeClick = (dogId) => {
    setLikedDogs((prevLikedDogs) =>
      prevLikedDogs.includes(dogId)
        ? prevLikedDogs.filter((id) => id !== dogId)
        : [...prevLikedDogs, dogId]
    );
  };

  return (
    <div className="flex justify-center p-4 pt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-max items-start">
        {data.map((dog) => (
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
