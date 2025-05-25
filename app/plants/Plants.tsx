import PocketBase from 'pocketbase';
import Link from 'next/link';

type Plant = {
  id: string;
  species: string;
};

const Plants = async () => {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const data = await pb.collection('plants').getList(1, 50);
  const plants = data?.items || {} as Plant[];

  return (
    <>
      <h1>Plants List</h1>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            <Link href={`/plants/${plant.id}`}>{plant.species}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Plants;