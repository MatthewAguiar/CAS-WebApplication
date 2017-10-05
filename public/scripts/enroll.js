
const USERNAME_CREATE_INPUT = document.getElementById('username-create');
const EMAIL_CREATE_INPUT = document.getElementById('email-create');
const PASSWORD_CREATE_INPUT = document.getElementById('password-create');
const PASSWORD_CONFIRM_INPUT = document.getElementById('password-confirm');
const CREATE_ACCOUNT_BUTTON = document.getElementById('create-account');

const NUMBERS_STRING = "0123456789";
const LETTERS_STRING = "abcdefghijklmnopqrstuvwxwz";
const ERROR_MESSAGE = "<h1 class = 'email-error error-formatting'>Your username or password is incorrect or not valid. Make sure you fill in all the fields. Password must be at least 8 characters long.</h1>";
const NON_MATCHING_PASSWORD_MESSAGE = `<h1 class = 'email-error error-formatting'>Please try again. Make sure the email you enter above is the SAME as the one you choose to link to Google with.</h1>`;

const CAS_ROOT_DATABASE = firebase.database().ref();


function valid_password(password, confirmed_password)
{

  var numbers = false;

  if(password === confirmed_password && (password.length >= 8 && confirmed_password.length >= 8))
  {
    for(var i in password)
    {
      for(var j in NUMBERS_STRING)
      {
        if(password[i] === NUMBERS_STRING[j])
        {
          numbers = true;
          break;
        }
      }
      if(numbers)
      {
        break;
      }
    }
    if(!numbers)
    {
      return false;
    }
    else
    {
      for(var n in password)
      {
        for(var m in LETTERS_STRING)
        {
          if(password[n] === LETTERS_STRING[m])
          {
            return true;
          }
        }
      }
      return false;
    }
  }
  else
  {
    return false;
  }
}

function populate_user_database(user_ID, user_name, password, email)
{

  var student_branch = "USERS/Student Branch/";
  var teacher_branch = "USERS/Teachers Branch/";

  CAS_ROOT_DATABASE.child(student_branch + user_ID).child("Name").set(user_name);
  CAS_ROOT_DATABASE.child(student_branch + user_ID).child("Password").set(password);
  CAS_ROOT_DATABASE.child(student_branch + user_ID).child("Email").set(email);
}

//Main Code

var error_state = false;

CREATE_ACCOUNT_BUTTON.addEventListener('click', function(){

  var common_name = USERNAME_CREATE_INPUT.value;
  var user_email = EMAIL_CREATE_INPUT.value;
  var password = PASSWORD_CREATE_INPUT.value;
  var password_verify = PASSWORD_CONFIRM_INPUT.value;
  var valid = false;

  console.log(user_email);

  if(valid_password(password, password_verify) && common_name != "")
  {

    var sturgis_address = "@gmail.com";

    for(var i = 0; i < user_email.length; i++)
    {
      if(user_email.startsWith(sturgis_address, i))
      {

        var create_account = firebase.auth().createUserWithEmailAndPassword(user_email, password);
        create_account.catch(function(error){
          console.log(error);
        });

        firebase.auth().onAuthStateChanged(function(current_user_profile){
          if(current_user_profile)
          {

            var user_ID = current_user_profile.uid;
            populate_user_database(user_ID, common_name, password, user_email);

            var link_google = new firebase.auth.GoogleAuthProvider();
            current_user_profile.linkWithRedirect(link_google);

          }
        });

        valid = true;
        break;
      }
    }

  }

  if(!valid)
  {
    if(!error_state)
    {
      $(document).ready(function(){
        $('body').append(ERROR_MESSAGE);
      });
      error_state = true;
    }
    else
    {
      $(document).ready(function(){
        $('.email-error').remove();
        $('body').append(ERROR_MESSAGE);
      });
    }
  }
});


firebase.auth().getRedirectResult().then(function(result){
  if(result.credential)
  {

    var credential = result.credential;
    var user = result.user;

    var google_email = user["providerData"]["0"]["email"];
    var user_email = user["providerData"]["1"]["email"];
    console.log(user_email);
    console.log(google_email);
    console.log(credential);
    console.log(user);

    if(user_email === google_email)
    {
      document.location.href = "portfollio.html";
    }
    else
    {

      $('body').append(NON_MATCHING_PASSWORD_MESSAGE);

      var user_data = firebase.auth().currentUser;

      user_data.delete().then(function() {
        // User deleted.
      }).catch(function(error) {
        // An error happened.
      });

    }

  }
}).catch(function(error) {
  console.log(error);
});
