var timeplaner = require("time_planer");
timeplaner.ApiClient.instance.basePath = "https://eds.logfro.de/time-planer/";
var auth = new timeplaner.AuthenticationApi();
var tasking = new timeplaner.TaskingApi();
var mygroups = new timeplaner.MyGroupsApi();
var memgroup = new timeplaner.MemberingGroupsApi();
var lastGrp;
function calllogin(error, response, context) {
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
}
function calladdtask(error, data, response) {
    console.log(response);
    if (error) {
        console.error(error);
        console.log(response);
        if(error.status === 404) {
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
}
function calledittask(error, data, response) {
    if (error) {
        console.error(error);
        console.log(response);
    } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(JSON.stringify(data));
        tasking.getAllTasks(get_cookie("name"),receiveAllTasks);
    }
}
function calldeltask(error, data, response) {
    if (error) {
        console.log(error);
        console.error(error);
        console.log(response);
        if(error.status === 400) {
            M.toast({html: "Task isn't known by the server"});
        }
        if(error.status === 401) {
            M.toast({html: "API key is wrong"})
        }
        if(error.status === 404) {
            M.toast({html: "The User isn't known by the server"})
        }
    } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(JSON.stringify(data));
        tasking.getAllTasks(get_cookie("name"),receiveAllTasks);
        M.toast({html: 'Task wurde erfolgreich gelöscht'});
    }
}
function calldelalltasks(error, data, response) {
    if (error) {
        console.log(error);
        console.error(error);
        console.log(response);
        if(error.status === 401) {
            M.toast({html: "API key is wrong"})
        }
        if(error.status === 404) {
            M.toast({html: "The User isn't known by the server"})
        }
    } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(JSON.stringify(data));
        tasking.getAllTasks(get_cookie("name"),receiveAllTasks);
        M.toast({html: 'Alle Tasks wurden erfolgreich gelöscht'});
    }
}
function callreg (error, data, response) {
    if (error) {
        console.error(error);
        switch(error.status) {
            case 409:
                M.toast({html: 'Email-Adresse bereits vergeben'});
                break;
        }
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
}
function receiveAllTasks(a, data, b) {
    data.sort(function (a,b) {
        return a.deadline-b.deadline;
    });
    var length = data.length;
    if(length>0) {
        var von = data[0].deadline;
        var bis = new Date();
        for (var i = 0; i < length; i++) {
            if(data[i].deadline>bis)
                bis = data[i].deadline;
            if(von>data[i].entererAt)
                von = data[i].entererAt;
        }
        $('#taskholder').empty();
        for (var i = 0; i < length; i++) {
            show(data[i],von,bis);
        }
    }
}
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
    $('#taskholder').scrollLeft((days*25)-500);
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
    mygroups.getOwnedGroups(get_cookie("name"),reciveOwnedGroups);
}
function reciveOwnedGroups(error,response,b) {
    if (!error) {
        var entry = loadSync("groups/entry");
        for (var i = 0; i < response.length; i++) {
            tentry = entry.clone();
            tentry.find(".grp-name").text(response[i].name);
            tentry.find(".grp-uid").text(response[i].uid).hide();
            tentry.find(".grp-memcount").text(response[i].members);
            tentry.find(".del-grp").click(deleteGroupListener);
            tentry.click(onOpenOwnGroup);
            $("#grpview").append(tentry);
        }
    } else {
        M.toast({html: "Error on fetching groups!"})
    }
}
function reciveOwnedGroup(a,grp,c){
    lastGrp = grp;
    $("#grp-uid").text(grp.uid);
    $("#grp-name").text(grp.name);
    $("#grp-desc").text(grp.description);
    $("#grp-member-count").text(grp.members.length);
    $("#grp-task-count").text(grp.tasks.length);
    $("#grp-created").text(longStringDateToShortStringDate(grp.creation_date.toString()));
    $("#add-grp-member").click(onAddGrpMember);
    $("#grp-save").click(saveChangedPermissions);
    var mementry = loadSync("groups/member-entry");
    $("#grp-members").empty();
    for(var i = 0;i<grp.members.length;i++){
        var mem = grp.members[i];
        var tentry = mementry.clone();
        tentry.attr("index",i);
        tentry.find(".grp-member-mail").text(mem.email);
        tentry.find(".grp-member-create").prop('checked', mem.create).change(function (e) {
            var elem = $(e.target);
            while(!elem.is("[index]"))
                elem = elem.parent();
            lastGrp.members[elem.attr("index")].create = $(e.target).val() === "on";
        });
        tentry.find(".grp-member-del").prop('checked', mem.delete).change(function (e) {

            var elem = $(e.target);
            while(!elem.is("[index]"))
                elem = elem.parent();
            lastGrp.members[elem.attr("index")].delete = $(e.target).val() === "on";
        });
        tentry.find(".grp-member-edit").prop('checked', mem.edit).change(function (e) {
            var elem = $(e.target);
            while(!elem.is("[index]"))
                elem = elem.parent();
            lastGrp.members[elem.attr("index")].edit = $(e.target).val() === "on";
        });
        tentry.find(".delete-grp").click(function (e) {
            var elem = $(e.target);
            while(!elem.is("[index]"))
                elem = elem.parent();
            lastGrp.members.splice(elem.attr("index"),1);
            saveChangedPermissions();
        });
        $("#grp-members").append(tentry);
    }
    console.log("Recived group : \n"+JSON.stringify(grp,null,4));
}
function reciveMemberingListOnAdd(a,grps,e){
    for(var i = 0;i<grps.length;i++){
        $("#dropdown121").append($("<li>"+grps[i].name+"</li>"))
    }
};
$(document).ready(startup);