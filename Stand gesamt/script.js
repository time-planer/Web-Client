var timeplaner = require("time_planer");
timeplaner.ApiClient.instance.basePath = "https://eds.logfro.de/time-planer/";
var auth = new timeplaner.AuthenticationApi();
var tasking = new timeplaner.TaskingApi();
var mygroups = new timeplaner.MyGroupsApi();
var memgroup = new timeplaner.MemberingGroupsApi();

var calllogin = function(error, response, context) {
    if(error){
        var statusCode = error.errorCode; // Codes listed on
        var errorMessage = error.errorMessage; // The description
        alert(statusCode+"\n"+JSON.stringify(errorMessage));
        M.toast({html: 'Falsche Angaben'});
    }else{
        // For example a Task or an task Array
        set_cookie("name",$("#username").val());
        set_cookie("api",response.user_key);
        window.location.href = "index.php?=home";
    }
    var request = context.request; // Get the request. You dont need it but here is how you get it
    //alert(request);
};
var calladdtask = function(error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(JSON.stringify(data));
        M.toast({html: 'Task wurde erstellt'});
        window.location.href = "index.php?=home";
    }
};
var callreg = function(error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully. Returned data: ' + data);
        auth.login($("#rmail"),$("#pwr"),function (error, data, response) {
            if(!error) {
                set_cookie("name", $("#rmail").val());
                set_cookie("api", response.user_key);
                window.location.href = "index.php?=home";
            }
        });
    }
};
var register = function() {

    var mach = 0;
    var mach2 = 0;
    var mach3 = 0;
    var neu = new timeplaner.RegistrationRequest();
    var rname = $("#rname").val();
    if(rname !== "") {
        neu.name = rname;
    } else {
        M.toast({html: 'Bitte geben Sie einen Namen ein'});
        mach = 1;
    }
    var rmail = $("#rmail").val();
    if(validateEmail(rmail)) {
        neu.email = rmail;
    } else {
        M.toast({html: 'Bitte geben Sie eine gültige Email-Adresse ein'});
        mach2 = 1;
    }
    var pw = $("#pwr").val();
    if(valipas(pw) === 0) {
        neu.password = pw;
    } else {
        mach3 = 1;
    }
    if(mach === 0 && mach2 === 0 && mach3 === 0) {
        var opts = {
            'registrationRequest': neu // RegistrationRequest |
        };
        auth.registrate(opts, callreg);
    } else {
        if(mach === 1) {
            $("#rname").trigger('focus');
        } else {
            if(mach2 === 1) {
                $("#rmail").trigger('focus');
            } else {
                $("#pwr").trigger('focus');
            }
        }
    }
};

$(document).ready(function () {
    includeScript("linus.js");
    includeScript("Util.js");
    $("html").hide();
    cookieCheck();
    $("html").show();
    $("#out").click(function() {
        kill_cookie("name");
        kill_cookie("api");
        window.location.href = "index.php";
    });
    $("#log").click(function() {
        auth.login($("#username").val(),$("#pw").val(),calllogin)
    });
    $("#speichern").click(function() {
        var username = get_cookie("name"); // String | The users name
        var task = new timeplaner.InitialTask();
        task.deadline = stringtoDate($("#dead").val());
        task.planedDate = stringtoDate($("#plan").val());
        task.description = $("#not").val();
        task.name = $("#title").val();
        task.importance = $("#imp").val();
        var opts = {
            'initialTask': task // InitialTask |
        };
        tasking.addTask(username, opts, calladdtask);
    });
    $("#reg").click(register);
});

function show(task) {
    //Zeig es im Fenster an
    var planend = task.planedDate;
    var deadline = task.deadline;
    var name = task.name;
    var priority = task.importance;
    var startdat = task.entererAt;
    var div = $("<div></div>");
    div.addClass("task");
    div.attr("dayOffset","-1");
    var span = $("<span></span>");
    span.text(name);
    div.append(span);
    $("#taskholder").append(div);
}
function includeScript(sc) {
    $("head").append($("<script src='"+sc+"'></script>"));
}
function cookieCheck() {
    if(window.location.href.substr(window.location.href.lastIndexOf("/")+1) !== "index.php" && window.location.href.substr(window.location.href.lastIndexOf("/")+1) !== "index.php?=register" && window.location.href.substr(window.location.href.lastIndexOf("/")+1) !== "index.php?=for") {
        if (get_cookie("api") === null || get_cookie("api") === undefined) {
            window.location.href = "index.php";
        } else {
            var User_Key = timeplaner.ApiClient.instance.authentications['User_Key'];
            User_Key.apiKey = get_cookie("api");
            auth = new timeplaner.AuthenticationApi();
            tasking = new timeplaner.TaskingApi();
            mygroups = new timeplaner.MyGroupsApi();
            memgroup = new timeplaner.MemberingGroupsApi();
        }
    }
    if(window.location.href.substr(window.location.href.lastIndexOf("/")+1) === "index.php") {
        if (get_cookie("name") && get_cookie("api")) {
            window.location.href = "index.php?=home";
        }
    }
}
