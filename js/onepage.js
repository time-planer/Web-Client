const onepage = {};
var dev = false;

/**
 * main Init
 */
(function(exports) {
    var components = [];
    var views = [];
    if(dev){
        exports.components = components;
        exports.views = views;
    }
    /**
     * @param view {onepage.View}
     */
    var defInit = function(view) {
        view.get().find("[subst]").each(function() {
            var val = $(this).attr("subst");
            $(this).text(view[val]);
        });
    };
    /**
     * @param name {string}
     * @return {exports.Component}
     */
    exports.getComp = function(name) {
        for (var i = 0; i < components.length; i++) {
            if (components[i].name === name) return components[i];
        }
    };
    /**
     * @param root {jquery.fn.init}
     */
    exports.loadComps = function(root = null) {
        if(root === undefined || root === null )
            root = $("body");
        root.find(".component").hide().each(function() {
            var elem = $(this);
            var comp = new exports.Component();
            comp.name = elem.attr("name");
            comp.base = elem;
            comp.base.removeClass("component");
            comp.init = defInit;
            components.push(comp);
        });
    };
    exports.substViews = function(element) {
        var els;
        if(element !== undefined && element != null)
            els = element.find(".view");
        else
            els = $(".view");
        els.show().each(function() {
            var elem = $(this);
            var c, v;
            for (var i = 0; i < components.length; i++) {
                c = components[i];
                if (c.name === elem.attr("name")) {
                    v = c.create();
                    views.push(v);
                    $(elem[0].attributes).each(function() {
                        v[this.name] = this.value;
                    });
                    v.init();
                    elem.html(v.get());
                    return;
                }
            }
            c = new exports.Component(elem.attr("name"));
            c.load();
            v = c.create();
            views.push(v);
            $(elem[0].attributes).each(function() {
                v[this.name] = this.value;
            });
            v.init();
            elem.html(v.get());
        });
    };
    exports.init = function() {
        this.loadComps();
        this.substViews();
    };
    exports.loadComp = function(){
        var tmp = this.compPath;
        if(arguments.length === 0)
            this.loadComps();
        else if(arguments.length == 1){
            var c = new exports.Component(name);
            c.load();
            components.push(c);
        }
        else{
            for (var i = 0;i<arguments.length;i++){
                this.compPath += arguments[i];
                if(i+1 !== arguments.length)
                    this.compPath += "/";
            }
            var c = new exports.Component(name);
            c.load();
            components.push(c);
        }
        this.compPath = tmp;

    };
    exports.compPath = undefined;
})(onepage);

/**
 * Component
 */
(function(exports) {
    /**
     * @param name {String}
     * @constructor
     */
    exports.Component = function (name) {
        if (name != null) {
            this.name = name;
            this.load();
        }
    };
    /**
     * @type {jquery.fn.init}
     */
    exports.Component.prototype.base = null;
    exports.Component.prototype.load = function() {
        this.base = $($.ajax({
            type: "GET",
            url: onepage.compPath+"/" + this.name + ".html",
            async: false
        }).responseText);
    };
    /**
     * @return {onepage.View}
     */
    exports.Component.prototype.create = function() {
       var v = new exports.View(this);
       v.init();
       return v;
    };
    /**
     * @param v {onepage.View}
     */
    exports.Component.prototype.init = function(v) {};
})(onepage);

/**
 * VIEW
 */
(function(exports) {

    /**
     * @param comp {onepage.Component}
     * @constructor
     */
    exports.View = function (comp) {
        this.comp = comp;
        if (this.comp != null) { this.element = comp.base.clone().show();}
        var _this = this;
        this.values = new Proxy({
            ___THIS___ : _this
        },exports.View.prototype.handler);
    };
    /**
     * @return {jquery.fn.init}
     */
    exports.View.prototype.get = function() {
        if (this.element == null) init();
        return this.element;
    };
    /**
     *
     * @type {jquery.fn.init}
     */
    exports.View.prototype.element = null;
    exports.View.prototype.refresh = function() {
        this.element.html(this.comp.base.clone().html());
        exports.substViews(this.element);
        this.comp.init(this);
    };
    /**
     * @return {jquery.fn.init}
     */
    exports.View.prototype.$ = exports.View.prototype.get;
    exports.View.prototype.init = function() {
        exports.substViews(this.element);
        this.comp.init(this);
    };
    exports.View.prototype.handler = {
        set: function(target, key, value) {
            if(key === "___THIS___"){
                return;
            }
            console.log(`Setting value ${key} as ${value}`);
            target[key] = value;
            target.___THIS___.refresh();
        }
    };
    /**
     * @param key {string}
     * @param value {*}
     * @return {*}
     */
    exports.View.prototype.val = function (key,value = null) {
        if(value !== undefined && value !== null){
            this.values[key] = value;
            return value;
        }else{
            return this.values[key];
        }
    }
})(onepage);