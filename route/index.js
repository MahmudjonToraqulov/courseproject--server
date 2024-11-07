const authController = require('../controller/auth.controller')
const commentController = require('../controller/comment.controller')
const tagController = require('../controller/tag.controller')
const topicController = require('../controller/topic.controller')
const userController = require('../controller/user.controller')
const filledFormController = require('../controller/filledForm.controller')
const formController = require('../controller/form.controller')

const express = require('express')
const imageUploadMiddlware = require('../utils/imageUploadMiddlware')
const jiraController = require('../controller/jira.controller')

const router = express.Router()

// auth routes
router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)
router.post('/auth/getMe', authController.getMe)
router.post('/auth/salesForce', authController.salesforce)

// comment routes
router.get('/comments/', commentController.getAllComments)
router.delete('/comments/:id', commentController.deleteComment)

// filled form routes
router.get('/filled-forms/', filledFormController.getAllFiledForms)
router.get('/filled-forms/user/:userId', filledFormController.getFilledFormsByUserId)
router.get('/filled-forms/:id', filledFormController.getFilledFormById)
router.post('/filled-forms/', filledFormController.createFilledForm)
router.put('/filled-forms/', filledFormController.editFilledFormItems)
router.delete('/filled-forms/:id', filledFormController.deleteFilledForm)

// form routes
router.get('/forms/', formController.getAllForm)
router.get('/forms/bySearchWord', formController.getFormsBySearchWord)
router.get('/forms/user/:userId', formController.getFormByUserId)
router.get('/forms/:id', formController.getFormById)
router.post('/forms/', imageUploadMiddlware, formController.createForm)
router.put('/forms/:id', imageUploadMiddlware, formController.updateForm)
router.delete('/forms/formField/:id', formController.deleteFormField)
router.delete('/forms/:id', formController.deleteForm)

// like route
// router.get('/like/', )
// router.get('/like/', )

// Jira route
router.get('/jira/:email', jiraController.getTasksByEmail)
router.post('/jira/', jiraController.createJiraTask)

// tag route
router.get('/tags/', tagController.getAllTags)
router.get('/tags/:id', tagController.getTagById)

// topic route
router.get('/topics/', topicController.getAllTopics)

// user route
router.get('/users/', userController.getAllUsers)
router.put('/users/removeAdmin/:id', userController.removeUserAdmin)
router.put('/users/setAdmin/:id', userController.setUserAdmin)
router.put('/users/blockUser/:id', userController.blockUser)
router.put('/users/unblockUser/:id', userController.unblockUser)
router.delete('/users/deleteUser/:id', userController.deleteUser)

// Odoo 
// router.post('/users/generate-api-token', userController.generateApiToken); // Generate API token route
// router.get('/users/api-token', userController.getApiToken); // Get API token route




module.exports = router