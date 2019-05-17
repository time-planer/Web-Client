const notify = {};
notify.started = false;
notify.watched = [];
notify.start = function () {
    notify.started = true;
    setInterval(function () {
        for (let i = 0; i < notify.watched.length; i++) {
            let obj = notify.watched[i];
            if(obj.value){
                memgroup.getGroupTask(get_cookie("name"),obj.name,obj.group,function (error,data,s) {
                    if(!error){
                        let opts = {};
                        if(data.deadline<new Date() && !data.process<100){
                            opts.body = "Die Deadline vom Task "+data.name+" ist überschritten, erledige den Task!";
                        }else if(data.planedDate<new Date()&& !data.process<100){
                            opts.body = "Dein Zeitplan vom Task "+data.name+" ist überschritten, erledige den Task!";
                        }
                        new Notification(data.name+" Task (Time Planer)", opts);
                    }
                });
            }
        }
    },1000*60*60);
};
notify.watch = function (name,grp,watch) {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
        return;
    }
    if(Notification.permission === "denied"){
        M.toast({html:"You need to allow us to show notifications"});
        Notification.requestPermission(function (right) {
            if(right === "denied"){
                //M.toast({html:"You need to allow us to show notifications if you like to see some!"});
            }else if(!notify.started){
                notify.start();
            }
        });
    }else if (Notification.permission === "default"){
        Notification.requestPermission(function (right) {
            if (right === "granted" && !notify.started) {
                notify.start();
            }
        });
    }else{
        if(!notify.started)
            notify.start();
    }
    for (let i = 0; i <notify.watched.length; i++) {
            if(notify.watched[i].name === name && notify.watched[i].group === grp) {
                notify.watched.splice(i, 1);
                i--;
            }
    }
    notify.watched.push({
        name:name,
        group:grp,
        value: watch
    });
    localStorage.notify = JSON.stringify(notify.watched);
};

notify.startup = function () {
    if(localStorage.notify !== undefined ) {
        let loaded = JSON.parse(localStorage.notify);
        for (let i = 0; i < loaded.length; i++) {
            notify.watch(loaded[i].name,loaded[i].group,loaded[i].value);
        }
    }
};