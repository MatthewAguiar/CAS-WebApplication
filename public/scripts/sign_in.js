

const EMAIL_SIGNIN_ENTRY = document.getElementById('username-entry');
const PASSWORD_SIGNIN_ENTRY = document.getElementById('password-entry');
const SIGNIN_BUTTON = document.getElementById('sign-in');
const ENROLL_BUTTON = document.getElementById('enroll');
const ERROR_MESSAGE = "<h1 id = 'error-message'>This account does not exist. Please click enroll to make one.</h1>";

SIGNIN_BUTTON.addEventListener('click', function(){

  var username = EMAIL_SIGNIN_ENTRY.value;
  var password =  PASSWORD_SIGNIN_ENTRY.value;
  //console.log(username);
  //console.log(password);

  var sign_in = firebase.auth().signInWithEmailAndPassword(username, password);
  sign_in.catch(function(error){
    $('body').append(ERROR_MESSAGE);
  });

  firebase.auth().onAuthStateChanged(function(user){
    if(user)
    {
      console.log(user);
      document.location.href = "portfollio.html";
    }
    else
    {
      console.log("Not logged in!");
    }
  });

});

ENROLL_BUTTON.addEventListener('click', function(){
  document.location.href = 'enroll.html';
});
