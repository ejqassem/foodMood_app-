// GLOBAL VARIABLES
// =====================================================================================
var userName2 = "";
var userLocation;
var googleLocation;
var cuisineChosen;
var businessInfo = {
  businessName: [],
  businessId: [],
  businessImages: [],
  businessAddress: [],
  businessRating: [],
  businessReviewCount: [],
};
var lovePhotoDiv;
var cuisinePicked = false;
var imageCount = 0;
var lovePhotoDiv;
var clickedFindNearMe = false;

// FUNCTIONS
// =====================================================================================
// Opening screen of app - asks user to input their location

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD22UVJI9nrCZcqfxaLg53bOvnc-xKfwZM",
    authDomain: "food-mood-app.firebaseapp.com",
    databaseURL: "https://food-mood-app.firebaseio.com",
    projectId: "food-mood-app",
    storageBucket: "food-mood-app.appspot.com",
    messagingSenderId: "391107933257"
 };
 firebase.initializeApp(config);

 var database = firebase.database();


// 2. Button for adding new user
$("#submit-msg").on("click", function(event) {
 event.preventDefault();

 // Grabs train input
 var name = $("#user-name").val().trim();
 var email = $("#user-email").val().trim();
 var message = $("#user-msg").val().trim();

 //Creates local object for holding user's data
 var newUser = {
   userName: name,
   userEmail: email,
   userMessage: message
 };

 database.ref().push(newUser);

  $("#user-name").val("");
  $("#user-email").val("");
  $("#user-msg").val("");

 divHide();
});


// showing contact us form
function divShow() {
     $("#contact-us-form").show();
   }

// Hiding contact us form.
function divHide() {
     $("#contact-us-form").hide();
   }


// function geolocation() {

  // create an error handler for cross-browser compatibility

//   window.onload = function() {
//     var startPos;
//     var geoSuccess = function(position) {
//       startPos = position;
//       console.log(startPos.coords.latitude);
//       console.log(startPos.coords.longitude);
//       googleLocation = startPos.coords.latitude + ", " + startPos.coords.longitude;
//     };
//     navigator.geolocation.getCurrentPosition(geoSuccess);
//   };
//
// }


function homeScreen() {
  var facebookStatusDiv = $("<div>");
  facebookStatusDiv.attr("class", "row");
  var facebookStatus = $("<p>");
  facebookStatus.attr("id", "status");
  facebookStatus.attr("class", "col-xs-2 offset-xs-10 col-lg-2 offset-lg-10");
  facebookStatusDiv.append(facebookStatus);

  var openingGreetingDiv = $("<div>");
  openingGreetingDiv.attr("class", "row");
  var openingGreeting = $("<h1>");
  openingGreeting.attr("id", "opening-greeting");
  openingGreeting.attr("class", "col-xs-8 offset-xs-2 col-xl-8 offset-xl-2");
  openingGreeting.html("What are you in the <span id='mood-text2'><i> mood </i></span> for?");
  openingGreetingDiv.append(openingGreeting);

  var facebookGreetingDiv = $("<div>");
  facebookGreetingDiv.attr("class", "row");
  var facebookGreeting = $("<h4>");
  facebookGreeting.attr("id", "facebook-greeting");
  facebookGreeting.attr("class", "col-xs-12 col-xl-12");
  facebookGreeting.html("Please login to facebook to personalize user experience");
  facebookGreetingDiv.append(facebookGreeting);

  var locationFormContainer = $("<div>");
  locationFormContainer.attr("class", "row");
  var locationFormDiv = $("<div>");
  locationFormDiv.attr("class", "col-xs-6 offset-xs-3 col-xl-6 offset-xl-3");
  var locationForm = $("<div>");
  locationForm.attr("class", "input-group");
  locationForm.attr("id", "location-form");
  locationForm.html("<input class='form-control input-lg' id='user-location' type='text' name='user-location' placeholder='Enter your address to get started!'/>");
  var homeScreenSubmitContainer = $("<span>");
  homeScreenSubmitContainer.attr("class", "input-group-btn");
  var findNearMeContainer = $("<span>");
  homeScreenSubmitContainer.attr("class", "input-group-btn");

  var homeScreenSubmit = $("<button>");
  homeScreenSubmit.attr("type", "button");
  homeScreenSubmit.attr("class", "btn btn-secondary");
  homeScreenSubmit.attr("id", "home-screen-submit");
  homeScreenSubmit.html("Submit");
  homeScreenSubmitContainer.append(homeScreenSubmit);
  locationForm.append(homeScreenSubmit);
  locationFormDiv.append(locationForm);
  locationFormContainer.append(locationFormDiv);

  var findNearMe = $("<button>");
  findNearMe.attr("type", "button");
  findNearMe.attr("class", "btn btn-secondary");
  findNearMe.attr("id", "find-near-me-submit");
  findNearMe.html("Find Near Me");
  findNearMeContainer.append(findNearMe);
  locationForm.append(findNearMe);
  locationFormDiv.append(locationForm);
  locationFormContainer.append(locationFormDiv);


  $("#main-section").append(facebookStatusDiv);
  $("#main-section").append(openingGreetingDiv);
  $("#main-section").append(facebookGreetingDiv);
  $("#main-section").append(locationFormContainer);
}

