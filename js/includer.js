function includeBody(comp) {
    $.get("views/"+comp+".html",function (data) {
        $("#contentinclude").html($(data).html());
    });
}
function includeHead(head) {
    $.get("views/"+head+".html",function (data) {
        $("#headinclude").html($(data).html());
    });
}
function showHome() {
    includeHead("header2");
    includeBody("home");
}