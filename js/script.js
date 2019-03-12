var timeplaner = require("time_planer");
timeplaner.ApiClient.instance.basePath = "https://eds.logfro.de/time-planer/";
var auth = new timeplaner.AuthenticationApi();
var tasking = new timeplaner.TaskingApi();
var mygroups = new timeplaner.MyGroupsApi();
var memgroup = new timeplaner.MemberingGroupsApi();

var calllogin = function(error, response, context) {
    if(error || context.statusCode == 204){
        var statusCode = (error != null && error != undefined) ? error.errorCode : context.statusCode; // Codes listed on
        var errorMessage = (error != null && error != undefined) ? error.errorMessage : context.res; // The description
        //TODO: Alle errorcodes prüfen (pwd falsch/nutzer falsch usw)
        M.toast({html: 'Falsche Angaben'});
    }else{
        set_cookie("name",$("#username").val());
        set_cookie("api",response.user_key);
        setAPIKey(response.user_key);
        showHome();
    }
    var request = context.request; // Get the request. You dont need it but here is how you get it
    //alert(request);
};
var calladdtask = function(error, data, response) {
    console.log(response);
    if (error) {
        console.error(error);
        console.log(response);
        if(error.errorCode === 404) {
            M.toast({html: 'API key is wrong'});
            showHome();
        } else {
            M.toast({html: 'Eingaben sind nicht gültig'});
        }
    } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(JSON.stringify(data));
        M.toast({html: 'Task wurde erstellt'});
        showHome();
    }
};
var calledittask = function(error, data, response) {
    if (error) {
        console.error(error);
        console.log(response);
    } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(JSON.stringify(data));
        tasking.getAllTasks(get_cookie("name"),receiveAllTasks);
        M.toast({html: 'Task wurde erfolgreich geändert'});
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
                showHome();
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
function show(task,von,bis) {
    //Zeig es im Fenster an
    var planend = task.planedDate;
    var description = task.description;
    var deadline = task.deadline;
    var name = task.name;
    var priority = task.importance;
    var startdat = task.entererAt;
    var div = $("<div></div>");
    var v = new Date();
    var b = new Date();
    v.setFullYear(2019,0,1);
    b.setFullYear(2019,11,1);
    div.addClass("task");
    div.on("click",openTask);
    div.attr("planed", planend);
    div.attr("description", description);
    div.attr("deadline", deadline);
    div.attr("priority", priority);
    div.attr("startdat", startdat);
    var span = $("<span></span>");
    span.text(name);
    $("#taskholder").append(div);
    styleTask(div, v, b, span);
    var today = new Date();
    var days = Math.round((today-v)/1000/60/60/24);
    $('#taskholder').scrollLeft((days*25)-1000);
}
function startup() {
    $("#footerinclude").load("views/footer.html");
    var def = true;
    if (get_cookie("api") !== null && get_cookie("api") !== undefined) {
        setAPIKey(get_cookie("api"));
    }else{
        showLogin();
        return;
    }
    if(get_cookie("hcontext") !== null && get_cookie("hcontext")!== undefined  && get_cookie("bcontext") !== null && get_cookie("bcontext") !== undefined) {
        eval("var x = "+get_cookie("bfcontext"));
        includeBody(get_cookie("bcontext"),x);
        includeHead(get_cookie("hcontext"));
        def = false;
    }
    else{
        showHome();
    }
}
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPod|iPad/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return ((isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()));
    }
};
function detectDeviceDesign() {
    ret = 0;
    if (isMobile.Android() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows()) {
        ret = 1;
    }
    if(isMobile.iOS()){
        ret = 2;
    }
    switch (ret) {
        case 0:
            alert("Pc");
            break;
        case 1:
            alert("Android");
            designAndroid();
            break;
        case 2:
            alert("iOS");
            designiOS();
            break;
    }
};
function setAPIKey(key){
    var User_Key = timeplaner.ApiClient.instance.authentications['User_Key'];
    User_Key.apiKey =key;
    auth = new timeplaner.AuthenticationApi();
    tasking = new timeplaner.TaskingApi();
    mygroups = new timeplaner.MyGroupsApi();
    memgroup = new timeplaner.MemberingGroupsApi();
}

function deleteGroup(uid) {
        mygroups.deleteGroup(get_cookie("name"),uid,function () {
            showOwnedGroups();
        });
}

function showOwnedGroups(){
    mygroups.getOwnedGroups(get_cookie("name"),function (error,response,b) {
        if (!error) {
            for (var i = 0; i < response.length; i++) {
                var entry = $(
                    $.ajax({
                        type: "GET",
                        url: "views/group-entry.html",
                        async: false
                    }).responseText
                );
                entry.find(".grp-name").text(response[i].name);
                entry.find(".grp-uid").text(response[i].uid).hide();
                entry.find(".grp-memcount").text(response[i].members);
                entry.find(".del-grp").click(function (e) {
                    deleteGroup(entry.find(".grp-uid").text());
                });
                $("#grpview").append(entry);
            }
        } else {
            M.toast({html: "Error on fetching groups!"})
        }
    });
}
$(document).ready(startup);