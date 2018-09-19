const handleSignIn = (db,bcrypt) => (req,res) => {
  db.select('email','hash').from('login')
  .where('email','=',req.body.email)
  .then(data => {
      console.log(req.body.email);
      const isValid = bcrypt.compareSync(req.body.password,data[0].hash)
      if(isValid) {
        return db.select('*').from('users')
          .where('email','=',req.body.email)
          .then(user => {
              res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      }else {
        res.status(400).json('wrong credentials - level 1')
      }
    })
    .catch(err => res.status(400).json('wrong credentials - level 2'))
}

module.exports = {
  handleSignIn
}