

var email_signin_entry = document.getElementById('username-entry');
var password_signin_entry = document.getElementById('password-entry');
var signin_button = document.getElementById('sign-in');
var enroll_button = document.getElementById('enroll');

signin_button.addEventListener('click', function(){

  var username = email_signin_entry.value;
  var password = password_signin_entry.value;
  //console.log(username);
  //console.log(password);
  var sign_in = firebase.auth().signInWithEmailAndPassword(username, password);
  sign_in.catch(function(error){
    console.log(e.message)
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser)
    {
      console.log(firebaseUser);
      document.location.href = "portfollio.html";
    }
    else
    {
      console.log("Not logged in!");
    }
  });

});

enroll_button.addEventListener('click', function(){
  document.location.href = 'enroll.html';
});
