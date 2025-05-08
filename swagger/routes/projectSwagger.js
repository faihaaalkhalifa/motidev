/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management and retrieval
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a project
 *     description: USER can create project.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createProject'
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
 *                     $ref: '#/components/schemas/Project'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all projects
 *     description: USER,ADMIN can retrieve all projects.
 *     tags: [Projects]
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
 *         description: Maximum number of projects
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
 *                     $ref: '#/components/schemas/Project'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project
 *     description: USER,ADMIN can use this router.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
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
 *                     $ref: '#/components/schemas/Project'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a project
 *     description: USER can use this router.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateProject'
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
 *                     $ref: '#/components/schemas/Project'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a  project.
 *     description: USER,ADMIN can use this router.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project id
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

exports.Project = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // property
    member: { type: 'string' },
    owner: { type: 'string' },
    emails: { type: 'array', items: { type: 'string' } },
    link: { type: 'string' },
    photo: { type: 'string' },
    description: { type: 'string' },
    name: { type: 'string' },
  },
  example: {
    _id: '5ebac534954b54139806c112',
    // property example
    memberId: '673c40cd59e293827f79e398',

    ownerId: '673c40cd59e293827f79e398',

    emails: ['emails'],

    link: 'link',

    photo: 'caver',

    description: 'description',

    name: 'logo mas',

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};
exports.createProject = {
  type: 'object',
  properties: {
    // create property
    member: { type: 'string' },

    emails: { type: 'array', items: { type: 'string' } },
    link: { type: 'string' },
    photo: { type: 'string' },
    description: { type: 'string' },
    name: { type: 'string' },
  },
  example: {
    // create property example
    memberId: '673c40cd59e293827f79e398',

    emails: ['emails'],

    link: 'link',

    photo: 'caver',

    description: 'description',

    name: 'logo mas',
  },
  required: [
    // required property
    'member',

    'owner',

    'emails',

    'link',

    'photo',

    'description',

    'name',
  ],
};
exports.updateProject = {
  type: 'object',
  properties: {
    // update property
    member: { type: 'string' },

    emails: { type: 'array', items: { type: 'string' } },
    link: { type: 'string' },
    photo: { type: 'string' },
    description: { type: 'string' },
    name: { type: 'string' },
  },
  example: {
    // update property example
    memberId: '673c40cd59e293827f79e398',

    emails: ['emails'],

    link: 'link',

    photo: 'caver',

    description: 'description',

    name: 'logo mas',
  },
};
