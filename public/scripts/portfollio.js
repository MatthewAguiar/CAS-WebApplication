
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
const CALENDAR_FLEX_BOX = ".calendar-flex-box";
const CHANGE_DATES_BOX = "#change-dates-box";
const CONFIRM_DATE_CHANGE_BUTTON = "#confirm-date-change";

const REFLECTION_FLEX_BOX = `

  <div class = "reflection-box">
    <nav class = "reflection-nav">
      <button class = "blue-button-style reflection-type" id = "text-reflection">Journal</button>
      <button class = "blue-button-style reflection-type" id = "images-reflection">Images</button>
      <button class = "blue-button-style reflection-type" id = "video-reflection">Videos</button>
      <button class = "blue-button-style reflection-type" id = "link-reflection">Web Links</button>
      <button class = "blue-button-style" id = "add-reflection">+</button>
    </nav>
    <div class = "inner-reflection-flexbox">
      <div class = "reflection-display">

      </div>
      <div class = "reflection-numbers">
        <h6>Total</h6>
        <h4>HEY</h4>
      </div>
    </div>
  </div>
`;
const REFLECTION_ADD_POPUP = `

  <div class = fade-background></div>

  <form class = "new-CAS-form">
  </form>

`;
const ADD_TEXT_REFLECTION = `

  <span>Add Journal Reflection</span>
  <h2 class = "reflection-prompt">Type your Reflection Here:</h2>
  <textarea id = "journal-textarea"></textarea>
  <button class = "blue-button-style save-to-database" id = "add-reflection-button" type = "button">Add Reflection</button>

`;
const ADD_IMAGE_REFLECTION = `
  <span>Add Image Reflection</span>
  <h2 class = "choose-link-label">Web Page Link</h2>
  <input class = "image-form-indent HTML-link" type = "text"></input>
  <button class = "blue-button-style save-to-database add-to-database-shift-right" id = "web-image-add" style = "display: inline;" type = "button">Add Internet Photo</button>
  <h2 class = "choose-file-label">Upload an Image File</h2>
  <input class = "image-form-indent" id = "image-file-upload" style = "width: 12rem;" type = "file"></input>
  <button class = "blue-button-style save-to-database add-to-database-shift-right" style = "display: inline;" type = "button">Add Image File</button>
`;
const ADD_VIDEO_REFLECTION = `
  <span>Add Video Reflection</span>
  <h2 class = "choose-link-label">Web Page Link</h2>
  <input class = "image-form-indent" class = "HTML-link type" = "text"></input>
  <button class = "blue-button-style save-to-database add-to-database-shift-right" id = "web-video-add" style = "display: inline;" type = "button">Add Internet Video</button>
  <h2 class = "choose-file-label">Upload a Video File</h2>
  <input class = "image-form-indent" id = "video-file-upload" type = file></input>
  <button class = "blue-button-style save-to-database add-to-database-shift-right" style = "display: inline;" type = "button">Add Video File</button>
`;
const ADD_LINK_REFLECTION = `
  <span>Add Web Page Reflection</span>
  <h2 class = "choose-link-label">Web Page Link</h2>
  <input class = "image-form-indent" class = "HTML-link" type" = "text"></input>
  <button class = "blue-button-style save-to-database add-to-database-shift-right" style = "display: inline;" type = "button">Add Web Page File</button>
`;
const REFLECTION_BUTTON = "#reflection-button";
const REFLECTION_ADD_BUTTON = "#add-reflection";
const CONFIRM_REFLECTION_BUTTON = ".save-to-database";
const HTML_LINK = ".HTML-link";
const IMAGE_FILE_UPLOAD = "#image-file-upload";
const WEB_IMAGE_ADD = "web-image-add";
const VIDEO_FILE_UPLOAD = "#video-file-upload";
const WEB_VIDEO_ADD = "web-video-add";

const REFLECTION_BOX_DISPLAY = `
  <div class = "reflection">

  </div>
`;
const REFLECTION_CLASS = ".reflection";

const CAS_ROOT_DATABASE = firebase.database().ref();

const EXPERIENCE_BOX = ".experience-box";

class User {

