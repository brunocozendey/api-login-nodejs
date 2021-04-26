const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.changeEmail = (req, res) => {
  const filter = { email: req.body.currentMail };
  const update = { email: req.body.newMail };
  User.findOneAndUpdate(filter, update, {
    new: true
  }).exec((err, user) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send({ message: "E-mail alterado com sucesso!" });  
  });
};

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Usuário registrado com sucesso!" });
  });
};

exports.signin = (req, res) => {
  console.log(req.body.email);
  User.findOne({
    email: req.body.email
  })
    .populate("-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado.", user: user});
      }

      if (req.body.password === null) {
        return res.status(404).send({accessToken: null, message: "Senha inválida."});
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Senha inválida"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 horas
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        favcomics:user.favcomics,
        favcaracters: user.favcaracters,
        accessToken: token
      });
    });
};
