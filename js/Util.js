

LIVEDAYS=30;
/**
 * Setzt den Cookie auf das was der Funkion gegeben wird
 */
function set_cookie(name, value) {
    document.cookie=name+"="+escape(value)+"; expires="+cookie_live();
}

function deleteAllCookies() {
    document.cookie="";
    delete document.cookie;
}

function kill_cookie(name) {
    document.cookie=name+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function austausch_cookie(ersterName, ersterWert, zweiterName, zweiterWert) {
    set_cookie(ersterName,zweiterWert);
    set_cookie(zweiterName,ersterWert);
}

/**
 * Setzt die Lebensdauer der cookies auf 90 Tage
 */
function cookie_live() {
    var date=new Date();
    date.setDate(date.getDate()+LIVEDAYS);
    var gmt=date.toGMTString();
    var k1=gmt.indexOf(" ");
    var k2=gmt.indexOf(" ", k1+1);
    var k3=gmt.indexOf(" ", k2+1);
    return gmt.substring(0,k2)+"-"+gmt.substring(k2+1,k3)+"-"+gmt.substring(k3+3,gmt.length);
}

/**
 * Nimmt den Cookie und gibt den Wert zurück
 */
function get_cookie(name) {
    var value=null;
    if(document.cookie !== "") {
        var kk=document.cookie.indexOf(name+"=");
        if(kk >= 0) {
            kk=kk+name.length+1;
            var ll=document.cookie.indexOf(";", kk);
            if(ll < 0)ll=document.cookie.length;
            value=document.cookie.substring(kk, ll);
            value=unescape(value);
        }
    }
    return value;
}

function stringtoDate(text) {
    if(text === "") {
        M.toast({html: 'No date inserted!'});
        return null;
    } else {
        var montext = text.substring(0, 3);
        var monat = 0;
        var tag = text.substring(4,6);
        var jahr = text.substring(7);
        const pruef = new Date(text);
        const isValidDate = (Boolean(+pruef) && pruef.getDate() == tag);
        if(isValidDate) {
            //Macht montext --> monat
            switch (montext) {
                case "Jan":
                    monat = 0;
                    break;

                case "Feb":
                    monat = 1;
                    break;

                case "Mar":
                    monat = 2;
                    break;

                case "Apr":
                    monat = 3;
                    break;

                case "May":
                    monat = 4;
                    break;

                case "Jun":
                    monat = 5;
                    break;

                case "Jul":
                    monat = 6;
                    break;

                case "Aug":
                    monat = 7;
                    break;

                case "Sep":
                    monat = 8;
                    break;

                case "Oct":
                    monat = 9;
                    break;

                case "Nov":
                    monat = 10;
                    break;

                case "Dez":
                    monat = 11;
                    break;
                default:
                    break;
            }
            var date = new Date();
            date.setUTCFullYear(jahr, monat, tag);
            date.setHours(23,55, 0, 0);
            return date;
        } else {
            M.toast({html: 'Date is not valid!'});
            return null;
        }
    }
}

function valipas(pass) {
    var re = 0;
    if (pass.length === 0) {
        M.toast({html: 'Please insert password'});
        return 1;
    } else {
        if (!(pass.length > 7)) {
            M.toast({html: 'Password too short'});
            re = 1;
        }
    }
    if (!(pass.length < 40)) {
        M.toast({html: 'Password too long'});
        re = 1;
    }
    if (!(hasSmall(pass))) {
        M.toast({html: 'Password has no small characters'});
        re = 1;
    }
    if(!(hasBig(pass))) {
        M.toast({html: 'Password has no uppercase characters'});
        re = 1;
    }
    if(!(hasNumber(pass))) {
        M.toast({html: 'Password has no number'});
        re = 1;
    }
    return re;
}

function hasSmall(text) {
    var alpha = "abcdefghijklmnopqrstuvwxyz";
    for(var i = 0;i<alpha.length;i++) {
        for(var j = 0;j<text.length;j++) {
            if(alpha.charAt(i) === text.charAt(j)) {
                return true
            }
        }
    }
    return false
}

function hasBig(text) {
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var i = 0;i<alpha.length;i++) {
        for(var j = 0;j<text.length;j++) {
            if(alpha.charAt(i) === text.charAt(j)) {
                return true
            }
        }
    }
    return false
}

function hasNumber(text) {
    var alpha = "0123456789";
    for(var i = 0;i<alpha.length;i++) {
        for(var j = 0;j<text.length;j++) {
            if(alpha.charAt(i) === text.charAt(j)) {
                return true
            }
        }
    }
    return false
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function longStringDateToShortStringDate(date) {
    var tmp = stringtoDate(date.substr(4,11));
    return tmp.getDate()+"."+(tmp.getMonth()+1)+"."+tmp.getFullYear();
}

function shortStringDatetoLongStringDate(date) {
    var tag = date.substring(0,date.indexOf("-"));
    var monat = date.substring(date.indexOf("-")+1,date.lastIndexOf("-"));
    date = monat+"-"+tag+"-"+date.substring(date.lastIndexOf("-")+1,date.length);
    return new Date(date).toString();
}

function longStringtoDate(string) {
    return stringtoDate(string.substr(4,11));
}

function difDateTag(date) {
    //var date = stringtoDate(date.substr(4,11));
    var now = new Date();
    var secs = date-now;
    var days = secs/1000/60/60/24+1;
    return Math.round(days);
}

function checkDates(plan, dead) {
    if(dead-plan < 1) {
        M.toast({html: 'The deadline must be before the planned date!'})
        return 1;
    } else {
        return 0;
    }
}
function detectDeviceDesign() {
    ret = 0;
    if (isMobile.Android() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows()) {
        ret = 1;
    }
    if(isMobile.iOS()){
        ret = 2;
    }
    switch (ret) {
        case 0:
            alert("Pc");
            break;
        case 1:
            alert("jooo");
            alert("Android");
            designAndroid();
            break;
        case 2:
            alert("iOS");
            designiOS();
            break;
    }
};

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
            //alert("pc");
            //$("#listetab").removeClass("active");
            //$("#tasktab").addClass("active");
            newDesignPC();
            break;
        case 1:
            console.log("android");
            liste();
            //$("#tasktab2").css("visibility","hidden");

            //$("#tasktab").removeClass("active");
            //$("#listetab").addClass("active");
            //$("#listetab").trigger("click");
            //$("#listetab2").click();
            $("#tasktab2").addClass("disabled");

            break;
        case 2:
            //alert("ios");
            liste();
            break;
        default:
            //alert("blalalala");
    }
};

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function addOneDayToDate(datum,i) {
    var monat = datum.getMonth();
    var tag = datum.getDate()+i;

    var temp = new Date(datum.getFullYear(),monat,tag);
    monat = temp.getMonth()+1;
    tag = temp.getDate();

    if(monat < 10) {
        monat = "0"+monat;
    }
    if(tag < 10) {
        tag = "0"+tag;
    }

    return tag+"."+monat;
}