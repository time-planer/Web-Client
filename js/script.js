﻿var timeplaner = require("time_planer");
if(developerMode()) {
	console.log("-------------------[Notice]-------------------");
	console.log(" You are in Developer Mode (using local server)");
	console.log("-------------------[Notice]-------------------");
	
    timeplaner.ApiClient.instance.basePath = "http://localhost:8080/time-planer/";
}else{
    timeplaner.ApiClient.instance.basePath = "https://projekte.tgm.ac.at/eds/api/time-planer/";
    // timeplaner.ApiClient.instance.basePath = "http://10.0.100.30:8080/eds/time-planer/";
}
var auth = new timeplaner.AuthenticationApi();
var tasking = new timeplaner.TaskingApi();
var mygroups = new timeplaner.MyGroupsApi();
var memgroup = new timeplaner.MemberingGroupsApi();
var lastGrp;
var ij = 0;
var all = null;
var storage = [];
function calllogin(error, response, context) {
    if(error || context.statusCode === 204 || context.statusCode === 203){
        var statusCode = (error != null && error != undefined) ? error.errorCode : context.statusCode; // Codes listed on
        var errorMessage = (error != null && error != undefined) ? error.errorMessage : context.res; // The description
        if(context.statusCode === 204) {
            M.toast({html: 'Keine E-Mail Adresse gefunden'});
        }
        if(context.statusCode === 203) {
            M.toast({html: 'Kein Passwort in der Anfrage'});
        }
        if(error.status === 400) {
            M.toast({html: 'Parameter stimmen nicht überein'});
        }
        if(error.status === 401) {
            M.toast({html: 'Falsche Angaben'});
        }
        if(error.status === 402) {
            M.toast({html: 'Falsche Angaben'});
        }
		if(error.status === 404) {
            M.toast({html: 'Benutzer nicht gefunden'});
        }
    }else{

        set_cookie("name",$("#username").val());
        set_cookie("api",response.user_key);
        setAPIKey(response.user_key);
        showHome();
    }
    //var request = context.request; // Get the request. You dont need it but here is how you get it
    //alert(request);
}
function calladdtask(error, data, context) {
    console.log(context);
    if (error || context.errorCode === 203) {
        console.error(error);
        console.log(response);
        if(context.errorCode === 203) {
            M.toast({html: 'Etwas ist schief gelaufen.\nBitte erneut Anmelden'});
            showLogin();
            return;
        }
        if(error.status === 404) {
            M.toast({html: 'API key ist falsch'});
        }
        if(error.status === 401) {
            M.toast({html: 'Etwas ist schief gelaufen.\nBitte erneut Anmelden'});
            showLogin();
            return;
        }
        if(error.status === 403) {
            M.toast({html: 'Sie haben nicht die nötige Berechtigung dies zu tun'});
        }
        showHome();
    } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(JSON.stringify(data));
        M.toast({html: 'Task wurde erstellt'});
        showHome();
    }
}
function calledittask(error, data, context) {
    if (error || context.errorCode === 203) {
        console.error(error);
        console.log(context);
        if(context.errorCode === 203) {
            M.toast({html: 'Etwas ist schief gelaufen.\nBitte erneut Anmelden'});
        }
        if(error.status === 400) {
            M.toast({html: 'Task ist nicht vorhanden'});
        }
        if(error.status === 401) {
            M.toast({html: 'Etwas ist schief gelaufen.\nBitte erneut Anmelden'});
            showLogin();
        }
        if(error.status === 403) {
            M.toast({html: 'Sie haben nicht die nötige Berechtigung dies zu tun'});
        }
        if(error.status === 404) {
            M.toast({html: 'Der User existiert nicht'});
        }
    } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(JSON.stringify(data));
        loadView();
    }
}
function calldeltask(error, data, context) {
    if (error || context.errorCode === 203) {
        console.error(error);
        console.log(context);
        if(context.errorCode === 203) {
            M.toast({html: 'Etwas ist schief gelaufen.\nBitte erneut Anmelden'});
        }
        if(error.status === 400) {
            M.toast({html: "Task ist nicht vorhanden"});
        }
        if(error.status === 401) {
            M.toast({html: 'Etwas ist schief gelaufen.\nBitte erneut Anmelden'});
            showLogin();
        }
        if(error.status === 403) {
            M.toast({html: 'Sie haben nicht die nötige Berechtigung dies zu tun'});
        }
        if(error.status === 404) {
            M.toast({html: "Der User existiert nicht"});
            showLogin();
        }
    } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(JSON.stringify(data));
        loadView();
        M.toast({html: 'Task wurde erfolgreich gelöscht'});
    }
}
function calldelalltasks(error, data, context) {
    if (error || context.errorCode === 203) {
        console.error(error);
        console.log(context);
        if(context.errorCode === 203) {
            M.toast({html: 'Etwas ist schief gelaufen.\nBitte erneut Anmelden'});
        }
        if(error.status === 401) {
            M.toast({html: "API key ist falsch"});
        }
        if(error.status === 404) {
            M.toast({html: "The User ist nicht bekannt"});
            showLogin();
        }
    } else {
        console.log('API called successfully. Returned data: ' + data);
        console.log(JSON.stringify(data));
        tasking.getAllTasks(get_cookie("name"),receiveAllTasks);
        M.toast({html: 'Alle Tasks wurden erfolgreich gelöscht'});
    }
}
function callreg (error, data, context) {
    if (error) {
        console.error(error);
        switch(error.status) {
            case 409:
                M.toast({html: 'Email-Adresse bereits vergeben'});
                break;

            case 404:
                M.toast({html: 'Nicht alle Parameter gegeben'});
                break;

            case 400:
                M.toast({html: 'Parameter stimmen nicht überein'});
                break;

            default:
                M.toast({html: 'Etwas ist schief gelaufen'});
                break;
        }
    } else {
        console.log('API called successfully. Returned data: ' + data);
        auth.login($("#rmail").val(),$("#pwr").val(),function (error, data, response) {
            if(!error) {
                set_cookie("name", $("#rmail").val());
                set_cookie("api", response.user_key);
                showHome();
            }
        });
    }
}
function receiveAllTasks(a, data, b) {
    for(let i = 0;i<data.length;i++) {
        storage.push(data[i]);
    }
    ij++;
    if(all !== null && ij<all.length) {
        while(ij < all.length && !all[ij].val)
            ij++;
        if(!(ij < all.length)) {
            displayStorage();
            return;
        }
        tasking.getAllGroupTasks(get_cookie("name"),all[ij].uid,receiveAllTasks);
    } else {
        displayStorage();
    }
}

