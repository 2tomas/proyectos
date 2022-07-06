const fs = require('fs');

const express = require('express');
const app = express();
const PORT = 8080;
const url = "\Productos.txt";



const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port} usando express`);
})
     
app.get('/productos', (req, res) => {
    fs.readFile(url, "utf-8", (error, data) => {
        if(error){
            throw new Error("hubo un error: ", error);
        }
        res.send(JSON.parse(data))
    })
});

app.get('/productoRandom', (req, res) => {
    const min = Math.ceil(1);
    const max = Math.floor(3);
    let numberRandom = Math.floor((Math.random() * (max - min + 1)) + min);

    fs.readFile(url, "utf-8", (error, data) => {
        if(error){
            throw new Error("hubo un error: ", error);
        }

        let noEncontroId = 0; //verificacion si no hay id
        let productos = JSON.parse(data);

        productos.forEach(producto => {
            if(producto.id == numberRandom){
                noEncontroId = 1; //encontro una id entonces cambia la variable para que no pase en el proximo if
                res.send(producto);
            }
        });

        if (noEncontroId == 0) { 
            console.log("no hay una id ")
        }
    })
});
     
server.on("error", e => console.log(`Error en servidor ${e}`))