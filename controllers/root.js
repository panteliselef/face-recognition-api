const getAllUser = (db) => (req,res)=> {
  db.select('*').from('users')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(400).json("can't get users"))
}


module.exports = {
  getAllUser
}