// Course data with categories
const courses = {
    regular: {
        'English 11': { category: 'humanities' },
        'English 12': { category: 'humanities' },
        'Pre-Calculus': { category: 'stem' },
        'Biology': { category: 'stem' },
        'Chemistry': { category: 'stem' },
        'US History': { category: 'humanities' },
        'World History': { category: 'humanities' },
        'Psychology': { category: 'humanities' },
        'French 3': { category: 'languages' },
        'Spanish 3': { category: 'languages' },
        'Art': { category: 'arts' },
        'Music Theory': { category: 'arts' }
    },
    ap: {
        'AP English Language': { category: 'humanities' },
        'AP English Literature': { category: 'humanities' },
        'AP Calculus AB': { category: 'stem' },
        'AP Calculus BC': { category: 'stem' },
        'AP Biology': { category: 'stem' },
        'AP Chemistry': { category: 'stem' },
        'AP Physics': { category: 'stem' },
        'AP World History': { category: 'humanities' },
        'AP US History': { category: 'humanities' },
        'AP Psychology': { category: 'humanities' },
        'AP French': { category: 'languages' },
        'AP Spanish': { category: 'languages' },
        'AP Art History': { category: 'arts' },
        'AP Music Theory': { category: 'arts' }
    },
    ib: {
        'IB English A': { category: 'humanities' },
        'IB Mathematics': { category: 'stem' },
        'IB Biology': { category: 'stem' },
        'IB Chemistry': { category: 'stem' },
        'IB Physics': { category: 'stem' },
        'IB History': { category: 'humanities' },
        'IB Psychology': { category: 'humanities' },
        'IB French B': { category: 'languages' },
        'IB Spanish B': { category: 'languages' },
        'IB Visual Arts': { category: 'arts' },
        'IB Music': { category: 'arts' }
    }
};

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
    'E': 0.0
};

// Weighted bonus points for AP/IB courses (year course values)
const weightedBonus = {
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
    'E': 0.0
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize course selects
    const courseSelects = document.querySelectorAll('.course-select');
    populateCourseSelects(courseSelects);

    // Handle interest tag selection
    const interestTags = document.querySelectorAll('.interest-tag');
    interestTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
        });
    });

    // Handle generate schedule button
    document.getElementById('generate-schedule').addEventListener('click', generateSchedule);

    // Add change listeners for grade and course selects
    document.querySelectorAll('.grade-select, .course-select').forEach(select => {
        select.addEventListener('change', calculateGPA);
    });

    // Initialize Virtual Virginia functionality
    document.getElementById('add-virtual-class').addEventListener('click', addVirtualClass);
    document.getElementById('remove-virtual-class').addEventListener('click', removeVirtualClass);
});

function populateCourseSelects(selects) {
    selects.forEach(select => {
        // Clear existing options except the first one
        while (select.options.length > 1) {
            select.remove(1);
        }

        // Add regular courses
        const regularGroup = document.createElement('optgroup');
        regularGroup.label = 'Regular Courses';
        Object.keys(courses.regular).forEach(course => {
            const option = document.createElement('option');
            option.value = `regular:${course}`;
            option.textContent = course;
            regularGroup.appendChild(option);
        });
        select.appendChild(regularGroup);

        // Add AP courses
        const apGroup = document.createElement('optgroup');
        apGroup.label = 'AP Courses';
        Object.keys(courses.ap).forEach(course => {
            const option = document.createElement('option');
            option.value = `ap:${course}`;
            option.textContent = course;
            apGroup.appendChild(option);
        });
        select.appendChild(apGroup);

        // Add IB courses
        const ibGroup = document.createElement('optgroup');
        ibGroup.label = 'IB Courses';
        Object.keys(courses.ib).forEach(course => {
            const option = document.createElement('option');
            option.value = `ib:${course}`;
            option.textContent = course;
            ibGroup.appendChild(option);
        });
        select.appendChild(ibGroup);
    });
}

function generateSchedule() {
    const currentGPA = parseFloat(document.getElementById('current-gpa').value) || 0;
    const targetGPA = parseFloat(document.getElementById('target-gpa').value) || 0;
    const selectedInterests = Array.from(document.querySelectorAll('.interest-tag.active'))
        .map(tag => tag.dataset.interest);

    if (!currentGPA || !targetGPA || selectedInterests.length === 0) {
        alert('Please enter your current GPA, target GPA, and select at least one academic interest.');
        return;
    }

    const gpaGap = targetGPA - currentGPA;
    const recommendedCourses = [];

    // Determine how many AP/IB courses needed based on GPA gap
    const numAdvancedCourses = Math.ceil(Math.abs(gpaGap) / 0.0488) * (gpaGap > 0 ? 1 : -1);
    
    // Get all available courses that match interests
    const availableCourses = {
        advanced: [],
        regular: []
    };

    // Collect AP/IB courses matching interests
    ['ap', 'ib'].forEach(type => {
        Object.entries(courses[type]).forEach(([name, data]) => {
            if (selectedInterests.includes(data.category)) {
                availableCourses.advanced.push({ name, type, ...data });
            }
        });
    });

    // Collect regular courses matching interests
    Object.entries(courses.regular).forEach(([name, data]) => {
        if (selectedInterests.includes(data.category)) {
            availableCourses.regular.push({ name, type: 'regular', ...data });
        }
    });

    // Shuffle arrays to randomize selection
    availableCourses.advanced.sort(() => Math.random() - 0.5);
    availableCourses.regular.sort(() => Math.random() - 0.5);

    // Select courses based on needed AP/IB ratio
    for (let i = 0; i < 8; i++) {
        if (i < Math.abs(numAdvancedCourses)) {
            const course = availableCourses.advanced[i % availableCourses.advanced.length];
            recommendedCourses.push(course);
        } else {
            const course = availableCourses.regular[i % availableCourses.regular.length];
            recommendedCourses.push(course);
        }
    }

    // Apply recommended courses to schedule
    recommendedCourses.forEach((course, index) => {
        const blockNum = index + 1;
        const courseSelect = document.getElementById(`block${blockNum}-class`);
        const gradeSelect = document.getElementById(`block${blockNum}-grade`);
        
        courseSelect.value = `${course.type}:${course.name}`;
        gradeSelect.value = 'A'; // Default to A for recommended courses
    });

    calculateGPA();
}

