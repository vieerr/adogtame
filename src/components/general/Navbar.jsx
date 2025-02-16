"use client";

import Image from "next/image";
import UserIcon from "./UserIcon";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { user } from "@/db";
import { useSession } from "@/lib/auth-client";




const Navbar = () => {
    const {
      data: session,
    } = useSession();
    console.log(session)

  return (
    <div className="navbar fixed z-10 bg-base-100 shadow-primary shadow-sm">
      <div className="flex-1">
        <Link href="/">
          <Image src="/logo.png" width={250} height={80} alt="ADOGTAME logo" />
        </Link>
      </div>
      <div className="flex-none">
        {session ? (
          <div className="flex items-center space-x-4 gap-10">
            <Link href={"/perros/add-dog"} className="btn btn-secondary btn-lg text-xl">
              Agregar Perro
            </Link>
            <UserIcon userInfo={session.user} />
          </div>
        ) : (
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost bg-[#356aae] text-white hover:bg-[#284f83]"
          >
            <div className=" text-xs rounded-full">REGISTER</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
