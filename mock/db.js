/* eslint-disable */

const faker = require('faker');

faker.locale = 'zh_CN';

const posts = [...Array(100).keys()].map(key => ({
  id: key,
  title: faker.lorem.sentence(),
  author: faker.name.findName(),
  updatedAt: faker.date.recent(),
  description: faker.lorem.paragraph(),
  thumbnail: faker.image.avatar(),
}));

const login = {
  token: faker.random.uuid(),
};

module.exports = {
  posts,
  posts_infinite: posts,
  login,
};
