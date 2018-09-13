const express = require('express');
const app = express();
app.use(express.static(__dirname + '/static'));
var path = require('path');
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
var session = require('express-session');

const server = app.listen(8000);
const io = require('socket.io')(server);

app.get('/', function(req, res){
	res.render('index')
});

io.on('connection', function(socket){
	socket.on('initial', function(data){
		var username = data.username;
		if(username == null || username == ''){
			username = 'Guest';
		}
		var entrance = (' has entered the group chat!')
		console.log('Server received username');
		console.log(data);
		io.emit('enter', {username: username, entrance:entrance})
	})
	socket.on('add', function(data){
		var username = data.username;
		if(username == null || username == ''){
			username = 'Guest';
		}
		var message = data.message;
		console.log('server received message post request');
		console.log(data);
		io.emit('posting', {username: username, message:message});
		console.log('posted data to page');
	})
})