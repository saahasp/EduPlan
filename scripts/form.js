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
