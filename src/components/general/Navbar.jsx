import Image from "next/image";
import UserIcon from "./UserIcon";

const userAuthenticated = () => {
  //Method to check if the user has Logged in
  //store in "current user" variable all the user data
  //Example:
  const currentUser = {
    userId:123,
    profilePicture: "/profile_pic_dummy.webp",
    type:"rescuer"
    //type:"shelter"
    //More data from the DB
  }

  //Return the object to be used in the component
  if(Object.keys(currentUser).length === 0){
    return [false, {}];
  }else{
    const userInfo = {
      profilePicture: currentUser.profilePicture,
      type: currentUser.type
    }
    return [true, userInfo];
  }
}


const Navbar = () => {
  const [profileVisible,userInfo] = userAuthenticated();

  return (
    <div className="navbar bg-base-100 border-b-[.5rem] border-b-[#356aae]">
      <div className="flex-1">
        <Image 
          src="/logo.png"
          width={250}
          height={80}
          alt="ADOGTAME logo"
        />
      </div>
      <div className="flex-none">
        {profileVisible ? (
          <UserIcon userInfo={userInfo}/>
        ):(
          <div tabIndex={0} role="button" className="btn btn-ghost bg-[#356aae] text-white hover:bg-[#284f83]">
            <div className=" text-xs rounded-full">
              REGISTER
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
