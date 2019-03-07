/**
 * Styles the task in the page
 * @param task {div}
 */
var z = 0;
function styleTask(task) {
    var exceedDuration = task.children(".deadlineexceed").attr("duration");
    var planExceedDuration = task.children(".planexceed").attr("duration");
    var offset = task.attr("dayOffset");
    var name = task.children("span").text();
    task.css("color", "red");
    task.css("width", setWidth(task));
    task.css("height","70px");
    task.css("background-color", "yellow");
    task.css("border-radius","25px");
    task.css("margin-left", setAbstand(task));
    if(z==0){
        today();
        z++;
    }
    //alert(name);
    //style mit diesen Werten
}
function setWidth(task) {
    var start = longStringtoDate(task.attr("startdat"));
    var ende = longStringtoDate(task.attr("deadline"))
    var secs = ende-start;
    var days = Math.round(secs/1000/60/60/24);
    var breite = days*25;
    breite = breite+"px";
    console.log(breite);
    return breite;
}
function today() {
    var today = new Date();
    var div = $("<div></div>");
    div.addClass("todday");
    div.css("z-index", "-10");
    div.css("position", "relative");
    div.css("left", "49%");
    div.css("width", "25px");
    div.css("height","850px");
    div.css("background-color","black");
    $("#taskholder").append(div);
}
function setAbstand(task) {
    var today = new Date();
    var start = longStringtoDate(task.attr("startdat"));
    console.log(start+" "+task.children("span").text());
    var ende = longStringtoDate(task.attr("deadline"))
    var secs = ende-start;
    var days = Math.round(secs/1000/60/60/24);
    var bla = today-start;
    var blaDays = Math.round(bla/1000/60/60/24);
    var x = days-blaDays;
    var abstandLinks = x*25+"px";
    return abstandLinks;
}