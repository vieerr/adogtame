'use client';
import Image from 'next/image';

const CardDog = ({ dog, isLiked, onLikeClick }) => {
    const { id, name, image, age, description, esterilizado } = dog;

    return (
        <div className="card card-compact bg-base-100 w-64 shadow-xl transition-transform duration-300 hover:scale-105">
            <figure className="relative w-full h-48">
                <Image src={image} alt={name} layout='fill' priority/>
            </figure>
            <div className="card-body rounded-b-lg">
                <div className="flex items-center gap-2 w-full">
                    <h2 className="card-title text-blue-600 underline">{name}</h2>
                    <button
                        className="ml-auto btn btn-circle btn-ghost hover:bg-pink-100 hover:text-red-500 p-2"
                        onClick={() => onLikeClick(id)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill={isLiked ? 'red' : 'none'}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>
                </div>
                <p>{esterilizado} - {age}</p>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default CardDog;
