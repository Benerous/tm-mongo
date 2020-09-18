
// - Find all students who have the worst score for homework, sort by descent

async function task1(collection) {
    try {
        const sorting = { scores: 1 };
        const selectedArticles = await collection.find().sort(sorting).toArray();
        console.log(selectedArticles);
    } catch (err) {
        console.error(err)
    }
}

// - Find all students who have the best score for quiz and the worst for homework, sort by ascending

async function task2(collection) {
    try {
        const sorting = { scores: 1 };
        const selectedArticles = await collection.find().sort(sorting).toArray();
        console.log(selectedArticles);
    } catch (err) {
        console.error(err)
    }
}

// - Find all students who have best scope for quiz and exam

async function task3(collection) {
    try {
        const sorting = { scores: 1 };
        const selectedArticles = await collection.find().sort(sorting).toArray();
        console.log(selectedArticles);
    } catch (err) {
        console.error(err)
    }
}

// - Calculate the average score for homework for all students

async function task4(collection) {
    try {
        const sorting = { scores: 1 };
        const selectedArticles = await collection.find().sort(sorting).toArray();
        console.log(selectedArticles);
    } catch (err) {
        console.error(err)
    }
}

// - Delete all students that have homework score <= 60

async function task5(collection) {
    try {
        const sorting = { scores: 1 };
        const selectedArticles = await collection.find().sort(sorting).toArray();
        console.log(selectedArticles);
    } catch (err) {
        console.error(err)
    }
}

// - Mark students that have quiz score => 80

async function task6(collection) {
    try {
        const sorting = { scores: 1 };
        const selectedArticles = await collection.find().sort(sorting).toArray();
        console.log(selectedArticles);
    } catch (err) {
        console.error(err)
    }
}

// - Write a query that group students by 3 categories (calculate the average grade for three subjects)
//  - a => (between 0 and 40)
//  - b => (between 40 and 60)
//  - c => (between 60 and 100)

async function task7(collection) {
    try {
        const sorting = { scores: 1 };
        const selectedArticles = await collection.find().sort(sorting).toArray();
        console.log(selectedArticles);
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    task1: task1,
    task2: task2,
    task3: task3,
    task4: task4,
    task5: task5,
    task6: task6,
    task7: task7,
}