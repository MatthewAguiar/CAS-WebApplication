
const MAIN_FORM = `

  <div class = fade-background></div>

  <form class = "new-CAS-form">

    <span>New CAS Experience</span>
    <h1>Experience Name:</h1>
    <input id = "experience-name-input" type = "text"></input>
    <input id = "CAS Project" type = "checkbox"></input>
    <label for = "CAS Project">CAS Project</label>
    <img id = "cas-project-img" src = "cas.png"/>

    <h2>CAS Strands<h2>
    <div class = "CAS-strand-box">
      <button class = "CAS-strand-buttons" id = "creativity" type = "button"><em class = "big-letters">C</em>reativity</button>
      <button class = "CAS-strand-buttons" id = "action" type = "button"><em class = "big-letters">A</em>ction</button>
      <button class = "CAS-strand-buttons" id = "service" type = "button"><em class = "big-letters">S</em>ervice</button>
    </div>

    <h2 id = "approach-field">Approaches</h2>
    <div class = "cas-approach-box">
      <div>
        <input id = "on-going" type = "checkbox"></input>
        <label class = "standard-approach-class" id = "on-going-label" for = "on-going">Ongoing</label>
      </div>
      <div>
        <input id = "school-based" type = "checkbox"></input>
        <label class = "standard-approach-class" id = "school-based-label" for = "school-based">School-based</label>
      </div>
      <div>
        <input id = "community-based" type = "checkbox"></input>
        <label class = "standard-approach-class" id = "community-based-label" for = "community-based">Community-based</label>
      </div>
      <div>
        <input id = "individual" type = "checkbox"></input>
        <label class = "standard-approach-class" id = "individual-label" for = "individual">Individual</label>
      </div>
    </div>

    <h2 id = "supervisor-field">Supervisor Info<h2>
    <div class = "supervisor-info">
      <div>
        <h3>Supervisor Name</h3>
        <input class = "supervisor-input" type = "text"></input>
      </div>
      <div>
        <h3>Supervisor Email</h3>
        <input class = "supervisor-input" type = "text"></input>
      </div>
      <div>
        <h3>Supervisor Title</h3>
        <input class = "supervisor-input" type = "text"></input>
      </div>
      <div>
        <h3>Supervisor # (Optional)</h3>
        <input class = "supervisor-input" type = "text"></input>
      </div>
    </div>

    <h2 id = "learning-outcomes-label">Learning Outcomes (Choose all that apply)</h2>
    <div class = "learning-outcomes-box">
      <div>
        <ul class = "learning-outcomes">
          <li>
            <input id = "strength-and-growth" type = "checkbox"></input>
            <label class = "standard-approach-class" for = "strength-and-growth">Strength & Growth</label>
          </li>
          <li>
            <input id = "initiative-planning" type = "checkbox"></input>
            <label class = "standard-approach-class" for = "initiative-planning">Initiative & Planning</label>
          </li>
          <li>
            <input id = "collaborative" type = "checkbox"></input>
            <label class = "standard-approach-class" for = "collaborative">Collaboration Skills</label>
          </li>
          <li>
            <input id = "ethics" type = "checkbox"></input>
            <label class = "standard-approach-class" for = "ethics">Ethics of Choices & Actions</label>
          </li>
        <ul>
      </div>
      <div>
        <ul class = "learning-outcomes">
          <li>
            <input id = "challenge-skills" type = "checkbox"></input>
            <label class = "standard-approach-class" for = "challenge-skills">Overcoming Challenges & Developing Skills</label>
          </li>
          <li>
            <input id = "commitment-perserverence" type = "checkbox"></input>
            <label class = "standard-approach-class" for = "commitment-perserverence">Commitment & Perserverence</label>
          </li>
          <li>
            <input id = "global-engagement" type = "checkbox"></input>
            <label class = "standard-approach-class" for = "global-engagement">Global Engagement</label>
          </li>
        </ul>
      </div>
    </div>

    <h2 class = "describe-cas-experience-label">Describe this CAS Experience. Name 2 - 3 goals<h2>
    <textarea></textarea>

    <h2 class = "describe-cas-experience-label">How do you plan to address those learning outcomes?<h2>
    <textarea id = "plan-cas-experience-text"></textarea>

    <input class = "date-enter" type = "date">Enter Start Date</input>

    </form>
`;
//Constants used with JQuery.
const HTML_BODY = 'body'
const NEW_EXPERIENCE_BUTTON = '#add-experience';
const LOGOUT_BUTTON = "#logout-button";
const CALENDAR = "#expand-button";
const MASTER_CALENDAR_NAV = ".master-calendar-nav";
const LINK_GOOGLE_BUTTON = ".google-login-button";
const USER_LOGOUT_BUTTON = document.getElementById("logout-button");

const CAS_ROOT_DATABASE = firebase.database().ref();

class User {

  constructor(name, email)
  {

    this.name = name;
    this.email = email;
    this.URL_encoded_email = email.replace("@", "%40");
    this.user_calendar = '<iframe id = "master-calendar" src="https://calendar.google.com/calendar/embed?src=' + this.URL_encoded_email + '&ctz=America/New_York" frameborder="0" scrolling="no"></iframe>';

    $(LOGOUT_BUTTON).text(this.name);
    $(MASTER_CALENDAR_NAV).append(this.user_calendar);

    console.log(this.name);
    console.log(this.email);
    console.log(this.URL_encoded_email);

  }

  initiate_CAS_event(self)
  {

      $(document).ready(function(){

        $(HTML_BODY).append(MAIN_FORM);
        $("form").append('<iframe id = "setup-dates-calendar" src="https://calendar.google.com/calendar/embed?src=' + self.URL_encoded_email + '&ctz=America/New_York" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe><button id = "add-experience-button" type = "button">Add Event</button>');

      });

  }


  setup_experience_in_google_calendar(self)
  {

  }

  master_calendar(self)
  {
    $(MASTER_CALENDAR_NAV).toggleClass("expand-calendar");

  }

}

//Main Code

firebase.auth().onAuthStateChanged(function(user){

  var user_ID = user.uid;
  var user_directory = CAS_ROOT_DATABASE.child("USERS/Student Branch").child(user_ID);

  user_directory.on('value', function(user_pointer){

    var user_data = user_pointer.val();

    var username = user_data["Name"];
    var user_email = user_data["Email"];

    console.log(user_data);

    var current_user = new User(username, user_email);

    $(CALENDAR).click(function(){
      current_user.master_calendar(current_user);
    });


    $(NEW_EXPERIENCE_BUTTON).click(function(){
      current_user.initiate_CAS_event(current_user);
    });

    $(LINK_GOOGLE_BUTTON).click(function(){
      current_user.link_google_account(current_user);
    });

    $(document).on ('click', '#add-experience-button', function () {
      current_user.setup_experience_in_google_calendar(current_user);
    });

  });

});

USER_LOGOUT_BUTTON.addEventListener('click', function(){
  firebase.auth().signOut();
  document.location.href = 'index.html';
});
