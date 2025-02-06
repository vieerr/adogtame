'use client';
import CardDog from './CardDog';
import { dogs } from '@/db';

const PanelCard = ({data,likedDogs,onLikeClick}) => {
    return (
        <div className="flex justify-center p-4">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-max items-start">
                {data.map((dog) => (
                    <CardDog
                        key={dog.id}
                        dog={dog}
                        isLiked={likedDogs.includes(dog.id)}
                        onLikeClick={onLikeClick}
                    />
                ))}
            </div>
        </div>
    );
};


export default PanelCard;
