export const getError = (field: string, errors: any[]) => {
  for (let i = 0; i < errors.length; i++) {
    if (errors[i].path[0] === field) {
      return errors[i];
    }
  }

  return undefined;
};

export const convertMinutesToHM = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');

  return `${h}:${m}`;
}

export const convertHMToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};