function displayStorage() {
    storage.sort(function (a,b) {
        return a.deadline-b.deadline;
    });
    let length = storage.length;
    $("#listbody").empty();
    $('#taskholder').empty();
    if(length>0) {
        let von = storage[0].deadline;
        let bis = new Date();
        for (let i = 0; i < length; i++) {
            if(storage[i].deadline>bis)
                bis = storage[i].deadline;
            if(von>storage[i].entererAt)
                von = storage[i].entererAt;
        }
        for (let i = 0; i < length; i++) {
            show(storage[i],von,bis);
            //Hier verändern
        }
        timeline();
    }
}

function show(task,von,bis) {
    //Zeig es im Fenster an
    let planend = task.planedDate;
    let description = task.description;
    let deadline = task.deadline;
    let name = task.name;
    let priority = task.importance;
    let startdat = task.entererAt;
    let div = $("<div></div>");
    let v = new Date();
    let b = new Date();
    v.setFullYear(2019,0,1);
    b.setFullYear(2019,11,1);
    div.addClass("task");
    div.on("click",openTask);
    div.attr("planed", planend);
    div.attr("description", description);
    div.attr("deadline", deadline);
    div.attr("priority", priority);
    div.attr("startdat", startdat);
    let span = $("<span></span>");
    span.text(name);
    $("#taskholder").append(div);
    styleTask(div, von, bis, span, description, priority);
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
    let User_Key = timeplaner.ApiClient.instance.authentications['User_Key'];
    User_Key.apiKey =key;
    auth = new timeplaner.AuthenticationApi();
    tasking = new timeplaner.TaskingApi();
    mygroups = new timeplaner.MyGroupsApi();
    memgroup = new timeplaner.MemberingGroupsApi();
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
    let mementry = loadSync("groups/member-entry"); //Hier fehler, debugging notwendig
    $("#grp-members").empty();
    for(let i = 0;i<grp.members.length;i++){
        let mem = grp.members[i];
        let tentry = mementry.clone();
        tentry.attr("index",i);
        tentry.find(".grp-member-mail").text(mem.email);
        // Hier Arbeiten
        tentry.find(".grp-member-create").prop('checked', mem.create).change(function (e) {
            let elem = $(e.target);
            while(!elem.is("[index]"))
                elem = elem.parent();
            lastGrp.members[elem.attr("index")].create = $(e.target).get(0).checked;
        });
        tentry.find(".grp-member-del").prop('checked', mem.delete).change(function (e) {
            let elem = $(e.target);
            while(!elem.is("[index]"))
                elem = elem.parent();
            lastGrp.members[elem.attr("index")].delete = $(e.target).get(0).checked;
        });
        tentry.find(".grp-member-edit").prop('checked', mem.edit).change(function (e) {
            let elem = $(e.target);
            while(!elem.is("[index]"))
                elem = elem.parent();
            lastGrp.members[elem.attr("index")].edit = $(e.target).get(0).checked
        });
        // Hier Arbeiten
        tentry.find(".delete-grp").click(function (e) {
            let elem = $(e.target);
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
    for(let i = 0;i<grps.length;i++){
        $("#dropdown121").append($("<li>"+grps[i].name+"</li>"))
    }
};

function loadView() {
    storage = [];
    all = JSON.parse(get_cookie("view"));
    ij=0;
    if(all === null) {
        ij=1;
        tasking.getAllTasks(get_cookie("name"),receiveAllTasks);
    } else {
        while(ij < all.length && !all[ij].val)
            ij++;
        if(!(ij < all.length)) {
            displayStorage();
            return;
        }
        tasking.getAllGroupTasks(get_cookie("name"),all[ij].uid,receiveAllTasks);
    }
}
function develop(){
    if(get_cookie("devmode") === "true"){
        set_cookie("devmode","false");
    }else{
        set_cookie("devmode","true");
    }
    location.reload();
}
function developerMode(){
   return get_cookie("devmode") === "true";
}
$(document).ready(startup);