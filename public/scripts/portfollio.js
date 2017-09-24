
var MAIN_FORM = `

  <div class = fade-background></div>

  <form class = "new-CAS-form">

    <span>New CAS Experience</span>
    <h1>Experience Name:</h1>
    <input id = "experience-name-input" type = "text"></input>
    <input id = "CAS-project" type = "checkbox"></input>
    <label for = "CAS-project">CAS Project</label>
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
        <input id = "supervisor-name" class = "supervisor-input" type = "text"></input>
      </div>
      <div>
        <h3>Supervisor Email</h3>
        <input id = "supervisor-email" class = "supervisor-input" type = "text"></input>
      </div>
      <div>
        <h3>Supervisor Title</h3>
        <input id = "supervisor-title" class = "supervisor-input" type = "text"></input>
      </div>
      <div>
        <h3>Supervisor # (Optional)</h3>
        <input id = "supervisor-phone" class = "supervisor-input" type = "text"></input>
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
    <textarea id = "describe-experience-text"></textarea>

    <h2 class = "describe-cas-experience-label">How do you plan to address those learning outcomes?<h2>
    <textarea id = "plan-cas-experience-text"></textarea>

    <div class = "calendar-initiate-data">
      <div>
        <label for = "date-start">Starting Date: </label>
        <input class = "date-enter" id = "date-start" type = "date"></input>
      </div>
      <div>
      <label for = "date-end">Ending Date: </label>
      <input class = "date-enter" id = "date-end" type = "date"></input>
      </div>
    </div>

    </form>
`;

const DATA_FIELD_ARRAY = [
["Experience Name", "CAS Project", "Creativiy Strand", "Action Strand", "Service Strand", "Ongoing", "School Based", "Community Based", "Individual",
"Supervisor Name", "Supervisor Email", "Supervisor Title", "Supervisor Phone", "Strength and Growth", "Initiative and Planning", "Collaborative", "Ethics", "Challenge and Skill Building",
"Commitment and Perserverence", "Global Engagement", "Experience Description", "Experience Plans", "Start Date", "End Date"],
["#experience-name-input", "#CAS-project", "#creativity",
"#action", "#service", "#on-going", "#school-based", "#community-based", "#individual", "#supervisor-name", "#supervisor-email", "#supervisor-title", "#supervisor-phone",
"#strength-and-growth", "#initiative-planning", "#collaborative", "#ethics", "#challenge-skills", "#commitment-perserverence", "#global-engagement", "#describe-experience-text",
"#plan-cas-experience-text", "#date-start", "#date-end"]
];

