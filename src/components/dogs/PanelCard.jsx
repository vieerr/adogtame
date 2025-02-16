"use client";
import { useEffect, useState } from "react";
import CardDog from "./CardDog";

const PanelCard = ({ data, cols }) => {
  const [likedDogs, setLikedDogs] = useState([]);

  const [colsStyle, setColsStyle] = useState("grid-cols-3");

  useEffect(() => {
    setColsStyle(`grid-cols-${cols}`);
  }, [cols]);

  const handleLikeClick = (dogId) => {
    setLikedDogs((prevLikedDogs) =>
      prevLikedDogs.includes(dogId)
        ? prevLikedDogs.filter((id) => id !== dogId)
        : [...prevLikedDogs, dogId]
    );
  };

  return (
    <div className="flex justify-center p-4 pt-12">
      <div
        className={`grid grid-cols-1 ${
          cols ? colsStyle : "grid-cols-4"
        } gap-10 w-max items-start`}
      >
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
