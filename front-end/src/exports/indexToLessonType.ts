export function indexToLessonType(index: 1 | 2 | 3) {
  switch (index) {
    case 1:
      return "Лекція";
    case 2:
      return "Лабораторна";
    case 3:
      return "Практика";
  }
}