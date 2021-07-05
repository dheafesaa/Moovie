const Movie = require("../models/movie.model.js");
const path = require("path");

// Create and Save a new Movie
exports.create = (req, res) => {
    console.log("body",req.body);
        const movie = new Movie({
            judul: req.body.judul,
            rilis: req.body.rilis,
            durasi: req.body.durasi,
            genre: req.body.genre,
            sutradara: req.body.sutradara,
            pemain: req.body.pemain,
            deskripsi: req.body.deskripsi,
            foto: req.body.foto,
            rating: req.body.rating
        });
        
        Movie.create(movie, (err, data) => {
            if (err) res.status(500).send({
                message:
                        err.message || "Some error occurred while creating the Movie."
        }); else res.redirect('/');
    });
};

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
    Movie.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving movies."
            });
        // else res.send(data);
        else res.render("index", data);
    });
};

// Find a single Movie with a movieId
exports.findOne = (req, res) => {
    Movie.findById(req.params.movieId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Movie with id ${req.params.movieId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Movie with id " + req.params.movieId
                });
            }
        } else res.render("detail", data);
    });
};

// Update a Movie identified by the movieId in the request
exports.update = (req, res) => {
     // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        }); 
    }
    
    const movie = new Movie({
        judul: req.body.judul,
        rilis: req.body.rilis,
        durasi: req.body.durasi,
        genre: req.body.genre,
        sutradara: req.body.sutradara,
        pemain: req.body.pemain,
        deskripsi: req.body.deskripsi,
        foto: req.body.foto,
        rating: req.body.rating
    });
    
    Movie.updateById( req.params.movieId, movie, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Movie with id_movie ${req.params.movieId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Movie with id_movie " + req.params.movieId
                });
            }
        } else res.redirect('/');
    }); 
};

// Delete a Movie with the specified movieId in the request
exports.delete = (req, res) => {
    Movie.remove(req.params.movieId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Movie with id ${req.params.movieId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Movie with id " + req.params.movieId
                });
            }
        } else res.redirect('/');
    });
};

// Delete all Movies from the database.
exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
                err.message || "Some error occurred while removing all movies."
        });
        else res.send({ message: `All Movies were deleted successfully!` });
    });
};

exports.addmovie = (req, res) => {
    res.render("addmovie");
};

exports.editmovie = (req, res) => {
    Movie.findById(req.params.movieId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Movie with id ${req.params.movieId}.`
            });
        } else {
            res.status(500).send({
                message: "Error retrieving Movie with id " + req.params.movieId
            });
          }
        } else res.render("editmovie", data);
    });
};