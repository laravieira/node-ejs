const { faker } = require('@faker-js/faker');

exports.list = (amount = 5) => {
  if(amount < 0) return []

  return Array.from({ length: amount }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    job: faker.person.jobTitle(),
    avatar: faker.image.avatar(),
  }));
}

exports.index = (request, response) => {
  const { amount } = request.query;

  response.json(this.list(amount));
}