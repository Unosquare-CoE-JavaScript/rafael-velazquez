interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date
};

// Partial utility type

function createCourseGoal(title: string, description: string, completeUntil: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};

    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;

    return courseGoal as CourseGoal;
}

// Readonly utility type

const readonlyNames: Readonly<string[]> = ['Max', 'John'];
// readonlyNames.push('Anna');  // Causes an error
// readonlyNames.pop();         // Causes an error