// Screen opened after the user inputs their location, lists cuisines types for the user to
// choose from
function openScreen() {
  businessInfo = {
    businessName: [],
    businessId: [],
    businessImages: [],
    businessAddress: [],
    businessRating: [],
    businessReviewCount: [],
  };

  var cuisineTypeDiv = $("<div>");
  cuisineTypeDiv.attr("class", "row");

  var cuisineTypeCol = $("<div>");
  cuisineTypeCol.attr("class", "form-check cuisine-type col-xs-4 offset-xs-3 col-lg-4 offset-lg-4 col-xl-6 offset-xl-3");
  cuisineTypeCol.attr("id", "cuisine-type");

  var cuisineTypeHeading = $("<h1>");
  cuisineTypeHeading.attr("id", "cuisine-header");
  cuisineTypeHeading.html("What type of cuisine " + userName2 + "?");
  cuisineTypeCol.append(cuisineTypeHeading);

  var foodTypes = ["Italian", "Chinese", "Mediterranean", "Mexican", "Indian", "Sushi"];
  var counter = 1;
  for(var i = 0; i < foodTypes.length; i++) {
    var foodList = $("<label>");
    foodList.attr("class", "food-list form-check-label control-label col-lg-12");
    foodList.attr("id", "food-list" + counter);
    foodList.html("<input value=" + foodTypes[i] + " " + "type='radio' name='optradio' class='form-check-input'>" + foodTypes[i]);
    cuisineTypeCol.append(foodList);
    counter++;
  }

  var getStarted = $("<p>");
  getStarted.attr("id", "get-started");
  getStarted.html("<a id='get-started-text'>Submit</a>");

  cuisineTypeCol.append(getStarted);
  cuisineTypeDiv.append(cuisineTypeCol);
  $("#main-section").append(cuisineTypeDiv);
}

