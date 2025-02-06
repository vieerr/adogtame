import DogDetails from "@/components/dogs/DogDetails";
import { dogs } from "@/db";

const DetailedPerro = async ({params}) => {
  const id = (await params).id;

  const data = dogs.filter(dog => dog.id == id);

  console.log(data);
  console.log(id);

  return <DogDetails dog={data[0]} /> 
};

export default DetailedPerro;
