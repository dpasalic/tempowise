interface Day {
  tasks: {
    title: string,
    description: string,
    start: number,
    duration: number
  }[]
}

class Plan {
  category: string;
  ageGap: string;
  days: Day[];

  constructor(data: Plan) {
    this.category = data.category;
    this.ageGap = data.ageGap;
    this.days = data.days;
  }

  init(): void {}
}