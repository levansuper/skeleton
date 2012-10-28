Skeleton
========

Skeleton is NodeJS library for creating OOP like applications.
Our library will make NodeJS (Javascript) inheritance more easy to handle and will help you to correctly organize your code;


Using skeleton is very easy;

    1)creating a class:
        SK.define("SK.ExampleClass",{
            property1:1,
            property2:"string",
            property3:fucntion(){}
            property4:{objProperty1:"string"}
        })
    2)extending a class:
        SK.define("SK.ExtendedExample",{
            extends:'SK.ExampleClass',
            property1:2,
            property3:"string".
            property5:function(){}
        })

    3)initializing an object:
        SK.create("SK.ExtendedExample",{
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

Our project is too young to use it for big projects and we don't recommend using it for a serious project.
But you can play with it and tell us your opinion.

- 20.10.2012
   added dynamic loading utility
- 22.10.2012
   mixins added
- 28.10.2012
  alternate class names added
  support for nodejs modules added 
  onClassExtend function added (a function that will trigger if this class is extended)


We update project almost every week so stay close ;)