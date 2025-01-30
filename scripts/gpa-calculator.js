// Grade point values
const gradePoints = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'E': 0
};

// Bonus points for AP/IB courses
const yearlyBonusPoints = {
    'A': 0.0488,
    'A-': 0.0488,
    'B+': 0.0366,
    'B': 0.0366,
    'B-': 0.0366,
    'C+': 0.0244,
    'C': 0.0244,
    'C-': 0.0244,
    'D+': 0.0122,
    'D': 0.0122,
    'E': 0
};

const semesterBonusPoints = {
    'A': 0.0244,
    'A-': 0.0244,
    'B+': 0.0183,
    'B': 0.0183,
    'B-': 0.0183,
    'C+': 0.0122,
    'C': 0.0122,
    'C-': 0.0122,
    'D+': 0.0061,
    'D': 0.0061,
    'E': 0
};

function addCourse() {
    const template = document.getElementById('course-template');
    const coursesList = document.getElementById('courses');
    const clone = template.content.cloneNode(true);
    coursesList.appendChild(clone);
    calculateGPA();
}

function removeCourse(button) {
    button.closest('.course-entry').remove();
    calculateGPA();
}

function calculateGPA() {
    const courses = document.querySelectorAll('.course-entry');
    let totalPoints = 0;
    let totalEntries = 0;
    let totalBonus = 0;

    courses.forEach(course => {
        const grade = course.querySelector('.grade').value;
        const type = course.querySelector('.course-type').value;
        const duration = course.querySelector('.course-duration').value;
        const points = gradePoints[grade];

        // Calculate base points
        if (duration === 'year') {
            totalPoints += points * 2; // Count twice for year-long courses
            totalEntries += 2;
        } else {
            totalPoints += points;
            totalEntries += 1;
        }

        // Calculate bonus points
        if (type !== 'regular') {
            const bonusPoints = duration === 'year' ? 
                yearlyBonusPoints[grade] : 
                semesterBonusPoints[grade];
            totalBonus += bonusPoints;
        }
    });

    // Calculate final GPA
    const baseGPA = totalEntries > 0 ? (totalPoints / totalEntries).toFixed(4) : '0.0000';
    const finalGPA = (parseFloat(baseGPA) + totalBonus).toFixed(4);

    // Update display
    document.getElementById('base-gpa').textContent = baseGPA;
    document.getElementById('weighted-bonus').textContent = totalBonus.toFixed(4);
    document.getElementById('final-gpa').textContent = finalGPA;
}

// Add event listeners to recalculate GPA when any value changes
document.addEventListener('change', (event) => {
    if (event.target.closest('.course-entry')) {
        calculateGPA();
    }
});

// Add initial course entry when page loads
document.addEventListener('DOMContentLoaded', () => {
    addCourse();
});
