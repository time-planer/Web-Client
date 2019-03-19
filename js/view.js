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
var farbe2;
var text;
var ma = 0;
var plan;
var b;
var balk2width = 0;
var name;
var span2;
var pruef;
var balkwidth = 0;
var faktoli = 0;
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPod|iPad/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return ((isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()));
    }
};


function styleTask(task1,von1,bis,span) {
    task = task1;
    text = span.text();
    von = von1;
    ende = longStringtoDate(task.attr("deadline"));
    start = longStringtoDate(task.attr("startdat"));
    //var exceedDuration = task.children(".deadlineexceed").attr("duration");
    //var plan2 = task.children(".planexceed").attr("duration");
    plan = longStringtoDate(task.attr("planed"));
    //var offset = task.attr("dayOffset");
    name = span.text();
    b = setWidth();

    span2 = $("<span style='width: 90%; padding-right: 10%'></span>");
    //setDead();
    detectDevice();

}
function setWidth() {
    var secs = ende-start;
    var days = Math.round(secs/1000/60/60/24);
    var breite = days*25;
    breite = breite;
    return breite;
}
function today() {
    var today = new Date();
    var secs = today-von;
    var days = Math.round(secs/1000/60/60/24);
    var abstandLinks = days*25;

}
function setAbstand() {
    var secs = start-von;
    var days = Math.round(secs/1000/60/60/24);
    var abstandLinks = days*25;
    return abstandLinks;
}
function setDead() {
    var today = new Date();
    text = "";
    farbe = "";
    farbe2 = "";
    pruef = 0;
    if(today < plan){
        faktoli = 0;
        farbe = "orange";
        farbe2 = "green";
        balk2width = plan-today;
        balk2width = balk2width/1000/60/60/24;
        balk2width = balk2width*25;
        if(plan !== ende){
            balkwidth = ende-plan;
            balkwidth = balkwidth/1000/60/60/24;
            balkwidth = balkwidth*25;
        }
        pruef = 1;
    }
    if(today > plan){
        faktoli = 0;
        balk2width = 0;
        farbe = "orange";
        farbe2 = "orangered";
        text = "Planed exceeded";
        balkwidth = ende-today;
        balkwidth = balkwidth/1000/60/60/24;
        balkwidth = balkwidth*25;
        balk2width = today-plan;
        balk2width = balk2width/1000/60/60/24;
        balk2width = balk2width*25;
        pruef = 2;
    }
    if(today > ende){
        faktoli = 10;
        text = "Deadline exceeded";
        farbe = "red";
        balk2width = 0;
        balkwidth = today-ende;
        balkwidth = balkwidth/1000/60/60/24;
        balkwidth = balkwidth*25;
        ende = today;
        b = setWidth();
        pruef = 3;

    }

}

function designAndroidTask() {
    $('#taskholder').addClass("valign-wrapper");
    task.css("width","200px");
    task.addClass("center-align");
    task.addClass("truncate");
    var ab = setAbstand();
    if(b <= 100){
        ab = ab - (100-b);
        b = 100;
    }
    ab = ab+"px";
    b = b + "px";

    task.css("height",b);
    task.css("margin-top",ab);
    //task.addClass("valign-wrapper");
    task.addClass("flow-text");
    task.css("margin-left","5px");
    task.css("color","white");
    task.css("background-color",farbe);
    task.text(name);
    task.css("border","0.1px black solid");
    task.css("border-radius","20px");

}

function designiOSTask() {

}

function designAndroid() {
    //$('#login-div').css("width","90%");
    //$('#login-div').css("margin-left","5%");
    //$('#login-div').css("margin-bottom","10%");

}

function designiOS() {

}

function designPC() {
    var dL = $("<div></div>");
    var dR = $("<div></div>");
    var dm = $("<div></div>");
    var temp = b-(balkwidth+balk2width);
    var temp2 = 0;
    if(temp<100){
        temp2 = 100-temp;
        temp = 100;
    }
    b = b+temp2;
    temp = temp+"px";
    balkwidth = balkwidth;
    balk2width = balk2width;
    dm.css("background-color",farbe2);
    dm.css("width",balk2width+"px");
    dm.css("height", "70px");
    dm.css("z-index","0");
    dm.css("color","white");
    //dR.addClass("valign-wrapper");
    dm.addClass("left");
    dm.addClass("flow-text");

    span2.text(text);
    dR.css("background-color", farbe);
    dR.css("height", "70px");
    dR.css("width", balkwidth+"px");
    dR.css("z-index","0");
    dR.css("color","white");
    //dR.addClass("valign-wrapper");
    dR.addClass("left");
    dR.addClass("flow-text");
    //dR.css("padding-right","5px");


    dL.css("height", "70px");
    dL.css("z-index","0");
    dL.css("width",temp);
    //dL.addClass("valign-wrapper")
    dL.addClass("flow-text").addClass("name_field");
    dL.addClass("left");
    dL.addClass("truncate");
    dR.addClass("truncate");
    task.addClass("row");
    task.css("border", "1px black solid");
    task.css("color", "red");
    task.css("overflow","hidden");
    task.css("box-sizing","content-box");
    var ab = setAbstand();
    ab = ab-faktoli;
    if(b <= 100){
        ab = ab - (100-b);
        b = 100;
    }
    ab = ab-temp2;
    ab = ab+"px";
    b = b + "px";
    task.css("width", b);
    task.css("height", "70px");
    task.css("z-index","10");
    task.css("background", "transparent");
    task.css("margin-left", ab);
    task.css("color","black");
    task.css("border-radius","20px");
    task.addClass("taskclass");
    task.addClass("left-align");
    dL.append(name);



    if(pruef === 1){
        task.append(dL);
        task.append(dm);
        task.append(dR);
    }
    if(pruef === 2){
        task.append(dL);
        task.append(dm);
        task.append(dR);
    }
    if(pruef === 3){
        task.append(dL);
        task.append(dR);
    }

}

