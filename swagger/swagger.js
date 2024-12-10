import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API para guardar texto",
            version: "1.3.4",
            description: "API para guardar texto",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "API en local",
            },
        ],
    },
    //apis: ["./src/router/*.js"],
    apis: ["./swagger/*.yml"],
}

const especificaciones = swaggerJSDoc(options);

// http://localhost:8080/documentacion

export const swaggerDOC = (app, port) => {
    app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(especificaciones));
    console.log(`Documentacion disponible en http://localhost:${port}/api-doc`)
}