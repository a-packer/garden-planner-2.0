/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2461901144")

  // remove field
  collection.fields.removeById("date1105570834")

  // remove field
  collection.fields.removeById("date2812346559")

  // remove field
  collection.fields.removeById("date3844256858")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number700515441",
    "max": null,
    "min": null,
    "name": "rel_weeks_inside",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number1584919663",
    "max": null,
    "min": null,
    "name": "rel_weeks_outside",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number17901882",
    "max": null,
    "min": null,
    "name": "weeks_total_growth",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2461901144")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "date1105570834",
    "max": "",
    "min": "",
    "name": "indoor_start",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date2812346559",
    "max": "",
    "min": "",
    "name": "dir_sow",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "date3844256858",
    "max": "",
    "min": "",
    "name": "transplant",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // remove field
  collection.fields.removeById("number700515441")

  // remove field
  collection.fields.removeById("number1584919663")

  // remove field
  collection.fields.removeById("number17901882")

  return app.save(collection)
})
