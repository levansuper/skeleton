module.exports = function(){
    
    var clone = function (parent) {
        var prt = parent;
        if(SK.isFunction(parent)){
            prt = parent.prototype;
        }
        var F = function(config){
            if(!config){
                config = {};
            }
            var me = this;
            
            me._constructor.apply(me,arguments);
            me.init.apply(this,arguments)
        };
        
        for (var i in prt){ 
            if(SK.isFunction(prt[i])){
                
                F.prototype[i] = callParent(prt[i])
            }else{
                F.prototype[i] = prt[i];
            }
        }
        return  F;
    }

    var extend = function(parent,child){
        if(child.constructor){
            child._constructor = child.constructor;
        }
        
        var F = clone(parent);
        if(SK.isFunction(parent.prototype.onClassExtend)){
            F.prototype.onClassExtend(F.prototype,child,F);
            //delete F.prototype.onClassExtend;
        }
        
        applyExtendClearer(F);
        
        for (var i in child){           
            if(SK.isFunction(child[i])){
                var superFunct = function(){}
                if(SK.isFunction(F.prototype[i])){
                    
                    superFunct = F.prototype[i];
                    
                }
                F.prototype[i] = callParent(child[i],superFunct,i);
                
            }else{
                F.prototype[i] = child[i];
            }
        }
        
        
        return F;
    }
            
    //function for adding callParent function to a function
    var callParent = function (fn, superFunct,i){
        
        return function(){  
           
            var tmp = this.callParent;
            this.callParent = superFunct || function(){};  
            var ret = fn.apply(this, arguments);       
            
            this.callParent = tmp;
            return ret;
        }
    }
    

    function applyMixins(receivingClass, givingClass) {
        givingClass = givingClass.prototype || givingClass;
        for(var methodName in givingClass) {
           
            if(!receivingClass.prototype[methodName]) {
                receivingClass.prototype[methodName] =  givingClass[methodName];
            }
        }
    }
    
    function getClass(cl){
        if(SK.isFunction(cl)){
            return cl;
        }else{
            return SK.require(cl)
        }        
    }
  
    
    //class is created here
    this.define = function(newClassName,config){
        
        if(!SK.isDefined(config.extend)){
            config.extend = 'SK.core.Class';
        }
        var nameArray = newClassName.split('.');
        
        var newNamespaceArr =  nameArray.slice(0,-1);
        var className = nameArray[nameArray.length-1]
        var newNamespaceStr =  newNamespaceArr.join('.');
        var newNamespace = SK.namespace(newNamespaceStr);
        
        var clToExtend = SK.require(config.extend);
        
        var cl = extend(clToExtend,config);
        
        
        doClassManipulations(cl);

        newNamespace[className] = cl;
    }
    
    
    
    
    this.create = function(className,config){
        var cl = SK.require(className);         
        return new cl(config); 
    }
    
    
    var doClassManipulations = function(cl){
        SK.each(cl.prototype,function(p,i){
            doClassManipulation(cl,i);
        })
        
    }
    
    var doClassManipulation = function(cl,property){
        if(SK.isDefined(classManipulations[property])){
            
            classManipulations[property](cl);
        }    
    }
    
    var classManipulations = {
        mixins:function(cl){
            SK.each(cl.prototype.mixins,function(mixin,index){
                var m = getClass(mixin);
                applyMixins(cl, m);
            })
        },
        alternateClassName:function(cl){
            
            var alternate = cl.prototype.alternateClassName;
            if(SK.isArray(alternate)){
                SK.each(alternate, function(a){
                    SK.loader.registerClass(a,cl)
                })
            }else{
                SK.loader.registerClass(alternate,cl)
            }
            
        }
        
        
    }
    
    
    var applyExtendClearer = function(f){
        SK.each(f,function(p,i){
            if(extendClearer[i]){
                f[i] = extendClearer[i];
            }
        })
    }
    var extendClearer = {
        'alternateClassName':[]
    }
    

    
    

}