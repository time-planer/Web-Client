const onepage = {};
const dev = false;

/**
 * main Init
 */
(function(exports) {
    const components = [];
    if(dev)
        exports.components = components;
    /**
     * @param view {onepage.View}
     */
    const defInit = function(view) {
        view.get().find("[subst]").each(function() {
            const val = $(this).attr("subst");
            $(this).text(view[val]);
        });
    };

    exports.compPath = "components";
    /**
     *@param name {string}
     * @return {onepage.Component}
     */
    exports.getComp = function(name) {
        for (let i = 0; i < components.length; i++) {
            if (components[i].name === name) return components[i];
        }
    };
    /**
     * @param root {string | jquery.fn.init}
     */
    exports.loadComps = function(root = null) {
        if(root === undefined || root === null )
            root = $("body");
        if(typeof  root === 'string') {
            root = ("<div></div>").load(onepage.compPath+"/"+root+".html");
        } else if(Array.isArray(name)){
            for (let i = 0; i < name.length; i++) {
                onepage.loadComp(name[i]);
            }
            return;
        }
        root.find(".component").hide().each(function() {
            const elem = $(this);
            const comp = new exports.Component();
            comp.name = elem.attr("name");
            comp.base = elem;
            comp.base.removeClass("component");
            comp.init = defInit;
            components.push(comp);
        });
    };
    exports.substViews = function(element) {
        let els;
        if(element !== undefined && element != null)
            els = element.find(".view");
        else
            els = $(".view");
        els.show().each(function() {
            let elem = $(this);
            let c, v;
            for (let i = 0; i < components.length; i++) {
                c = components[i];
                if (c.name === elem.attr("name")) {
                    v = c.create();
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
        const tmp = this.compPath;
        if(arguments.length === 0)
            this.loadComps();
        else if(arguments.length === 1){
            const c = new this.Component(arguments[0]);
            c.load();
            components.push(c);
        }
        else{
            for (let i = 0;i<arguments.length-1;i++){
                this.compPath += "/";
                this.compPath += arguments[i];
            }
            const c = new this.Component(arguments[arguments.length-1]);
            c.load();
            components.push(c);
        }
        this.compPath = tmp;
    };


    /**
     * @param name {String}
     * @constructor
     */
    exports.Component = class Component {
        load(){
            this.base = $($.ajax({
                type: "GET",
                url: onepage.compPath+"/" + this.name + ".html",
                async: false
            }).responseText);
        };
        /**
         * @return {onepage.View}
         */
       create() {
            var v = new exports.View(this);
            v.init();
            return v;
        };
        /**
         * @param v {onepage.View}
         */
        init (v) {};

        /**
         * @param name
         */
        constructor (name = null){
            /**
             * @type {jquery.fn.init}
             */
            this.base = undefined;
            /**
             * @type {string}
             */
            this.name = undefined;
            if (name != null) {
                this.name = name;
                this.load();
            }
        }

    };
    /**
     * @type {onepage.View}
     */
    exports.View = class View {
        /**
         * @return {jquery.fn.init}
         */
        $(){
            return this.get();
        };
        /**
         * @return {jquery.fn.init}
         */
        get() {
            if (this.element == null) init();
            return this.element;
        }
        refresh() {
            this.element.html(this.comp.base.clone().html());
            this.init();
        }
        init() {
            exports.substViews(this.element);
            this.comp.init(this);
        }

        /**
         * @param key {string}
         * @param value {*}
         * @return {*}
         */
        val(key,value = null) {
            if(value !== undefined && value !== null){
                this.values[key] = value;
            }else{
                return this.values[key];
            }
        };
        /**
         * @param comp {onepage.Component}
         * @constructor
         */
        constructor (comp){
            this.comp = comp;
            /**
             * @type {jquery.fn.init}
             */
            this.element = undefined;
            if (this.comp != null) { this.element = comp.base.clone().show();}
            const _this = this;
            this.values = new Proxy({
                ___THIS___ : _this
            },{
                set: function(target, key, value) {
                    if(key === "___THIS___"){
                        return target.___THIS___;
                    }
                    console.log(`Setting value ${key} as ${value}`);
                    target[key] = value;
                    target.___THIS___.refresh();
                    return value;
                }
            });
        }

    };
})(onepage);