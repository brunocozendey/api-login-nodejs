const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken],
    controller.adminBoard
  );

  app.get(
    "/api/user/config/:id",
    [authJwt.verifyToken],
    controller.adminBoard
  );

  app.post("/user/comics",
  [authJwt.verifyToken],
  controller.addComic
  );

  app.get("/user/comics",
  [authJwt.verifyToken],
  controller.listComic
  );

  app.post("/user/comics",
  [authJwt.verifyToken],
  controller.addComic
  );

  app.delete("/user/comics",
  [authJwt.verifyToken],
  controller.delComic
  );

  app.get("/user/characters",
  [authJwt.verifyToken],
  controller.listCharacter
  );

  app.post("/user/characters",
  [authJwt.verifyToken],
  controller.addCharacter
  );

  app.delete("/user/characters",
  [authJwt.verifyToken],
  controller.delCharacter
  );

};
