const { list } = require('../controllers/people')

function index(request, response) {
  const { amount } = request.query

  response.render('index', { people: list(amount) })
}

module.exports = index