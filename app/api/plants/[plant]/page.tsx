// src/app/plants/[plant]/page.tsx
import { useParams } from 'next/navigation';

export default function PlantPage() {
    const params = useParams();
    const plant = params.plant;
  
    return (
      <div>
        <h1>Plant: {plant}</h1>
      </div>
    );
  }