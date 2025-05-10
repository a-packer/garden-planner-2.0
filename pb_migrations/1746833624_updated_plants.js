/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2461901144")

  // remove field
  collection.fields.removeById("number3018329375")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2461901144")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number3018329375",
    "max": null,
    "min": null,
    "name": "weeks_to_grow",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
