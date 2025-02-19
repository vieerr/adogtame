import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const CardDog = ({ dog, isLiked }) => {
  const [liked, setLiked] = useState(isLiked);
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.patch(
        `http://localhost:3001/users/toggle-favorite/${userId}`,

        {
          _id: dog._id,
          name: dog.name,
          pfp: dog.pfp,
          location: dog.location,
        }
      );
      return response.data;
    },

    // onMutate: async () => {
    //   await queryClient.cancelQueries(["user", userId]);
    //   const previousUser = queryClient.getQueryData(["user", userId]);

    //   // Optimistically update the UI
    //   queryClient.setQueryData(["user", userId], (old) => ({
    //     ...old,
    //     favorites: isLiked
    //       ? old.favorites.filter((fav) => fav._id !== dog._id)
    //       : [...old.favorites, {
    //           _id: dog._id,
    //           name: dog.name,
    //           pfp: dog.pfp,
    //           location: dog.location
    //         }]
    //   }));

    //   return { previousUser };
    // },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["user", userId], context.previousUser);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["user", userId]);
    },
  });

  const handleSterilized = (sterilized) => {
    return sterilized ? "Esterilizado" : "No esterilizado";
  };

  return (
    <div className="card card-compact bg-base-100 w-64 shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-blue-600">
      <figure className="relative w-full h-48">
        <Link href={`/perros/${dog._id}`}>
          <Image
            src={dog.pfp}
            alt={dog.name}
            fill
            priority
            sizes="(max-width: 256px) 100vw, 256px"
            className="object-cover"
          />
        </Link>
      </figure>
      <div className="card-body rounded-b-lg">
        <div className="flex items-center gap-2 w-full">
          <Link
            href={`/perros/${dog._id}`}
            className="card-title text-blue-600"
          >
            {dog.name}
          </Link>
          <button
            className="ml-auto btn btn-circle btn-ghost hover:bg-pink-100 hover:text-red-500 p-2"
            onClick={() => {
              setLiked(!liked);
              toggleFavoriteMutation.mutate();
            }}
            disabled={toggleFavoriteMutation.isPending}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={liked ? "red" : "none"}
              viewBox="0 0 24 24"
              stroke={liked ? "red" : "currentColor"}
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
          {handleSterilized(dog.esterilizado)} - {dog.age}
        </p>
        <p className="capitalize text-gray-500">{dog.sexo}</p>
      </div>
    </div>
  );
};

export default CardDog;
