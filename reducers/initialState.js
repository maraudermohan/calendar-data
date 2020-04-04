import bigCatalog from '../data/catalog';

// A random color generator to save a unique color for each course
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default {
  catalog: bigCatalog.courses.map((value) => ({ ...value, 'bg-color': getRandomColor() })),
  calendarModel: {
    name: "Mohan's Calendar",
    day1: [],
    day2: [],
    day3: [],
    day4: [],
    day5: [],
  },
  currentSelection: {
    currentTask: '',
    currentCourse: '',
  },
};
