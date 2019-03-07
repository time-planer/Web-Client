function includeBody(comp,ready) {
    $.get("views/"+comp+".html",function (data) {
        $("#contentinclude").html($(data));
        if(ready != null && ready != undefined)
            ready();
    });
}
function includeHead(head) {
    $.get("views/"+head+".html",function (data) {
        $("#headinclude").html($(data).html());
    });
}
function showHome() {
    includeHead("header2");
    includeBody("home",function () {
        M.AutoInit();
        tasking.getAllTasks(get_cookie("name"),receiveAllTasks);
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
}
function showLogin() {
    includeHead("header");
    includeBody("login",function () {
        M.AutoInit();
        $("#out").click(logout);
        $("#log").click(login);
    });
}

function includeScript(sc) {
    $("head").append($("<script src='"+sc+"'></script>"));
}