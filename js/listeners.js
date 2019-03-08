/**
 * @param data {Event}
 */
function openTask(data) {
    //Daten einlesen
    var elem = $(data.target);
    if(elem.get(0).tagName == "SPAN")
        elem = elem.parent();
    document.getElementById('ablauf').innerText = "Deadline: "+longStringDateToShortStringDate((elem.attr("deadline")));
    document.getElementById('name').innerText = elem.children("span").text();
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