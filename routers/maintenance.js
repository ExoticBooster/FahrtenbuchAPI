const express = require('express')
const bodyParser = require("body-parser")
const router = express()
const con = require("../database/connection")

//get all
router.get("/", (req, res) => {
  var sql = "SELECT * FROM maintenance";
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
    var sql = "SELECT * FROM maintenance WHERE id = ?";
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

//create
router.post("/", (req, res) => {
  var sql = "INSERT INTO maintenance (car, address, reason, start_date, end_date, cost) VALUES (?)";
  let msg;
  let object = JSON.parse(JSON.stringify(req.body))
  let data = [object["car"], object["address"], object["reason"], object["start_date"], object["end_date"], object["cost"]]
  con.query(sql, [data], (err) =>
  {
    if(err){
      msg = err.message 
    } 
    else msg = "sucsessfully created"
    res.json(msg);
    console.log("maintenance: " + msg)
  });
});

//delete
router.delete("/:id", (req, res) => {
  var sql = "DELETE FROM trip WHERE id = ?";
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
      console.log("hallo")
    }
    res.json(msg);
  })
})

//patch
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