const router = require("express").Router(),
    subscribersController = require("../controllers/subscribersController")
    usersController = require("../controllers/usersController")

router.get("/", subscribersController.index, subscribersController.indexView);
router.get("/new", subscribersController.new);
router.post("/create", usersController.validate, subscribersController.create, subscribersController.redirectView);

router.get("/:id", subscribersController.show, subscribersController.showView);
router.get("/:id/edit", subscribersController.edit);
router.put("/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/:id/delete", subscribersController.delete, subscribersController.redirectView);

module.exports = router;