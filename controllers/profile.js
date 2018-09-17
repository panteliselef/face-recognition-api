const handleProfileGet = (db) => (req,res)=> {
  const {id} = req.params;
  db.select('*').from('users').where({id:id})
    .then(user => { // user in this case is an Array not an Object
      if(user.length>=1) {
        res.json(user[0]);
      }else {
        res.status(400).json('error getting user');
      }
    })
}

module.exports = {
  handleProfileGet
}