const { mapUser, getRandomFirstName } = require('../util')

// - Create 2 users per department (a, b, c)
async function task1(collection) {
    try {
      const users = Array.from({length: 2}).fill(['a','b','c']).flat()
        .map(i => ({ department: i }))
        .map(mapUser);
      const { result } = await collection.insertMany(users);
      console.log("  //  Create 2 users per department (a, b, c)  //  ")
      console.log(`Created users: ${result}`);
    } catch (err) {
      console.error(err)
    }
  }
  
// - Delete 1 user from department (a)
  
async function task2(collection) {
  try {
    const query = { department: 'a' };
    const { result } = await collection.deleteOne(query);
    console.log("  //  Delete 1 user from department (a)  //  ")
    console.log(`Deleted user: ${result}`);
  } catch (err) {
    console.error(err)
  }
}

// - Update firstName for users from department (b)

async function task3(collection) {
  try {
    const query = { department: 'b' };
    const selectedUsers = await collection.find(query).toArray();
    const bulkWrite = selectedUsers.map(user => ({
      updateOne: {
        filter: {_id: user._id},
        update: {$set: {firstName: getRandomFirstName()}}
      }
    }))
    const { result } = await collection.bulkWrite(bulkWrite);
    console.log("  //  Update firstName for users from department (b)  //  ")
    console.log(`Created users: ${result.nModified}`);
  } catch (err) {
    console.error(err)
  }
}

// - Find all users from department (c)
async function task4(collection) {
  try {
    const query = { department: 'c' };
    const selectedUsers = await collection.find(query).toArray();
    console.log("  //  Find all users from department (c)  //  ")
    console.log(`Found users: ${selectedUsers}`);
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  task1: task1,
  task2: task2,
  task3: task3,
  task4: task4
}