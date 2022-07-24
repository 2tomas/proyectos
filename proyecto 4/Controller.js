const express = require("express");
const { Router } = express;
const router = Router();
const Contenedor = require("./Service")

const archivo = new Contenedor('Productos.txt');

router.get('/todos', async (req, res) => {
    const arr = await archivo.getAll();
    res.status(201).send(arr);
});

router.get('/:id', async (req, res) => {
    const el = await archivo.getById(req.params.id);
    res.status(201).send(el);
});

router.post('/', async (req, res) => {
    const nuevo = req.body;
    const id = await archivo.save(new Producto(nuevo.title, nuevo.price, nuevo.thumbnail));
    res.status(201).send({ 'status': 'Ok', 'nuevo id': id });
});

router.put('/:id', async (req, res) => {
    const nuevo = req.body;
    const id = await archivo.update(new Producto(nuevo.title, nuevo.price, nuevo.thumbnail, req.params.id));
    res.status(201).send({ 'status': 'Ok', 'id actualizado': id })   
});

router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    const el = await archivo.deleteById(req.params.id);
    res.status(201).send({ 'status': 'Ok', 'registro eliminado': el })
});

module.exports = router;

