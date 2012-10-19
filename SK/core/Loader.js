module.exports = function(){
    
    var Base = require('./Base');
    var classStore = [];
    classStore['SK.Base'] = Base;
    SK.Base = Base;
    
    
    
    this.require = function(className){
        var cl = {};
        if(SK.isDefined(classStore[className])){
            cl = classStore[className]
        }else{
            require(createPath(className)) 
            cl = SK.getNamespace(className);
            classStore[className] = cl;
        }
        return SK.getNamespace(className);
    }
    
    var createPath = function(className){              
        var classPath = className.split('.');
        var dir = SK.dirname;
        var path = "";
        path = path + dir + '/..';
        SK.each(classPath,function(p,index){
            path = path + "/" + p
        })
        return path;
    }
    
    
    
    
    
    
}


