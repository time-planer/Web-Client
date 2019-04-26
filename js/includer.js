/**
 * Utility block
 */
{
    /**
     * @param comp {string}
     * @param ready {function}
     */
    function includeBody(comp, ready = null) {
        $.get("views/" + comp + ".html", function (data) {
            $("#contentinclude").html($(data));
            M.AutoInit();
            if (ready != null && ready != undefined)
                ready();
        });
        //set_cookie("bcontext", comp);
        //set_cookie("bfcontext", ready);
    }
    /**
     * @param head {string}
     */
    function includeHead(head,ready) {
        $.get("views/header/" + head + ".html", function (data) {
            $("#headinclude").html($(data).html());
            //try{M.AutoInit();}catch(e) {}
            if (ready != null && ready != undefined)
                ready();
        });
        //set_cookie("hcontext", head);
        //set_cookie("hfcontext", ready);
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
    set_cookie("scene", 'Home');
    includeHead("header2",function () {
        includeBody("home",function () {
            $(".out").click(logout);
            $("#del").click(deleteTask);
            M.Modal.getInstance($('#modal1')).options.onCloseStart = editTask;
            loadView();
        });
        onepage.loadComps();
        onepage.getComp("view-entry").init = function (v){
            if(v.values.group !== undefined) {
                v.get().find(".grp-name").text(v.values.group.name);
                v.get().find(".grp-uid").text(v.values.group.uid).hide();
                if (get_cookie("view") != null) {
                    let chkbox = v.get().find("input[type=checkbox]");
                    let view = JSON.parse(get_cookie("view"));
                    for (let i = 0; i < view.length; i++) {
                        if(view[i].name === v.values.group.name)
                            view = view[i];
                    }
                    let newname = view.val;
                    chkbox.prop('checked', newname);
                }
            }
        };
        memgroup.getGroups(get_cookie("name"),function (error,data,c) {
            if (error) {
                if (error.status === 500) {
                    M.toast({html: 'Serverfehler!<br>Bitte kontaktieren Sie einen Admin!'});
                }
            }   else {
                for(var i = 0;i<data.length;i++){
                    var v = onepage.getComp("view-entry").create();
                    v.values.group = data[i];
                    v.init();
                    $("#displayGrps .modal-content p").append(v.get());
                }
            }
        });
        // Hier ist ein Fehler... ;/
        $("#save-grp-view").click(function () {
            let settings = [];
            $(".grp-view-option").each(function () {
                if($(this).hasClass("component"))
                    return;
                let obj = {};
                let inp = $(this).find("input[type=checkbox]");
                obj.name = $(this).find(".grp-name").text();
                obj.val = inp.get(0).checked;
                obj.uid = $(this).find(".grp-uid").text();
                settings.push(obj);
            });
            set_cookie("view",JSON.stringify(settings));
            loadView();
        });
    });
   /* includeBody("home",function () {
        $(".out").click(logout);
        $("#del").click(deleteTask);
        M.Modal.getInstance($('#modal1')).options.onCloseStart = editTask;
        loadView();
    });*/
}
function showRegister() {
    set_cookie("scene", 'Register');
    includeHead("header");
    includeBody("register",function () {
         $("#reg").click(register);
    });
}
function showLogin() {
    set_cookie("scene", 'Login');
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
    set_cookie("scene", 'Support');
    includeHead("header");
    includeBody("support");
}
function showBug() {
    set_cookie("scene", 'Bug');
    includeHead("header");
    includeBody("report");
}

let selectGroupToAddDropdown;
function showAdd() {
    set_cookie("scene", 'Add');
    includeHead("header");
    includeBody("add/main",function () {
        $("#speichern").click(saveTask);
        $('#imp').attr("oninput","aktuImport()");
        onepage.components.splice(0,onepage.components.length);
        let entry = onepage.loadComp("add","entry");
        entry.init = function(v){
            if(v.values.group !== undefined){
                v.$().find(".grp-item-name").text(v.values.group.name);
                v.$().click(function () {
                    selectGroupToAddDropdown.values.selected = v.values.group;
                });
            }
        };
        
        let dropdown = onepage.loadComp("add","dropdown");
        dropdown.init = function(v){
            if(v.values.groups !== undefined){
                v.$().find(".dropdown-trigger").text(v.values.selected.name);
                for(let i = 0;i<v.values.groups.length;i++){
                    let entry = onepage.getComp("entry").create();
                    entry.refresh();
                    v.get().find("#grp-select").append(entry.$());
                    entry.values.group = v.values.groups[i];
                }
                M.Dropdown.init(v.$().find(".dropdown-trigger"), {});
            }
        };
        selectGroupToAddDropdown = dropdown.create();
        $(".grp-select").html(selectGroupToAddDropdown.$());
        memgroup.getGroups(get_cookie("name"),function (error,data,request) {
            selectGroupToAddDropdown.values.selected = data[0];
            selectGroupToAddDropdown.values.groups = data;
        });
    });
}
function showGroups() {
    set_cookie("scene", 'Groups');
    includeHead("header3");
    includeBody("groups/groups",function () {
        onepage.loadComp("groups","new");
        onepage.getComp("new").init = function (v) {
            v.$().find("#add-grp-btn").off();
            v.$().find("#add-grp-btn").on("click",addNewGroup);
        };
        onepage.substViews($("#include-add-group"));
        onepage.loadComps();
        onepage.loadComp("groups","entry");
        onepage.getComp("entry").init = function (v){
            if(v.val("grp") === null || v.val("grp") === undefined)
                return;
            v.$().find(".grp-name").text(v.val("grp").name);
            v.$().find(".grp-uid").text(v.val("grp").uid).hide();
            if(v.val("grp").members === 1) {
                v.$().find('.memb').text("Member");
            }
            v.$().find(".grp-memcount").text(v.val("grp").members);
            v.$().find(".del-grp").click(function () {
                mygroups.deleteGroup(get_cookie("name"),v.val("grp").uid,function () {
                    let list = grpList.val("list");
                    for (let i = 0; i < list.length; i++) {
                        if(list[i].uid === v.val("grp").uid) {
                            list.slice(i, 1);
                            break;
                        }
                    }
                    grpList.val("list",list);
                });
            });
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
    set_cookie("scene", 'Settings');
    includeHead("header");
    includeBody("settings", function () {
        $('#delall').click(deleteAllTasks);
    });
}
function showPrivacy() {
    set_cookie("scene", 'Privacy');
    includeHead("header");
    includeBody("privacy");
}
function showPrivacyEng() {
    set_cookie("scene", 'PrivacyEng');
    includeHead("header");
    includeBody("privacy_eng");
}