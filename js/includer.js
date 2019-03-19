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
        });
        set_cookie("bcontext", comp);
        set_cookie("bfcontext", ready);
    }
    /**
     * @param head {string}
     */
    function includeHead(head,ready) {
        $.get("views/header/" + head + ".html", function (data) {
            $("#headinclude").html($(data).html());
            M.AutoInit();
            if (ready != null && ready != undefined)
                ready();
        });
        set_cookie("hcontext", head);
        set_cookie("hfcontext", ready);
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
    function goTo(page, title, url) {
        if ("undefined" !== typeof history.pushState) {
            history.pushState({page: page}, title, url);
        } else {
            window.location.assign(url);
        }
    }
}
function showHome() {
    includeHead("header2",function () {
        onepage.loadComps();
        onepage.getComp("view-entry").init = function (v){
            v.get().find(".grp-name").text(v.group.name);
            if(get_cookie("view") != null){
                var chkbox = v.get().find("input[type=checkbox]");
                var newname =  (JSON.parse(get_cookie("view"))[v.group.name]);
                chkbox.prop('checked', newname);
            }
        };
        memgroup.getGroups(get_cookie("name"),function (a,data,c) {
            //TODO: Error checking
            for(var i = 0;i<data.length;i++){
                var v = onepage.getComp("view-entry").create();
                v.group = data[i];
                v.init();
                $("#displayGrps .modal-content p").append(v.get());
            }
        });
        $("#save-grp-view").click(function () {
            var settings = {};
            $(".grp-view-option").each(function () {
                var inp = $(this).find("input[type=checkbox]");
                settings[$(this).find(".grp-name").text()] = inp.get(0).checked;
            });
            set_cookie("view",JSON.stringify(settings));
            loadView();
        });
    });
    includeBody("home",function () {
        $(".out").click(logout);
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
        //$("#username").onkeydown(weiterOnEnter(event));
        $("#username").on('keypress',function(e) {
            if(e.which == 13) {
                event.preventDefault();
                login();
            }
        });
        $("#pw").on('keypress',function(e) {
            if(e.which == 13) {
                event.preventDefault();
                login();
            }
        });
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
        memgroup.getGroups(get_cookie("name"),reciveMemberingListOnAdd);
    });
}
function showGroups() {
    includeHead("header3");
    includeBody("groups/groups",function () {
        onepage.loadComp("groups","new");
        onepage.getComp("new").init = function (v) {
            v.$().find("#add-grp-btn").on("click",createGroup);
        };
        onepage.substViews($("#include-add-group"));

        onepage.loadComps();
        onepage.loadComp("groups","entry");
        onepage.getComp("entry").init = function (v){
            if(v.val("grp") === null || v.val("grp") === undefined)
                return;
            v.$().find(".grp-name").text(v.val("grp").name);
            v.$().find(".grp-uid").text(v.val("grp").uid).hide();
            v.$().find(".grp-memcount").text(v.val("grp").members);
            v.$().find(".del-grp").click(deleteGroupListener);
            v.$().click(onOpenOwnGroup);
        };
        onepage.getComp("my-grp-list").init = function (v){
            if(v.val("list") === null || v.val("list") === undefined)
                return;
            for (let i = 0; i < v.val("list").length; i++) {
                let entry = onepage.getComp("entry").create();
                entry.val("grp",v.val("list")[i]);
                v.get().append(entry.$());
            }
        };
        const grpList = onepage.getComp("my-grp-list").create();
        $("#my-grp-holder").append(grpList.get());
        mygroups.getOwnedGroups(get_cookie("name"),function (a,b,c) {
                grpList.val("list",b);
            }
        );
    });
}
function showSettings(){
    includeHead("header");
    includeBody("settings", function () {
        $('#delall').click(deleteAllTasks);
    });
}