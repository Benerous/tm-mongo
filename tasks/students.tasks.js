
// - Find all students who have the worst score for homework, sort by descent

async function task1(collection) {
    try {
        const sortedByHomework = await collection.aggregate([
            { $unwind: '$scores'
            },
            { $match: {
                'scores.type': "homework"
            }},
            { $sort: { 
                'scores.score': -1 }
            }]).toArray();
        // selected 2/3 from sorted students by homework score that have the worst score for homework
        const thirdPartLength = Math.ceil(sortedByHomework.length / 3);
        const result = sortedByHomework.splice(thirdPartLength*2, sortedByHomework.length);
        console.log("  //  Find all students who have the worst score for homework, sort by descent  //  ");
        console.log(result);
    } catch (err) {
        console.error(err)
    }
}

// - Find all students who have the best score for quiz and the worst for homework, sort by ascending

async function task2(collection) {
    try {
        const sortedByQuiz = await collection.aggregate([
            { $match: {
                'scores.type': 'quiz'
            }},
            { $sort: { 
                'scores.score': 1 }
            },
            { $match: {
                'scores.type': 'homework'
            }},
            { $sort: { 
                'scores.score': 1 }
            },
        ]).toArray();
        // selected 2/3 from sorted students by quiz score that have the best score for quiz
        const thirdPartLength = Math.ceil(sortedByQuiz.length / 3);
        const bestByQuiz = sortedByQuiz.splice(thirdPartLength*2, sortedByQuiz.length);
        console.log("Find all students who have the best score for quiz and the worst for homework, sort by ascending");
        // console.log(bestByQuiz);
    } catch (err) {
        console.error(err)
    }
}

// - Find all students who have best scope for quiz and exam

async function task3(collection) {
    try {
        const sorting = { scores: 1 };
        const selectedArticles = await collection.find().sort(sorting).toArray();
        console.log("Find all students who have best scope for quiz and exam");
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
        console.log("Calculate the average score for homework for all students");
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
        console.log("Delete all students that have homework score <= 60");
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
        console.log("Mark students that have quiz score => 80");
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
        console.log("Write a query that group students by 3 categories (calculate the average grade for three subjects)");
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