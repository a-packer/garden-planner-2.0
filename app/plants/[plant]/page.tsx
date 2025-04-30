import React from 'react'

async function getPlant(plantId: string) {
    const res = await fetch(`url/${plantId}`)
    const data = await res.json();
    return data
}

export default async function Plant({params}: any) {

    const plant = await getPlant(params.id);  

    return (
      <div>
        <h1>{plant.name}</h1>
      </div>
   )
}