import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import moment from "moment";

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/toggle-favorite/${userId}`,

        {
          _id: dog._id,
          name: dog.name,
          pfp: dog.pfp,
          location: dog.location,
        }
      );
      return response.data;
    },
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

  const calculateAge = (birthDate) => {
    return moment().diff(moment(birthDate), "years");
  };

  return (
    <div className="card card-compact bg-white w-64 shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-gray-200 hover:border-blue-500 rounded-lg overflow-hidden">
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
      <div className="card-body p-4">
        <div className="flex items-center gap-2 w-full">
          <Link
            href={`/perros/${dog._id}`}
            className="card-title text-blue-600 font-semibold text-lg"
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
        <p className="text-md text-gray-500 ">{dog.location} - {calculateAge(dog.birth_date)} años</p>
      </div>
    </div>
  );
};

export default CardDog;
