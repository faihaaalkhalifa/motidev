const swaggerJsDoc = require('swagger-jsdoc');
<<<<<<< HEAD
const {
  Review,
  createReview,
  updateReview,
} = require('./routes/reviewSwagger');
const {
  Project,
  createProject,
  updateProject,
} = require('./routes/projectSwagger');
const {
  Question,
  createQuestion,
  updateQuestion,
} = require('./routes/questionSwagger');
=======
const { Question, createQuestion, updateQuestion } = require('./routes/questionSwagger');
>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
const { signUp } = require('./routes/auth');
const { User, updateMe, createUser } = require('./routes/users');
const {
  DuplicateEmail,
  Error,
  Forbidden,
  NotFound,
  Unauthorized,
} = require('./components');

const options = {
  url: '',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version: '1.0.0',
      description:
        'This is an API simpel Auth made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:7000/api/v1.0.0',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
<<<<<<< HEAD
        Review,
        createReview,
        updateReview,
        Project,
        createProject,
        updateProject,
        Question,
        createQuestion,
        updateQuestion,
=======
Question, 
createQuestion, 
updateQuestion,
>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
        signUp,
        createUser,
        updateMe,
        User,
        Error,
      },
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter the token : abcde12345".',
        },
      },
      responses: {
        DuplicateEmail,
        Forbidden,
        NotFound,
        Unauthorized,
        201: {
          description: 'created',
        },
        200: {
          description: 'ok',
        },
        204: {
          description: 'No content',
        },
        400: {
          description: 'Bad request',
        },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Forbidden',
        },
        404: {
          description: 'Not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  apis: ['./swagger/routes/*.js'],
};
const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
