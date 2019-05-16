/**
 * Styles the task in the page
 * @param task {div}
 */
var z = 0;
var task;
var von;
var start;
let description;
let priority;
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
var times = 1;
var pruef;
var balkwidth = 0;
var faktoli = 0;
var tlhoch;
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
var zaehler = 0;
var unt;


function styleTask(task1,von1,bis,span, desc, pri,tlhoch2) {
    tlhoch = tlhoch2;
    task = task1;
    priority = pri;
    description = desc;
    text = span.text();
    von = von1;
    unt = bis;
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
    var breite = days*50;
    breite = breite;
    return breite;
}
function today() {
    var today = new Date();
    var secs = today-von;
    var days = Math.round(secs/1000/60/60/24);
    var abstandLinks = days*50;

}
function setAbstand() {
    var secs = start-von;
    var days = Math.round(secs/1000/60/60/24);
    var abstandLinks = days*50;
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
        balk2width = balk2width*50;
        if(plan !== ende){
            balkwidth = ende-plan;
            balkwidth = balkwidth/1000/60/60/24;
            balkwidth = balkwidth*50;
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
        balkwidth = balkwidth*50;
        balk2width = today-plan;
        balk2width = balk2width/1000/60/60/24;
        balk2width = balk2width*50;
        pruef = 2;
    }
    if(today > ende){
        faktoli = 10;
        text = "Deadline exceeded";
        farbe = "red";
        balk2width = 0;
        balkwidth = today-ende;
        balkwidth = balkwidth/1000/60/60/24;
        balkwidth = balkwidth*50;
        ende = today;
        b = setWidth();
        pruef = 3;

    }

}

function designAndroidTask() {
    // var today = new Date();
    // text = "";
    // farbe = "";
    // farbe2 = "";
    // pruef = 0;
    // if(today < plan){
    //     faktoli = 0;
    //     farbe = "orange";
    //     farbe2 = "green";
    //     balk2width = plan-today;
    //     balk2width = balk2width/1000/60/60/24;
    //     balk2width = balk2width*50;
    //     if(plan !== ende){
    //         balkwidth = ende-plan;
    //         balkwidth = balkwidth/1000/60/60/24;
    //         balkwidth = balkwidth*50;
    //     }
    //     pruef = 1;
    // }
    // if(today > plan){
    //     faktoli = 0;
    //     balk2width = 0;
    //     farbe = "orange";
    //     farbe2 = "orangered";
    //     text = "Planed exceeded";
    //     balkwidth = ende-today;
    //     balkwidth = balkwidth/1000/60/60/24;
    //     balkwidth = balkwidth*50;
    //     balk2width = today-plan;
    //     balk2width = balk2width/1000/60/60/24;
    //     balk2width = balk2width*50;
    //     pruef = 2;
    // }
    // if(today > ende){
    //     faktoli = 10;
    //     text = "Deadline exceeded";
    //     farbe = "red";
    //     balk2width = 0;
    //     balkwidth = today-ende;
    //     balkwidth = balkwidth/1000/60/60/24;
    //     balkwidth = balkwidth*50;
    //     ende = today;
    //     b = setWidth();
    //     pruef = 3;
    //
    // }
    // $('#taskholder').addClass("valign-wrapper");
    // task.css("width","200px");
    // task.addClass("center-align");
    // task.addClass("truncate");
    // var ab = setAbstand();
    // if(b <= 100){
    //     ab = ab - (100-b);
    //     b = 100;
    // }
    // ab = ab+"px";
    // b = b + "px";
    //
    // task.css("height",b);
    // task.css("margin-top",ab);
    // //task.addClass("valign-wrapper");
    // task.addClass("flow-text");
    // task.css("margin-left","5px");
    // task.css("color","white");
    // task.css("background-color",farbe);
    // task.text(name);
    // task.css("border","0.1px black solid");
    // task.css("border-radius","20px");
    // liste();

    var box = $("<div></div>");
    var bw;
    var tmp;
    tmp = setAbstand()+"px";
    bw = (ende-start)/1000/60/60/24*50;
    bw = bw+"px";
    console.log(bw);
    box.css("width","100px");
    box.css("height",bw);
    box.css("background-color","red");
    box.css("margin-left","20px");
    $("#taskholder").addClass("valign-wrapper");
    task.addClass("left-align");
    task.css("margin-top",tmp);
    console.log(tmp);
    task.append(box);
}

