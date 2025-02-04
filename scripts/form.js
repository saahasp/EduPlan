// Course data with GPA impact
const courses = {
    ap: {
        'AP English Language': { baseGPA: 4.0, bonus: 0.0488, category: 'humanities' },
        'AP English Literature': { baseGPA: 4.0, bonus: 0.0488, category: 'humanities' },
        'AP Calculus AB': { baseGPA: 4.0, bonus: 0.0488, category: 'stem' },
        'AP Calculus BC': { baseGPA: 4.0, bonus: 0.0488, category: 'stem' },
        'AP Biology': { baseGPA: 4.0, bonus: 0.0488, category: 'stem' },
        'AP Chemistry': { baseGPA: 4.0, bonus: 0.0488, category: 'stem' },
        'AP Physics': { baseGPA: 4.0, bonus: 0.0488, category: 'stem' },
        'AP World History': { baseGPA: 4.0, bonus: 0.0488, category: 'humanities' },
        'AP US History': { baseGPA: 4.0, bonus: 0.0488, category: 'humanities' },
        'AP Psychology': { baseGPA: 4.0, bonus: 0.0488, category: 'humanities' },
        'AP French': { baseGPA: 4.0, bonus: 0.0488, category: 'languages' },
        'AP Spanish': { baseGPA: 4.0, bonus: 0.0488, category: 'languages' },
        'AP Art': { baseGPA: 4.0, bonus: 0.0488, category: 'arts' }
    },
    ib: {
        'IB Mathematics': { baseGPA: 4.0, bonus: 0.0488, category: 'stem' },
        'IB Physics': { baseGPA: 4.0, bonus: 0.0488, category: 'stem' },
        'IB Chemistry': { baseGPA: 4.0, bonus: 0.0488, category: 'stem' },
        'IB Biology': { baseGPA: 4.0, bonus: 0.0488, category: 'stem' },
        'IB English': { baseGPA: 4.0, bonus: 0.0488, category: 'humanities' },
        'IB History': { baseGPA: 4.0, bonus: 0.0488, category: 'humanities' },
        'IB Spanish': { baseGPA: 4.0, bonus: 0.0488, category: 'languages' },
        'IB French': { baseGPA: 4.0, bonus: 0.0488, category: 'languages' },
        'IB Art': { baseGPA: 4.0, bonus: 0.0488, category: 'arts' }
    },
    regular: {
        'English 11': { baseGPA: 4.0, bonus: 0, category: 'humanities' },
        'English 12': { baseGPA: 4.0, bonus: 0, category: 'humanities' },
        'Algebra 2': { baseGPA: 4.0, bonus: 0, category: 'stem' },
        'Pre-Calculus': { baseGPA: 4.0, bonus: 0, category: 'stem' },
        'Biology': { baseGPA: 4.0, bonus: 0, category: 'stem' },
        'Chemistry': { baseGPA: 4.0, bonus: 0, category: 'stem' },
        'US History': { baseGPA: 4.0, bonus: 0, category: 'humanities' },
        'World History': { baseGPA: 4.0, bonus: 0, category: 'humanities' },
        'Spanish 3': { baseGPA: 4.0, bonus: 0, category: 'languages' },
        'French 3': { baseGPA: 4.0, bonus: 0, category: 'languages' },
        'Art': { baseGPA: 4.0, bonus: 0, category: 'arts' }
    }
};

// Handle interest tag selection and form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const interestsContainer = document.getElementById('interests-container');

    // Load saved data if available
    const savedData = JSON.parse(localStorage.getItem('studentData') || '{}');
    if (savedData) {
        Object.keys(savedData).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                input.value = savedData[key];
            }
        });

        // Restore selected interests
        if (savedData.interests) {
            document.querySelectorAll('.tag').forEach(tag => {
                if (savedData.interests.includes(tag.dataset.interest)) {
                    tag.classList.add('active');
                }
            });
        }
    }

    // Handle interest tag selection
    interestsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag')) {
            e.target.classList.toggle('active');
        }
    });

    document.getElementById('student-form').addEventListener('submit', function(e) {
        e.preventDefault();
        window.location.href = '../pages/schedule.html';
    });
});

function suggestCourses(targetGPA, currentGPA, interests) {
    let suggestions = [];
    const gpaGap = targetGPA - currentGPA;
    
    // If we need to increase GPA
    if (gpaGap > 0) {
        // Prioritize AP/IB courses in selected interest areas
        for (const courseType of ['ap', 'ib']) {
            for (const [courseName, courseData] of Object.entries(courses[courseType])) {
                if (interests.includes(courseData.category)) {
                    suggestions.push({
                        name: courseName,
                        type: courseType.toUpperCase(),
                        potentialGPA: courseData.baseGPA + courseData.bonus,
                        category: courseData.category
                    });
                }
            }
        }
    } else {
        // If maintaining GPA, include a mix of regular and advanced courses
        for (const courseType of ['regular', 'ap', 'ib']) {
            for (const [courseName, courseData] of Object.entries(courses[courseType])) {
                if (interests.includes(courseData.category)) {
                    suggestions.push({
                        name: courseName,
                        type: courseType.toUpperCase(),
                        potentialGPA: courseData.baseGPA + courseData.bonus,
                        category: courseData.category
                    });
                }
            }
        }
    }

    // Sort suggestions by potential GPA impact
    suggestions.sort((a, b) => b.potentialGPA - a.potentialGPA);
    
    return suggestions.slice(0, 8); // Return top 8 suggestions
}

function showSuggestions(suggestions) {
    // Navigate to the schedule page with suggestions
    const params = new URLSearchParams();
    params.append('suggestions', JSON.stringify(suggestions));
    window.location.href = `schedule.html?${params.toString()}`;
}
