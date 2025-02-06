const RouteCard = ({ data }) => {
  return (
    <div className="cursor-pointer hover:bg-primary hover:text-primary-content card bg-primary-content transition text-primary w-96 h-32 flex justify-center items-center shadow-xl">
      <figure>{data.icon}</figure>
      <h2 className="card-title ">{data.title}</h2>
    </div>
  );
};

export default RouteCard;
