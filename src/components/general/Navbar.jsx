"use client";

import Image from "next/image";
import UserIcon from "./UserIcon";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar fixed z-10 bg-base-100 shadow-md border-b border-base-200">
      {/* Left Section - Logo */}
      <div className="flex-1">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            width={200}
            height={64}
            alt="ADOGTAME logo"
            className="h-16 w-auto"
          />
        </Link>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="flex-none hidden lg:flex">
        <ul className="menu menu-horizontal gap-4 px-1">
          <li>
            <Link
              href="/perros"
              className="text-lg font-medium text-neutral-600 hover:text-primary focus:outline-none focus:text-primary-focus transition-colors duration-200"
            >
              Perros
            </Link>
          </li>
          <li>
            <Link
              href="/rescatistas"
              className="text-lg font-medium text-neutral-600 hover:text-primary focus:outline-none focus:text-primary-focus transition-colors duration-200"
            >
              Rescatistas
            </Link>
          </li>
          <li>
            <Link
              href="/refugios"
              className="text-lg font-medium text-neutral-600 hover:text-primary focus:outline-none focus:text-primary-focus transition-colors duration-200"
            >
              Refugios
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Section - Auth Controls */}
      <div className="flex-none gap-4">
        {session ? (
          <div className="flex items-center gap-4">
            <Link
              href="/perros/add-dog"
              className="btn btn-primary btn-sm md:btn-md hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary-focus"
            >
              + Agregar Perro
            </Link>
            <UserIcon userInfo={session.user} />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/user/sign-in"
              className="btn btn-primary btn-sm md:btn-md hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary-focus"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/user/sign-up"
              className="btn btn-secondary btn-sm md:btn-md hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-secondary-focus"
            >
              Crear cuenta
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;