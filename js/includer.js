function includeBody(comp,ready) {
    $.get("views/"+comp+".html",function (data) {
        $("#contentinclude").html($(data));
        M.AutoInit();
        if(ready != null && ready != undefined)
            ready();
     //   detectDeviceDesign();
    });
    set_cookie("bcontext",comp);
    set_cookie("bfcontext",ready);
}
function includeHead(head) {
    $.get("views/"+head+".html",function (data) {
        $("#headinclude").html($(data).html());
    });
    set_cookie("hcontext",head);
}

function showHome() {
    includeHead("header2");
    includeBody("home",function () {
        $("#out").click(logout);
		tasking.getAllTasks(get_cookie("name"),receiveAllTasks);
    });
}
function showRegister() {
    includeHead("header");
    includeBody("register",function () {
         $("#reg").click(register);
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
    includeBody("add",function () {
        $("#speichern").click(saveTask);
    });
}
function showGroups() {
    includeHead("header3");
    includeBody("groups");
}
function showSettings(){
    includeHead("header");
    includeBody("settings");
}