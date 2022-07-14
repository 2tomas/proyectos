const express = require("express");
const app = express();
const fs = require("fs");
const { resolve } = require("path");
const { Router } = express;




const router = Router();
const path = require('path')

const pathFin = (archivo) => {
    return path.join(__dirname, archivo)
}

class Contenedor {

    constructor(archivo) {
        this.archivo = archivo
        this.id = 1
        this.read = null
        this.products = []
        this.random = {}

        router.get('/', this.getAll);
        router.get('/:id', this.getById);
        router.post('/', this.save);
        router.put('/:id', this.updateProduct);
        router.delete('/:id', this.deleteById);
    }
    
    save(req, res) {
        let product = req.body.product

        if(product){
            fs.readFile(this.url, "utf-8", (error, data) => {
                if(error){
                    throw new Error("hubo un error: ", error);
                }  
    
                try{
                    let productos = JSON.parse(data);
                    const newList = [];
    
                    const lastItem = productos[productos.length-1];
                    id = lastItem.id;
                    id++;
                    const idObject = {id};
                    const objectProducto = Object.assign(producto, idObject);
                    
                    productos.forEach(producto => {
                        newList.push(producto);
                    });
    
                    newList.push(objectProducto)
    
                    fs.writeFile(this.url, String(JSON.stringify(newList)),  (error) =>{
                        if(error)  {
                            throw new Error("hubo un error: ", error);
                        }
                        res.status(201).send("el producto se guardo correctamente")
                    })
    
                } catch(error){
                    const idObject = {id};
                    const objectProducto = Object.assign(producto, idObject);
    
                    listOfProductos.push(objectProducto);
    
                    fs.writeFile(this.url, String(JSON.stringify(listOfProductos)),  (error) =>{
                        if(error)  {
                            throw new Error("hubo un error: ", error);
                        }
                        res.status(201).send("el producto se guardo correctamente")
                    })
                }
            }) 
        }
    }

    getAll(req, res) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.url, "utf-8", (error, data) => {
                if(error){
                    throw new Error("hubo un error: ", error);
                }

                let productos = JSON.parse(data);
                console.log(productos);
                res.status(201).send(this.products);
            })
        }) 
    }

    updateProduct(req, res) {
        const { id } = req.params;
        const productModify = req.body;
    
        if (id >= 1 && id <= this.productos.length) {
        const saveProduct = { ...productModify, id: parseInt(id) };
        productos.splice(id - 1, 1, saveProduct);
        res.status(201).send(saveProduct);
        } else {
        res.status(400).send({ error: 'producto no encontrado' });
        }
    }

    getById(req, res) {
        const id = req.params.id

        return new Promise ((resolve, reject) => {
            fs.readFile(this.url, "utf-8", (error, data) => {
                if(error){
                    throw new Error("hubo un error: ", error);
                }
    
                let noEncontroId = 0; //verificacion si no hay id
                let productos = JSON.parse(data);
    
                productos.forEach(producto => {
                    if(producto.id == id){
                        noEncontroId = 1; //encontro una id entonces cambia la variable para que no pase en el proximo if
                        console.log(producto);
                        resolve("ok")
                        res.status(201).send(this.random);
                    }
                });
    
                if (noEncontroId == 0) { 
                    console.log("no hay una id ")
                }
            })
        }) 
    }

    async deleteById(res, req) {
        const id = req.params.id

        fs.readFile(this.url, "utf-8", (error, data) => {
            if(error){
                throw new Error("hubo un error: ", error);
            }

            let productos = JSON.parse(data);
            let listOfProducts = []

            productos.forEach(producto => {
                if(producto.id != id){
                    listOfProducts.push(producto);
                }
            });
            res.status(201).send(product)
            fs.writeFile(this.url, String(JSON.stringify(listOfProducts)),  (error) =>{
                if(error)  {
                    throw new Error("hubo un error: ", error);
                }
            })
        })
    }

    deleteAll() {
        fs.writeFile(this.url,"",  (error) =>{
            if(error)  {
                throw new Error("hubo un error: ", error);
            }
        })
    }
}

const productos = new Contenedor("C:\\Users\\tomas\\Desktop\\CoderHouse\\proyecto 4\\Productos.txt")

module.exports = router;