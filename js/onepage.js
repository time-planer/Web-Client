const onepage = {};
(function(exports) {
    var components = [];
    var views = [];
    var defInit = function(view) {
        view.get().find("[subst]").each(function() {
            var val = $(this).attr("subst");
            $(this).text(view[val]);
        });
    };
    exports.getComp = function(name) {
        for (var i = 0; i < components.length; i++) {
            if (components[i].name === name) return components[i];
        }
    };
    exports.loadComps = function() {
        $(".component").hide().each(function() {
            var elem = $(this);
            var comp = new exports.Component();
            comp.name = elem.attr("name");
            comp.base = elem;
            comp.init = defInit;
            components.push(comp);
        });
    };
    exports.substViews = function() {
        $(".view").show().each(function() {
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
    exports.loadComp = function(name){
        var c = new exports.Component(name);
        c.load();
        components.push(c);
    };
})(onepage);

(function(exports) {
    exports.View = function (comp) {
        this.comp = comp;
        if (this.comp != null) this.element = comp.base.clone().show();
    };
    exports.View.prototype.get = function() {
        if (this.element == null) init();
        return this.element;
    };
    exports.View.prototype.element = null;
    exports.View.prototype.refresh = function() {
        this.element.html(this.comp.base.clone().html());
        this.comp.init(this);
    };
    exports.View.prototype.get = function() {
        return this.element;
    };
    exports.View.prototype.$ = exports.View.prototype.get;
    exports.View.prototype.init = function() {
        this.comp.init(this);
    };
})(onepage);

(function(exports) {
    exports.Component = function (name) {
        if (name != null) {
            this.name = name;
            this.load();
        }
    };
    exports.Component.prototype.base = null;
    exports.Component.prototype.load = function() {
        this.base = $($.ajax({
            type: "GET",
            url: "components/" + this.name + ".html",
            async: false
        }).responseText);
    };
    exports.Component.prototype.create = function() {
        return new exports.View(this);
    };
    exports.Component.prototype.init = function(v) {};

})(onepage);