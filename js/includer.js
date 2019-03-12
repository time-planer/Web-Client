/**
 * Utility block
 */
{
    /**
     * @param comp {string}
     * @param ready {function}
     */
    function includeBody(comp, ready) {
        $.get("views/" + comp + ".html", function (data) {
            $("#contentinclude").html($(data));
            M.AutoInit();
            if (ready != null && ready != undefined)
                ready();
            //   detectDeviceDesign();
        });
        set_cookie("bcontext", comp);
        set_cookie("bfcontext", ready);
    }
    /**
     * @param head {string}
     */
    function includeHead(head) {
        $.get("views/header/" + head + ".html", function (data) {
            $("#headinclude").html($(data).html());
        });
        set_cookie("hcontext", head);
    }
    /**
     * @param sc {string} the source
     */
    function includeScript(sc) {
        $("head").append($("<script src='"+sc+"'></script>"));
    }
    /**
     * @param comp {string}
     * @param into {jQuery.fn.init|jQuery|HTMLElement}
     * @param ready {function}
     */
    function includeInto(comp, into, ready) {
        $.get("views/" + comp + ".html", function (data) {
            into.html($(data));
            M.AutoInit();
            if (ready != null && ready != undefined)
                ready();
        });
    }
    /**
     * @param comp
     * @returns {jQuery.fn.init|jQuery|HTMLElement}
     */
    function loadSync(comp) {
        return $(
            $.ajax({
                type: "GET",
                url: "views/"+comp+".html",
                async: false
            }).responseText
        );
    }
}
function showHome() {
    includeHead("header2");
    includeBody("home",function () {
        $("#out").click(logout);
        $("#del").click(deleteTask);
        M.Modal.getInstance($('#modal1')).options.onCloseStart = editTask;
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
function showSupport() {
    includeHead("header");
    includeBody("support");
}
function showBug() {
    includeHead("header");
    includeBody("report");
}
function showAdd() {
    includeHead("header");
    includeBody("add",function () {
        $("#speichern").click(saveTask);
        $('#imp').attr("oninput","aktuImport()");
    });
}
function showGroups() {
    includeHead("header3");
    includeBody("groups/groups",function () {
        includeInto("groups/new",$("#include-add-group"),function () {
            $("#add-grp-btn").on("click",createGroup);
        });
        showOwnedGroups();
    });
}
function showSettings(){
    includeHead("header");
    includeBody("settings", function () {
        $('#delall').click(deleteAllTasks);
    });
}