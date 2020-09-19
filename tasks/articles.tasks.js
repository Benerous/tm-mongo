const { mapArticle } = require('../util')

// - Create 5 articles per each type (a, b, c)
async function task1(collection) {
    try {
      const articles = Array.from({length: 5}).fill(['a','b','c']).flat()
        .map(i => ({ type: i }))
        .map(mapArticle);
      const { result } = await collection.insertMany(articles);
      console.log("  //  Create 5 articles per each type (a, b, c)  //  ");
      console.log(`Created articles: ${result}`);
    } catch (err) {
      console.error(err)
    }
}
  
// - Find articles with type a, and update tag list with next value [‘tag1-a’, ‘tag2-a’, ‘tag3’]
  
async function task2(collection) {
    try {
        const query = { type: 'a' };
        const newValues = ['tag1-a', 'tag2-a', 'tag3'];
        const selectedArticles = await collection.find(query).toArray();
        const bulkWrite = selectedArticles.map(article => ({
        updateOne: {
            filter: {_id: article._id},
            update: {$set: {tags: newValues}}
            }
        }));
        const { result } = await collection.bulkWrite(bulkWrite);
        console.log("  //  Find articles with type a, and update tag list with next value [‘tag1-a’, ‘tag2-a’, ‘tag3’]  //  ");
        console.log(`Updated articles: ${result.nModified}`);
    } catch (err) {
        console.error(err)
    }
}

// - Add tags [‘tag2’, ‘tag3’, ‘super’] to other articles except articles from type a

async function task3(collection) {
    try {
        const notQuery = { type: { $ne: 'a' }};
        const newValues = ['tag2', 'tag3', 'super'];
        const selectedArticles = await collection.find(notQuery).toArray();
        const bulkWrite = selectedArticles.map(article => ({
        updateOne: {
            filter: {_id: article._id},
            update: {$set: {tags: newValues}}
            }
        }));
        const { result } = await collection.bulkWrite(bulkWrite);
        console.log("  //  Add tags [‘tag2’, ‘tag3’, ‘super’] to other articles except articles from type a  //  ");
        console.log(`Updated articles: ${result.nModified}`);
    } catch (err) {
        console.error(err)
    }
}

// - Find all articles that contain tags [tag2, tag1-a]

async function task4(collection) {
    try {
        // if find all articles that contain both tags
        const query = { tags: { $all: ['tag2', 'tag1-a'] } };

        // if find all articles that contain at least one tag from array
        // const query = { tags: { $in: ['tag2', 'tag1-a'] } };
        
        const selectedArticles = await collection.find(query).toArray();
        console.log("  //  Find all articles that contain tags [tag2, tag1-a]  //  ");
        console.log(`Found articles: ${selectedArticles}`);
    } catch (err) {
        console.error(err)
    }
}

// - Pull [tag2, tag1-a] from all articles

async function task5(collection) {
    try {
        const query = { $pull: { tags: { $in: ['tag2', 'tag1-a'] }} }
        
        const selectedArticles = await collection.find().toArray();
        const bulkWrite = selectedArticles.map(article => ({
            updateOne: {
              filter: {_id: article._id},
              update: query
            }
          }))
          const { result } = await collection.bulkWrite(bulkWrite);
          console.log("  //  Pull [tag2, tag1-a] from all articles  //  ");
        console.log(`Updated articles: ${result.nModified}`);
          console.log(result.nModified);
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    task1: task1,
    task2: task2,
    task3: task3,
    task4: task4,
    task5: task5
}