  constructor(name, email)
  {

    this.name = name;
    this.email = email;
    this.URL_encoded_email = email.replace("@", "%40");
    this.user_calendar = '<div class = "calendar-flex-box"><div id = "change-dates-box"></div><iframe class = "master-calendar" src = "https://calendar.google.com/calendar/embed?src=' + this.URL_encoded_email + '&ctz=America/New_York" frameborder="0" scrolling="no"></iframe></div>';

    $(LOGOUT_BUTTON).text(this.name);
    $(MASTER_CALENDAR_NAV).append(this.user_calendar);

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

          case 22:
            var google_calendar_formatted_start_date = this.format_calendar(input_field.val());
            directory.child(experience_name).child(field_name).set(google_calendar_formatted_start_date);
            break;

          case 23:
            var google_calendar_formatted_end_date = this.format_calendar(input_field.val());
            directory.child(experience_name).child(field_name).set(google_calendar_formatted_end_date);
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

      callScriptFunction('add_calendar_event', [experience_name, google_calendar_formatted_start_date, google_calendar_formatted_end_date]);

      var random_color_index = Math.floor(Math.random() * 6);
      directory.child(experience_name).child("Box Color").set(EXPERIENCE_BOX_COLORS[0][random_color_index]);

    }
    else
    {
      console.log("ERROR!");
    }

