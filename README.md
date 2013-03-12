Skeletonode
========

Skeletonode is NodeJS library for creating OOP like applications.
Our library will make NodeJS (Javascript) inheritance more easy to handle and will help you to correctly organize your code;



Using skeleton is very easy;

    1)require('skeletonode')

    2)creating a class:
        SK.define("ExampleClass",{
            property1:1,
            property2:"string",
            property3:fucntion(){}
            property4:{objProperty1:"string"}
        })
    3)extending a class:
        SK.define("ExtendedExample",{
            extends:'ExampleClass',
            property1:2,
            property3:"string".
            property5:function(){}
        })

    4)initializing an object:
        SK.create("ExtendedExample",{
            property1:4
        })

    The final object will be: 
        {
            property1:4,
            property2:"string",
            property3:"string",
            property4:{objProperty1:"string"} ,
            property5:function(){}
        }
    
    ----------------------------------------------
    Dynamic loading is enabled now
    SK.loader.init({
        "App": __dirname 
    })
    pass Application namespace and location to init method and is will enable the loader
    you create all the application classes under that namespace
    see "app" folder for more details
    
    ----------------------------------------------
    static methods and variables
    SK.define("Test",{
    statics:{
        methodA:function(a){
            return a+2;
        },
        variableB:{
            a:1,
            b:2
        }
    }
    })
    
    we can simply call this methods 
    var testNumber = Test.methodA(5);
    and testnumber will be 7;

to install skeletonode u can just "npm install skeletonode"    
Our project is too young to use it for big projects and we don't recommend using it for a serious project.
But you can play with it and tell us your opinion.

- 20.10.2012 
- added dynamic loading utility
- 22.10.2012
- mixins added
- 28.10.2012
- alternate class names added
- support for nodejs modules added 
- onClassExtend function added (a function that will trigger if this class is extended)
- we're on npm :)
- 15.01.2013 
- dynamic loading enabled
- 12.03.2013
- static methods added

