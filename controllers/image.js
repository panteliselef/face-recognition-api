const Clarifai = require('clarifai');

const clarifaiApp = new Clarifai.App({
    apiKey: 'fcf0323c53af42719de1f3016eba2b21'
});

const handleApiCall = (req,res) => {
    clarifaiApp.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('unable to work with Claifai API'))
}
const handleImage = (req,res,db) => {
  const {id} = req.body;
  db('users').where('id', '=' ,id)
  .increment('entries',1)
  .returning('entries')
  .then(entries => res.json(entries[0]))
  .catch(error => res.status(400).json('unable to get entries'));
}

module.exports = {
  handleImage,
  handleApiCall
}