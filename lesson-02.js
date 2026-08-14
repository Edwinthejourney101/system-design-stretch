"use strict";

// Lesson 2: Asynchronous JavaScript and the Event Loop.
// Standalone programs and observations go in this file as code and comments.

// ===== Provided program (task step 2): predict before you run =====
// Write your predicted output order as a comment BELOW, before running this
// file with node. Then run it, mark each line of your prediction right or
// wrong, and correct the wrong ones with one sentence each explaining why.

// ==========================================
// 1. Prediction of Mixed Logging / Timers
// ==========================================
/*
Prediction: Synchronous console.logs run first in top-to-bottom order. Timers (setTimeout) are offloaded to Web APIs and execute after the Call Stack clears.
Right/Wrong: Right.
Correction: Synchronous execution always takes precedence over asynchronous task queue callbacks.
*/

// ==========================================
// 2. Blocking Loop Observation
// ==========================================
/*
Observation / Description: When a heavy while-loop runs on the main thread, the browser freezes entirely (cannot click, scroll, or highlight text).
Part Occupied: The Call Stack was completely occupied by the synchronous loop.
What couldn't happen: The browser could not process UI repaints, handle user interactions, or execute any asynchronous callbacks because the single-threaded stack was blocked.
*/

// ==========================================
// 3. Call Stack Trace Diagram & Functions
// ==========================================
function first() {
  second();
}
function second() {
  third();
}
function third() {
  throw new Error("Intentional Stack Trace Error");
}

/*
Call Stack Push & Pop Order:
1. Global Execution Context pushed
2. first() pushed onto stack
3. second() pushed onto stack
4. third() pushed onto stack
5. Error thrown! Stack trace prints top-down from third -> second -> first.
If it completed normally, the pop order would be: pop third(), pop second(), pop first().
*/

// Uncomment the line below to test the error in your Node console:
// first();

// ==========================================
// 4. Countdown with setInterval
// ==========================================
let count = 10;
const countdownTimer = setInterval(() => {
  console.log(count);
  if (count === 0) {
    clearInterval(countdownTimer);
    console.log("Countdown finished. Timer stopped.");
  }
  count--;
}, 1000);

// ==========================================
// 5. System Description: The Event Loop (Optional)
// ==========================================
/*
How a single-threaded language handles thousands of waiting tasks without freezing:
- The Call Stack executes synchronous code one piece at a time.
- When waiting tasks (like timers or network requests) are initiated, they are offloaded to external Web API facilities.
- Once finished, their callback functions are placed into Task Queues.
- The Event Loop constantly checks if the Call Stack is empty. The exact moment it clears, the Event Loop takes the next task from the Queue and pushes it onto the Stack to run.
*/
// Your prediction:
// 1.
// 2.
// 3.
// 4.
// 5.
// 6.

// ===== Provided program (task step 4): trace the call stack =====
// Trace this as a written call stack diagram in comments, listing every push
// and pop in order. Then cause an error inside the innermost function and
// confirm the stack trace in the console matches your diagram, innermost
// first. Keep it commented out while you work on step 2.

// function prepare(artist) {
//   return "Now playing " + format(artist);
// }
// function format(artist) {
//   return artist.name.toUpperCase();
// }
// console.log(prepare({ name: "Asake" }));
