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
var ma = 0;
var plan;
var b;
var name;
var span2;
var balkwidth = 0;
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
        //today();
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
    var abstandLinks = days*25;
    window.scrollTo(abstandLinks,0);

}
function setAbstand() {
    var secs = start-von;
    console.log(start);
    console.log(von);
    console.log(secs);
    var days = Math.round(secs/1000/60/60/24);
    var abstandLinks = days*25;
    return abstandLinks;
}
function setDead() {
    var today = new Date();
    farbe = "green";
    text = "";
    if(today < plan){
        balkwidth = plan-today;
        balkwidth = balkwidth/1000/60/60/24;
        balkwidth = balkwidth*24;
    }
    if(today > plan){
        farbe = "orange";
        text = "Planed exceeded";
        balkwidth = today-plan;
        balkwidth = balkwidth/1000/60/60/24;
        balkwidth = balkwidth*24;
    }
    if(today > ende){
        text = "Deadline exceeded";
        farbe = "red";
        balkwidth = today-ende;
        balkwidth = balkwidth/1000/60/60/24;
        balkwidth = balkwidth*24;
        ende = today;
        b = setWidth();

    }

}

function detectDevice() {
    var ret;
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
    var temp = b-balkwidth-5;
    temp = temp+"px";
    balkwidth = balkwidth+"px";
    span2.text(text);
    dR.css("background-color", farbe);
    dR.css("height", "70px");
    dR.css("width", balkwidth);
    dR.css("z-index","0");
    dR.css("color","white");
    //dR.addClass("valign-wrapper");
    dR.addClass("left");
    dR.addClass("flow-text");
    dR.css("padding-right","5px");




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
    if(b <= 100){
        ab = ab - (100-b);
        b = 100;
    }
    ab = ab+"px";
    b = b + "px";
    task.css("width", b);
    task.css("height", "70px");
    task.css("z-index","10");
    task.css("background", "transparent");
    task.css("margin-left", ab);
    task.css("color","black");
    task.css("border-radius","20px");
    task.addClass("left-align");
    dR.append(span2);
    dL.append(name);


    task.append(dL);
    task.append(dR);
}
