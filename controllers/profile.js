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

const handleProfilePut = (db) => (req,res) => {
  const {id,name} = req.body;
  db('users').where('id',id).update({name:name}).returning('name')
    .then(name => {
      if(name.length>=1) {
        res.json(name[0])
      }else {
        res.status(400).json('cannot update name')
      }
    })
    .catch(err => res.status(400).json("somethin went wrong"));
}

module.exports = {
  handleProfileGet,
  handleProfilePut
}