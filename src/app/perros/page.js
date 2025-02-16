"use client";

import DogFilter from "@/components/dogs/DogFilter";
import QueryProvider from "@/components/providers/QueryProvider";
const Perros = () => {
  return (
    <QueryProvider>
      <DogFilter />
    </QueryProvider>
  );
};

export default Perros;