function addVirtualClass() {
    const virtualClasses = document.getElementById('virtual-classes');
    const classCount = virtualClasses.children.length;
    
    const virtualClass = document.createElement('div');
    virtualClass.className = 'virtual-class';
    virtualClass.innerHTML = `
        <select class="course-select" id="virtual-class-${classCount + 1}">
            <option value="">Select an AP Course</option>
            ${Object.entries(courses.ap).map(([name, data]) => 
                `<option value="ap:${name}">${name}</option>`
            ).join('')}
        </select>
        <select class="grade-select" id="virtual-grade-${classCount + 1}">
            <option value="">Expected Grade</option>
            <option value="A">A (4.0)</option>
            <option value="A-">A- (3.7)</option>
            <option value="B+">B+ (3.3)</option>
            <option value="B">B (3.0)</option>
            <option value="B-">B- (2.7)</option>
            <option value="C+">C+ (2.3)</option>
            <option value="C">C (2.0)</option>
            <option value="C-">C- (1.7)</option>
            <option value="D+">D+ (1.3)</option>
            <option value="D">D (1.0)</option>
            <option value="E">E (0.0)</option>
        </select>
    `;
    
    virtualClasses.appendChild(virtualClass);
    virtualClass.querySelector('select').addEventListener('change', calculateGPA);
    virtualClass.querySelector('select:last-child').addEventListener('change', calculateGPA);
}

function removeVirtualClass() {
    const virtualClasses = document.getElementById('virtual-classes');
    if (virtualClasses.lastChild) {
        virtualClasses.removeChild(virtualClasses.lastChild);
        calculateGPA();
    }
}

function calculateGPA() {
    const currentGPA = parseFloat(document.getElementById('current-gpa').value) || 0;
    const targetGPA = parseFloat(document.getElementById('target-gpa').value) || 0;
    
    let totalPoints = 0;
    let totalCourses = 0;
    let totalBonus = 0;

    // Process regular blocks
    for (let i = 1; i <= 8; i++) {
        const courseSelect = document.getElementById(`block${i}-class`);
        const gradeSelect = document.getElementById(`block${i}-grade`);
        
        if (courseSelect.value && gradeSelect.value) {
            const [courseType, courseName] = courseSelect.value.split(':');
            const grade = gradeSelect.value;
            
            // Calculate base points
            const basePoints = gradePoints[grade];
            totalPoints += basePoints;
            totalCourses += 1;
            
            // Calculate weighted bonus for AP/IB courses
            if (courseType === 'ap' || courseType === 'ib') {
                const bonus = weightedBonus[grade];
                totalBonus += bonus;
            }
        }
    }

    // Process Virtual Virginia classes
    const virtualClasses = document.getElementById('virtual-classes');
    for (let i = 0; i < virtualClasses.children.length; i++) {
        const courseSelect = virtualClasses.children[i].querySelector('.course-select');
        const gradeSelect = virtualClasses.children[i].querySelector('.grade-select');
        
        if (courseSelect.value && gradeSelect.value) {
            const [courseType, courseName] = courseSelect.value.split(':');
            const grade = gradeSelect.value;
            
            // Calculate base points
            const basePoints = gradePoints[grade];
            totalPoints += basePoints;
            totalCourses += 1;
            
            // All Virtual Virginia classes are AP, so always add bonus
            const bonus = weightedBonus[grade];
            totalBonus += bonus;
        }
    }

    // Calculate GPAs
    const baseGPA = totalCourses > 0 ? (totalPoints / totalCourses) : 0;
    const averageBaseGPA = (baseGPA + currentGPA) / 2;
    const totalGPA = averageBaseGPA + totalBonus;

    // Update display with 4 decimal places
    document.getElementById('starting-gpa').textContent = currentGPA.toFixed(4);
    document.getElementById('base-gpa').textContent = baseGPA.toFixed(4);
    document.getElementById('average-base-gpa').textContent = averageBaseGPA.toFixed(4);
    document.getElementById('weighted-bonus').textContent = totalBonus.toFixed(4);
    document.getElementById('total-gpa').textContent = totalGPA.toFixed(4);

    // Update GPA status with color indicator
    const gpaStatus = document.getElementById('gpa-status');
    if (totalGPA >= targetGPA) {
        gpaStatus.className = 'gpa-status success';
        gpaStatus.textContent = 'Target GPA Achievable! ';
    } else {
        gpaStatus.className = 'gpa-status error';
        gpaStatus.textContent = 'Target GPA Not Yet Achievable';
    }
}
