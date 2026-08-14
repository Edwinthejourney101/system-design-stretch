"use strict";

// Lesson 3: Promises, async, and await.
// Standalone programs and observations go in this file as code and comments.
// The loader work happens in stretch-records/script.js.
//
// Step 3, the ordering puzzle: write a program mixing plain logs, a zero
// delay timer, and a settled Promise reaction. Predict the full output order
// in comments before running, then explain in one sentence why the Promise
// beat the timer.
//
// Step 6: paste the final rethrown message that reached the top.

// ==========================================
// 1. Ordering Puzzle: Logs vs Timers vs Promises
// ==========================================
/*
Prediction: 
1. Log "Start"
2. Log "End"
3. Log "Promise" (Microtask)
4. Log "Timeout" (Task Queue)

Reason: Promises are microtasks and execute immediately after the current script finishes, 
before the event loop moves on to the Task Queue where setTimeout callbacks reside.
*/

console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

// ==========================================
// 2. Custom Error Class & Throwing
// ==========================================
class MissingDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingDataError";
  }
}

function checkArtist(artist) {
  if (!artist.name) {
    throw new MissingDataError("Artist record is missing a name!");
  }
}

try {
  checkArtist({ genre: "Jazz" });
} catch (e) {
  console.log(`Caught Error: ${e.message}`);
}

// ==========================================
// 3. Rethrowing
// ==========================================
function fetchData() {
  try {
    throw new Error("Network timeout");
  } catch (err) {
    // Add context and rethrow
    throw new Error(`[Page: Artists] [Op: Fetch] Original: ${err.message}`);
  }
}

try {
  fetchData();
} catch (finalErr) {
  console.log("Final message caught:", finalErr.message);
  // Final message: [Page: Artists] [Op: Fetch] Original: Network timeout
}

// ==========================================
// 4. Promise.all vs Promise.allSettled
// ==========================================
const task1 = new Promise((resolve) =>
  setTimeout(() => resolve("Task 1 Done"), 100),
);
const task2 = Promise.reject("Task 2 Failed");
const task3 = new Promise((resolve) =>
  setTimeout(() => resolve("Task 3 Done"), 300),
);

async function runTasks() {
  console.log("--- Testing Promise.all ---");
  try {
    await Promise.all([task1, task2, task3]);
  } catch (e) {
    console.log("Promise.all failed as expected:", e);
  }

  console.log("--- Testing Promise.allSettled ---");
  const results = await Promise.allSettled([task1, task2, task3]);
  console.log(results);
}

runTasks();