// Pulls photos from the Yelp API based on the user's location and desired cuisine type
// The photos are then stored in the businessInfos array
function yelpSearch() {
  var queryURL = 'https://api.yelp.com/v2/search';
  //authentication object containing necessary headers for server authentication
  var auth= {
    consumerKey: 'auktxeLEVeqlzAMSmT6CzQ',
    consumerSecret: 'kGoz9Jmvzxwuu3FiTvyhgbkRkaI',
    accessToken: 'JCT1veuw5aGAVPpGKeHyEqY-m4b1Om5k',
    accessTokenSecret: 'B5fgXIsqZ--6_cTGZb356yPiiSc',
    serviceProvider: {
      signatureMethod: "HMAC-SHA1"
    }
  };

  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };

  var parameters = [];
    parameters.push(['term', cuisineChosen]);
    parameters.push(['location', userLocation]);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
    parameters.push(['callback', 'cb']);

  var message = {
    'action': 'https://api.yelp.com/v2/search',
    'method': 'GET',
    'parameters': parameters
  };

  // console.log(message.action);
  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);
  var parameterMap = OAuth.getParameterMap(message.parameters);
  parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
  // console.log(parameterMap);

  $.ajax({
    'url' : message.action,
    'data' : parameterMap,
    'dataType' : 'jsonp',
    // 'timeout': '1000',
    'cache': true
  }).done(function(data) {
      console.log(data);
      var businessName = [];
      for (var i = 0; i < 10; i++) {
        var result = data.businesses[i].id;
        // var result2 = result.replace( /\-\d+$/, "");
        businessName.push(result);
        console.log(businessName);
    }
    var counter = 1;
    for (i = 0; i < businessName.length; i++){
      var parameters2 = [];
        parameters2.push(['oauth_consumer_key', auth.consumerKey]);
        parameters2.push(['oauth_consumer_secret', auth.consumerSecret]);
        parameters2.push(['oauth_token', auth.accessToken]);
        parameters2.push(['oauth_signature_method', 'HMAC-SHA1']);
        parameters2.push(['callback', 'cb']);
      var message2 = {
        'action': 'https://api.yelp.com/v2/business/' + businessName[i],
        'method': 'GET',
        'parameters': parameters2
      };
      OAuth.setTimestampAndNonce(message2);
      OAuth.SignatureMethod.sign(message2, accessor);
      var parameterMap2 = OAuth.getParameterMap(message2.parameters);
      parameterMap2.oauth_signature =
      OAuth.percentEncode(parameterMap2.oauth_signature);
      // second ajax call using the business ids captured in the first ajax call to pull business info(business images,
      // user-uploaded images, business address, business rating and review count)
        $.ajax({
          'url': message2.action,
          'data': parameterMap2,
          'dataType' : 'jsonp',
          'timeout': '1500',
          'cache': true
        }).done(function(response) {
          // need to store image value and replace "ms" in jpg to change with "l" or "o"
          console.log (businessInfo);
          var businessName = response.name;
          var customerImage = response.image_url;
          var customerImageL = customerImage.replace(/[^\/]+$/,'o.jpg');
          var yelpAddress = response.location.address;
          var businessRating = response.rating_img_url;
          var businessReviewCount = response.review_count;
          var businessId = response.id;

          businessInfo.businessId.push(businessId);
          businessInfo.businessName.push(businessName);
          businessInfo.businessImages.push(customerImageL);
          businessInfo.businessAddress.push(yelpAddress);
          businessInfo.businessRating.push(businessRating);
          businessInfo.businessReviewCount.push(businessReviewCount);
          console.log(businessInfo);
          console.log(response.menu_provider);
          counter++;
        }).fail(function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
          console.log("text status: + " + textStatus);
        });
      }
      }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
  });
}

