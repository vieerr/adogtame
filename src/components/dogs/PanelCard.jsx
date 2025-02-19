"use client";
import { useEffect, useState } from "react";
import CardDog from "./CardDog";
import { useSession } from "@/lib/auth-client";

const PanelCard = ({ data, cols }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(session?.user);
  }, [session]);
  const [colsStyle, setColsStyle] = useState("grid-cols-3");

  useEffect(() => {
    setColsStyle(`grid-cols-${cols}`);
  }, [cols]);

  console.log(user?.favorites?.some((fav) => fav._id === data[0]._id));
  console.log(data);
  return (
    <div className="flex justify-center p-4 pt-12">
      <div
        className={`grid grid-cols-1 ${
          cols ? colsStyle : "grid-cols-4"
        } gap-10 w-max items-start`}
      >
        {data.map((dog) => (
          <CardDog
            key={dog._id}
            dog={dog}
            isLiked={user?.favorites?.some((fav) => fav._id === dog._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PanelCard;
