module.exports = app => {
  const movies = require("../controllers/movie.controller.js");
  
  var bodyParser = require('body-parser')
  var jsonParser = bodyParser.json()
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
     
  app.use(bodyParser.urlencoded({extended: true}))
  
  app.post("/saveMovie",urlencodedParser, movies.create);
         
  app.get("/", movies.findAll);
    
  app.get("/detail/:movieId", movies.findOne);
    
  app.delete("/movies", movies.deleteAll);

  app.get("/addmovie", urlencodedParser, movies.addmovie);

  app.get("/deleteMovie/:movieId", movies.delete);

  app.get("/editMovie/:movieId", movies.editmovie);

  app.post("/saveEdit/:movieId",urlencodedParser, movies.update);
};