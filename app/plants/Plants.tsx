import React from 'react';
import Link from 'next/link';
import {Plant} from '../types';
import PocketBase from 'pocketbase';

const Plants = async () => {

    const  getPlants = async () => {
        const pb = new PocketBase('http://127.0.0.1:8090');
        const data = await pb.collection('plants').getList(1, 50);
        return data?.items as any[];
    }

    const plants = await getPlants();
    console.log(plants)

  return (
    <>
        <h1>Plants List</h1>
        <ul>
            {plants?.map((plant: Plant) => {
                return <li  key={plant.id}><Link href={`/plants/${plant.id}`}>{plant.species}</Link></li>
            })}
        </ul>
    </>
  )
}

export default Plants