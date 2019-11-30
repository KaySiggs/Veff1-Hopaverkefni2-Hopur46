/* eslint-disable no-unused-vars */
import Lecture from './lib/lecture';
import LecturePage from './lib/lecture-page';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const lecturePage = new LecturePage();
    lecturePage.load();
  } else {
    const lecture = new Lecture();
    lecture.load();
  }
});
