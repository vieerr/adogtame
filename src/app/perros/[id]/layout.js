"use client";
import React from "react";
import QueryProvider from "@/components/providers/QueryProvider";

const Layout = ({ children }) => {
  return (
    <QueryProvider>
      <div>{children}</div>
    </QueryProvider>
  );
};

export default Layout;
