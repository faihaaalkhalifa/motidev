/**
 * @swagger
 * tags:
 *   name: Participants
 *   description: Participant management and retrieval
 */

/**
 * @swagger
 * /participants:
 *   post:
 *     summary: Create a participant
 *     description: USER,ADMIN can create participant.
 *     tags: [Participants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createParticipant'
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
 *                     $ref: '#/components/schemas/Participant'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all participants
 *     description: ADMIN can retrieve all participants.
 *     tags: [Participants]
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
 *         description: Maximum number of participants
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
 *                     $ref: '#/components/schemas/Participant'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /participants/{id}:
 *   get:
 *     summary: Get a participant
 *     description: ADMIN can use this router.
 *     tags: [Participants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Participant id
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
 *                     $ref: '#/components/schemas/Participant'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a participant
 *     description:  can use this router.
 *     tags: [Participants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Participant id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateParticipant'
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
 *                     $ref: '#/components/schemas/Participant'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a  participant.
 *     description: ADMIN can use this router.
 *     tags: [Participants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Participant id
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

exports.Participant = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // property
    comment: { type: 'string' },
    photo: { type: 'string' },
    challenges: { type: 'string' },
    user: { type: 'string' },
  },
  example: {
    _id: '5ebac534954b54139806c112',
    // property example
    comment: 'comment',

    photo: 'photo',

    challengesIds: ['673c40cd59e293827f79e398', '673c40cd59e293827f79e399'],

    userId: '673c40cd59e293827f79e398',

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};
exports.createParticipant = {
  type: 'object',
  properties: {
    // create property
    comment: { type: 'string' },
    photo: { type: 'string' },
    challenges: { type: 'string' },
    user: { type: 'string' },
  },
  example: {
    // create property example
    comment: 'comment',

    photo: 'photo',

    challengesIds: ['673c40cd59e293827f79e398', '673c40cd59e293827f79e399'],

    userId: '673c40cd59e293827f79e398',
  },
  required: [
    // required property

    'photo',
  ],
};
exports.updateParticipant = {
  type: 'object',
  properties: {
    // update property
    comment: { type: 'string' },
    photo: { type: 'string' },
    challenges: { type: 'string' },
    user: { type: 'string' },
  },
  example: {
    // update property example
    comment: 'comment',

    photo: 'photo',

    challengesIds: ['673c40cd59e293827f79e398', '673c40cd59e293827f79e399'],

    userId: '673c40cd59e293827f79e398',
  },
};
