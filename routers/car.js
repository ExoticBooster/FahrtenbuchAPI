const express = require('express')
const bodyParser = require("body-parser")
const router = express()
const con = require("../database/connection")

//get all
router.get("/", (req, res) => {
  var sql = "SELECT * FROM car";
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
    var sql = "SELECT * FROM car WHERE id = ?";
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

//get driver from car
router.get("/:id/drivers", (req, res) => {
  var sql = "SELECT * FROM car_driver WHERE driver = ?";
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

//get trips from car
router.get("/:id/trips", (req, res) => {
  var sql = "SELECT * FROM trip WHERE car = ?";
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

//get maintanence from car
router.get("/:id/maintenance", (req, res) => {
  var sql = "select * from maintenance where car = ?";
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

//create car
router.post("/", (req, res) => {
  var sql = "INSERT INTO car (numberplate, model, milage) VALUES (?)";
  let msg;
  let object = JSON.parse(JSON.stringify(req.body))
  let data = [object["numberplate"], object["model"], object["milage"]]
  con.query(sql, [data], (err) =>
  {
    if(err){
      msg = err.message 
    } 
    else msg = "sucsessfully created"
    res.json(msg);
  });
});

//delete car
router.delete("/:id", (req, res) => {
  var sql = "DELETE FROM car WHERE id = ?";
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
  var sql = "UPDATE car WHERE id = ?";
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