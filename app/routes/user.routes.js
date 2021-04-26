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

  app.put("/user/comics",
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

  app.put("/user/characters",
  [authJwt.verifyToken],
  controller.delCharacter
  );

};