function newDesignAndroidTask(){
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
    var pixw = "70px";

    tmp = plan-start;
    tmp = tmp/1000/60/60/24*50;
    tmp = tmp+"px";
    green.css("width",pixw);
    green.css("height",tmp);


    tmp = 0;
    tmp = ende-plan;
    tmp = tmp/1000/60/60/24*50;
    tmp = tmp+"px";
    orange.css("width",pixw);
    green.css("height",tmp);

    if(toddy > ende){
        tmp = 0;
        tmp = toddy-ende;
        tmp = tmp/1000/60/60/24*50;
        tmp = tmp+50;
        tmp = tmp+"px";
        red.css("width", tmp);
        red.css("height", "30px");
        red.css("background-color","red");
        red.addClass("left");
    }
    liste();

}

function designiOSTask() {

}

function designAndroid() {
    //$('#login-div').css("width","90%");
    //$('#login-div').css("margin-left","5%");
    //$('#login-div').css("margin-bottom","10%");
    liste();
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
    tmp = tmp/1000/60/60/24*50;
    tmp = tmp+"px";
    green.css("width", tmp);
    green.css("height", "30px");
    green.css("background-color","green");
    green.addClass("left");


    // Orangener Balken Design
    tmp = 0;
    tmp = ende-plan;
    tmp = tmp/1000/60/60/24*50;
    tmp = tmp+"px";
    orange.css("width", tmp);
    orange.css("height", "30px");
    orange.css("background-color","orange");
    orange.addClass("left");


    // Roter Balken Design
    if(toddy > ende){
        tmp = 0;
        tmp = toddy-ende;
        tmp = tmp/1000/60/60/24*50;
        tmp = tmp+50+2;
        tmp = tmp+"px";
        red.css("width", tmp);
        red.css("height", "30px");
        red.css("background-color","red");
        red.addClass("left");
    }


    // Heute Strich Design
    // heute.css("width","50px");
    // heute.css("height", "30px");
    // heute.css("background-color","black");
    // tmp = toddy-start;
    // tmp = tmp/1000/60/60/24*50;
    // tmp = tmp;
    // heute.css("margin-left",(tmp+2)+"px");
    // heute.css("position","relative");
    // heute.css("z-index","1");


    // Titel Box Design
    tmp = 0;
    tmp = green.width()+orange.width()+red.width();
    titel.css("width",tmp);
    titel.css("height", "40px");
    titel.css("background-color","white");
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
    //fortschritt.append(heute);


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
    if(times == 1){
        tlhoch = ((-1)*tlhoch)+20;
        task.addClass("firsttask");
        task.css("margin-top",tlhoch+"px");
        task.attr("basemargin",tlhoch);
        times++;
    }
    else{
        task.css("margin-top","20px");
    }

    task.css("margin-left",setAbstand()+"px");
    //task.css("position","relative");
    task.addClass("taskclass");
    task.addClass("left-align");
    task.append(titel);
    task.append(fortschritt);
    liste();
}

