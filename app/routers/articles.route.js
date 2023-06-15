const { getArticles } = require('../../controllers/articles.controllers')


const articleRouter = require('express').Router()

articleRouter.route('/').get(getArticles)

module.exports = articleRouter