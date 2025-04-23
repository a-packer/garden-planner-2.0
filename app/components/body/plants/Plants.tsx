import React from 'react';
import Link from 'next/link';

const Plants = () => {

    const plants = [
        {id: 1, name: 'tomato'},
        {id: 2, name: 'broccoli'},
        {id: 3, name: 'lettuce'}
    ]

  return (
    <div>
        <h1>Plants List</h1>
        <ul>
            {plants.map(plant => {
                return <li><Link href={`/plants/${plant.id}`}>{plant.name}</Link></li>
            })}
        </ul>
    </div>
  )
}

export default Plants