const CAS_BUTTON_CLASS = ".CAS-strand-buttons";
const CREATIVITY_STRAND = DATA_FIELD_ARRAY[1][2];
const ACTION_STRAND = DATA_FIELD_ARRAY[1][3];
const SERVICE_STRAND = DATA_FIELD_ARRAY[1][4];

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
    this.user_calendar = '<iframe class = "master-calendar" src="https://calendar.google.com/calendar/embed?src=' + this.URL_encoded_email + '&ctz=America/New_York" frameborder="0" scrolling="no"></iframe>';

    $(LOGOUT_BUTTON).text(this.name);
    $(MASTER_CALENDAR_NAV).append(this.user_calendar);

    console.log(this.name);
    console.log(this.email);
    console.log(this.URL_encoded_email);

  }

  master_calendar()
  {
    $(MASTER_CALENDAR_NAV).toggleClass("expand-calendar");
  }

  init_CAS_event()
  {

    $(HTML_BODY).append(MAIN_FORM);
    $("form").append('<iframe id = "setup-dates-calendar" src="https://calendar.google.com/calendar/embed?src=' + this.URL_encoded_email + '&ctz=America/New_York" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe><button id = "experience-add" class = "blue-button-style" style = "display: block margin-top: 1.5rem" type = "button">Add Event</button>');

  }

  manage_CAS_strands_css(strand, background_color, opacity, shadow)
  {
    $(strand).css("background-color", background_color);
    $(strand).css("opacity", opacity);
    $(strand).css("box-shadow", shadow);
  }

  save_new_experience_data(directory, creativity_boolean, action_boolean, service_boolean)
  {

    if(DATA_FIELD_ARRAY[0].length === DATA_FIELD_ARRAY[1].length)
    {

      var experience_name = $(DATA_FIELD_ARRAY[1][0]).val();

      for(var i = 0; i < DATA_FIELD_ARRAY[1].length; i++)
      {

        var field_name = DATA_FIELD_ARRAY[0][i];
        var input_field = $(DATA_FIELD_ARRAY[1][i]);

        switch(i)
        {
          case 2:
            directory.child(experience_name).child(field_name).set(creativity_boolean);
            break;

          case 3:
            directory.child(experience_name).child(field_name).set(action_boolean);
            break;

          case 4:
            directory.child(experience_name).child(field_name).set(service_boolean);
            break;

          default:
            if((input_field.attr("type") === "checkbox") && !input_field.is(":checked"))
            {
              directory.child(experience_name).child(field_name).set("off");
            }
            else
            {
              directory.child(experience_name).child(field_name).set(input_field.val());
            }

        }

      }
    }
    else
    {
      console.log("ERROR!");
    }

    $(MAIN_FORM).remove();

  }

  init_new_google_calendar_event()
  {
    callScriptFunction('add_calendar_event');
  }

}

//Main Code

var creativity_boolean = false;
var action_boolean = false;
var service_boolean = false;

firebase.auth().onAuthStateChanged(function(user){

  var user_ID = user.uid;
  var user_directory = CAS_ROOT_DATABASE.child("USERS/Student Branch/" + user_ID);

  user_directory.on('value', function(user_pointer){

    var user_data = user_pointer.val();

    var username = user_data["Name"];
    var user_email = user_data["Email"];

    console.log(user_data);

    var current_user = new User(username, user_email);

    $(document).on('click', '#add-event', function() {
      current_user.init_new_google_calendar_event();
    });

    $(CALENDAR).click(function(){
      current_user.master_calendar();
    });

    $(NEW_EXPERIENCE_BUTTON).click(function(){
      current_user.init_CAS_event();
    });

    $(document).on('click', CAS_BUTTON_CLASS, function(){

      if($(this).text() === "Creativity")
      {
        if(!creativity_boolean)
        {
          current_user.manage_CAS_strands_css(CREATIVITY_STRAND, "rgb(255, 0, 0)", "1", "1px 1px 3px black");
          creativity_boolean = true;
        }
        else
        {
          current_user.manage_CAS_strands_css(CREATIVITY_STRAND, "", "", "");
          creativity_boolean = false;
        }
      }
      else if($(this).text() === "Action")
      {
        if(!action_boolean)
        {
          current_user.manage_CAS_strands_css(ACTION_STRAND, "rgb(0, 0, 255)", "1", "1px 1px 3px black");
          action_boolean = true;
        }
        else
        {
          current_user.manage_CAS_strands_css(ACTION_STRAND, "", "", "");
          action_boolean = false;
        }
      }
      else
      {
        if(!service_boolean)
        {
          current_user.manage_CAS_strands_css(SERVICE_STRAND, "rgb(0, 200, 0)", "1", "1px 1px 3px black");
          service_boolean = true;
        }
        else
        {
          current_user.manage_CAS_strands_css(SERVICE_STRAND, "", "", "");
          service_boolean = false;
        }
      }

    });

    $(document).on('click', '#experience-add', function(){ //Use .on for non original HTML elements!
      current_user.save_new_experience_data(user_directory.child("Experiences"), creativity_boolean, action_boolean, service_boolean);
    });

  });

});

USER_LOGOUT_BUTTON.addEventListener('click', function(){
  firebase.auth().signOut();
  document.location.href = 'index.html';
});
