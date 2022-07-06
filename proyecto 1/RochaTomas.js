class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        console.log(`El nombre completo es ${this.nombre} ${this.apellido}`);
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota);
    }

    countMascotas() {
        return console.log(this.mascotas.length);
    }

    addBook(nombre, autor) {
        this.libros.push({ name : nombre, autorDelLibro : autor});
    }

    getBookNames(){
        for (const libro in this.libros) {
            console.log(this.libros[libro].name);
          }
    }

}

const usuario = new Usuario("tomas", "rocha", [{name: "tomas", autorDelLibro: "kaka"}],["pandy"]);

usuario.addMascota("bla");
usuario.addBook("julian", "julio");

usuario.countMascotas();
usuario.getBookNames();
usuario.getFullName();