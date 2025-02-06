import { PiDogFill } from "react-icons/pi";
import { GiDogHouse } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import RouteCard from "./RouteCard";
const Home = () => {
  const options = [
    {
      id: 1,
      title: "Perros",
      icon: <PiDogFill size={65} />,
      route: "perros",
    },
    {
      id: 2,
      title: "Rescatistas",
      icon: <FaHandsHelping size={65} />,
      route: "rescatistas",
    },
    {
      id: 3,
      title: "Perreras",
      icon: <GiDogHouse size={65} />,
      route: "perreras",
    },
  ];

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/homepageBanner.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center ">
        <div className="max-w-md">
          <h1 className="mb-14 text-5xl font-bold">
            Tu mejor amigo te está esperando!
          </h1>
          <div className="flex gap-7">
            {options.map((option) => {
              return <RouteCard data={option} key={option.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