    $(MAIN_FORM).remove();

  }

  format_calendar(calendar_string)
  {

    var new_array = [];
    var calendar_date_array = calendar_string.split("-");
    var month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month_index = calendar_date_array[1] - 1;
    calendar_date_array[1] = month_array[month_index];
    new_array.push(calendar_date_array[1], calendar_date_array[2], calendar_date_array[0]);
    var add_commas = new_array.join(", ");
    var formatted_date = add_commas.replace(",", "");
    return formatted_date;

  }

  master_calendar()
  {
    $(MASTER_CALENDAR_NAV).toggleClass("expand-calendar");
  }

  draw_experience_box(list_of_experiences)//experience_dictionary)
  {

    var default_experience_elements = ['<h6 class = "experience-name-style" id = "experience-name"></h6>', '<img id = "CAS-strand-icon" src = "" />',
    '<img id = "CAS-project-icon" src = "" />', '<p id = "learning-outcomes-portfollio"></p>', '<p id = "experience-description"></p>', '<ol id = "approach-list"></ol>',
    '<h6>Approaches:</h6>', '<ol id = "learning-outcomes-list"></ol>', '<h6>Learning Outcomes:</h6>', '<div class = "description-and-goals" id = "default-description-and-goals"></div>',
    '<h6>Experience Description:</h6>', '<h6>Goals:</h6>'];

    for(var experience_name in list_of_experiences)
    {
      var experience_data = list_of_experiences[experience_name];
      var box_color = experience_data["Box Color"];
      var HTML_formatted_experience_name = experience_name.replace(/ /g, "-");

      //console.log(list_of_experiences[experience_name]["Start Date"]);

      if(EXPERIENCE_BOX_COLORS[0].includes(box_color))
      {

        var color_index = EXPERIENCE_BOX_COLORS[0].indexOf(box_color);
        var rgb_color = EXPERIENCE_BOX_COLORS[1][color_index];

        var box_id = this.setup_experience_box(rgb_color, HTML_formatted_experience_name);

        var inner_content_container = this.insert_content_container_in_box(box_id, HTML_formatted_experience_name);

        var experience_box_title = this.add_experience_name_to_box(inner_content_container, default_experience_elements[0], HTML_formatted_experience_name, experience_name);

        this.add_CAS_strands_to_box(inner_content_container, default_experience_elements[1], HTML_formatted_experience_name, [
        experience_data["Creativity Strand"], experience_data["Action Strand"], experience_data["Service Strand"]
        ]);

        this.add_CAS_project_to_box(experience_data["CAS Project"], inner_content_container, default_experience_elements[2], HTML_formatted_experience_name);

        this.add_approaches_list_to_box(inner_content_container, default_experience_elements[5], HTML_formatted_experience_name, default_experience_elements[6], experience_data);

        this.add_learning_outcomes_list_to_box(inner_content_container, default_experience_elements[7], HTML_formatted_experience_name, default_experience_elements[8], experience_data);

        var description_id = this.add_description_and_goals_paragraphs_after_box_expands(box_id, default_experience_elements[9], HTML_formatted_experience_name,
        default_experience_elements[10], '<p>' + experience_data["Experience Description"] + '/<p>', default_experience_elements[11], '<p>' + experience_data["Experience Plans"] + '</p>');

      }

    }

    $(EXPERIENCE_BOX).click(function(){
      //$(CALENDAR_EXPAND).css("background-color", box_color);
      //$(MASTER_CALENDAR_NAV).css("background-color", box_color);
      var box_instance_id = "#" + $(this).find(".description-and-goals").attr('id');
      var box_height = $(this).height();

      if(box_height === 240)
      {
        $(this).css("height", "45rem");

        $(".popup-title").remove();
        $("#change-date-header").remove();
        $(".start-and-end-date-font").remove();
        SELECTED_EXPERIENCE = $(this).find(".experience-name-style").text();
        $(MASTER_CALENDAR_NAV).prepend('<h6 class = "popup-title">' + 'Selected Experience: ' + SELECTED_EXPERIENCE + '</h6>');
        $(CHANGE_DATES_BOX).append('<h3 id = "change-date-header">Change Dates for: ' + SELECTED_EXPERIENCE + '</h3>');
        $(CHANGE_DATES_BOX).append('<div class = "start-and-end-date-container"><h3>Start Date:</h3><input id = "change-start-date" type = "date"></input></div>');
        $(CHANGE_DATES_BOX).append('<div class = "start-and-end-date-container"><h3>End Date:</h3><input id = "change-end-date" type = "date"></input></div>');
        $(CHANGE_DATES_BOX).append('<button class = "blue-button-style" id = "confirm-date-change">Confirm</button>');
        $(box_instance_id).fadeIn(2000);
      }
      else
      {
        $(this).css("height", "15rem");
        $(box_instance_id).fadeOut(100);
      }
    });

  }

  setup_experience_box(rgb_color, HTML_formatted_experience_name)
  {

    var new_HTML_experience_box = '<nav class = "experience-box" id = "default"></nav>';
    $(HTML_BODY).append(new_HTML_experience_box);

    var box_id = this.generate_unique_HTML_id("default", HTML_formatted_experience_name);

    $(box_id).css("background-color", rgb_color);

    return box_id;

  }

  insert_content_container_in_box(box_id, HTML_formatted_experience_name)
  {

    $(box_id).append('<div class = "box-style" id = "default-name-and-status"></div>');
    var inner_content_container_id = this.generate_unique_HTML_id("default-name-and-status", HTML_formatted_experience_name + "-name-and-status");

    $(inner_content_container_id).css("width", "100%");
    $(inner_content_container_id).css("display", "flex");

    return inner_content_container_id;

  }

  add_experience_name_to_box(inner_content_container, h6_element, HTML_formatted_experience_name, experience_name)
  {

    $(inner_content_container).append(h6_element);
    var experience_title_id = this.generate_unique_HTML_id("experience-name", HTML_formatted_experience_name + "-title");
    $(experience_title_id).text(experience_name);

    return experience_title_id;

  }

  add_CAS_strands_to_box(inner_content_container, image_tag, HTML_formatted_experience_name, CAS_strands_boolean_values)
  {
    $(inner_content_container).append(image_tag);

    var CAS_icon_id = this.generate_unique_HTML_id("CAS-strand-icon", HTML_formatted_experience_name + "CAS-strand-icon");
    var image_src_name = this.determine_strand_image(CAS_strands_boolean_values);

    $(CAS_icon_id).attr("src", "creativity_strand.png");
    $(CAS_icon_id).css("width", "1.8rem");
    $(CAS_icon_id).css("height", "1.7rem");
    $(CAS_icon_id).css("margin-left", "1.5rem");
  }

  add_CAS_project_to_box(CAS_project_boolean, inner_content_container, image_tag, HTML_formatted_experience_name)
  {

    if(CAS_project_boolean === "on")
    {

      $(inner_content_container).append(image_tag);
      var CAS_project_id = this.generate_unique_HTML_id("CAS-project-icon", HTML_formatted_experience_name + "-CAS-project-icon");
      $(CAS_project_id).attr("src", "cas.png");
      $(CAS_project_id).css("width", "1.7rem");
      $(CAS_project_id).css("height", "1.7rem");
      $(CAS_project_id).css("margin-left", "1.5rem");

    }

  }

  add_approaches_list_to_box(inner_content_container, ordered_list, HTML_formatted_experience_name, top_label, experience_data)
  {

    $(inner_content_container).append(ordered_list);
    var approaches_list_id = this.generate_unique_HTML_id("approach-list", HTML_formatted_experience_name + "-approach-list");
    $(approaches_list_id).append(top_label).css("margin-left", "1.8rem");

    for(var i = 5; i < 9; i++)
    {
      if(experience_data[DATA_FIELD_ARRAY[0][i]] === "on")
      {
        $(approaches_list_id).append("<li><h6>" + DATA_FIELD_ARRAY[0][i] + "</h6></li>"); //+ (i - 4).toString() + ") " +
      }
    }

    $(approaches_list_id + " li").css("margin-top", "1rem");

  }

  add_learning_outcomes_list_to_box(inner_content_container, ordered_list, HTML_formatted_experience_name, top_label, experience_data)
  {
    $(inner_content_container).append(ordered_list);
    var learning_outcomes_list_id = this.generate_unique_HTML_id("learning-outcomes-list", HTML_formatted_experience_name + "-outcome-list");
    $(learning_outcomes_list_id).append(top_label).css("margin-left", "1.8rem");

    for(var i = 13; i < 20; i++)
    {
      if(experience_data[DATA_FIELD_ARRAY[0][i]] === "on")
      {
        $(learning_outcomes_list_id).append("<li><h6>" + DATA_FIELD_ARRAY[0][i] + "</h6></li>"); //+ (i - 12).toString() + ") "
      }
    }

    $(learning_outcomes_list_id + " li").css("margin-top", "1rem");

  }

  add_description_and_goals_paragraphs_after_box_expands(box_id, new_container, HTML_formatted_experience_name, experience_description_caption, experience_description, goals_caption, goals_description)
  {
    $(box_id).append(new_container);
    var description_id = this.generate_unique_HTML_id("default-description-and-goals", HTML_formatted_experience_name + "-description-and-goals");
    $(description_id).css("display", "none");
    $(description_id).append(experience_description_caption);
    $(description_id).append(experience_description);
    $(description_id).append(goals_caption);
    $(description_id).append(goals_description);

    return description_id;

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

  change_experience_dates(old_start_date, old_end_date, save_path)
  {

    var new_start = this.format_calendar($('#change-start-date').val());
    var new_end = this.format_calendar($('#change-end-date').val());

    save_path.child("Start Date").set(new_start);
    save_path.child("End Date").set(new_end);

    callScriptFunction('change_calendar_dates', [SELECTED_EXPERIENCE, old_start_date, old_end_date, new_start, new_end]);

    document.location.href = 'portfollio.html';

    /*
    console.log("OLD START: " + old_start_date);
    console.log("OLD END: " + old_end_date);
    console.log("NEW START: " + new_start);
    console.log("NEW END: " + new_end);
    */

  }

  remove_calendar_info()
  {
    //$(".popup-title").remove();
    $("#change-date-header").remove();
    $(".start-and-end-date-font").remove();
    $('.start-and-end-date-container h3').remove();
    $('.start-and-end-date-container input').remove();
    $('#confirm-date-change').remove();
    $('.calendar-flex-box').css('display', 'none');
  }

  draw_reflection_tools()
  {
    if(REFLECTION_TAB === false)
    {
      $(MASTER_CALENDAR_NAV).append(REFLECTION_FLEX_BOX);
      REFLECTION_TAB = true
    }
  }

  add_reflection_popup(user_ID)
  {

    $('body').append(REFLECTION_ADD_POPUP);

    switch(REFLECTION_TYPE)
    {

      case "Journal":
        $('.new-CAS-form').prepend(ADD_TEXT_REFLECTION);
        break;

      case "Images":
        $('.new-CAS-form').prepend(ADD_IMAGE_REFLECTION);

        var file_upload_element_id = document.getElementById("image-file-upload");

        file_upload_element_id.addEventListener('change', function(file_uploader){

          var file = file_uploader.target.files[0];
          USER_IMAGE_PATH = 'Reflections/' + user_ID + '/Images/' + file.name;
          var storage_reference = firebase.storage().ref('Reflections/' + user_ID + '/Images/' + file.name);
          var save_in_storage = storage_reference.put(file);

        });

        break;

      case "Videos":
        $(".new-CAS-form").prepend(ADD_VIDEO_REFLECTION);

        var file_upload_element_id = document.getElementById("video-file-upload");

        file_upload_element_id.addEventListener('change', function(file_uploader){

          var file = file_uploader.target.files[0];
          USER_VIDEO_PATH = 'Reflections/' + user_ID + '/Videos/' + file.name;
          var storage_reference = firebase.storage().ref('Reflections/' + user_ID + '/Videos/' + file.name);
          storage_reference.put(file);

        });

        break;

      case "Web Links":
        $(".new-CAS-form").prepend(ADD_LINK_REFLECTION);

    }

  }

  add_reflection_to_database(user_directory, user_data, database_pointer, reflection_button_id)
  {

    var date_object = new Date();
    var date = this.format_calendar(date_object.getFullYear() + '-' + (date_object.getMonth() + 1) + '-' + date_object.getDate()) + ' ' + this.format_24_hour_clock(date_object.getHours()) + ':' +
    date_object.getMinutes() + ':' + date_object.getSeconds();
    //console.log(date_object);

    switch(REFLECTION_TYPE)
    {

      case "Journal":
        var get_reflection_data = $('#journal-textarea').val();
        break;

      case "Images":
        //console.log(reflection_button_id);
        if(reflection_button_id === WEB_IMAGE_ADD)
        {
          var get_reflection_data = $(HTML_LINK).val();
        }
        else
        {
          var get_reflection_data = USER_IMAGE_PATH;
        }

        break;

      case "Videos":
        if(reflection_button_id === WEB_VIDEO_ADD)
        {
          var get_reflection_data = $(HTML_LINK).val();
        }
        else
        {
          var get_reflection_data = USER_VIDEO_PATH;
        }

        break;

      case "Web Links":
        var get_reflection_data = $(HTML_LINK).val();

    }

    var reflection_directory = user_directory.child("Experiences").child(SELECTED_EXPERIENCE).child("Reflections").child(REFLECTION_TYPE);

    if(database_pointer.hasChild("Experiences/" + SELECTED_EXPERIENCE + "/Reflections/" + REFLECTION_TYPE + "/Number of Reflections"))
    {
      reflection_directory.child("Number of Reflections").set(user_data["Experiences"][SELECTED_EXPERIENCE]["Reflections"][REFLECTION_TYPE]["Number of Reflections"] + 1);
    }
    else
    {
      reflection_directory.child("Number of Reflections").set(1);
    }

    user_directory.child("Total Reflections").set(user_data["Total Reflections"] + 1);
    reflection_directory.child(date).set(get_reflection_data);
    //reflection_directory.child("Date").set(date);

    document.location.href = "portfollio.html";

  }

  format_24_hour_clock(hour)
  {
    //console.log(hour);

    if(hour > 12)
    {
      return hour - 12;
    }
    else if(hour === 0)
    {
      return 12;
    }

    return hour;
  }

  gather_written_reflections(reflection_data)
  {

    for(var reflection in reflection_data)
    {
      if(reflection !== "Number of Reflections")
      {
        //console.log(reflection);
        $(REFLECTION_CLASS).remove();
        $('.reflection-display').append(REFLECTION_BOX_DISPLAY);
        $(REFLECTION_CLASS).append("<h4 class = 'reflection-content'>Date: " + reflection + "</h4>");
        $(REFLECTION_CLASS).append("<p class = 'reflection-content'>Reflection: " + reflection_data[reflection] + "</p>");
      }
    }

  }

  gather_media_reflections(reflection_data)
  {

    var counter = 1;

      for(var media_directory in reflection_data)
      {
        if(media_directory !== "Number of Reflections")
        {
          console.log(media_directory);
          console.log(reflection_data[media_directory]);
          var get_url = "https://firebasestorage.googleapis.com/v0/b/scpscas.appspot.com/o/" + this.format_firebase_image_URL(reflection_data[media_directory]) + "?alt=media&token=ad69400a-3384-43f7-91e9-006381c72c7d";//firebase.storage().ref(reflection_data[photo_directory]);
          console.log(get_url);

          $('.reflection-display').append(REFLECTION_BOX_DISPLAY);
          $(REFLECTION_CLASS).append("<h4 class = 'reflection-content'>Date: " + media_directory + "</h4>");
          var media_id = "Photo" + counter.toString();
            if(REFLECTION_TYPE === "Images")
            {
              $(REFLECTION_CLASS).append("<img class = 'reflection-content media-size' id = '" + media_id + "' />");
              $("#" + media_id).attr("src", get_url);
            }
            else
            {
              $(REFLECTION_CLASS).append("<video class = 'reflection-content media-size' id = '" + media_id + "' controls><source/>Video could not be loaded</video>");
              $("#" + media_id + " source").attr("src", get_url);
            }
          counter++;
          console.log(media_id);

        }
      }

  }

  format_firebase_image_URL(url)
  {
    var new_url = url.replace(/\//g, "%2F");
    new_url.replace("https://firebasestorage.googleapis.com/v0/b/scpscas.appspot.com/o/", "");
    return new_url;
  }

}

//Main Code
var creativity_boolean = false;
var action_boolean = false;
var service_boolean = false;
var SELECTED_EXPERIENCE = "";
var REFLECTION_TAB = false;
var REFLECTION_TYPE = "Journal";
var USER_IMAGE_PATH, USER_VIDEO_PATH;

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

    $(CALENDAR_EXPAND).click(function(){
      current_user.master_calendar();
    });

    $(document).on('click', CONFIRM_DATE_CHANGE_BUTTON, function(){
      current_user.change_experience_dates(user_data["Experiences"][SELECTED_EXPERIENCE]["Start Date"], user_data["Experiences"][SELECTED_EXPERIENCE]["End Date"],
      user_directory.child("Experiences").child(SELECTED_EXPERIENCE));
    });

    $(NEW_EXPERIENCE_BUTTON).click(function(){
      current_user.CAS_experience_form();
    });

    $(document).on('click', '.reflection-type', function(){
      REFLECTION_TYPE = $(this).text();
      /*
      $('.reflection-type').addClass("blue-button-style");
      $(this).removeClass("blue-button-style");
      $(this).addClass("green-selected-button");
      //console.log(REFLECTION_TYPE);
      */
    });

    $(document).on('click', REFLECTION_ADD_BUTTON, function(){
      current_user.add_reflection_popup(user_ID);
    });

    $(document).on('click', CONFIRM_REFLECTION_BUTTON, function(){
      current_user.add_reflection_to_database(user_directory, user_data, user_pointer, $(this).attr("id"));
    });

    $(document).on('click', REFLECTION_BUTTON, function(){
      current_user.remove_calendar_info();
      current_user.draw_reflection_tools();

      if(REFLECTION_TYPE === "Journal" && user_pointer.hasChild("Experiences/" + SELECTED_EXPERIENCE + "/Reflections/Journal"))
      {
        current_user.gather_written_reflections(user_data["Experiences"][SELECTED_EXPERIENCE]["Reflections"]["Journal"]);
      }

    });

    $(document).on('click', '.reflection-type', function(){

      if(REFLECTION_TYPE === "Journal" && user_pointer.hasChild("Experiences/" + SELECTED_EXPERIENCE + "/Reflections/Journal"))
      {
        current_user.gather_written_reflections(user_data["Experiences"][SELECTED_EXPERIENCE]["Reflections"]["Journal"]);
      }
      else if((REFLECTION_TYPE === "Images" || REFLECTION_TYPE === "Videos") && (user_pointer.hasChild("Experiences/" + SELECTED_EXPERIENCE + "/Reflections/" + REFLECTION_TYPE)))
      {
        current_user.gather_media_reflections(user_data["Experiences"][SELECTED_EXPERIENCE]["Reflections"][REFLECTION_TYPE]);
      }

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
