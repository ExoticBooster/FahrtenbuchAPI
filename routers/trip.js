const express = require('express')
const bodyParser = require("body-parser")
const router = express()
const con = require("../database/connection")

//get all
router.get("/", (req, res) => {
  var sql = "SELECT * FROM trip";
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
    var sql = "SELECT * FROM trip WHERE id = ?";
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
//( departureAddress int id. deüarture Date String, start-Milage int, end Milage, destination int id, driver int id)
router.post("/", (req, res) => {
  var sql = "INSERT INTO trip (car, departureAddress, departureDate, start_Mileage, end_Mileage, destination, driver) VALUES (?)";
  let msg;
  let object = JSON.parse(JSON.stringify(req.body))
  let data = [object["car"], object["departureAddress"], object["departureDate"], object["start_Mileage"], object["end_Mileage"], object["destination"], object["driver"]]
  con.query(sql, [data], (err) =>
  {
    if(err){
      msg = err.message 
    } 
    else msg = "sucsessfully created"
    res.json(msg);
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