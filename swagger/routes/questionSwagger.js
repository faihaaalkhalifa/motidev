/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question management and retrieval
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a question
 *     description: ADMIN can create question.
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createQuestion'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                     $ref: '#/components/schemas/Question'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all questions
 *     description: USER,ADMIN can retrieve all questions.
 *     tags: [Questions]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: what fields do you want to show (ex. name,price)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of questions
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: key-words you want to search about it
 *       - in: query
 *         name: agg
 *         schema:
 *           type: string
 *         description: group data by any field  (ex. {group=[brand],max=price,min= price,sum=price,avg=price})
 *       - in: query
 *         name: aggDate
 *         schema:
 *           type: string
 *         description: group data by date fields   (ex. {group=[createdAt],date=month,max=price,min=price,avg=price,year=2022})
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name,-price)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Get a question
 *     description: USER,ADMIN can use this router.
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                     $ref: '#/components/schemas/Question'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a question
 *     description: ADMIN can use this router.
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateQuestion'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                     $ref: '#/components/schemas/Question'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a  question.
 *     description: ADMIN can use this router.
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: string
 *                   example: null
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

<<<<<<< HEAD
=======

>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
exports.Question = {
  type: 'object',
  properties: {
    id: { type: 'string' },
<<<<<<< HEAD
    // property
    level: { type: 'string', enum: ['Junior', 'Mid-Level', 'Senior'] },
    answer: { type: 'array', items: { type: 'string' } },
    c: { type: 'string' },
    d: { type: 'string' },
    b: { type: 'string' },
    a: { type: 'string' },
    question: { type: 'string' },
  },
  example: {
    _id: '5ebac534954b54139806c112',
    // property example
    level: 'Junior',

    answer: ['answer'],

    c: 'c',

    d: 'd',

    b: 'b',

    a: 'a',

    question: 'test',

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
=======
// property
level: { type: 'string', enum: ['Junior','Mid-Level','Senior',]  },
answer: { type: 'array',items: {type:'string',} },
c: { type: 'string',},
d: { type: 'string',},
b: { type: 'string',},
a: { type: 'string',},
question: { type: 'string',},
  },
  example: {
    _id: '5ebac534954b54139806c112',
// property example
level: 'Junior',

answer: ['answer'],

c: 'c',

d: 'd',

b: 'b',

a: 'a',

question: 'test',

   createdAt: "2024-11-24T16:35:04.438Z",
   updatedAt: "2024-11-24T16:35:04.438Z"
>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
  },
};
exports.createQuestion = {
  type: 'object',
  properties: {
<<<<<<< HEAD
    // create property
    level: { type: 'string', enum: ['Junior', 'Mid-Level', 'Senior'] },
    answer: { type: 'array', items: { type: 'string' } },
    c: { type: 'string' },
    d: { type: 'string' },
    b: { type: 'string' },
    a: { type: 'string' },
    question: { type: 'string' },
  },
  example: {
    // create property example
    level: 'Junior',

    answer: ['answer'],

    c: 'c',

    d: 'd',

    b: 'b',

    a: 'a',

    question: 'test',
  },
  required: [
    // required property

    'answer',

    'c',

    'd',

    'b',

    'a',

    'question',
  ],
=======
// create property
level: { type: 'string', enum: ['Junior','Mid-Level','Senior',]  },
answer: { type: 'array',items: {type:'string',} },
c: { type: 'string',},
d: { type: 'string',},
b: { type: 'string',},
a: { type: 'string',},
question: { type: 'string',},
  },
  example: {
// create property example
level: 'Junior',

answer: ['answer'],

c: 'c',

d: 'd',

b: 'b',

a: 'a',

question: 'test',

  },
  required:[
// required property

'answer', 

'c', 

'd', 

'b', 

'a', 

'question', 

  ]
>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
};
exports.updateQuestion = {
  type: 'object',
  properties: {
<<<<<<< HEAD
    // update property
    level: { type: 'string', enum: ['Junior', 'Mid-Level', 'Senior'] },
    answer: { type: 'array', items: { type: 'string' } },
    c: { type: 'string' },
    d: { type: 'string' },
    b: { type: 'string' },
    a: { type: 'string' },
    question: { type: 'string' },
  },
  example: {
    // update property example
    level: 'Junior',

    answer: ['answer'],

    c: 'c',

    d: 'd',

    b: 'b',

    a: 'a',

    question: 'test',
  },
};
=======
// update property
level: { type: 'string', enum: ['Junior','Mid-Level','Senior',]  },
answer: { type: 'array',items: {type:'string',} },
c: { type: 'string',},
d: { type: 'string',},
b: { type: 'string',},
a: { type: 'string',},
question: { type: 'string',},
  },
  example: {
// update property example
level: 'Junior',

answer: ['answer'],

c: 'c',

d: 'd',

b: 'b',

a: 'a',

question: 'test',

  },
};

>>>>>>> 70b13b397ab76889ad3b7bfb30e2ae2f9028f268
