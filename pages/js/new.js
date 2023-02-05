const buttons = document.querySelectorAll(".continue-btn");
const overlay = document.querySelector(".overlay");
const msg = document.querySelector(".overlay-message");
const main = document.querySelector(".main-section");
const htmlCourse = document.querySelector(".html-course");
const cssCourse = document.querySelector(".css-course");
const jsCourse = document.querySelector(".js-course");
const backBtns = document.querySelectorAll(".back");
const courses = document.querySelectorAll(".course-section");
const modeBtn = document.querySelector(".mode-switch");
const r = document.querySelector(":root");
const markBtns = document.querySelectorAll(".mark");
let mode = "light";

const htmlCourses = document.querySelectorAll(".course.html");
const cssCourses = document.querySelectorAll(".course.css");
const jsCourses = document.querySelectorAll(".course.js");

const allCourses = [htmlCourses, cssCourses, jsCourses];

const progressBars = document.querySelectorAll(".progress-bar span");
const progressText = document.querySelectorAll(".progress-text");

const updateCourses = () => {
  for (let i = 0; i < progressBars.length; i++) {
    const course = allCourses[i];
    const length = course.length - 1;
    let completed = 0;
    for (let j = 0; j < course.length; j++) {
      if (course[j].classList[2]) {
        completed += 1;
      }
    }
    progressText[i].innerText = `${completed}/${length} Lessons Completed`;
    progressBars[i].style.width = (completed / length) * 200 + "px";
  }
};

updateCourses();

const showCourse = (course) => {
  course.style.transform = "translateX(0px)";
  course.style.display = "block";
};

const hideCourse = (course) => {
  course.style.transform = "translateX(150%)";
  course.style.display = "none";
};

modeBtn.addEventListener("click", () => {
  if (mode === "light") {
    mode = "dark";
    modeBtn.classList.remove("fa-moon");
    modeBtn.classList.add("fa-sun");
    r.style.setProperty("--mode-hover", "#ead94c");
    r.style.setProperty("--header", "#121212");
    r.style.setProperty("--bg", "#1c1c1c");
    r.style.setProperty("--text", "#ffffff");
    r.style.setProperty("--dark-grey", "rgba(255, 255, 255, 0.7)");
  } else {
    mode = "light";
    modeBtn.classList.remove("fa-sun");
    modeBtn.classList.add("fa-moon");
    r.style.setProperty("--mode-hover", "#203297");
    r.style.setProperty("--header", "#dbdbdb");
    r.style.setProperty("--bg", "#f0f0f0");
    r.style.setProperty("--text", "#050505");
    r.style.setProperty("--dark-grey", "rgba(5, 5, 5, 0.7)");
  }
});

for (let btn of buttons) {
  let courseToShow = btn.classList[1];
  switch (courseToShow) {
    case "html":
      courseToShow = htmlCourse;
      break;
    case "css":
      courseToShow = cssCourse;
      break;
    case "js":
      courseToShow = jsCourse;
      break;
  }
  btn.addEventListener("click", () => {
    overlay.style.transformOrigin = "right";
    overlay.style.transform = "scaleX(1)";
    msg.innerText = "Loading Course...";
    setTimeout(() => {
      msg.style.opacity = 1;
      hideCourse(main);
    }, 500);
    setTimeout(() => {
      msg.style.opacity = 0;
      showCourse(courseToShow);
    }, 2500);
    setTimeout(() => {
      overlay.style.transformOrigin = "left";
      overlay.style.transform = "scaleX(0)";
    }, 3000);
  });
}

for (let btn of backBtns) {
  btn.addEventListener("click", () => {
    overlay.style.transformOrigin = "right";
    overlay.style.transform = "scaleX(1)";
    msg.innerText = "Loading Courses...";
    setTimeout(() => {
      msg.style.opacity = 1;
      for (let course of courses) {
        hideCourse(course);
      }
    }, 500);
    setTimeout(() => {
      msg.style.opacity = 0;
      showCourse(main);
    }, 2500);
    setTimeout(() => {
      overlay.style.transformOrigin = "left";
      overlay.style.transform = "scaleX(0)";
    }, 3000);
  });
}

for (let btn of markBtns) {
  btn.addEventListener("click", () => {
    const parentLesson = btn.parentElement.parentElement;
    const checked = parentLesson.classList[2] ? true : false;
    if (checked) {
      parentLesson.classList.remove("checked");
      btn.innerText = "Mark as Done";
    } else {
      parentLesson.classList.add("checked");
      btn.innerText = "Mark as Incomplete";
    }
    updateCourses();
  });
}

