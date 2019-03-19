# One Page Framework
This frameworks enables HTML reusing and using it as JavaFX
## Getting Started
### Structure
This is the file structure present at all time in my tutorial.
You can use your own one for sure
`````
 project
 |--- components
 |    |--- collection.html
 |    |--- list.html
 |    |--- sub
 |         |--- sub.html
 |
 |--- test
 |    |--- other.html
 |
 |--- src
 |    |--- myscript.js
 |    |--- onepage.js
 |
 |--- index.html
 `````
### Component
Component is a class which represents a html template. Here is how you create a Component
`var component = new onepage.Component("Name");`<br>
A more common way is<br>
`var comp = onepage.loadComp("component");`<br>
But what is the content of this components? There are to ways to fill them.<br>
* Auto read multiple from ONE file (recommended for small components like buttons)
* Manual Read them from separated files (for big components)

The contructor of `Component` takes an `name` argument.<br>
This argument is the name of the html to read as template from the default component directory which is the `component` folder.<br>
### Example
At first create an Component.<br>
It is very easy just plain HTML. so lets do `list.html`<br>
```html
<div>
    <h1 class="title"></h1>
    <ul>
    </ul>
</div>
```

some advices
* Avoid writing hardcode! so do not write text into tags.
* This files are only for structure
* You do not need any special tags or params
* give every item like the `<h1>` a class if you like to access it later on

Now we are ready to read the component is JS (in the `index.html`)
```javascript
$(document).ready(function(){
    onepage.loadComp("list");
});
```

Now we have the component. But how to place it in the index HTML?<br>
And how do we insert the title into the `<h1>`?<br>
So therefore we need `Views`
### Views
A View is an instance of an Component lets say an outfilled template.<br>
Lets do it
```javascript
$(document).ready(function(){
    onepage.loadComp("list");
    var comp = onepage.getComp("list");
    var view = comp.create();
});
```

Now we have a view object!<br>
Lets throw it into the index.html!
```javascript
$(document).ready(function(){
    onepage.loadComp("list");
    var comp = onepage.getComp("list");
    var view = comp.create();
    $("body").append(view.get()); // alternative is view.$()
});
```

But We dont see anything right?
we need to tell the component how to build a view.
```javascript
$(document).ready(function(){
    onepage.loadComp("list");
    var comp = onepage.getComp("list");
    comp.init = function(v) {
      //v is a view
      
      //get a value of the view (we will set this later)
      var textToDisplay = v.val("title");
      
      //the v.get() returns a jquery object so we can use all JQuery methods
      v.get().find(".title").text(textToDisplay)
    }
    var view = comp.create();
    
    //Now we can change the value of title in the view here
    //and it will auto update on the HTML
    view.val("title","Test title");
    
    $("body").append(view.get()); // alternative is view.$()
});
```


When you have ONE Component you can create as many Views from it as you like. For example you create a `Component` button, you may create 100 of these buttons (all with different values)
### Description (Listeners;Auto Update)
you can skip to multiple components if you like to.
I go to explain what the code above does.

Every `Component` has a `init` method with a `View` as a parameter. This method is used to manipulate the JQuery component of the `View.` This method is meant to be overwritten as shown. Inside the method you should prepare the html (jquery) to be shown.
> And most importantly you register the LISTENERS in here!

You can get a views html by `View.get ()` or `View. $()`.

maybe you are wondering about the `val () `method you see.
This method is used to pass values to the html. It works as follows:
```javascript
var v = new onepage.View (); //DO NOT USE THIS! This is only to show that v is a View Object
v.val ("key","value");
v.val ("key"); // returns "value"
v.values.key = "value2";
v.val ("key");//returns value2
v.values.key;//the same as the line above
```
So you are forced to use `val()` or `values` if you like to have auto updating values.

So in the `init (v)` method you can call `v.val ("key")` even if key is not set. You can and should do this later on.
# Multiple Component
The framework also allows you to define many components in One HTML file. This is recommended if you have some tiny basic components like input fields toggles buttons or something similar. 

Lets take a look at the `collection.html`
```html
<div class="component" name="theComponentsName">
     <h1 subst="title"> </h1>
</div>
<div class="component" name="button">
     <button subst="buttontext"></button>
</div>
```
What do we see here
- The class `.component` identifys a object as a component
- the `name` attribute defines the name of the component
You are interested : WHAT IS SUBST??
`subst` tells onepage to fill in `v.val (thetextinsubst)`.
Good cool and interesting! But how to use?
Here you are:
```javascript
onepage.loadComps ("collection");
var v = onepage.getComp (" theComponentsName").create ();//directly create a view
v.val ("title");
$("body").append (v.get ());
```
Thats everything
> load comps is not implemented at the moment. What it does at the moment is to search throught the `index.html` and not accepting a parameter
### nestes Comps
Maybe you are interested in placing a button into another view?
Here are the two possible ways to do this
> needs a specific example! Not done yet. But i use both ways in the following full example!

## Complete implementation

> This example is to represent a list in HTML with the feature to remove entrys

`collection.html`
`````html
<li class="component" name="listEntry">
     <h4 subst="title"> </h4>
     <span class="view rmv-btn" name="button" text="remove"></span>
</li>
<div class="component" name="button">
     <button subst="text"></button>
</div>


`list.html`
HTML 
<div>
      <h1 class="lst-name></h1>
      <ul class="content"></ul >
</div>
`````
> `sub/sub.html` missing / not needed
> same as `test/other.html`

That was it with the HTML. Now the JS file
```Javascript 

//Data to display
var listName = "Test list";
var data = [
    "Test1",
   "Test2",
   "Test3",
];

$(document).ready (function (){
     //loading all components
    onepage.loadComps ("collection");
    onepage.loadComp ("list");
    onepage.getComp("list").init = function (v){
         v.get ().find (".lst-name").text (v.val ("name"));
         for (var i = 0;i < v.val ("data").length;i++){
            var entry = onepage.getComponent("lst-entry").create ();
            
			entry.val ("title",data [i]);
            entry.val ("i",i),
            //we would never ever do this in a real application! !! (The following listeners)
             entry.get ().find (".rmv-btn").click (function(){
                    v.val ("data").splice (entry.val ("i"),1);
             });
             v.get ().find (".content").append (entry. $());
        }
    };
});```