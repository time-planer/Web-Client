/**
 * @param data {Event}
 */
function openTask(data) {
    //Daten einlesen
    var elem = $(data.target).parent();
    if(!elem.hasClass("task"))
        elem = elem.parent();
    $("#ablauf").text("Deadline: "+longStringDateToShortStringDate((elem.attr("deadline"))));
    $('#name').text(elem.children(".name_field").text());
    $('#textarea1').text(elem.attr("description"));
    $('#textarea1').val(elem.attr("description"));
    $('label[for=textarea1]').addClass("active");

    if(difDateTag(longStringtoDate(elem.attr("deadline"))) >= 0) {
        document.getElementById('übrig').innerText = "Tage verbleibend: "+difDateTag(longStringtoDate(elem.attr("deadline")));
    } else {
        document.getElementById('übrig').innerText = "Tage verstrichen: "+(-1)*(difDateTag(longStringtoDate(elem.attr("deadline"))));
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
            alert(pri);
            break;
    }
    M.Modal.getInstance($("#modal1")).open();
}
/**
 * @param a
 * @param data {Array}
 * @param b {Request}
 */
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
function logout() {
    kill_cookie("name");
    kill_cookie("api");
    showLogin();
}
function login() {
    auth.login($("#username").val(),$("#pw").val(),calllogin)
}
function saveTask() {
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
}
function createGroup() {
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
    var taskname = $('#name').text();
    var tmp = tasking.getTask(get_cookie("name"), taskname, function (a,tmp,c) {
        var newconftask = new timeplaner.EditTask();

        newconftask.name = taskname;
        newconftask.planedDate = tmp.planedDate;
        newconftask.deadline = tmp.deadline;
        newconftask.description = $('#textarea1').val();
        newconftask.importance = tmp.importance;
        var opts = {
            'editTask': newconftask
        };
        console.log(JSON.stringify(opts,null,"\t"));
        tasking.editTask(get_cookie("name"), taskname, opts, calledittask);
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