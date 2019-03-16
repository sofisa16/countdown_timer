"use strict";

class CountdownTimer {
  constructor(days, hours, minutes, seconds, outputFunction) {
    this.days = this.delimitNumber(days, 0, Number.MAX_SAFE_INTEGER);
    this.hours = this.delimitNumber(hours, 0, 23);
    this.minutes = this.delimitNumber(minutes, 0, 59);
    this.seconds = this.delimitNumber(seconds, 0, 59);
    this.intervalId = 0;
    let defaultFunction = (id, amount) => {
      console.log(`${id} ${amount}`);
    };
    this.outputFunction = outputFunction ? outputFunction : defaultFunction;
  }

  /**
   * min : inclusive minimum range's value
   * max : inclusive maximum range's value
   * n : the number that is going to be delimited.
   */
  delimitNumber(n, min, max) {
    if(n && min <= n && n <= max) {
      return n;
    }
    return 0;
  }

  decreaseSeconds() {
    if (this.seconds >= 0) {
      this.seconds -= 1;
    }
    if (this.seconds === -1) {
      this.seconds = 59;
      this.decreaseMinutes();
    }
    else if (!this.days && !this.hours && !this.minutes && !this.seconds) {
      clearInterval(this.intervalId);
    }
    this.outputFunction("seconds", this.seconds);
  }

  decreaseMinutes() {
    if (this.minutes >= 0) {
      this.minutes -= 1;
    }
    if (this.minutes === -1) {
      this.minutes = 59;
      this.decreaseHours();
    }
    this.outputFunction("minutes", this.minutes);
  }

  decreaseHours() {
    if (this.hours >= 0) {
      this.hours -= 1;
    }
    if (this.hours === -1) {
      this.hours = 23;
      this.decreaseDays();
    }
    this.outputFunction("hours", this.hours);
  }

  decreaseDays() {
    if (this.days >= 0) {
      this.days -= 1;
    }
    this.outputFunction("days", this.days);
  }

  run() {
    this.outputFunction("seconds", this.seconds);
    this.outputFunction("minutes", this.minutes);
    this.outputFunction("hours", this.hours);
    this.outputFunction("days", this.days);

    if (this.days || this.hours || this.minutes || this.seconds) {
      this.intervalId = setInterval(
        () => {
          this.decreaseSeconds();
        },
      1000);
    }
  }
}

let makeWordSingular = (id, word, amount) => {
  if (amount === 1) {
    document.getElementById(id).innerHTML = word;
  }
  else if (amount + 1 === 1) {
    document.getElementById(id).innerHTML = word + "s";
  }
};

let setTime = (id, amount) => {
  document.getElementById(id).innerHTML = amount;
  if (id === "seconds") {
    makeWordSingular("seconds-unit-name", "Second", amount);
  }
  else if (id === "minutes") {
    makeWordSingular("minutes-unit-name", "Minute", amount);
  }
  else if (id === "hours") {
    makeWordSingular("hours-unit-name", "Hour", amount);
  }
  else {
    makeWordSingular("days-unit-name", "Day", amount);
  }
};

/* Starting unit name labels. */
makeWordSingular("seconds-unit-name", "Second", 0);
makeWordSingular("minutes-unit-name", "Minute", 0);
makeWordSingular("hours-unit-name", "Hour", 0);
makeWordSingular("days-unit-name", "Day", 0);

/* Input */
let days = 0;
let hours = 0;
let minutes = 1;
let seconds = 10;

const countdownTimer = new CountdownTimer(days, hours, minutes, seconds, setTime);
countdownTimer.run();
