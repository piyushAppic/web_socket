const express = require('express');
const app = express();
const path = require("path")

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname,'/public/views'))

app.get("/", function(req, res) {
	// res.send("Welcome to chat app!");
    res.render("index")
});

server = app.listen(3000, (err, conn) => {
    console.log(`connection is created successfully on port {3000}`)
});


const io = require("socket.io")(server);
io.on('connection', (socket)=> {
    console.log("New user connected");	

    socket.username="xyz";

    socket.on('change_username', (data)=> {
        socket.username = data.username;
    });

    socket.on('new_message', (data)=> {
        io.sockets.emit('new_message', {
            message : data.message,
            username : socket.username
        });
    });
});
