/**
 * @param data {Event}
 */
function openTask(data) {
    //Daten einlesen
    var elem = $(data.target);//.parent();
    while(!elem.hasClass("task"))
        elem = elem.parent();
    $("#ablauf").text("Deadline: "+longStringDateToShortStringDate((elem.attr("deadline"))));
    $('#name').text(elem.find(".name_field").text());
    $('#textarea1').text(elem.attr("description"));
    $('#textarea1').val(elem.attr("description"));
    $(".donecheck").prop("checked",elem.attr("process") == 100);
    $(".editgrp").text(elem.attr("group"));
    $('label[for=textarea1]').addClass("active");

    if(difDateTag(longStringtoDate(elem.attr("deadline"))) >= 0) {
        document.getElementById('übrig').innerText = "Days left: "+((difDateTag(longStringtoDate(elem.attr("deadline"))))-1);
    } else {
        document.getElementById('übrig').innerText = "Days expired: "+((-1)*(difDateTag(longStringtoDate(elem.attr("deadline"))))-1+2);
    }
    var pri = elem.attr("priority");
    switch (pri-1+1) {
        case 0:
            document.getElementById("star1").innerText = "star_border";
            document.getElementById("star2").innerText = "star_border";
            document.getElementById("star3").innerText = "star_border";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 1:
            document.getElementById("star1").innerText = "star_half";
            document.getElementById("star2").innerText = "star_border";
            document.getElementById("star3").innerText = "star_border";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 2:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star_border";
            document.getElementById("star3").innerText = "star_border";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 3:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star_half";
            document.getElementById("star3").innerText = "star_border";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 4:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star_border";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 5:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star_half";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 6:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 7:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star";
            document.getElementById("star4").innerText = "star_half";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 8:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star";
            document.getElementById("star4").innerText = "star";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 9:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star";
            document.getElementById("star4").innerText = "star";
            document.getElementById("star5").innerText = "star_half";
            break;
        case 10:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star";
            document.getElementById("star4").innerText = "star";
            document.getElementById("star5").innerText = "star";
            break;
        default:
            alert(pri); //Wirft undefined
            break;
    }
    M.Modal.getInstance($("#modal1")).open();
}
function logout() {
    deleteAllCookies();
    showLogin();
}
function login() {
    $('#load').show();
    if($("#username").val() === "") {
        M.toast({html: 'Please fill in all the Fields'});
        return null;
    } else {
        if($("#pw").val() === "") {
            M.toast({html: 'Please fill in all the Fields'});
            return null;
        }
        auth.login($("#username").val(),$("#pw").val(),calllogin)
    }
}
function saveTask() {
    var username = get_cookie("name"); // String | The users name
    var task = new timeplaner.InitialTask();
    if(stringtoDate($("#dead").val()) === null || stringtoDate($("#plan").val()) === null) {

    } else {
        if(checkDates(stringtoDate($("#plan").val()),stringtoDate($("#dead").val())) === 0) {
            task.deadline = stringtoDate($("#dead").val());
            task.planedDate = stringtoDate($("#plan").val());
            task.description = $("#textarea1").val();
            task.name = $("#title").val();
            task.importance = $("#imp").val();
            var opts = {
                'initialTask': task // InitialTask |
            };
            tasking.addGroupTask(username, selectGroupToAddDropdown.values.selected.uid ,opts, calladdtask);
        }
    }
}
function addNewGroup() {
    var grp =
        new timeplaner.InitialGroup();
    grp.name = $("#group-name").val();
    grp.description = $("#group-desc").val();
    var opts = {
        'initialGroup':  grp
    };
    mygroups.createGroup(get_cookie("name"), opts, function (error,b,c) {
        if(error){
            //TODO: Error handling
        }
        console.log(JSON.stringify(c,null,4));
        showGroups();
    });
}
function editTask() {
    var temp = $(".editgrp").text();
    let taskname = $('#name').text();
    tasking.getGroupTask(get_cookie("name"), taskname,temp, function (a,tmp,c) {
        let newconftask = new timeplaner.EditTask();
        newconftask.name = taskname;
        newconftask.planedDate = tmp.planedDate;
        newconftask.deadline = tmp.deadline;
        newconftask.description = $('#textarea1').val();
        newconftask.importance = tmp.importance;
        newconftask.process = $(".donecheck").prop("checked") ? 100 : 0;
        let opts = {
            'editTask': newconftask
        };
        console.log(JSON.stringify(opts,null,"\t"));
        tasking.editGroupTask(get_cookie("name"), taskname,temp, opts, calledittask);
    });
}
function aktuImport() {
    var importance = $('#imp').val();
    switch (importance-1+1) {
        case 0:
            document.getElementById("star1").innerText = "star_border";
            document.getElementById("star2").innerText = "star_border";
            document.getElementById("star3").innerText = "star_border";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 1:
            document.getElementById("star1").innerText = "star_half";
            document.getElementById("star2").innerText = "star_border";
            document.getElementById("star3").innerText = "star_border";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 2:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star_border";
            document.getElementById("star3").innerText = "star_border";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 3:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star_half";
            document.getElementById("star3").innerText = "star_border";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 4:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star_border";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 5:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star_half";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 6:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star";
            document.getElementById("star4").innerText = "star_border";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 7:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star";
            document.getElementById("star4").innerText = "star_half";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 8:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star";
            document.getElementById("star4").innerText = "star";
            document.getElementById("star5").innerText = "star_border";
            break;
        case 9:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star";
            document.getElementById("star4").innerText = "star";
            document.getElementById("star5").innerText = "star_half";
            break;
        case 10:
            document.getElementById("star1").innerText = "star";
            document.getElementById("star2").innerText = "star";
            document.getElementById("star3").innerText = "star";
            document.getElementById("star4").innerText = "star";
            document.getElementById("star5").innerText = "star";
            break;
        default:
            alert(pri);
            break;
    }
}
function deleteTask() {
    var username = get_cookie("name"); // String | The users name
    var taskname = $("#name").text();
    console.log(username,taskname);
    memgroup.deleteGroupTask(username,taskname,$(".editgrp").text(), calldeltask);
    loadView();
    M.Modal.getInstance($('#modal1')).close();
}
function register() {
    var mach = 0;
    var mach2 = 0;
    var mach3 = 0;
    var neu = new timeplaner.RegistrationRequest();
    var rname = $("#rname").val();
    if(rname !== "") {
        neu.name = rname;
    } else {
        M.toast({html: 'Please insert a name'});
        mach = 1;
    }
    var rmail = $("#rmail").val();
    if(validateEmail(rmail)) {
        neu.email = rmail;
    } else {
        M.toast({html: 'Please insert valide email address'});
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
        showLogin();
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
}
function deleteAllTasks() {
    //Abfrage ob der Benutzer es wirklich löschen möchte
    tasking.removeAllTasks(get_cookie("name"),calldelalltasks);
    tasking.getAllTasks(get_cookie("name"),receiveAllTasks);
}
function startup() {
    window.scrollTo(0,0);
    // custom 'scrolldelta' event extends 'scroll' event
    jQuery.event.special.scrolldelta = {
        delegateType: "scroll",
        bindType: "scroll",
        handle: function (event) {
            var handleObj = event.handleObj;
            var targetData = jQuery.data(event.target);
            var ret = null;
            var elem = event.target;
            var isDoc = elem === document;
            var oldTop = targetData.top || 0;
            var oldLeft = targetData.left || 0;
            targetData.top = isDoc ? elem.documentElement.scrollTop + elem.body.scrollTop : elem.scrollTop;
            targetData.left = isDoc ? elem.documentElement.scrollLeft + elem.body.scrollLeft : elem.scrollLeft;
            event.scrollTopDelta = targetData.top - oldTop;
            event.scrollTop = targetData.top;
            event.scrollLeftDelta = targetData.left - oldLeft;
            event.scrollLeft = targetData.left;
            event.type = handleObj.origType;
            ret = handleObj.handler.apply(this, arguments);
            event.type = handleObj.type;
            return ret;
        }
    };


    let r = new Router(null,null);
    r.addListener("#home",showHome);
    r.addListener("#groups",showGroups);
    r.addListener("#settings",showSettings);
    r.addListener("#addtask",showAdd);
    r.addListener("#about",showAbout);
    r.addListener("#supp",showSupport);
    r.addListener("#priva",showPrivacy);
    r.addListener("#bug",showBug);
    r.addListener("Client/",showHome);
    r.addListener("/",showHome);
    r.addListener("#!",showHome);
    r.addListener("eds/",showHome);
    r.addListener("EDS/",showHome);
    r.addListener("#group/{uid}",onOpenOwnGroup);
    r.addListener("time-planer.com",showHome);
    r.addListener("time-planer",showHome);
    r.addListener("time-planer/",showHome);
    r.apply();
    $("#footerinclude").load("views/footer.html");
    onepage.compPath = "views";


    if (get_cookie("api") !== null && get_cookie("api") !== undefined) {
        setAPIKey(get_cookie("api"));
    }

}
function weiterleit() {
    if (get_cookie("api") !== null && get_cookie("api") !== undefined) {
        showHome();
    }else{
        showLogin();
    }
}
let lastUID;
function onOpenOwnGroup(e) {
    lastUID = e.uid;
    /**if($(e.target).hasClass("del-grp"))
        return;
    if($(e.target).parent().hasClass("del-grp"))
        return;
    var root = $(e.target);
    while(!root.hasClass("grp-entry"))
        root = root.parent();
    var uid = root.find(".grp-uid").text();
    set_cookie("grp_uid",uid);**/
    includeHead("header");
    includeBody("groups/own",function () {
        mygroups.getOwnedGroup(get_cookie("name"),lastUID,reciveOwnedGroup);
        let inf = $("#member");
        let instance = M.Autocomplete.getInstance(inf.get(0));
        inf.keyup(function () {
            if(inf.val().indexOf("@") !== -1){
                let recommends = {};
                instance.updateData(recommends);
                instance.close();
                return;
            }
            let recommends = {};
            recommends[inf.val()+"@student.tgm.ac.at"] = null;
            recommends[inf.val()+"@gmail.com"] = null;
            instance.updateData(recommends);
            instance.open();
        });
    });
}
function onAddGrpMember() {
    var grp = new timeplaner.EditGroup();
    grp.members = lastGrp.members;
    var mem = new timeplaner.GroupMember();
    mem.email = $("#member").val();
    mem.edit = false;
    mem.create = false;
    mem.delete = false;
    mem.edit = false;
    grp.members.push(mem);
    mygroups.editGroup(get_cookie("name"),lastGrp.uid,{editGroup:grp},function callback() {
        mygroups.getOwnedGroup(get_cookie("name"),lastUID,reciveOwnedGroup);
    });

}
function saveChangedPermissions() {
    var grp = new timeplaner.EditGroup();
    grp.members = lastGrp.members;
    mygroups.editGroup(get_cookie("name"), lastGrp.uid, {editGroup: grp}, function callback() {
        mygroups.getOwnedGroup(get_cookie("name"), lastUID, reciveOwnedGroup);
    });
}