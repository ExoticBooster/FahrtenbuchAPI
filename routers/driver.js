const express = require('express')
const bodyParser = require("body-parser")
const router = express()
const con = require("../database/connection")

//get all
router.get("/", (req, res) => {
  var sql = "SELECT * FROM driver";
  con.query(sql, (err, result) =>
  {
    if(err) res.json(err.sqlMessage)
    else{
      var string = JSON.stringify(result)
      var json = JSON.parse(string)
      console.log(json)
      msg = json;
      res.json(msg)
    }
  });
})

//get with id
router.get("/:id", (req, res) => {
    var sql = "SELECT * FROM driver WHERE id = ?";
    id = req.params.id
  let msg;
  con.query(sql,[id], (err, result) =>
  {
    if(err) res.json(err.sqlMessage)
    else{
      var string = JSON.stringify(result)
      var json = JSON.parse(string)
      console.log(json)
      msg = json;
      res.json(msg)
    }
  });
})

//search driver with email
router.get("/email/:email", (req, res) => {
  var sql = "SELECT * FROM driver WHERE email LIKE ?";
  email = req.params.email
  let msg;
con.query(sql,[email], (err, result) =>
{
  if(err) res.json(err.sqlMessage)
  else{
    var string = JSON.stringify(result)
    var json = JSON.parse(string)
    console.log(json)
    msg = json;
    res.json(msg)
    }
  });
})

//get cars from driver
router.get("/:id/cars", (req, res) => {
  var sql = "SELECT * FROM car_driver WHERE driver = ?";
  id = req.params.id
let msg;
con.query(sql,[id], (err, result) =>
{
  if(err) res.json(err.sqlMessage)
  else{
    console.log("angefragt")
    var string = JSON.stringify(result)
    var json = JSON.parse(string)
    console.log(json)
    msg = json;
    res.json(msg)
  }
});
})

//create driver
router.post("/", (req, res) => {
  var sql = "INSERT INTO driver (surname, lastname, addressID, password, email) VALUES (?)";
  let msg;
  let object = JSON.parse(JSON.stringify(req.body))
  let data = [object["surname"], object["lastname"], object["addressID"], object["password"], object["email"]]
  con.query(sql, [data], (err) =>
  {
    if(err){
      msg = err.message 
    } 
    else msg = "sucsessfully created"
    res.json(msg);
  });
});

//delete driver
router.delete("/:id", (req, res) => {
  var sql = "DELETE FROM driver WHERE id = ?";
  let msg, id = req.params.id ;
  con.query(sql, [id], (err, result) =>
  {
    if(err){
      msg = err.message 
    }
    else{
      if(result.affectedRows == 0){
        res.json({"msg": "es wurde nichts gelöscht"})
        return
      }
      msg = "sucsessfully deleted";
    }
    res.json(msg);
  })
})

//patch driver
router.patch("/:id" , (req, res) => {
  var sql = "UPDATE driver WHERE id = ?";
  let msg, id = req.params.id ;
  con.query(sql, [id, Object.values(req.body)], (err, result) =>
  {
    if(err){
      msg = err.message 
    }
    else{
      if(result.affectedRows == 0){
        res.json({"msg": "es wurde nichts gelöscht"})
        return
      }
      msg = "sucsessfully deleted";
    }
    res.json(msg);
  })
})

module.exports = router;