// Displays a photo of a restuarant's food from the businessImages array along with like &
// dislike buttons
function showPhoto() {
  $("#main-section").empty();

  var showPhotoContainer = $("<div>");
  showPhotoContainer.attr("class", "row");
  showPhotoContainer.attr("id", "show-photo-container");

  var showPhotoDiv = $("<div>");
  showPhotoDiv.attr("id", "show-photo-div");
  showPhotoDiv.attr("class", "col-xs-6 offset-xs-3 col-xl-6 offset-xl-3");

  var foodImagesContainer = $("<div>");
  foodImagesContainer.attr("id", "food-images");
  foodImagesContainer.attr("class", "row well well-lg");

  var foodImagesDiv = $("<div>");
  foodImagesDiv.attr("id", "food-images-div");
  foodImagesDiv.attr("class", "col-xs-8 offset-xs-2 col-xl-8 offset-xl-2");

  var foodImage = $("<img>");
  foodImage.attr("id", "food-img");
  // foodImage.attr("class", "well well-lg");
  foodImage.attr("src", businessInfo.businessImages[imageCount]);
  foodImagesDiv.append(foodImage);
  foodImagesContainer.append(foodImagesDiv);
  showPhotoDiv.append(foodImagesContainer);

  console.log(businessInfo.businessAddress[imageCount]);

  // Adding Yelp logo/link to Yelp to image in order to comply with Yelp API display requirements
  var yelpLink = $("<a>");
  yelpLink.attr("href", "https://www.yelp.com");
  yelpLink.attr("target", "_blank");
  var yelpLogo = $("<img>");
  yelpLogo.attr("id", "yelp-logo");
  yelpLogo.attr("src", "assets/images/Yelp_trademark_RGB_outline.png");
  yelpLogo.attr("alt", "Yelp Logo");
  yelpLink.append(yelpLogo);
  foodImagesDiv.append(yelpLink);

  // Creating like/dislike "buttons" as images with Bootstrap img-rounded class
  // Need to add on-click event listener and cursor hover event
  var buttonsContainer = $("<div>");
  buttonsContainer.attr("class" ,"row");


  // Creating like & dislike "buttons" as images with Bootstrap img-rounded class
  // **Need to add on-click event listener for both buttons**
  var buttonsDiv = $("<div>");
  buttonsDiv.attr("class", "col-xs-10 offset-xs-2 col-xl-10 offset-xl-2");
  buttonsDiv.attr("id", "like-buttons-div");

  var dislikeButton = $("<img>");
  dislikeButton.addClass("img-rounded");
  dislikeButton.attr("id", "dislike-btn");
  dislikeButton.attr("src", "assets/images/dislike-button3.png");
  buttonsDiv.append(dislikeButton);

  var likeButton = $("<img>");
  likeButton.addClass("img-rounded");
  likeButton.attr("id", "like-btn");
  likeButton.attr("src", "assets/images/like-button2.png");
  buttonsDiv.append(likeButton);

  buttonsContainer.append(buttonsDiv);
  showPhotoDiv.append(buttonsContainer);


  showPhotoContainer.append(showPhotoDiv);
  $("#main-section").append(showPhotoContainer);
}

function nextPhoto() {
  imageCount++;

  if (imageCount >= businessInfo.businessImages.length) {
    imageCount = 0;
  }

  else {
    showPhoto();
    console.log(imageCount);
  }
}

