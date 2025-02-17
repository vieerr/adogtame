"use client";
import QueryProvider from "@/components/providers/QueryProvider";

const SignUpLayout = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default SignUpLayout;
