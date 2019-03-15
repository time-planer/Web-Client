# One Page Framework
This frameworks enables HTML reusing and using it as JavaFX
## Getting Started
### Structure
This is the file structure present at all time in my tutorial.
You can use your own one for sure
```
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
````
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
    onepage.loadComp("list.html");
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