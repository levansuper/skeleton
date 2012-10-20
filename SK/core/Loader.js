module.exports = function(){
    var me = this;
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
        classPath[0] = folderPaths[classPath[0]];
        //var dir = SK.dirname;
        var path = "";
        //path = path + dir + '/..';
        SK.each(classPath,function(p,index){
            
            if(index!==0){path = path + "/" };
            path = path  + p
        })
        return path;
    }
    
    
    var folderPaths = {
        'SK':SK.dirname
    }
    
    this.addPath = function(name,path){
        folderPaths[name] = path;
    }
    this.deletePath = function(name,path){
        delete folderPaths[name];
    }
    
    this.init = function(config){
        
        SK.each(config,function(path,index){
            this.addPath(index,path);
        },me)
    }
    
}