function liste() {
    var toddy = new Date();
    var task = $("<td class='name_field'></td>");
    task.text(name);
    var von = $("<td></td>");
    var l1 = longStringDateToShortStringDate((start.toString()));
    var l2 = longStringDateToShortStringDate((plan.toString()));
    var l3 = longStringDateToShortStringDate((ende.toString()));
    var t;
    l1 = l1.split(".");
    if(l1[0]<10){
        l1[0] = "0"+l1[0];
    }
    if(l1[1]<10){
        l1[1] = "0"+l1[1];
    }
    //console.log(l1[0]);
    //console.log(l1[1]);
    t = l1[0]+"-"+l1[1]+"-"+l1[2];
    l1 = t;
    t = 0;
    l2 = l2.split(".");
    if(l2[0]<10){
        l2[0] = "0"+l2[0];
    }
    if(l2[1]<10){
        l2[1] = "0"+l2[1];
    }
    //console.log(l2[0]);
    //console.log(l2[1]);
    t = l2[0]+"-"+l2[1]+"-"+l2[2];
    l2 = t;
    t = 0;
    l3 = l3.split(".");
    if(l3[0]<10){
        l3[0] = "0"+l3[0];
    }
    if(l3[1]<10){
        l3[1] = "0"+l3[1];
    }
    //console.log(l3[0]);
    //console.log(l3[1]);
    t = l3[0]+"-"+l3[1]+"-"+l3[2];
    l3 = t;
    t = 0;
    //console.log(longStringDateToShortStringDate((start.toString())));
    //console.log(longStringDateToShortStringDate((plan.toString())));
    //console.log(longStringDateToShortStringDate((ende.toString())));
    von.text(l1);
    var geplant = $("<td></td>");
    geplant.text(l2);
    var deadline = $("<td></td>");
    deadline.text(l3);
    var a = $("<tr class='task hand'></tr>");
    a.attr("planed",shortStringDatetoLongStringDate(geplant.text()));
    a.attr("deadline",shortStringDatetoLongStringDate(deadline.text()));
    a.attr("startdate",shortStringDatetoLongStringDate(von.text()));
    a.attr("description",description); //Die Infos
    a.attr("priority",priority); //Die Wichtigkeit
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
    a.on("click",openTask);
    $("#listbody").append(a);
}

function timeline(bis,von){
    var datesline = $("<div style='position: relative;' id='datesline' pixl='0'></div>");
    var tmp;
    var startdate = von;
    unt = bis;
    var bitch = new Date();
    console.log("Von: "+von);
    console.log("Unt: "+unt);
    var bitchi = (bitch-von)/1000/60/60/24;
    bitchi = Math.round(bitchi);
    console.log(bitchi);
    var h = storage.length;
    h = h*(-90);
    h = h-90;
    tmp = unt-von;
    console.log(tmp);
    tmp = tmp/1000/60/60/24;
    tmp +=2;
    datesline.css("width", tmp*50+"px");
    tmp +=0;
//margin-top: "+h+"px
    datesline.css("height","40px");
    datesline.addClass("teal accent-4");
    var tl = $("<div class='left-align' style='height: "+(-1*h+20)+"px;z-index: -5; position: relative; width: "+tmp*50+"px;top: 0; left: 0;'></div>");
    tlhoch = -1*h+20;
    console.log(tmp);
    console.log(unt+"-"+von+"="+tmp);
    var abstand = 49;
    var i;
    var fufzig = 50;
    for(i = 1; i<tmp;i++){
        console.log(fufzig*i);
        var dates = $("<div></div>");

        dates.css("display","inline-block");
        dates.css("width","50px");
        var spanDates = $("<span><center>" + addOneDayToDate(startdate,i-2) + "</center></span>");
        spanDates.css("color","white");
        dates.append(spanDates);
        var vline = $("<div class='vline'></div>");
        if(bitchi != i){
            console.log("drinnenab");
            //vline.css("position","relative");
            vline.css("display","inline-block");
            vline.css("width", "1px");
            vline.css("height","100%");
            vline.css("background-color","black");
            vline.css("margin-left",(abstand+"px"));
            tl.append(vline);
        }
        else{
            console.log("tottototoot");
            vline.css("display","inline-block");
            vline.css("width", "50px");
            vline.css("height","100%");
            vline.css("background-color","black");
            vline.css("margin-left",(abstand+"px"));
            tl.append(vline);
        }
        datesline.append(dates);
    }
    console.log(fufzig);
    $("#taskholder").append(datesline);
    $("#taskholder").css("height",(-h)+"px");
    $("#taskholder").append(tl);
    console.log("fertig");
    return tlhoch;
}

function fixedDates(e) {
    var plus = e.scrollTopDelta;
    console.log(plus);
    var mtoptask;
    var mtop = $("#datesline").attr("pixl");
    mtop = mtop-1+(plus+1);
    mtoptask = $(".firsttask").attr("basemargin")-mtop;

    $("#datesline").attr("pixl",mtop);
    //alert(mwert);
    $(".firsttask").css("margin-top",mtoptask+"px");
    $("#datesline").css("margin-top",mtop+"px");

    console.log("triggered");
}

function datesTimeline() {



}