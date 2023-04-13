class Sample {
  constructor(sample, year_sample) {
    this.sample = sample;
    this.year_sample = year_sample;
  }

  age() {
    let date = new Date();
    return date.getFullYear() - this.year_sample;
  }
}
