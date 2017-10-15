
// Client ID and API key from the Developer Console
var CLIENT_ID = '230234241622-bnj20kedhvtdkjr87jn7hplpe0ul8oel.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://script.googleapis.com/$discovery/rest?version=v1"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive https://mail.google.com/ https://www.googleapis.com/auth/calendar';

/* STEP 4: LOAD OAUTH 2.0 MODULE AND INITIALIZE CLIENT MODULE FOR DEALING WITH API REQUESTS
   1) Although the function initClient() below in STEP 5 loads the OAUTH 2.0 or, auth2 library, doing so in this gapi.load() method is more efficient for the browser meaning the first parameter is optional.
   2) Next we call the initClient() CALLBACK function below to properly establish a connection between this JavaScript code and Google's API once the OAuth 2.0 client library had been lodaed.

   NOTE: A callback function is just a function that is called as a parameter from another function. EX: initClient() called from .load() function.
 */

function handleClientLoad() {
  gapi.load('client:auth2', initClient); //General syntax for gapi.load(): gapi.load(libraries, callbackFunction);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */

 /* STEP 5: THE FUNCTION BELOW IS A CALLBACK FUNCTION FOR THE FUNCTION DIRECTLY THAT LINKS YOUR GOOGLE CLOUD PLATFORM PROJECT TO THIS document
    1)
 */
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  });
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Load the API and make an API call.  Display the results on the screen.
 */

function callScriptFunction(function_def, list_of_function_parameters) {
  var scriptId = "Mlqc0uE_z11lVgypf1kplBen9-6EVBqgt";

  switch(function_def)
  {
    case 'add_calendar_event':

      gapi.client.script.scripts.run({
        'scriptId': scriptId,
        'resource': {
          'function': function_def,
          'parameters': [list_of_function_parameters[0], list_of_function_parameters[1], list_of_function_parameters[2]]
        }
      }).then(function(resp) {
        var result = resp.result;
        if (result.error && result.error.status) {
          // The API encountered a problem before the script
          // started executing.
          //appendPre('Error calling API:');
          //appendPre(JSON.stringify(result, null, 2));
          console.log('Error calling API:');
          console.log(JSON.stringify(result, null, 2));
        } else if (result.error) {
          // The API executed, but the script returned an error.

          // Extract the first (and only) set of error details.
          // The values of this object are the script's 'errorMessage' and
          // 'errorType', and an array of stack trace elements.
          var error = result.error.details[0];
          //appendPre('Script error message: ' + error.errorMessage);
          console.log('Script error message: ' + error.errorMessage);
          if (error.scriptStackTraceElements) {
            // There may not be a stacktrace if the script didn't start
            // executing.
            //appendPre('Script error stacktrace:');
            console.log('Script error stacktrace:');
            for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
              var trace = error.scriptStackTraceElements[i];
              //appendPre('\t' + trace.function + ':' + trace.lineNumber);
              console.log('\t' + trace.function + ':' + trace.lineNumber);
            }
          }
        } else {
          // The structure of the result will depend upon what the Apps
          // Script function returns. Here, the function returns an Apps
          // Script Object with String keys and values, and so the result
          // is treated as a JavaScript object (folderSet).

          //var folderSet = result.response.result;
          //if (Object.keys(folderSet).length == 0) {
              //appendPre('No folders returned!');
          //} else {
            //appendPre('Folders under your root folder:');
            //Object.keys(folderSet).forEach(function(id){
              //appendPre('\t' + folderSet[id] + ' (' + id  + ')');
            //});
          //}
        }
      });
      break;

    case 'change_calendar_dates':

      gapi.client.script.scripts.run({
        'scriptId': scriptId,
        'resource': {
          'function': function_def,
          'parameters': [list_of_function_parameters[0], list_of_function_parameters[1], list_of_function_parameters[2], list_of_function_parameters[3], list_of_function_parameters[4]]
        }
      }).then(function(resp) {
        var result = resp.result;
        if (result.error && result.error.status) {
          // The API encountered a problem before the script
          // started executing.
          //appendPre('Error calling API:');
          //appendPre(JSON.stringify(result, null, 2));
          console.log('Error calling API:');
          console.log(JSON.stringify(result, null, 2));
        } else if (result.error) {
          // The API executed, but the script returned an error.

          // Extract the first (and only) set of error details.
          // The values of this object are the script's 'errorMessage' and
          // 'errorType', and an array of stack trace elements.
          var error = result.error.details[0];
          //appendPre('Script error message: ' + error.errorMessage);
          console.log('Script error message: ' + error.errorMessage);
          if (error.scriptStackTraceElements) {
            // There may not be a stacktrace if the script didn't start
            // executing.
            //appendPre('Script error stacktrace:');
            console.log('Script error stacktrace:');
            for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
              var trace = error.scriptStackTraceElements[i];
              //appendPre('\t' + trace.function + ':' + trace.lineNumber);
              console.log('\t' + trace.function + ':' + trace.lineNumber);
            }
          }
        } else {
          // The structure of the result will depend upon what the Apps
          // Script function returns. Here, the function returns an Apps
          // Script Object with String keys and values, and so the result
          // is treated as a JavaScript object (folderSet).

          //var folderSet = result.response.result;
          //if (Object.keys(folderSet).length == 0) {
              //appendPre('No folders returned!');
          //} else {
            //appendPre('Folders under your root folder:');
            //Object.keys(folderSet).forEach(function(id){
              //appendPre('\t' + folderSet[id] + ' (' + id  + ')');
            //});
          //}
        }
      });
      break;

    case 'send_email_to_supervisor':

    gapi.client.script.scripts.run({
      'scriptId': scriptId,
      'resource': {
        'function': function_def,
        'parameters': [list_of_function_parameters[0], list_of_function_parameters[1], list_of_function_parameters[2], list_of_function_parameters[3]]
      }
    }).then(function(resp) {
      var result = resp.result;
      if (result.error && result.error.status) {
        // The API encountered a problem before the script
        // started executing.
        //appendPre('Error calling API:');
        //appendPre(JSON.stringify(result, null, 2));
        console.log('Error calling API:');
        console.log(JSON.stringify(result, null, 2));
      } else if (result.error) {
        // The API executed, but the script returned an error.

        // Extract the first (and only) set of error details.
        // The values of this object are the script's 'errorMessage' and
        // 'errorType', and an array of stack trace elements.
        var error = result.error.details[0];
        //appendPre('Script error message: ' + error.errorMessage);
        console.log('Script error message: ' + error.errorMessage);
        if (error.scriptStackTraceElements) {
          // There may not be a stacktrace if the script didn't start
          // executing.
          //appendPre('Script error stacktrace:');
          console.log('Script error stacktrace:');
          for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
            var trace = error.scriptStackTraceElements[i];
            //appendPre('\t' + trace.function + ':' + trace.lineNumber);
            console.log('\t' + trace.function + ':' + trace.lineNumber);
          }
        }
      } else {
        // The structure of the result will depend upon what the Apps
        // Script function returns. Here, the function returns an Apps
        // Script Object with String keys and values, and so the result
        // is treated as a JavaScript object (folderSet).

        //var folderSet = result.response.result;
        //if (Object.keys(folderSet).length == 0) {
            //appendPre('No folders returned!');
        //} else {
          //appendPre('Folders under your root folder:');
          //Object.keys(folderSet).forEach(function(id){
            //appendPre('\t' + folderSet[id] + ' (' + id  + ')');
          //});
        //}
      }
    });

  }




}
