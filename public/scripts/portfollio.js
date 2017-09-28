
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
"Supervisor Name", "Supervisor Email", "Supervisor Title", "Supervisor Phone", "Strength and Growth", "Initiative and Planning", "Collaborative Skills", "Ethics of Choices and Actions",
"Overcoming Challenges and Developing Skills", "Commitment and Perserverence", "Global Engagement", "Experience Description", "Experience Plans", "Start Date", "End Date"],

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
const CAS_STRAND_BUTTON_CLASS = ".CAS-strand-buttons";
const CREATIVITY_STRAND = DATA_FIELD_ARRAY[1][2];
const ACTION_STRAND = DATA_FIELD_ARRAY[1][3];
const SERVICE_STRAND = DATA_FIELD_ARRAY[1][4];

const HTML_BODY = 'body';
const NEW_EXPERIENCE_BUTTON = '#add-experience';
const LOGOUT_BUTTON = "#logout-button";
const CALENDAR_EXPAND = "#expand-button";
const MASTER_CALENDAR_NAV = ".master-calendar-nav";
const LINK_GOOGLE_BUTTON = ".google-login-button";
const ADD_CALENDAR_EVENT = "#add-event";
const CONFIRM_EXPERIENCE = '#experience-add'
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

  CAS_experience_form()
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

  master_calendar()
  {
    $(MASTER_CALENDAR_NAV).toggleClass("expand-calendar");
  }

  init_new_google_calendar_event()
  {
    callScriptFunction('add_calendar_event');
  }

  draw_experience_box(list_of_experiences)//experience_dictionary)
  {
    for(var experience_name in list_of_experiences)
    {
      var experience_data = list_of_experiences[experience_name];
      var box_color = list_of_experiences[experience_name]["Box Color"];
      var HTML_formatted_experience_name = experience_name.replace(/ /g, "-");

      if(EXPERIENCE_BOX_COLORS[0].includes(box_color))
      {

        var color_index = EXPERIENCE_BOX_COLORS[0].indexOf(box_color);
        var rgb_color = EXPERIENCE_BOX_COLORS[1][color_index];

        var new_HTML_experience_box = '<nav class = "experience-box" id = "default"></nav>';
        $(HTML_BODY).append(new_HTML_experience_box);

        var box_id = this.generate_unique_HTML_id("default", HTML_formatted_experience_name);

        $(box_id).css("background-color", rgb_color);
        $(box_id).append('<div id = "default-name-and-status"></div>');

        var inner_content_container_id = this.generate_unique_HTML_id("default-name-and-status", HTML_formatted_experience_name + "-name-and-status");

        $(inner_content_container_id).css("width", "100%");
        $(inner_content_container_id).css("display", "flex");

        var default_experience_elements = ['<h6 id = "experience-name"></h6>', '<img id = "CAS-strand-icon" src = "" />', '<img id = "CAS-project-icon" src = "" />',
         '<p id = "learning-outcomes-portfollio"></p>', '<p id = "experience-description"></p>'];

        $(inner_content_container_id).append(default_experience_elements[0]);
        var experience_title_id = this.generate_unique_HTML_id("experience-name", HTML_formatted_experience_name + "-title");
        $(experience_title_id).text(experience_name);

        $(inner_content_container_id).append(default_experience_elements[1]);
        var CAS_icon_id = this.generate_unique_HTML_id("CAS-strand-icon", HTML_formatted_experience_name + "CAS-strand-icon");
        var image_src_name = this.determine_strand_image([experience_data["Creativity Strand"], experience_data["Action Strand"], experience_data["Service Strand"]]);
        $(CAS_icon_id).attr("src", "creativity_strand.png");
        $(CAS_icon_id).css("width", "1.8rem");
        $(CAS_icon_id).css("height", "1.7rem");
        $(CAS_icon_id).css("margin-left", "1.5rem");

        if(experience_data["CAS Project"] === "on")
        {
          $(inner_content_container_id).append(default_experience_elements[2]);
          var CAS_project_id = this.generate_unique_HTML_id("CAS-project-icon", HTML_formatted_experience_name + "-CAS-project-icon");
          $(CAS_project_id).attr("src", "cas.png");
          $(CAS_project_id).css("width", "1.7rem");
          $(CAS_project_id).css("height", "1.7rem");
          $(CAS_project_id).css("margin-left", "1.5rem");
        }

        $(inner_content_container_id).append('<ul id = "approach-list"></ul>');
        var approaches_list_id = this.generate_unique_HTML_id("approach-list", HTML_formatted_experience_name + "-approach-list");
        $(approaches_list_id).append("<li><h6>Approaches:</h6></li>").css("margin-left", "1.8rem");

        for(var i = 5; i < 9; i++)
        {
          if(experience_data[DATA_FIELD_ARRAY[0][i]] === "on")
          {
            $(approaches_list_id).append("<li><h6>" + DATA_FIELD_ARRAY[0][i] + "</h6></li>");
          }
        }

        $(approaches_list_id + " li").css("margin-top", "1rem");


        $(inner_content_container_id).append('<ul id = "learning-outcomes-list"></ul>');
        var learning_outcomes_list_id = this.generate_unique_HTML_id("learning-outcomes-list", HTML_formatted_experience_name + "-outcome-list");
        $(learning_outcomes_list_id).append("<li><h6>Learning Outcomes:</h6></li>").css("margin-left", "1.8rem");

        for(var i = 13; i < 19; i++)
        {
          if(experience_data[DATA_FIELD_ARRAY[0][i]] === "on")
          {
            $(learning_outcomes_list_id).append("<li><h6>" + DATA_FIELD_ARRAY[0][i] + "</h6></li>");
          }
        }

        $(learning_outcomes_list_id + " li").css("margin-top", "1rem");

      }

        //this.fill_experience_box(list_of_experiences[experience_name], new_jQuery_status_id, experience_id_name, experience);

    }
  }


  generate_unique_HTML_id(id_to_change, new_id)
  {
    document.getElementById(id_to_change).id = new_id;
    return "#" + new_id;
  }

  determine_strand_image(CAS_strand_array)
  {

    switch(CAS_strand_array)
    {
      case [true, false, false]:
        return "creativity_strand.png";

      case [false, true, false]:
        return "action_strand.png";

      case [false, false, true]:
        return "service_strand.png";

      case [true, true, false]:
        return "creativity_and_action_strand.png";

      case [false, true, true]:
        return "action_and_service_strand.png";

      case [true, false, true]:
        return "creativity_and_service_strand.png";

      case [true, true, true]:
        return "full_CAS_strand.png";

      case [false, false, false]:
        alert("Enter a Strand!");

    }

  }


  fill_experience_box(experience_data, status_id, experience_id_name, experience)
  {

    console.log(status_id);
    console.log(experience);

    var default_experience_elements = [

      ['<h6 id = "experience-name"></h6>', '<img id = "CAS-strand-icon" src = "" />', '<img id = "CAS-project-icon" src = "" />', '<p id = "learning-outcomes-portfollio"></p>',
      '<p id = "experience-description"></p>'],

      [experience_data["Creativity Strand"], experience_data["Action Strand"], experience_data["Service Strand"],
      experience_data["CAS Project"], experience_data[DATA_FIELD_ARRAY[0][5]], experience_data[DATA_FIELD_ARRAY[0][6]], experience_data[DATA_FIELD_ARRAY[0][7]],
      experience_data[DATA_FIELD_ARRAY[0][8]], experience_data[DATA_FIELD_ARRAY[0][13]], experience_data[DATA_FIELD_ARRAY[0][14]], experience_data[DATA_FIELD_ARRAY[0][15]],
      experience_data[DATA_FIELD_ARRAY[0][16]], experience_data[DATA_FIELD_ARRAY[0][17]], experience_data[DATA_FIELD_ARRAY[0][18]]]
    ];

    $(status_id).append(default_experience_elements[0][0]);
    var new_experience_name_id = document.getElementById("experience-name").id = "experience-name-" + experience_id_name;
    var new_jQuery_name_id = "#" + new_experience_name_id;
    $(new_jQuery_name_id).text(experience);

    $(status_id).append(default_experience_elements[0][1]);
    var new_experience_CAS_strand_icon = document.getElementById("CAS-strand-icon").id = experience_id_name + "-CAS-strand-icon";
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

    $(new_jQuery_CAS_icon_id).css("width", "1.8rem");
    $(new_jQuery_CAS_icon_id).css("height", "1.7rem");
    $(new_jQuery_CAS_icon_id).css("margin-left", "1.5rem");

    if(default_experience_elements[1][3] === "on")
    {
      $(status_id).append(default_experience_elements[0][2]);
      var new_experience_CAS_project_img_id = document.getElementById("CAS-project-icon").id = "CAS-project-icon-" + experience_id_name;
      var new_jQuery_CAS_img_id = "#" + new_experience_CAS_project_img_id;
      $(new_jQuery_CAS_img_id).attr("src", "cas.png");
      $(new_jQuery_CAS_img_id).css("width", "1.7rem");
      $(new_jQuery_CAS_img_id).css("height", "1.7rem");
      $(new_jQuery_CAS_img_id).css("margin-left", "1.5rem");
    }

    $(status_id).append('<ul id = "approach-list"></ul>');
    var new_experience_approaches_list_id = document.getElementById("approach-list").id = experience_id_name + "-approach-list";
    var new_jQuery_approaches_id = "#" + new_experience_approaches_list_id;
    $(new_jQuery_approaches_id).append("<li><h6>Approaches:</h6></li>").css("margin-left", "1.8rem");


    for(var i = 4; i < 8; i++)
    {
      if(default_experience_elements[1][i] === "on")
      {
        $(new_jQuery_approaches_id).append("<li><h6>" + DATA_FIELD_ARRAY[0][i + 1] + "</h6></li>");
      }
    }

    $(new_jQuery_approaches_id + " li").css("margin-top", "1rem");


    $(status_id).append('<ul id = "learning-outcomes-list"></ul>');
    var new_experience_learning_outcome_list_id = document.getElementById("learning-outcomes-list").id = experience_id_name + "-outcome-list";
    var new_jQuery_learning_outcome_id = "#" + new_experience_learning_outcome_list_id;
    $(new_jQuery_learning_outcome_id).append("<li><h6>Learning Outcomes:</h6></li>").css("margin-left", "1.8rem");

    for(var i = 8; i < 15; i++)
    {
      if(default_experience_elements[1][i] === "on")
      {
        $(new_jQuery_learning_outcome_id).append("<li><h6>" + DATA_FIELD_ARRAY[0][i + 5] + "</h6></li>");
      }
    }

    $(new_jQuery_learning_outcome_id + " li").css("margin-top", "1rem");

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

    $(document).on('click', ADD_CALENDAR_EVENT, function() {
      current_user.init_new_google_calendar_event();
    });

    $(CALENDAR_EXPAND).click(function(){
      current_user.master_calendar();
    });

    $(NEW_EXPERIENCE_BUTTON).click(function(){
      current_user.CAS_experience_form();
    });

    $(document).on('click', CAS_STRAND_BUTTON_CLASS, function(){

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
          current_user.manage_CAS_strands_css(ACTION_STRAND,  "rgb(0, 200, 0)", "1", "1px 1px 3px black");
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
          current_user.manage_CAS_strands_css(SERVICE_STRAND, "rgb(0, 0, 255)", "1", "1px 1px 3px black");
          service_boolean = true;
        }
        else
        {
          current_user.manage_CAS_strands_css(SERVICE_STRAND, "", "", "");
          service_boolean = false;
        }
      }

    });

    $(document).on('click', CONFIRM_EXPERIENCE, function(){ //Use .on for non original HTML elements!
      current_user.save_new_experience_data(user_directory.child("Experiences"), creativity_boolean, action_boolean, service_boolean);
      document.location.href = 'portfollio.html';
    });

  });

});

USER_LOGOUT_BUTTON.addEventListener('click', function(){
  firebase.auth().signOut();
  document.location.href = 'index.html';
});