function lovePhoto() {
  $("#show-photo-container").hide();

  lovePhotoContainer = $("<div>");
  lovePhotoContainer.attr("class", "row");

  lovePhotoDiv = $("<div>");
  lovePhotoDiv.attr("class", "col-xs-6 offset-xs-3 col-xl-6 offset-xl-3");
  lovePhotoDiv.attr("id", "love-photo");

  var yelpInfoContainer = $("<div>");
  yelpInfoContainer.attr("class", "yelp-info-div");
  var yelpInfoDiv = $("<div>");
  yelpInfoDiv.attr("class", "row");

 //add columns and rows for encompassing love-photo
  var businessDisplayDiv = $("<div>");
  businessDisplayDiv.attr("class", "col-xs-12 col-xl-12");
  var businessDisplay = $("<h1>").html(businessInfo.businessName[imageCount]);
  businessDisplay.attr("id", "business-display");

  businessDisplayDiv.append(businessDisplay);
  yelpInfoDiv.append(businessDisplayDiv);
  yelpInfoContainer.append(yelpInfoDiv);
  lovePhotoDiv.append(yelpInfoContainer);

  var ratingImage = $("<img>");
  ratingImage.attr("id", "yelp-rating");
  ratingImage.attr("src", businessInfo.businessRating[imageCount]);
  ratingImage.attr("alt", "Yelp Rating");
  var yelpLink2 = $("<a>").attr("href", "https://www.yelp.com/biz/" + businessInfo.businessId[imageCount]);
  yelpLink2.attr("target", "_blank");
  var yelpLogo2 = $("<img>");
  // Need to link Yelp page!!!!
  yelpLogo2.attr("src", "assets/images/Yelp_trademark_RGB_outline.png");
  yelpLogo2.attr("alt", "Yelp Logo");
  yelpLogo2.attr("id", "yelp-logo-2");
  yelpLink2.append(yelpLogo2);

  var ratingDisplayDiv = $("<div>");
  ratingDisplayDiv.attr("id", "rating-display-div");
  ratingDisplayDiv.attr("class", "row");
  var ratingDisplay = $("<h2>");
  ratingDisplay.attr("id", "yelp-logo-rating");
  ratingDisplay.attr("class", "col-xs-6 col-xl-6");
  ratingDisplay.append(ratingImage);
  ratingDisplay.append(yelpLink2);


  var reviewCount = businessInfo.businessReviewCount[imageCount];
  var reviewCountDisplay = $("<h3>").html("Based on " + reviewCount + " reviews");
  reviewCountDisplay.attr("class", "col-xs-6 col-xl-6");
  reviewCountDisplay.attr("id", "review-count-display");
  ratingDisplayDiv.append(reviewCountDisplay);
  ratingDisplayDiv.append(ratingDisplay);

  yelpInfoDiv.append(ratingDisplayDiv);
  yelpInfoContainer.append(yelpInfoDiv);
  lovePhotoDiv.append(yelpInfoContainer);

  // returns getDirections() which triggers google API directions search and embed
  getDirections();

  var chooseAnotherContainer = $("<div>");
  chooseAnotherContainer.attr("class", "row");
  var chooseAnotherDiv = $("<div>");
  chooseAnotherDiv.attr("class", "col-xs-12 col-xl-12");
  chooseAnotherDiv.attr("id", "not-satisfied");
  chooseAnotherDiv.text("Still not satisfied?");
  chooseAnotherContainer.append(chooseAnotherDiv);
  lovePhotoDiv.append(chooseAnotherContainer);

  var buttonsContainer = $("<div>");
  buttonsContainer.attr("class", "row");

  var buttonsDiv = $("<div>");
  buttonsDiv.attr("class", "col-xs-12 col-xl-12");
  buttonsDiv.attr("id", "buttons-div");

  var returnButton = $("<button>");
  returnButton.attr("id", "return-btn");
  returnButton.attr("class", "btn btn-default center-block");
  returnButton.attr("type", "submit");
  returnButton.html("Choose another restaurant");
  buttonsDiv.append(returnButton);

  var startOverButton = $("<button>").text("Pick a New Cuisine");
  startOverButton.addClass("btn btn-default center-block");
  startOverButton.attr("id", "start-over-btn");
  buttonsDiv.append(startOverButton);
  buttonsContainer.append(buttonsDiv);

  lovePhotoDiv.append(buttonsContainer);

  lovePhotoContainer.append(lovePhotoDiv);
  $("#main-section").append(lovePhotoContainer);
}

function returnScreen() {
  // need to append a button to lovePhoto() screen to return to previous screen
  // 1) need to hide lovePhoto screen and return-btn 2) unhide #like-btn, #dislike-btn and #food-images div
  // ensure functionality between screens and nextPhoto and lovePhoto functions on button clicks after returning
  $("#love-photo").hide();

  $("#show-photo-container").show();
}

// Uses Google Maps Embed API to display directions from the user's current location, captured on 1st submit button click,
// to the desired restaurant
function getDirections() {
  var apiKey = "AIzaSyDUxezpr4WRRo7HEPE-HgmQ4WYCexWVdQs";
  var origin = userLocation;
  var destination = businessInfo.businessAddress[imageCount];
  var queryURL = "https://www.google.com/maps/embed/v1/directions?key=" + apiKey +
    "&origin=" + origin + "&destination=" + destination;
  var mapDisplayContainer = $("<div>");
  mapDisplayContainer.attr("class", "row");
  var mapDisplayDiv = $("<div>");
  mapDisplayDiv.attr("class", "col-xs-11 offset-xs-1 col-xl-11 offset-xl-1");
  var mapDisplay = $("<iframe>");
  // bootstrap class to create a encompassing panel around an element
  mapDisplay.attr("class", "well");
  // added Id to allow for positioning of iframe
  mapDisplay.attr("id", "google-maps");
  mapDisplay.attr("src", queryURL);
  mapDisplay.attr("frameborder", "0");
  mapDisplay.attr("style", "border:0");
  mapDisplayDiv.append(mapDisplay);
  mapDisplayContainer.append(mapDisplayDiv);
  lovePhotoDiv.append(mapDisplayContainer);
}

