const fs = require('fs');
const { json } = require('stream/consumers');
let listOfProductos = [];
let id = 1;

class Contenedor {
    constructor(url){
        this.url = url
    }
    
    save = (producto) => {        
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
                })

            } catch(error){
                const idObject = {id};
                const objectProducto = Object.assign(producto, idObject);

                listOfProductos.push(objectProducto);

                fs.writeFile(this.url, String(JSON.stringify(listOfProductos)),  (error) =>{
                    if(error)  {
                        throw new Error("hubo un error: ", error);
                    }
                })
            }
        })

        return id;
    }

    getById = (id) => {
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
                }
            });

            if (noEncontroId == 0) { 
                console.log("no hay una id ")
            }
        }
    )}

    getAll = () => {
        fs.readFile(this.url, "utf-8", (error, data) => {
            if(error){
                throw new Error("hubo un error: ", error);
            }

            let productos = JSON.parse(data);
            console.log(productos);
        })
    }


    deleteById = (id) => {
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

            fs.writeFile(this.url, String(JSON.stringify(listOfProducts)),  (error) =>{
                if(error)  {
                    throw new Error("hubo un error: ", error);
                }
            })
        })
    }

    deleteAll = () => {
        fs.writeFile(this.url,"",  (error) =>{
            if(error)  {
                throw new Error("hubo un error: ", error);
            }
        })
    }


}

let producto = 
{
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3
}

let contenedor = new Contenedor("C:\\Users\\tomas\\Desktop\\CoderHouse\\proyecto 2\\Productos.txt");

contenedor.save(producto);
//contenedor.getById(1);
//contenedor.getAll();
//contenedor.deleteById(1);
//contenedor.deleteAll();

