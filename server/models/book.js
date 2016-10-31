import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
mongoose.connect('mongodb://localhost/ebangla');
var db = mongoose.connection;

// Book Schema
var BookSchema = mongoose.Schema({
	name: {type: String, index: true},
	category: {type: String},
	publication: {type: String},
	writer: {type: String},
	price: {type: String},
	release_date: {type: String},
	edition: {type: String}
},
{
    timestamps: true
});

var Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	});
}

module.exports.getAllBook = function(orderField, order, callback){
	Book.find(callback);
};

module.exports.getBookById = function(id, callback){
	Book.findById(id, callback);
}

module.exports.getBookByBookname = function(name, callback){
	var query = {name: name};
	Book.findOne(query, callback);
}

module.exports.getBookByEmail = function(email, callback){
	var query = {email: email};
	Book.findOne(query, callback);
}

module.exports.createBook = function(newBook, callback) {
	// Create 
	newBook.save(callback);
}

module.exports.updateBook = function(id, newBook, callback) {
	if(newBook.password != ''){
		bcrypt.hash(newBook.password, 10, function(err, hash){
			if(err) throw err;
			// set hashed pw
			newBook.password = hash;
			// Update 
			var upsertData = newBook.toObject();
			// Delete Book
			delete upsertData._id;
			// Update Book
			Book.update({ _id: id }, upsertData, { multi: false }, callback);
		});
	}else{
		var upsertData = newBook.toObject();
		// Delete Book
		delete upsertData._id;
		// Update Book
		Book.update({ _id: id }, upsertData, { multi: false }, callback);
	}
}