"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import DogDetails from "@/components/dogs/DogDetails";

const DetailedPerro = () => {
  const params = useParams();
  const dogId = params.id;

  const { data: dog, isLoading, isError } = useQuery({
    queryKey: ['dog', dogId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/dogs/${dogId}`);
      if (!response.ok) throw new Error('Dog not found');
      return response.json();
    },
    staleTime: 1000 * 60 * 5 // 5 minutes cache
  });

  if (isLoading) return <div className="text-center p-8">Cargando detalles del perro...</div>;
  if (isError) return <div className="text-center p-8 text-error">Error cargando el perro</div>;

  return <DogDetails dog={dog} />;
};

export default DetailedPerro;