const express = require('express');
const fs = require('fs');
let contenedor = new Contenedor("C:\\Users\\tomas\\Desktop\\CoderHouse\\proyecto 2\\Productos.txt");

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port} usando express`)
})

app.get('/productos', (req, res) => {
    res.send({ mensaje: 'hola mundo' })
});

server.on("error", e => console.log(`Error en servidor ${e}`))