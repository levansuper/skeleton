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
        for(var methodName in givingClass.prototype) {
            if(!receivingClass.prototype[methodName]) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
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
        
        var q = extend(clToExtend,config);
        
        
        
        SK.each(q.prototype.mixins,function(mixin){
            var m = getClass(mixin);
            applyMixins(q, m);
        })
        newNamespace[className] = q;
    }
    
    
    
    
    this.create = function(className,config){
        var cl = SK.require(className);         
        return new cl(config); 
    }
    

    
    

}