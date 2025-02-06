import Image from "next/image";
import Link from "next/link";
const CardDog = ({ dog, isLiked, onLikeClick }) => {
  console.log(dog);
  const { id, name, mainImg, age, sexo, esterilizado } = dog;
  const handleSterilized = (sterilized) => {
    return sterilized ? "Esterilizado" : "No esterilizado";
  };

  return (
    <div className="card card-compact bg-base-100 w-64 shadow-xl transition-all duration-300 hover:-translate-y-2 border-2   hover:border-blue-600">
      <figure className="relative w-full h-48">
        <Link href={`/perros/${id}`}>
          <Image
            src={mainImg}
            alt={name}
            fill
            priority
            sizes="(max-width: 256px) 100vw, 256px"
          />
        </Link>
      </figure>
      <div className="card-body rounded-b-lg">
        <div className="flex items-center gap-2 w-full">
          <Link href={`/perros/${id}`} className="card-title text-blue-600">
            {name}
          </Link>
          <button
            className="ml-auto btn btn-circle btn-ghost hover:bg-pink-100 hover:text-red-500 p-2"
            onClick={() => {
              onLikeClick(id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={isLiked ? "red" : "none"}
              viewBox="0 0 24 24"
              stroke={isLiked ? "red" : "currentColor"}
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
        <p>
          {handleSterilized(esterilizado)} - {"7 años"}
        </p>
        <p className="capitalize text-gray-500">{sexo}</p>
      </div>
    </div>
  );
};

export default CardDog;
