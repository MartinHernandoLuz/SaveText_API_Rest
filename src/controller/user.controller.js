import { createUserDB, } from '../models/user.model.js'

// function para create a user
export const createUser = async (req, res) => {
    const data = req.body; // saca la data Email y contraseña
    try {
        // envía data a una función que está en userModel.js
        const result = await createUserDB(data);
        res.status(201).json(result); // si funciona, envía un 201 CREATED
    } catch (error) {
        // si hay error, envía el que llega por error o 500 INTERNAL por default
        const statusCode = error.message === "this email or username already in use" ? 400 : 500;
        res.status(statusCode).json({ "Error": error.message });
    }
}



/*
// función para iniciar sesión
export const loginUser = async (req, res) => {
    const data = req.body; // saca la data Email y contraseña
    try {
        // envía data a una función que está en userModel.js
        const result = await loginUserDB(data);
        res.status(201).json(result); // si funciona, envía un 201 CREATED
    } catch (error) {
        const errorStatus = error.message == "Contraseña incorrecta" || "Email no encontrado" ? 400 : 500
        // si hay error, envía el que llega por error o 500 INTERNAL por default
        res.status(errorStatus).json({ Error: error.message });
    }
}


*/

/*
export const actualizarRangoUser = async (req, res) => {
    const data = req.body; // saca la data Email y rango
    try {
        // envía data a una función que está en userModel.js
        const result = await actualizarRangoUserDB(data);
        res.status(201).json(result); // si funciona, envía un 201 CREATED
    } catch (error) {
        const errorStatus = error.message == "\
        Rango inválido. Debe ser 'cliente', 'empleado' o 'administrador'" || "\
        Email no encontrado" ? 400 : 500

        res.status(errorStatus).json({ Error: error.message });
    }
}
*/