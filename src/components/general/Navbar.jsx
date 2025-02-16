"use client";

import Image from "next/image";
import UserIcon from "./UserIcon";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { user } from "@/db";

const userAuthenticated = () => {
  //Method to check if the user has Logged in
  //store in "current user" variable all the user data
  //Example:
  const currentUser = user;

  //Return the object to be used in the component
  if (Object.keys(currentUser).length === 0) {
    return [false, {}];
  } else {
    const userInfo = {
      pfp: currentUser.pfp,
      type: currentUser.type,
    };
    return [true, userInfo];
  }
};

const Navbar = () => {
  const [profileVisible, userInfo] = userAuthenticated();

  return (
    <div className="navbar fixed z-10 bg-base-100 shadow-primary shadow-sm">
      <div className="flex-1">
        <Link href="/">
          <Image src="/logo.png" width={250} height={80} alt="ADOGTAME logo" />
        </Link>
      </div>
      <div className="flex-none">
        {profileVisible ? (
          <div className="flex items-center space-x-4 gap-10">
            <Link href={"/perros/add-dog"} className="btn btn-secondary btn-lg text-xl">
              Agregar Perro
            </Link>
            <UserIcon userInfo={userInfo} />
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
