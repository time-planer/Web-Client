/**
 * Styles the task in the page
 * @param task {div}
 */
var z = 0;
function styleTask(task,von,bis,span) {
    var exceedDuration = task.children(".deadlineexceed").attr("duration");
    var planExceedDuration = task.children(".planexceed").attr("duration");
    var offset = task.attr("dayOffset");
    var name = span.text();
   // task.append(name);
    task.addClass("row");
    var dL = $("<div class=\"col s6\">6-columns (one-half)</div>");
    var dR = $("<div class=\"col s6\">6-columns (one-half)</div>");

    dR.css("background-color", "white");
    dR.css("border", "1px black solid");
    dL.css("border", "1px black solid");
    //task.css("border", "1px black solid");
    dR.css("background-color", "red");
    task.append(dL);
    task.append(dR);
    task.css("color", "red");
    task.css("width", setWidth(task));
    task.css("margin-left", setAbstand(task,von));
    if(z==0){
        today(von);
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
function today(von) {
    var today = new Date();
    var secs = today-von;
    var days = Math.round(secs/1000/60/60/24);
    var abstandLinks = days*25+"px";
    var div = $("<div></div>");
    div.addClass("todday");
    div.css("width", "25px");
    div.css("z-index","100");
    div.css("margin-left", abstandLinks);
    div.css("height","850px");
    div.css("background-color","black");
    $("#taskholder").append(div);
}
function setAbstand(task,von) {
    var start = longStringtoDate(task.attr("startdat"));
    var secs = start-von;
    var days = Math.round(secs/1000/60/60/24);
    var abstandLinks = days*25+"px";
    return abstandLinks;
}
function setDead() {

}