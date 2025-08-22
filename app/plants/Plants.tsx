import Link from 'next/link';
import pb from '@/lib/pb';

type Plant = {
  id: string;
  species: string;
};

const Plants = async () => {
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