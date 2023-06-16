const { getArticles } = require('../../controllers/articles.controllers')
const { getArticleComments } = require('../../controllers/comments.controllers')


const articleRouter = require('express').Router()

articleRouter.route('/').get(getArticles)

articleRouter.route('/:_id/comments').get(getArticleComments)

module.exports = articleRouter