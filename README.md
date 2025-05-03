# User Authentication & Authorization

This project provides a reliable system for user authentication and authorization using Node.js and Express.js. It aims to offer a secure and easy-to-use API for developers.

## Features

- Prevent Parameter Pollution: Prevents parameter pollution by allowing only a specific set of parameters and rejecting duplicate parameters in requests.
- Data Compression: Utilizes the "compression" library to enable gzip compression for server responses, reducing the size of transmitted data and improving application performance by minimizing network latency.
- Error Handling: The project includes robust error handling mechanisms to deal with errors and report them smoothly, including error logging and providing informative error messages to assist in debugging.

## Installation

### Start Development:

bash
npm start

## Languages and Tools

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)

## API Endpoints

Please refer to the API documentation for more details on request and response formats.

## Setting Up the .env File

These instructions outline how to set up the .env file to configure environment variables.

1. Copy the .env.example file to .env:
      bash
      cp .env.example .env

2. Update all variables in the .env file with your values.

## Database Seed

To create an admin user in the database, use the following command:
bash
npm run seed:dev  

## Generate Document with Hygen Library

To generate a document:
bash
npm run generate:resource:document

To add a property to the document:
bash
npm run add:property:document

To add a property to an object in the document:
bash
npm run add:property:object

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **Passport.js:** Authentication middleware for Node.js.
- **JSON Web Tokens (JWT):** Token-based authentication mechanism.
- **MongoDB:** NoSQL database for data storage.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify the code as per your needs.

---

**Thank you for using the User Authentication & Authorization project! We wish you a great development experience!**
