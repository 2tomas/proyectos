const fs = require('fs');
let listOfProductos = [];
let id = 1;

class Contenedor {
    constructor(url){
        this.url = url
    }
    
    save = async (producto) => {        
        const contenido = await fs.promises.readFile(this.url, "utf-8");

        try{
            let productos = JSON.parse(contenido);
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

        return id;
    }

    getById = async(id) => {
        const contenido = await fs.promises.readFile(this.url, "utf-8")

        let noEncontroId = 0; //verificacion si no hay id
        let productos = JSON.parse(contenido);
        let product;

        productos.forEach(producto => {
            if(producto.id == id){
                noEncontroId = 1; //encontro una id entonces cambia la variable para que no pase en el proximo if
                product = producto;
            }
        });

        if (noEncontroId == 0) { 
            console.log("no hay una id ")
        }

        return product;
    }

    getAll = async () => {
        try {
            const contenido = await fs.promises.readFile(this.url, "utf-8");
            return JSON.parse(contenido);
        } catch {
            console.log("Esta vacio :C")
        }
    }
    


    deleteById = async (id) => {
        await fs.promises.readFile(this.url, "utf-8", (error, data) => {
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

module.exports = Contenedor;