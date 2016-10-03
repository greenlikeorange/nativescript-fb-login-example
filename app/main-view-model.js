var Observable = require("data/observable").Observable;
var FacebookLoginHandler = require("nativescript-facebook-login");

var successCallback = function(result) {
    //Do something with the result, for example get the AccessToken
    var token;
    if (topmost().android){
      token = result.getAccessToken().getToken();
    }
    else if (topmost().ios){
      token = result.token.tokenString
    }
    alert(token);
}

var cancelCallback = function() {
    alert("Login was cancelled");
}

var failCallback = function(error) {
    var errorMessage = "Error with Facebook";
   //Try to get as much information as possible from error
   if (error) {
        if (topmost().ios) {
            if (error.localizedDescription) {
                errorMessage += ": " + error.localizedDescription;
            }
            else if (error.code) {
                errorMessage += ": Code " + error.code;
            }
            else {
                errorMessage += ": " + error;
            }
        }
        else if (topmost().android) {
            if (error.getErrorMessage) {
                errorMessage += ": " + error.getErrorMessage();
            }
            else if (error.getErrorCode) {
                errorMessage += ": Code " + error.getErrorCode();
            }
            else {
                errorMessage += ": " + error;
            }
        }
    }
    alert(errorMessage);
}

function createViewModel() {
    var viewModel = new Observable();


    viewModel.onTap = function() {
        FacebookLoginHandler.init();
        FacebookLoginHandler.registerCallback(successCallback, cancelCallback, failCallback);
        FacebookLoginHandler.logInWithPublishPermissions(["publish_actions"]);
    }

    return viewModel;
}

exports.createViewModel = createViewModel;
