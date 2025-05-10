/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // remove field
  collection.fields.removeById("geoPoint1426850242")

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "number1426850242",
    "max": null,
    "min": null,
    "name": "zipcode",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "geoPoint1426850242",
    "name": "zipcode",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "geoPoint"
  }))

  // remove field
  collection.fields.removeById("number1426850242")

  return app.save(collection)
})
