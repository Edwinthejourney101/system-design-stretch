"use strict";

// Lesson 4: HTTP and the Fetch API.
// Recorded observations go in this file as comments. The loader and form
// work happens in stretch-records/script.js, against the server you run
// with json-server.
//
// Step 2: both status codes and the response Content-Type.
//
// Step 3: ok, status, and one Access-Control-Allow header from the Network tab.
//
// Step 4: show that the Promise fulfilled anyway on the wrong path.
//
// Step 5: how did the refused connection differ from the 404?
//
// STRETCH, step 8: the public API's endpoint address, the method, one
// parameter, the response shape you would code against, and one stated limit.

// ==========================================
// 2. Proving the Trap (Wrong Path)
// ==========================================
/*
Test: Fetching 'http://localhost:3000/bad-path'
Observation: 
- fetch() still returns a fulfilled Promise, even though the status is 404.
- response.ok is 'false'.
- Fix: You must manually check 'if (!response.ok)' and throw an Error to trigger the catch block.
*/


// ==========================================
// 3. POST Request Observations
// ==========================================
/*
- Method: POST
- Headers: { 'Content-Type': 'application/json' }
- Body: JSON.stringify({ name, genre, total })
- Result: Server responded with status 201 Created, confirming the resource was added.
- Persistence: Refreshing the page (or opening a second browser tab to localhost:3000/artists) shows the new artist remains stored in artists.json.
*/