// makes sure userLocation is defined before conducting yelpSearch()
// HTML geolocation takes 500-1000ms to grab location and yelp API depends
// on location information to run
function checkVariable() {
  if(userLocation) {
    $("#loadingScreenDiv").hide();
    yelpSearch();
    $(document).ajaxStop(function() {
      showPhoto();
    });
  }
  else {
    loadingScreen();
    window.setTimeout(checkVariable, 100);
  }
}

function loadingScreen() {
  $("#main-section").empty();
  var loadingScreenContainer = $("<div>");
  loadingScreenContainer.attr("class", "row");
  loadingScreenContainer.attr("id", "loadingScreenDiv");
  var loadingScreenDiv = $("<div>");
  loadingScreenDiv.attr("class", "col-lg-12");
  var loadingScreen = $("<img>");
  loadingScreen.attr("src", "assets/images/9.gif");
  loadingScreenDiv.append(loadingScreen);
  loadingScreenContainer.append(loadingScreenDiv);
  $("#main-section").append(loadingScreenContainer);
}

// MAIN PROCESS
// ==========================================================================================

// add facebook user authentication here:
// -------------------->

// Open the home screen immediately
homeScreen();

// Click event handler for the home-screen-submit button, assigns the user's location and
// desired cuisine type to variables to be used in the yelpSearch function, then executes
// the openScreen function
$(document).on("click", "#home-screen-submit", function(event) {
  event.preventDefault();
  if(!$("#user-location").val().trim()) {
    userLocation = googleLocation;
  }
  else {
    userLocation = $("#user-location").val().trim();
  }

  $("#user-location").val("");
  console.log(userLocation);
  $("#main-section").empty();
  openScreen();
});

$(document).on("click", "#find-near-me-submit", function(event) {
  event.preventDefault();
  clickedFindNearMe = true;

  // Immediately invoked function expression to determine user location based on HTML5 geolocation
  (function() {
    var startPos;
    var geoSuccess = function(position) {
      startPos = position;
      console.log(startPos.coords.latitude);
      console.log(startPos.coords.longitude);
      googleLocation = startPos.coords.latitude + ", " + startPos.coords.longitude;
      userLocation = googleLocation;
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  })();

  $("#user-location").val("");
  $("#main-section").empty();
  setTimeout(openScreen, 250);
});

// After the user chooses a cuisine type and clicks the get started button, the yelpSearch
// function is executed without reloading the page
$(document).on("click", "#get-started", function(event) {
  event.preventDefault();
  if($('input[name=optradio]:checked').length === 0) {
    var needCuisineDiv = $("<div>");
    needCuisineDiv.attr("id", "need-cuisine-div");
    needCuisineDiv.html("Please pick a Cuisine Type!");
    $("#get-started").append(needCuisineDiv);
  }
  // create function that waits for userLocation to become defined
  // http://stackoverflow.com/questions/7307983/while-variable-is-not-defined-wait
  //   else if (!userLocation) {
  //
  //   }
  else {
    $("#need-cuisine-div").hide();
    cuisinePicked = true;
    cuisineChosen = $('input[name=optradio]:checked').val();
    console.log(cuisineChosen);
    // makes sure userLocation is defined before conducting yelpSearch()
    // HTML geolocation takes 500-1000ms to grab location and yelp API depends
    // on location information to run
    checkVariable();
  }
});


// If the user clicks the like button execute the ??? function
$(document).on("click", "#like-btn", lovePhoto);
  // Execute function for showing yelp restaurant info and google maps directions

// If the user clicks the dislike button, execute the nextPhoto function
$(document).on("click", "#dislike-btn", nextPhoto);


//If user clicks the return to screen option
$(document).on("click", "#return-btn", function(event) {
  event.preventDefault();
  // bug found that you can't return to selection
  returnScreen();
});

// If the user clicks the start over button, execute openScreen function in order to
// choose a differen type of cuisine
$(document).on("click", "#start-over-btn", function() {
 event.preventDefault();
 cuisinePicked = false;

 $("#love-photo").hide();

 openScreen();
});
