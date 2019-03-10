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
var plan;
var b;
var name;
var span2;
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
    console.log(von1);
    ende = longStringtoDate(task.attr("deadline"));
    start = longStringtoDate(task.attr("startdat"));
    //var exceedDuration = task.children(".deadlineexceed").attr("duration");
    //var plan2 = task.children(".planexceed").attr("duration");
    plan = longStringtoDate(task.attr("planed"));
    //var offset = task.attr("dayOffset");
    name = span.text();
    b = setWidth();

    span2 = $("<span style='width: 90%; padding-right: 10%'></span>");
    setDead();
    detectDevice();






    if(z==0){
        //today(von);
        z++;
    }


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
    var secs = start-von;
    console.log(start);
    console.log(von);
    console.log(secs);
    var days = Math.round(secs/1000/60/60/24);
    console.log(days);
    var abstandLinks = days*25+"px";
    console.log(days*25);
    console.log(abstandLinks);
    return abstandLinks;
}
function setDead() {
    var today = new Date();
    farbe = "green";
    text = ""
    if(today > plan){
        farbe = "orange";
        text = "Planed exceeded";
    }
    if(today > ende){
        text = "Deadline exceeded";
        farbe = "red";
    }

}

function detectDevice() {
    ret = 0;
    if (isMobile.Android() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows()) {
        ret = 1;
    }
    if(isMobile.iOS()){
        ret = 2;
    }
    switch (ret) {
        case 0:
            designPC();
            break;
        case 1:
            designAndroidTask();
            break;
        case 2:
            designiOSTask();
            break;
    }
};

function designAndroidTask() {

}

function designiOSTask() {

}

function designAndroid() {
    $('#login-div').css("width","90%");
    $('#login-div').css("margin-left","5%");
    $('#login-div').css("margin-bottom","10%");
}

function designiOS() {

}

function designPC() {
    var dL = $("<div class=\"col s8\"></div>");
    var dR = $("<div class=\"col s4\"></div>");

    span2.text(text);
    dR.css("background-color", farbe);
    dR.css("height", "70px");
    dR.css("z-index","0");
    dR.css("color","white");
    dR.addClass("valign-wrapper");
    dR.addClass("flow-text");
    dR.css("padding-right","5px");




    dL.css("height", "70px");
    dL.css("z-index","0");
    dL.addClass("valign-wrapper").addClass("flow-text").addClass("name_field");



    task.addClass("row");
    task.css("border", "1px black solid");
    task.css("color", "red");
    task.css("overflow","hidden");
    task.css("box-sizing","content-box");
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
    task.css("margin-left", setAbstand());
    task.css("color","black");
    task.css("border-radius","20px");

    dR.append(span2);
    dL.append(name);


    task.append(dL);
    task.append(dR);
}
