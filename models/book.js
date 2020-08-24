'use strict';
const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "-The book's title is required."
        }
      }
    },
    author: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
              msg: "-The author's name is required."
            }
          }
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  }, { sequelize });

  return Book;
};