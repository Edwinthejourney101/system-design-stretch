'use strict';

// Lesson 1: The Client and Server Model.
// Your standalone code and written observations for this lesson live here,
// as code and comments. The site work happens in the stretch-records folder.
//
// Step 4: how many requests did the single page load make? List three by name.
//
// Step 6: which files changed when you added the sixth artist, which did not,
// and why is that separation the point?
//
// Step 7: paste the console error the broken artists.json produced.
//
// Step 8: build one artist object, JSON.stringify() it, log the text,
// JSON.parse() it back, and log one property of the result.
//
// STRETCH, step 9: describe your page as a system. Name the client, name the
// server, and state what the request asked for and what the response carried.

// ==========================================
// 1. Network Tab Observations
// ==========================================
// After opening DevTools and checking the Network tab, the single page load made several requests.
// Three of them by name:
// 1. index.html
// 2. script.js
// 3. artists.json

// ==========================================
// 2. Separation of Concerns Observation
// ==========================================
// When adding the 6th artist, only 'artists.json' changed. 'script.js' did not change.
// This separation is the point because it decouples the data from the logic. The JavaScript 
// dynamically adapts to whatever data it fetches without needing code rewrites.

// ==========================================
// 3. Breaking the JSON (Trailing Comma)
// ==========================================
// After adding a trailing comma to the end of the JSON array, the console threw an error similar to:
// SyntaxError: Unexpected token ']', ... " 12:00" } , ]" is not valid JSON
// (The error disappeared once the comma was removed).

// ==========================================
// 4. JSON Round Trip Exercise
// ==========================================
const singleArtist = { name: "Burna Boy", genre: "Afrobeats", total: "15:20" };

// Convert object to text
const artistText = JSON.stringify(singleArtist);
console.log("Stringified text:", artistText);

// Parse text back to object
const
 parsedArtist = JSON.parse(artistText);
console.log("Parsed Property (Name):", parsedArtist.name);

// ==========================================
// 5. System Description (Optional)
// ==========================================
// Client: The web browser (Chrome) parsing the HTML and executing the JavaScript.
// Server: The Live Server extension running locally.
// Request: The browser's fetch() call sent an HTTP GET request asking for 'artists.json'.
// Response: The server responded with a 200 OK status, carrying the JSON text in its payload.