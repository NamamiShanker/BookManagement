module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books management Express API with Swagger",
      version: "1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger. Routes are protected with JWT based auth.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Namami Shanker",
        url: "https://linkedin.com/in/namamishanker",
        email: "namami2011@gmail.com",
      },
    },
    servers: [
      {
        url: `http://${process.env.IP_ADDRESS}:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*js"],
};