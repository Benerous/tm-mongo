
// - Find all students who have the worst score for homework, sort by descent

async function task1(collection) {
    try {
        // selected 1/2 from sorted students by quiz score that have the best score for quiz
        const collectionArray = await collection.find().toArray();
        const halfPart = Math.ceil(collectionArray.length / 2);
        const sortedByHomework = await collection.aggregate([
            { $unwind: '$scores' },
            { $match: { 'scores.type': "homework" }},
            { $sort: { 'scores.score': 1 } },
            { $limit: halfPart },
            { $sort: { 'scores.score': -1 } },
        ]).toArray();
        console.log("  //  Find all students who have the worst score for homework, sort by descent  //  ");
        console.log("----------------------------------------------------");
        console.log('Found first half of students with bad marks for homework:');
        console.log(sortedByHomework);
        console.log("----------------------------------------------------");
    } catch (err) {
        console.error(err)
    }
}

// - Find all students who have the best score for quiz and the worst for homework, sort by ascending

async function task2(collection) {
    try {
        const collectionArray = await collection.find().toArray();
        const halfPart = Math.ceil(collectionArray.length / 2);
        const sortedByQuiz = await collection.aggregate([
            { $unwind: '$scores' },
            { $match: { 'scores.type': 'quiz' } },
            { $sort: { 'scores.score': -1 } },
            { $limit: halfPart },
        ]).toArray();
        const idsOfHightScored = sortedByQuiz.map(i => i._id);
        const foundStudents = await collection.find({ _id: { $in: idsOfHightScored } }).toArray();
        const sortedByHomework = foundStudents.sort((a, b) => {
            const indexOfHomework = a.scores.findIndex((i) =>i.type === 'homework');
            return a.scores[indexOfHomework].score - b.scores[indexOfHomework].score;
        })
        console.log("  //  Find all students who have the best score for quiz and the worst for homework, sort by ascending  //  ");
        console.log("----------------------------------------------------");
        console.log(sortedByHomework);
        console.log("----------------------------------------------------");
    } catch (err) {
        console.error(err)
    }
}

// - Find all students who have best scope for quiz and exam

async function task3(collection) {
    try {
        const collectionArray = await collection.find().toArray();
        const halfPart = Math.ceil(collectionArray.length / 2);
        const sortedByQuiz = await collection.aggregate([
            { $unwind: '$scores' },
            { $match: { 'scores.type': 'quiz' } },
            { $sort: { 'scores.score': -1 } },
            { $limit: halfPart },
        ]).toArray();
        const idsOfHightScored = sortedByQuiz.map(i => i._id);
        const foundStudents = await collection.find({ _id: { $in: idsOfHightScored } }).toArray();
        const sortedByExam = foundStudents.sort((a, b) => {
            const indexOfExam = a.scores.findIndex((i) => i.type === 'exam');
            return b.scores[indexOfExam].score - a.scores[indexOfExam].score;
        });
        console.log("  //  Find all students who have best scope for quiz and exam  //  ");
        console.log("----------------------------------------------------");
        console.log(sortedByExam);
        console.log("----------------------------------------------------");
    } catch (err) {
        console.error(err)
    }
}

// - Calculate the average score for homework for all students

async function task4(collection) {
    try {
        const avgHomeworkScore = await collection.aggregate([
            { $unwind: '$scores' },
            { $match: { 'scores.type': 'homework' }},
            { $group: {
                _id: null,
                avarageScore: { $avg: "$scores.score" }
            }}
        ]).toArray();
        console.log("  //  Calculate the average score for homework for all students  //  ");
        console.log("----------------------------------------------------");
        console.log(`Avarage score for homework: ${avgHomeworkScore[0].avarageScore}`);
        console.log("----------------------------------------------------");
    } catch (err) {
        console.error(err)
    }
}

// - Delete all students that have homework score <= 60

async function task5(collection) {
    try {
        const lowHomeworkScores = await collection.aggregate([
            { $unwind: '$scores' },
            { $match: { 'scores.type': 'homework' }},
            { $project: {
                _id: 1,
                scoreLte60: { $lte: [ '$scores.score', 60 ] }
            }}
        ]).toArray();
        const idsOfLowScored = lowHomeworkScores.filter(i => i.scoreLte60).map(i => i._id);
        const deletedStudents = await collection.deleteMany({ _id: { $in: idsOfLowScored } });
        console.log("  //  Delete all students that have homework score <= 60  //  ");
        console.log("----------------------------------------------------");
        console.log(`Deleted ${deletedStudents.result.n} students`);
        console.log("----------------------------------------------------");
    } catch (err) {
        console.error(err)
    }
}

// - Mark students that have quiz score => 80

async function task6(collection) {
    try {
        const highQuizScores = await collection.aggregate([
            { $unwind: '$scores' },
            { $match: { 'scores.type': 'quiz' }},
            { $project: {
                _id: 1,
                scoreGte80: { $gte: [ '$scores.score', 80 ] }
            }}
        ]).toArray();
        const idsOfHightScored = highQuizScores.filter(i => i.scoreGte80).map(i => i._id);
        const updatedStudents = await collection.updateMany({ _id: { $in: idsOfHightScored } }, { $set: { marked: true } });
        console.log("  //  Mark students that have quiz score => 80  //  ");
        console.log("----------------------------------------------------");
        console.log(`Marked ${updatedStudents.result.nModified} students`);
        console.log("----------------------------------------------------");
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
        const groupedStudents = await collection.aggregate([
            { "$addFields": {
                "score_average": { "$avg": "$scores.score" },
                "group": { 
                    $switch: {
                        'branches': [
                            { case: { $gte: [{ "$avg": "$scores.score" }, 60] }, then: 'c'},
                            { case: { $gte: [{ "$avg": "$scores.score" }, 40] }, then: 'b'},
                        ],
                        'default': 'a'
                    }
                }
            }}
        ]).toArray();
        const bulkWrite = groupedStudents.map(student => ({
            updateOne: {
                filter: { _id: student._id },
                update: { $set: { group: student.group, avg_score: student.score_average }}
            }
        }))
        const { result } = await collection.bulkWrite(bulkWrite);
        console.log("  //  Write a query that group students by 3 categories (calculate the average grade for three subjects)  //  ");
        console.log("----------------------------------------------------");
        console.log(`Grouped ${result.nModified} students`);
        console.log("----------------------------------------------------");
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