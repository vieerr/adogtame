import Link from "next/link";

const RouteCard = ({ data }) => {
  return (
    <Link
      className="cursor-pointer hover:bg-primary hover:text-primary-content card bg-primary-content transition text-primary w-96 h-32 flex justify-center items-center shadow-xl"
      href={data.route}
    >
      <div>
        <figure>{data.icon}</figure>
        <h2 className="card-title ">{data.title}</h2>
      </div>
    </Link>
  );
};
export default RouteCard;
