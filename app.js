'use strict'

const userTasks = require('./tasks/users.tasks');
const articleTasks = require('./tasks/articles.tasks');
const studentTasks = require('./tasks/students.tasks');

const students = require('./students.json');

// db connection and settings
const connection = require('./config/connection')
let userCollection
let articleCollection
let studentsCollection
run()

async function run() {
  await connection.connect()
  await connection.get().dropCollection('users')
  userCollection = connection.get().collection('users')

  await connection.get().dropCollection('articles')
  articleCollection = connection.get().collection('articles')

  await connection.get().dropCollection('students')
  await students.map(async (student) => {
    await connection.get().collection('students').insertOne(student);
  })
  studentsCollection = connection.get().collection('students')

  // users tasks
  await userTasks.task1(userCollection)
  await userTasks.task2(userCollection)
  await userTasks.task3(userCollection)
  await userTasks.task4(userCollection)

  // articles tasks
  await articleTasks.task1(articleCollection)
  await articleTasks.task2(articleCollection)
  await articleTasks.task3(articleCollection)
  await articleTasks.task4(articleCollection)
  await articleTasks.task5(articleCollection)

  // students tasks
  await studentTasks.task1(studentsCollection)

  await connection.close()
}