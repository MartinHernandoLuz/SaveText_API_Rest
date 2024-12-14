import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// db is in the configuration folder, this is used to access the database


// Create a user in data base
export const createUserDB = async (data) => {
  try {
    const { username, full_name, email, password } = data;

    // check if email or username is in database
    const find_email = "SELECT email FROM users WHERE email = ? OR username = ?";
    const [row] = await db.query(find_email, [email, username]);
    if (row.length == 1) {
      throw new Error("this email or username already in use");
    }

    // NOTA: el password debe ser menor a 70 characters, ponlo en un middleware
    // encript password
    const hashedPassword = await bcrypt.hash(password, 12);


    // This inserts the user into the Database with encrypted password
    const sentence = "INSERT INTO users (email, password_hash, username, full_name) VALUES (?, ?, ?, ?)";
    await db.query(sentence, [email, hashedPassword, username, full_name]);

    return {
      message: `user ${username} created successfully`
    };
  } catch (error) {
    console.log(error.message)
    if (error.message != "this email or username already in use") {
      error.message = "unexpected error to create user"
    }
    throw new Error(error.message)
  }
};





/*
// Iniciar sesión en la base de datos
export const loginUserDB = async (data) => {
  try {
    const { email, password } = data;

    // Buscar al usuario por email
    const sentence = "SELECT * FROM usuario WHERE email = ?";
    const [rows] = await db.query(sentence, [email]);

    // Verificar si el email existe
    if (rows.length === 0) {
      throw new Error("Email no encontrado");
    }

    const user = rows[0];

    // Verificar la contraseña
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    // Generar el token JWT con email y rango
    const token = jwt.sign(
      { email: user.email, rango: user.rango },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Tiempo de expiración del token
    );

    return {
      message: "Inicio de sesión exitoso",
      token: token,
    };

  } catch (error) {
    if (error.message != "Email no encontrado" && error.message != "Contraseña incorrecta") {
      error.message = "Error inesperado al loguearse"
    }
    throw new Error(error.message);
  }
};
*/

/*
// Iniciar sesión en la base de datos
export const actualizarRangoUserDB = async (data) => {
  try {
    const { email, rango } = data;
    if (rango != 'cliente' && rango != 'empleado' && rango != 'administrador') {
      throw new Error("Rango inválido. Debe ser 'cliente', 'empleado' o 'administrador'");
    }

    // Buscar al usuario por email
    const sentence = "SELECT * FROM usuario WHERE email = ?";
    const [rows] = await db.query(sentence, [email]);

    // Verificar si el email existe
    if (rows.length === 0) {
      throw new Error("Email no encontrado");
    }

    const sentence2 = `UPDATE usuario SET rango = ? WHERE email = ?`
    const [rows2] = await db.query(sentence2, [rango, email]);

    return {
      message: "Rango actualizado con éxito",
      email: email,
      nuevoRango: rango
    };

  } catch (error) {
    if (error.message != "Email no encontrado" && error.message != "Rango inválido. Debe ser 'cliente', 'empleado' o 'administrador'") {
      error.message = "Error inesperado al actualizar el rango"
    }
    throw new Error(error.message);
  }
};
*/