const { json } = require("body-parser");
const jwt = require('jsonwebtoken')
const config = require("../config/auth.config.js");

const db = require("../models");
const User = db.user;

const toggleInArray = require('toggle-in-array');

exports.listComic = (req, res) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Não autorizado!" });
    }  
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user){
        return res.status(401).send({ message: "Usuário não encontrado!" });
      }
      res.status(200).send({comics:user.favcomics});
    });
  });
}

exports.addComic = (req, res) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Não autorizado!" });
      }  
      User.findById(req.userId).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user){
          return res.status(401).send({ message: "Usuário não encontrado!" });
        }
        if (!user.favcomics.includes(req.body.comicid)){
          console.log("Adiciona usuário")
          user.favcomics.push(req.body.comicid)
        }
        user.save();
        res.status(200).send({comics:user.favcomics});
      });
    });
}

exports.delComic = (req, res) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Não autorizado!" });
    }  
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user){
        return res.status(401).send({ message: "Usuário não encontrado!" });
      }

      if (user.favcomics.includes(req.body.comicid)){
        console.log("Delete teste")
        user.favcomics = toggleInArray(user.favcomics, req.body.comicid);
        console.log(user.favcomics)
      }
      user.save();
      res.status(200).send({comics:user.favcomics});
    });
  });
}

exports.listCharacter = (req, res) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Não autorizado!" });
    }  
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user){
        return res.status(401).send({ message: "Usuário não encontrado!" });
      }
      res.status(200).send({favcharacter:user.favcharacters});
    });
  });
}

exports.addCharacter = (req, res) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Não autorizado!" });
    }  
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user){
        return res.status(401).send({ message: "Usuário não encontrado!" });
      }
      if (!user.favcharacters.includes(req.body.characterid)){
        user.favcharacters.push(req.body.characterid)
      }
      user.save();
      res.status(200).send({character:user.favcharacters});
    });
  });
}

exports.delCharacter = (req, res) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Não autorizado!" });
    }  
    User.findById(res.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user){
        return res.status(401).send({ message: "Usuário não encontrado!" });
      }
      if (user.favcharacters.includes(req.body.characterid)){
        user.favcharacters = toggleInArray(user.favcharacters, req.body.characterid);
      }
      user.save();
      res.status(200).send({Characters:user.favcharacters});
    });
  });
}