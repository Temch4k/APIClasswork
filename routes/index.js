const router = require("express").Router(),
userRoutes = require("./userRoutes"),
subscriberRoutes = require("./subscriberRoutes"),
courseRoutes = require("./courseRoutes"),
homeRoutes = require("./homeRoutes"),
errorRoutes = require("./errorRoutes"),
apiRoutes = require("./apiRoutes");

router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/api", apiRoutes)
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;