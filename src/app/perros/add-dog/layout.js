"use client";
import QueryProvider from "@/components/providers/QueryProvider";
const AddDogLayout = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default AddDogLayout;
