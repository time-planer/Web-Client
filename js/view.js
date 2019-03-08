/**
 * Styles the task in the page
 * @param task {div}
 */
var z = 0;
var task;
var von;
var start;
var ende;
var farbe;
var text;

function styleTask(task1,von1,bis,span) {
    task = task1;
    von = von1;
    ende = longStringtoDate(task.attr("deadline"));
    start = longStringtoDate(task.attr("startdat"));
    var exceedDuration = task.children(".deadlineexceed").attr("duration");
    var planExceedDuration = task.children(".planexceed").attr("duration");
    var offset = task.attr("dayOffset");
    var name = span.text();
    var b = setWidth();
    var dL = $("<div class=\"col s9\"></div>");
    var dR = $("<div class=\"col s3\"></div>");
    var span2 = $("<span></span>");
    setDead();


    span2.text(text);

    dR.css("border", "1px black solid");
    dR.css("background-color", farbe);
    dR.css("height", "70px");
    dR.css("z-index","0");
    dR.css("color","white");



    dL.css("border", "1px black solid");
    dL.css("height", "70px");
    dL.css("z-index","0");



    task.addClass("row");
    task.css("color", "red");
    if(b < 100){
        b = 100;
        name = "...";
        if(span2.text() != ""){
            span2.text("...");
        }
    }
    b = b + "px";
    task.css("width", b);
    task.css("height", "70px");
    task.css("z-index","10");
    task.css("background", "transparent");
    task.css("margin-left", setAbstand(von));
    task.css("color","black");

    dR.append(span2);
    dL.append(name);


    task.append(dL);
    task.append(dR);




    if(z==0){
        today(von);
        z++;
    }


}
function setWidth() {
    var secs = ende-start;
    var days = Math.round(secs/1000/60/60/24);
    var breite = days*25;
    breite = breite;
    console.log(breite);
    return breite;
}
function today() {
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
function setAbstand() {
    var start = longStringtoDate(task.attr("startdat"));
    var secs = start-von;
    var days = Math.round(secs/1000/60/60/24);
    var abstandLinks = days*25+"px";
    return abstandLinks;
}
function setDead() {
    var today = new Date();
    var ende = longStringtoDate(task.attr("deadline"));
    farbe = "green";
    text = ""
    if(today > ende){
        text = "Deadline exceeded";
        farbe = "red";
    }

}