/**
 * Task Ansicht für PC
 * @author Linus Dehner
 * @version
 */
function newDesignPC() {
    // Initialisierung der Variablen
    var heute = $("<div></div>");
    var green = $("<div></div>");
    var orange = $("<div></div>");
    var red = $("<div></div>");
    var fortschritt = $("<div></div>");
    var titel = $("<div></div>");
    var tmp = 0;
    var dada = $("<span></span>");
    var toddy = new Date();


    // Grüner Balken Design
    tmp = plan-start;
    tmp = tmp/1000/60/60/24*25;
    tmp = tmp+"px";
    green.css("width", tmp);
    green.css("height", "30px");
    green.css("background-color","green");
    green.addClass("left");


    // Orangener Balken Design
    tmp = 0;
    tmp = ende-plan;
    tmp = tmp/1000/60/60/24*25;
    tmp = tmp+"px";
    orange.css("width", tmp);
    orange.css("height", "30px");
    orange.css("background-color","orange");
    orange.addClass("left");


    // Roter Balken Design
    if(toddy > ende){
        tmp = 0;
        tmp = toddy-ende;
        tmp = tmp/1000/60/60/24*25;
        tmp = tmp+25;
        tmp = tmp+"px";
        red.css("width", tmp);
        red.css("height", "30px");
        red.css("background-color","red");
        red.addClass("left");
    }


    // Heute Strich Design
    heute.css("width","25px");
    heute.css("height", "30px");
    heute.css("background-color","black");
    tmp = toddy-start;
    tmp = tmp/1000/60/60/24*25;
    tmp = tmp+"px";
    heute.css("margin-left",tmp);
    heute.css("position","relative");
    heute.css("z-index","1");


    // Titel Box Design
    tmp = 0;
    tmp = green.width()+orange.width()+red.width();
    titel.css("width",tmp);
    titel.css("height", "40px");
    titel.css("padding-left","15px");
    titel.addClass("flow-text");
    dada.text(name);
    dada.addClass('name_field');
    titel.append(dada);


    // Balken Box
    tmp = 0;
    tmp = green.width()+orange.width()+red.width();
    fortschritt.css("width",tmp);
    fortschritt.css("height", "30px");
    fortschritt.append(green);
    fortschritt.append(orange);
    fortschritt.append(red);
    fortschritt.append(heute);


    // Task
    tmp = 0;
    tmp = green.width()+orange.width()+red.width();
    task.css("border", "1px black solid");
    task.css("color", "red");
    task.css("overflow","hidden");
    task.css("box-sizing","content-box");
    task.css("width", tmp);
    task.css("height", "70px");
    task.css("z-index","11");
    task.css("background", "transparent");
    task.css("color","black");
    task.css("border-radius","20px");
    task.css("margin-top","20px");
    task.css("margin-left",setAbstand()+"px");
    task.addClass("taskclass");
    task.addClass("left-align");
    task.append(titel);
    task.append(fortschritt);
    liste();
}

function liste() {
    var a = $("<tr></tr>");
    var toddy = new Date();
    var task = $("<td></td>");
    task.text(name);
    var von = $("<td></td>");
    von.text(start.getDay()+"-"+start.getMonth()+"-"+start.getFullYear());
    var geplant = $("<td></td>");
    geplant.text(plan.getDay()+"-"+plan.getMonth()+"-"+plan.getFullYear());
    var deadline = $("<td></td>");
    deadline.text(ende.getDay()+"-"+ende.getMonth()+"-"+ende.getFullYear());

    var status = $("<td></td>");
    if(toddy < plan){
        status.css("background-color","green");
        status.css("color", "white");
        status.text("In Time");
    }
    if(toddy > plan){
        status.css("background-color","orange");
        status.css("color", "white");
        status.text("Plan exceeded");
    }
    if(toddy > ende){
        status.css("background-color","red");
        status.css("color", "white");
        status.text("Deadline exceeded");
    }
    a.append(task);
    a.append(von);
    a.append(geplant);
    a.append(deadline);
    a.append(status);
    $("#listbody").append(a);
}