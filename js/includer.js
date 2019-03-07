function includeBody(comp,ready) {
    $.get("views/"+comp+".html",function (data) {
        $("#contentinclude").html($(data));
        M.AutoInit();
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
        $("#speichern").click(saveTask);
        $("#reg").click(register);
        $("#out").click(logout);
		tasking.getAllTasks(get_cookie("name"),receiveAllTasks);
    });
}
function showLogin() {
    includeHead("header");
    includeBody("login",function () {
        $("#log").click(login);
    });
}

function includeScript(sc) {
    $("head").append($("<script src='"+sc+"'></script>"));
}
function showAdd() {
    includeHead("header");
    includeBody("add");
}
function showGroups() {
    includeHead("header3");
    includeBody("groups");
}
function showSettings(){
    includeHead("header");
    includeBody("settings");
}