export function indexToWord(index: 1 | 2 | 3 | 4) {
  switch (index) {
    case 1:
      return "Перший";
    case 2:
      return "Другий";
    case 3:
      return "Третій";
    case 4:
      return "Четвертий";
  }
}
