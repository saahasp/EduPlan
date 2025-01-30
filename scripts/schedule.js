// GPA weights for different grades
const gradeWeights = {
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

// Course data with GPA bonuses
const courses = {
  ap: {
    'AP English Language': { baseGPA: 4.0, bonus: 0.0488, careers: ['journalism', 'law', 'education', 'publishing'], category: 'humanities' },
    'AP English Literature': { baseGPA: 4.0, bonus: 0.0488, careers: ['journalism', 'education', 'publishing', 'arts'], category: 'humanities' },
    'AP Calculus AB': { baseGPA: 4.0, bonus: 0.0488, careers: ['engineering', 'finance', 'science', 'technology'], category: 'stem' },
    'AP Calculus BC': { baseGPA: 4.0, bonus: 0.0488, careers: ['engineering', 'finance', 'science', 'technology'], category: 'stem' },
    'AP Biology': { baseGPA: 4.0, bonus: 0.0488, careers: ['medicine', 'research', 'environmental science'], category: 'stem' },
    'AP Chemistry': { baseGPA: 4.0, bonus: 0.0488, careers: ['medicine', 'engineering', 'research'], category: 'stem' },
    'AP Physics': { baseGPA: 4.0, bonus: 0.0488, careers: ['engineering', 'science', 'technology'], category: 'stem' },
    'AP Computer Science': { baseGPA: 4.0, bonus: 0.0488, careers: ['technology', 'engineering', 'data science'], category: 'stem' },
    'AP Statistics': { baseGPA: 4.0, bonus: 0.0488, careers: ['data science', 'research', 'finance'], category: 'stem' },
    'AP World History': { baseGPA: 4.0, bonus: 0.0488, careers: ['law', 'education', 'government'], category: 'humanities' },
    'AP US History': { baseGPA: 4.0, bonus: 0.0488, careers: ['law', 'government', 'education'], category: 'humanities' },
    'AP Psychology': { baseGPA: 4.0, bonus: 0.0488, careers: ['medicine', 'counseling', 'research'], category: 'humanities' },
    'AP French': { baseGPA: 4.0, bonus: 0.0488, careers: ['international relations', 'education', 'tourism'], category: 'languages' },
    'AP Spanish': { baseGPA: 4.0, bonus: 0.0488, careers: ['international relations', 'education', 'tourism'], category: 'languages' }
  },
  ib: {
    'IB Mathematics': { baseGPA: 4.0, bonus: 0.0488, careers: ['engineering', 'finance', 'science'], category: 'stem' },
    'IB Physics': { baseGPA: 4.0, bonus: 0.0488, careers: ['engineering', 'science', 'research'], category: 'stem' },
    'IB Chemistry': { baseGPA: 4.0, bonus: 0.0488, careers: ['medicine', 'engineering', 'research'], category: 'stem' },
    'IB Biology': { baseGPA: 4.0, bonus: 0.0488, careers: ['medicine', 'research', 'environmental science'], category: 'stem' },
    'IB Computer Science': { baseGPA: 4.0, bonus: 0.0488, careers: ['technology', 'engineering', 'data science'], category: 'stem' },
    'IB English': { baseGPA: 4.0, bonus: 0.0488, careers: ['journalism', 'education', 'publishing'], category: 'humanities' },
    'IB History': { baseGPA: 4.0, bonus: 0.0488, careers: ['law', 'government', 'education'], category: 'humanities' },
    'IB Psychology': { baseGPA: 4.0, bonus: 0.0488, careers: ['medicine', 'counseling', 'research'], category: 'humanities' },
    'IB Spanish': { baseGPA: 4.0, bonus: 0.0488, careers: ['international relations', 'education', 'tourism'], category: 'languages' },
    'IB French': { baseGPA: 4.0, bonus: 0.0488, careers: ['international relations', 'education', 'tourism'], category: 'languages' }
  },
  regular: {
    'English 11': { baseGPA: 4.0, bonus: 0, careers: ['journalism', 'education'], category: 'humanities' },
    'English 12': { baseGPA: 4.0, bonus: 0, careers: ['journalism', 'education'], category: 'humanities' },
    'Algebra 2': { baseGPA: 4.0, bonus: 0, careers: ['stem', 'business'], category: 'math' },
    'Pre-Calculus': { baseGPA: 4.0, bonus: 0, careers: ['stem', 'business'], category: 'math' },
    'Biology': { baseGPA: 4.0, bonus: 0, careers: ['medicine', 'science'], category: 'science' },
    'Chemistry': { baseGPA: 4.0, bonus: 0, careers: ['medicine', 'science'], category: 'science' },
    'Physics': { baseGPA: 4.0, bonus: 0, careers: ['engineering', 'science'], category: 'science' }
  }
};

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const studentData = JSON.parse(decodeURIComponent(urlParams.get('data') || '{}'));
const targetGPA = parseFloat(studentData.targetGPA) || 3.5;
const careerInterests = studentData.careers || [];
const academicInterests = studentData.interests || [];

document.addEventListener('DOMContentLoaded', () => {
  loadStudentData();
  initializeSchedule();
  setupEventListeners();
});

// Load student data from local storage
function loadStudentData() {
  const studentData = JSON.parse(localStorage.getItem('studentData')) || {};
  document.getElementById('target-gpa').textContent = studentData.targetGPA?.toFixed(4) || '0.0000';
  
  // Set base GPA to current GPA from form
  document.getElementById('base-gpa').textContent = studentData.currentGPA?.toFixed(4) || '0.0000';
  
  return studentData;
}

// Initialize schedule with course options
function initializeSchedule() {
  const studentData = loadStudentData();
  const blocks = ['block1', 'block2', 'block3', 'block4'];
  
  blocks.forEach(blockId => {
    const select = document.getElementById(`${blockId}-class`);
    populateCourseOptions(select, studentData.interests || []);
  });

  calculateGPA();
}

// Populate course options based on interests
function populateCourseOptions(select, interests) {
  select.innerHTML = '<option value="">Select a course</option>';
  
  // Add AP courses
  const apOptgroup = document.createElement('optgroup');
  apOptgroup.label = 'AP Courses';
  Object.keys(courses.ap).forEach(course => {
    const option = document.createElement('option');
    option.value = course;
    option.textContent = course;
    apOptgroup.appendChild(option);
  });
  select.appendChild(apOptgroup);

  // Add IB courses
  const ibOptgroup = document.createElement('optgroup');
  ibOptgroup.label = 'IB Courses';
  Object.keys(courses.ib).forEach(course => {
    const option = document.createElement('option');
    option.value = course;
    option.textContent = course;
    ibOptgroup.appendChild(option);
  });
  select.appendChild(ibOptgroup);

  // Add regular courses
  const regularOptgroup = document.createElement('optgroup');
  regularOptgroup.label = 'Regular Courses';
  Object.keys(courses.regular).forEach(course => {
    const option = document.createElement('option');
    option.value = course;
    option.textContent = course;
    regularOptgroup.appendChild(option);
  });
  select.appendChild(regularOptgroup);
}

// Set up event listeners for course and grade changes
function setupEventListeners() {
  const blocks = ['block1', 'block2', 'block3', 'block4'];
  
  blocks.forEach(blockId => {
    const courseSelect = document.getElementById(`${blockId}-class`);
    const gradeSelect = document.getElementById(`${blockId}-grade`);
    
    courseSelect.addEventListener('change', () => {
      updateCourseInfo(blockId);
      calculateGPA();
    });
    
    gradeSelect.addEventListener('change', calculateGPA);
  });
}

// Update course info when a course is selected
function updateCourseInfo(blockId) {
  const courseSelect = document.getElementById(`${blockId}-class`);
  const selectedCourse = courseSelect.value;
  const courseInfo = document.querySelector(`#${blockId} .course-info`);
  
  if (selectedCourse) {
    const courseType = selectedCourse.startsWith('AP') ? 'ap' : 
                      selectedCourse.startsWith('IB') ? 'ib' : 'regular';
    const course = courses[courseType][selectedCourse];
    
    if (course) {
      courseInfo.innerHTML = `
        <span class="gpa-impact">GPA Impact: +${course.bonus.toFixed(4)}</span>
        <span class="course-type">Course Type: ${courseType.toUpperCase()}</span>
      `;
    }
  } else {
    courseInfo.innerHTML = `
      <span class="gpa-impact">GPA Impact: +0.0000</span>
      <span class="course-type">Course Type: -</span>
    `;
  }
}

// Calculate GPA based on selected courses and grades
function calculateGPA() {
  const blocks = ['block1', 'block2', 'block3', 'block4'];
  let totalPoints = 0;
  let totalBonus = 0;
  let courseCount = 0;
  
  blocks.forEach(blockId => {
    const courseSelect = document.getElementById(`${blockId}-class`);
    const gradeSelect = document.getElementById(`${blockId}-grade`);
    const selectedCourse = courseSelect.value;
    const selectedGrade = gradeSelect.value;
    
    if (selectedCourse && selectedGrade) {
      const courseType = selectedCourse.startsWith('AP') ? 'ap' : 
                        selectedCourse.startsWith('IB') ? 'ib' : 'regular';
      const course = courses[courseType][selectedCourse];
      
      if (course) {
        const gradePoints = gradeWeights[selectedGrade] || 0;
        totalPoints += gradePoints;
        totalBonus += course.bonus;
        courseCount++;
      }
    }
  });

  const baseGPA = courseCount > 0 ? totalPoints / courseCount : 0;
  const weightedBonus = totalBonus;
  const finalGPA = baseGPA + weightedBonus;
  const targetGPA = parseFloat(document.getElementById('target-gpa').textContent);

  // Update GPA display
  document.getElementById('base-gpa').textContent = baseGPA.toFixed(4);
  document.getElementById('weighted-bonus').textContent = weightedBonus.toFixed(4);
  document.getElementById('final-gpa').textContent = finalGPA.toFixed(4);

  // Update GPA status
  const gpaStatus = document.getElementById('gpa-status');
  if (finalGPA >= targetGPA) {
    gpaStatus.textContent = 'On track to meet your target GPA!';
    gpaStatus.classList.remove('warning');
  } else {
    gpaStatus.textContent = 'Below target GPA - consider more challenging courses';
    gpaStatus.classList.add('warning');
  }
}

// Save schedule to local storage
function saveSchedule() {
  const blocks = ['block1', 'block2', 'block3', 'block4'];
  const schedule = {};
  
  blocks.forEach(blockId => {
    schedule[blockId] = {
      course: document.getElementById(`${blockId}-class`).value,
      grade: document.getElementById(`${blockId}-grade`).value
    };
  });
  
  localStorage.setItem('savedSchedule', JSON.stringify(schedule));
  alert('Schedule saved successfully!');
}

// Regenerate course suggestions based on interests and target GPA
function regenerateSchedule() {
  const studentData = loadStudentData();
  const blocks = ['block1', 'block2', 'block3', 'block4'];
  
  // Get suggested courses based on interests and target GPA
  const suggestions = suggestCourses(studentData);
  
  blocks.forEach((blockId, index) => {
    const courseSelect = document.getElementById(`${blockId}-class`);
    const gradeSelect = document.getElementById(`${blockId}-grade`);
    
    // Set suggested course
    if (suggestions[index]) {
      courseSelect.value = suggestions[index].name;
      gradeSelect.value = 'A'; // Default to A grade for suggestions
      updateCourseInfo(blockId);
    }
  });
  
  calculateGPA();
}

// Suggest courses based on student data
function suggestCourses(studentData) {
  const suggestions = [];
  const availableCourses = [];
  
  // Score each course based on interests and target GPA
  Object.entries(courses).forEach(([type, courseList]) => {
    Object.entries(courseList).forEach(([courseName, courseData]) => {
      let score = 0;
      
      // Match with academic interests
      if (studentData.interests) {
        studentData.interests.forEach(interest => {
          if (courseData.category === interest) {
            score += 3;
          }
        });
      }
      
      // Prioritize AP/IB courses for high target GPA
      if (studentData.targetGPA >= 3.5 && (type === 'ap' || type === 'ib')) {
        score += 2;
      }
      
      // Add course with score
      availableCourses.push({
        name: courseName,
        type,
        score,
        category: courseData.category,
        ...courseData
      });
    });
  });
  
  // Sort by score
  availableCourses.sort((a, b) => b.score - a.score);
  
  // Ensure balanced schedule across categories
  const categories = ['math', 'science', 'humanities', 'language'];
  categories.forEach(category => {
    const courseForCategory = availableCourses.find(course => 
      course.category === category && !suggestions.find(s => s.name === course.name)
    );
    if (courseForCategory) {
      suggestions.push(courseForCategory);
    }
  });
  
  // Fill remaining slots with top-scored courses
  while (suggestions.length < 4) {
    const nextCourse = availableCourses.find(course => 
      !suggestions.find(s => s.name === course.name)
    );
    if (nextCourse) {
      suggestions.push(nextCourse);
    } else {
      break;
    }
  }
  
  return suggestions;
}

// Email schedule to student
function emailSchedule() {
  const studentData = loadStudentData();
  const blocks = ['block1', 'block2', 'block3', 'block4'];
  
  // Collect schedule information
  const scheduleInfo = blocks.map(blockId => {
    const courseSelect = document.getElementById(`${blockId}-class`);
    const gradeSelect = document.getElementById(`${blockId}-grade`);
    return {
      block: blockId,
      course: courseSelect.value,
      expectedGrade: gradeSelect.value
    };
  });
  
  // Calculate GPA information
  const baseGPA = parseFloat(document.getElementById('base-gpa').textContent);
  const weightedBonus = parseFloat(document.getElementById('weighted-bonus').textContent);
  const finalGPA = parseFloat(document.getElementById('final-gpa').textContent);
  
  // Create email body
  const emailBody = `
Dear ${studentData.name},

Here is your selected course schedule:

${scheduleInfo.map(info => `${info.block}: ${info.course} (Expected Grade: ${info.expectedGrade})`).join('\n')}

GPA Information:
- Current GPA: ${baseGPA.toFixed(4)}
- Weighted Bonus: ${weightedBonus.toFixed(4)}
- Projected Final GPA: ${finalGPA.toFixed(4)}
- Target GPA: ${studentData.targetGPA.toFixed(4)}

Student Information:
- Student ID: ${studentData.studentId}
- School: ${studentData.school}
- Graduation Year: ${studentData.graduationYear}
- Counselor: ${studentData.counselor}

Thank you for using EduPlan!
  `.trim();

  // Create mailto link
  const mailtoLink = `mailto:${studentData.email}?subject=Your EduPlan Schedule&body=${encodeURIComponent(emailBody)}`;
  
  // Open default email client
  window.location.href = mailtoLink;
}
