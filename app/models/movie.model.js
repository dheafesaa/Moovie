const sql = require("./db.js");

// constructor
const Movie = function(movie) {
  this.judul = movie.judul;
  this.rilis = movie.rilis;
  this.durasi = movie.durasi;
  this.genre = movie.genre;
  this.sutradara = movie.sutradara;
  this.pemain = movie.pemain;
  this.deskripsi = movie.deskripsi;
  this.foto = movie.foto;
  this.rating = movie.rating;
};

Movie.create = (newmovie, result) => {
  var judul = newmovie.judul + '';
  var rilis = newmovie.rilis + '';
  var durasi = newmovie.durasi + '';
  var genre = newmovie.genre + '';
  var sutradara = newmovie.sutradara + '';
  var pemain = newmovie.pemain + '';
  var deskripsi = newmovie.deskripsi + '';
  var foto = newmovie.foto + '';
  var rating = newmovie.rating + ''; 
  sql.query("INSERT INTO tmovies ( `judul` , `rilis` , `durasi` ,`genre` , `sutradara` ,`pemain` ,`deskripsi` , `foto`  , "
  + " `rating`) values (?,?,?,?,?,?,?,?,?) ",[judul, rilis, durasi, genre, sutradara, pemain, deskripsi, foto, rating],(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created movie: ", { id_movie: res.insertId_movie, ...newmovie });
    result(null, { id_movie: res.insertId_movie, ...newmovie });
  });
};

Movie.findById = (movieId, result) => {
  console.log("ini nih  ",movieId);
  sql.query(`SELECT * FROM tmovies WHERE id_movie = ${movieId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      var string=JSON.stringify(res);
      obj = {movie: string};
    
      result(null, obj);
      return;
    }
    // not found Movie with the id
    result({ kind: "not_found" }, null);
  });
};

Movie.getAll = result => {
  sql.query("SELECT * FROM tmovies", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    var string=JSON.stringify(res);
    obj = {movie: string};
    console.log("tmovies: ", obj);
    result(null, obj);
  });
};

Movie.updateById = (id_movie,newmovie, result) => {
  var judul = newmovie.judul + '';
  var rilis = newmovie.rilis + '';
  var durasi = newmovie.durasi + '';
  var genre = newmovie.genre + '';
  var sutradara = newmovie.sutradara + '';
  var pemain = newmovie.pemain + '';
  var deskripsi = newmovie.deskripsi + '';
  var foto = newmovie.foto + '';
  var rating = newmovie.rating + ''; 

  sql.query(
    "UPDATE tmovies SET judul = ?, rilis = ?, durasi = ?, genre = ?, sutradara = ?, pemain = ?, deskripsi = ?, foto = ?, rating = ? WHERE id_movie = ?",
    [judul, rilis, durasi, genre, sutradara, pemain, deskripsi, foto, rating, id_movie],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
         result(null, err);
         return;
      }
      if (res.affectedRows == 0) {
        // not found Movie with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { "id_movie": id_movie, "status":"updated"});
      return;
    }
  );
};

Movie.remove = (id_movie, result) => {
  sql.query("DELETE FROM tmovies WHERE id_movie = ?", id_movie, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted movie with id: ", id_movie);
    result(null, res);
  });
};

Movie.removeAll = result => {
  sql.query("DELETE FROM tmovies", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} tmovies`);
    result(null, res);
  });
};

module.exports = Movie;