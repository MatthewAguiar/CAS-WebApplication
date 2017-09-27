
/*
The three constants below are:
1) In charge of storing the name and corresponding rgb values of the colors that will be randomly assigned to each experience box.
2) Saves each CAS experience form element by id and also save the corresponding Firbase database key.
*/
const EXPERIENCE_BOX_COLORS = [
  ["Blue", "Green", "Yellow", "Red", "Orange", "Purple"],
  ["rgb(32,178,170)", "rgb(125, 225, 125)", "rgb(255, 255, 102)", "rgb(250,128,114)", "rgb(255,165,0)", "rgb(106,90,205)"]
];

const DATA_FIELD_ARRAY = [
["Experience Name", "CAS Project", "Creativity Strand", "Action Strand", "Service Strand", "Ongoing", "School Based", "Community Based", "Individual",
"Supervisor Name", "Supervisor Email", "Supervisor Title", "Supervisor Phone", "Strength and Growth", "Initiative and Planning", "Collaborative", "Ethics",
"Challenge and Skill Building", "Commitment and Perserverence", "Global Engagement", "Experience Description", "Experience Plans", "Start Date", "End Date"],

["#experience-name-input", "#CAS-project", "#creativity","#action", "#service", "#on-going", "#school-based", "#community-based", "#individual",
"#supervisor-name", "#supervisor-email", "#supervisor-title", "#supervisor-phone", "#strength-and-growth", "#initiative-planning", "#collaborative",
"#ethics", "#challenge-skills", "#commitment-perserverence", "#global-engagement", "#describe-experience-text",
"#plan-cas-experience-text", "#date-start", "#date-end"]
];

/*
The four constants below:
1) Saves the class that all 3 CAS buttons will have in the new CAS experience form.
2) Creates 3 more constants that save the id of each CAS strand contained in the array constant above.
*/
const CAS_BUTTON_CLASS = ".CAS-strand-buttons";
const CREATIVITY_STRAND = DATA_FIELD_ARRAY[1][2];
const ACTION_STRAND = DATA_FIELD_ARRAY[1][3];
const SERVICE_STRAND = DATA_FIELD_ARRAY[1][4];


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
    this.user_calendar = '<iframe class = "master-calendar" src = "https://calendar.google.com/calendar/embed?src=' + this.URL_encoded_email + '&ctz=America/New_York" frameborder="0" scrolling="no"></iframe>';

    $(LOGOUT_BUTTON).text(this.name);
    $(MASTER_CALENDAR_NAV).append(this.user_calendar);

    console.log(this.name);
    console.log(this.email);
    console.log(this.URL_encoded_email);

  }

  draw_experience_box(experience_dictionary)
  {
    for(var experience in experience_dictionary)
    {
      var color = experience_dictionary[experience]["Box Color"];

      if(EXPERIENCE_BOX_COLORS[0].includes(color))
      {

        var color_index = EXPERIENCE_BOX_COLORS[0].indexOf(color);
        var rgb_color = EXPERIENCE_BOX_COLORS[1][color_index];

        var new_experience_box = '<nav class = "experience-box" id = "default"></nav>';

        $(HTML_BODY).append(new_experience_box);

        var change_default_id = document.getElementById("default").id = experience;
        var new_jQuery_box_id = '#' + change_default_id;

        $(new_jQuery_box_id).css("background-color", rgb_color);

        console.log(experience_dictionary[experience]["Creativity Strand"]);

        this.fill_experience_box(experience_dictionary[experience], new_jQuery_box_id, experience);

      }
    }
  }

  fill_experience_box(experience_data, box_id, experience)
  {

    var default_experience_elements = [

      ['<h6 id = "experience-name"></h6>', '<img id = "CAS-strand-icon" src = "" />', '<img id = "CAS-project-icon" src = "" />',
      '<p id = "experience-description"></p>'],

      [experience_data["Creativity Strand"], experience_data["Action Strand"], experience_data["Service Strand"],
      experience_data["CAS Project"], experience_data["Experience Description"]]
    ];

    $(box_id).append(default_experience_elements[0][0]);
    var new_experience_name_id = document.getElementById("experience-name").id = "experience-name-" + experience;
    var new_jQuery_name_id = "#" + new_experience_name_id;
    $(new_jQuery_name_id).text(experience);

    $(box_id).append(default_experience_elements[0][1]);
    var new_experience_CAS_strand_icon = document.getElementById("CAS-strand-icon").id = experience + "-CAS-strand-icon";
    var new_jQuery_CAS_icon_id = "#" + new_experience_CAS_strand_icon;

    var resulting_decimal_number = this.determine_strands([default_experience_elements[1][0], default_experience_elements[1][1], default_experience_elements[1][2]]);

    switch(resulting_decimal_number)
    {
      case 4:
        $(new_jQuery_CAS_icon_id).attr("src", "creativity_strand.png");
        break;

      case 2:
        $(new_jQuery_CAS_icon_id).attr("src", "action_strand.png");
        break;

      case 1:
        $(new_jQuery_CAS_icon_id).attr("src", "service_strand.png");
        break;

      case 6:
        $(new_jQuery_CAS_icon_id).attr("src", "creativity_and_action_strand.png");
        break;

      case 3:
        $(new_jQuery_CAS_icon_id).attr("src", "action_and_service_strand.png");
        break;

      case 5:
        $(new_jQuery_CAS_icon_id).attr("src", "creativity_and_service_strand.png");
        break;

      case 7:
        $(new_jQuery_CAS_icon_id).attr("src", "full_CAS_strand.png");
        break;

      default:
        alert("Enter a Strand!");

    }

    $(new_jQuery_CAS_icon_id).css("display", "inline");
    $(new_jQuery_CAS_icon_id).css("width", "2.8rem");
    $(new_jQuery_CAS_icon_id).css("height", "auto");

  }

  determine_strands(CAS_strand_array)
  {
    var binary = [4, 2, 1];
    var decimal_number = 0;

    for(var i = 0; i < CAS_strand_array.length; i++)
    {
      if(CAS_strand_array[i])
      {
        decimal_number += binary[i];
      }
    }

    return decimal_number;

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

      var random_color_index = Math.floor(Math.random() * 6);
      directory.child(experience_name).child("Box Color").set(EXPERIENCE_BOX_COLORS[0][random_color_index]);

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

    console.log(user_data);

    var username = user_data["Name"];
    var user_email = user_data["Email"];

    var current_user = new User(username, user_email);

    var has_experiences = user_pointer.hasChild("Experiences");
    if(has_experiences)
    {
      var experience_dictionary = user_data["Experiences"];
      current_user.draw_experience_box(experience_dictionary);
    }

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
      document.location.href = 'portfollio.html';
    });

  });

});

USER_LOGOUT_BUTTON.addEventListener('click', function(){
  firebase.auth().signOut();
  document.location.href = 'index.html';
});
