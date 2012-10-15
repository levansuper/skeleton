module.exports = function(){
    
    var baseObj = {};
    var classStore = [];
    classStore['SK.Base'] = baseObj;
    SK.Base = baseObj;
    
    
    
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