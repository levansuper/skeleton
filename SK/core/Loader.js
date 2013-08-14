module.exports = function(){
    var me = this;
    var Base = require('./Base');
    var classStore = [];
    me.classStore = classStore;
    classStore['SK.Base'] = Base;
    SK.Base = Base;
    
    
    /*
     * loads a class by name of the string
     * @param name of the class
     */
    me.require = function(className){
	
        var cl = {};
        if(SK.isDefined(classStore[className])){
            cl = classStore[className]
        }else if(SK.isObject(className) || SK.isFunction(className)){
            cl = className;
        }else{
            require(createPath(className)) 
            cl = SK.getNamespace(className);
            me.registerClass(className, cl);
        }
        return cl;
    }
    
    /*
     * registers a class to classStore
     * @param name of namespace
     * @param a class itself
     */
    me.registerClass = function(className,cl){
        classStore[className] = cl;
    }
    
    
    /*
     *creates path to a class
     *@param name of the class
     */
    var createPath = function(className){              
        var classPath = className.split('.');
        classPath[0] = folderPaths[classPath[0]];
        //var dir = SK.dirname;
        var path = "";
        //path = path + dir + '/..';
        SK.each(classPath,function(p,index){
            
            if(index!=0){
                path = path + "/"
                };
            path = path  + p
        })
        return path;
    }
    

    /*
     * paths to folders related to a specefic namespaces
     */
    var folderPaths = {
        'SK':SK.dirname
    }
    
    /*
     * adds a path of a folder to folderPaths
     * @param name of namespace
     * @param path to a folder
     */
    me.addPath = function(name,path){
        folderPaths[name] = path;
    }
    /*
     * deletes a path of a folder to folderPaths
     * @param name of namespace 
     */
    me.deletePath = function(name){
        delete folderPaths[name];
    }
    
    me.init = function(config){
        SK.each(config,function(path,index){
            me.addPath(index,path);
        },me)
    }
    
}

