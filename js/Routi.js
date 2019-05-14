class Router {
    routes = new Map();
    redirects = new Map();
    forwards = new Map();
    listeners = new Map();

    /**
     * @type {string}
     */
    defaultRoute = "";

    fallback = function (router,url) {

    };

    static appConfig;
    /**
     * @param defaultPath {string} is not a route so it may not contain any variables
     * @param defaultPage {Page}
     */
    constructor(defaultPath, defaultPage = DefaultPage){
        let _this = this;
        window.onpopstate = function(event) {
            _this.openMatchingLocation();
        };
        this.defaultRoute = defaultPath;
        //this.addRoute(defaultPath,defaultPage);
    }

    /**
     * @param route {string}
     */
    set defaultRoute(route){
        this.defaultRoute = route;
    }

    /**
     * @param path {string}
     * @param page {Page}
     */
    addRoute(path,page){
        this.routes.put(path,page);
    }


    /**
     * @param path {string}
     * @param url {string}
     */
    addRedirect(path,url){
        this.redirects.put(path,url);
    }


    /**
     * @param path {string}
     * @param url {string}
     * @deprecated
     * not implemented yet
     */
    addForward(path,url){
        this.forwards.put(path,url);
    }

    /**
     * @param path {string}
     * @param func {function}
     * @deprecated
     * not implemented yet
     */
    addListener(path,func){
        this.listeners.put(path,func);
    }

    goTo(url){
        history.pushState({}, "title 1", url);
        this.openMatchingLocation();

    }
    apply(){
        this.addRedirect("#",this.defaultRoute);
        this.openMatchingLocation();
    }


    /**
     * @param path {string}
     * @param route {string}
     * @return {{}}
     */
    static match(path,route,maping){
        let pathParts = path.split("/");
        let routeParts = route.split("/");
        let variables = {};
        if(routeParts.length !== pathParts.length)
            return null;
        for (let i = 0; i < pathParts.length; i++) {
            let ppart = pathParts[i];
            let rpart = routeParts[i];
            if(rpart.startsWith("{") && rpart.endsWith("}"))
                variables[rpart.substr(1,rpart.length-2)] = ppart;
            else if (rpart.toLowerCase() !== ppart.toLowerCase())
                return null;
        }
        return variables;
    }

    openMatchingLocation() {
        this.checkListeners();
        if(!this.checkRoutes())
            if(!this.checkRedirects())
                if(!this.checkForwards())
                    this.fallback(this,window.location.href);
    }

    checkRoutes() {
        for (let i = 0; i <this.routes.size; i++) {
            let route = this.routes.keys[i];
            let parts = route.split("/").length;
            let cuted =document.location.href.split(
                "/",
                document.location.href.split("/").length-parts
            );
            cuted = document.location.href.replace(cuted.join("/"),"");
            cuted = cuted.substring(1,cuted.length);


            let vars = Router.match(cuted,route,this.routes);
            if(vars !== null && vars !== undefined){
                let page = new (this.routes.get(route))();
                for (let j = 0; j <  Object.keys(vars).length; j++) {
                    page.val(Object.keys(vars)[j],vars[Object.keys(vars)[j]]);
                }
                page.show();
                return true;
            }
        }
        return false;
    }

    checkRedirects() {

        for (let i = 0; i <this.redirects.size; i++) {
            let route = this.redirects.keys[i];
            let parts = route.split("/").length;
            let cuted =document.location.href.split(
                "/",
                document.location.href.split("/").length-parts
            );
            cuted = document.location.href.replace(cuted.join("/"),"");
            cuted = cuted.substring(1,cuted.length);


            let vars = Router.match(cuted,route,this.redirects);
            if(vars !== null && vars !== undefined){
                let target = this.redirects.get(route);
                let keys =  Object.keys(vars);
                let page = this.routes.get(target);
                if(page === null || page === undefined){
                    this.fallback(this,window.location.href);
                }
                for (let j = 0; j <  keys.length; j++) {
                    target = target.replace("{"+keys[j]+"}",vars[keys[j]]);
                }
                this.goTo(window.location.href.replace(cuted,target));
                return true;
            }
        }
        return false;
    }
    checkForwards() {
        return false;
    }

    checkListeners() {
        for (let i = 0; i <this.listeners.size; i++) {
            let route = this.listeners.keys[i];
            let parts = route.split("/").length;
            let cuted =document.location.href.split(
                "/",
                document.location.href.split("/").length-parts
            );
            cuted = document.location.href.replace(cuted.join("/"),"");
            cuted = cuted.substring(1,cuted.length);


            let vars = Router.match(cuted,route,this.listeners);
            if(vars !== null && vars !== undefined){
                this.listeners.get(route)();
                return true;
            }
        }
        return false;
    }
}

class Map {
    constructor(name = undefined){
        if(name !== undefined){
            this.usePermanentCaching = true;
            this.name = name;
            if(localStorage.getItem(name) !== null)
                this.data = JSON.parse(localStorage.getItem(name));
        }
    }
    usePermanentCaching = false;
    data = [];
    name;
    put(key,value){
        let p = new Pair();
        p.key = key;
        p.value = value;
        for (let i = 0; i < this.data.length; i++) {
            if(this.data[i].key === key) {
                this.data[i].value = value;
                return;
            }
        }
        this.data.push(p);
        this.save();
    }
    get(key){
        for (let i = 0; i < this.data.length; i++) {
            if(this.data[i].key === key)
                return this.data[i].value;
        }
    }
    remove(key){
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].key === key) {
                this.data.splice(i,1);
                return;
            }
        }
    }
    clear(){
        this.data = [];
    }
    save(){
        localStorage.setItem(this.name,JSON.stringify(this.data));
    }
    get size(){
        return this.data.length;
    }
    get keys(){
        let keys = [];
        for (let i = 0; i < this.data.length; i++) {
            keys.push(this.data[i].key);
        }
        return keys;
    }
    getKeys(){
        let keys = [];
        for (let i = 0; i < this.data.length; i++) {
            keys.push(this.data[i].key);
        }
        return keys;
    }
}
class Pair {
    value;
    key;
}