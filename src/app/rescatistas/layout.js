"use client";
import React from "react";
import QueryProvider from "@/components/providers/QueryProvider";

const RescuerLayout = ({ children }) => {
  return (
    <QueryProvider>
      <div>{children}</div>
    </QueryProvider>
  );
};

export default RescuerLayout;
