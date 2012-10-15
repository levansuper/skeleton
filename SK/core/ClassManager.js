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
        
            this.pre.call(this,config);
            this.init.call(this)
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
        var F = clone(parent);
        for (var i in child){           
            if(SK.isFunction(child[i])){
                var superFunct = function(){}
                if(SK.isFunction(F.prototype[i])){
                    superFunct = F.prototype[i];
                }
                F.prototype[i] = callParent(child[i],superFunct);
                
            }else{
                F.prototype[i] = child[i];
            }
        }
        return F;
    }
            
    //adding callParent function to every function
    var callParent = function (fn, superFunct){
        return function(){            
            var tmp = this.callParent;
            this.callParent = superFunct || function(){};  
            var ret = fn.apply(this, arguments);       
            this.callParent = tmp;
            return ret;
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
        newNamespace[className] = q;
    }
    
    this.create = function(className,config){
       var cl = SK.require(className);         
       return new cl(config); 
    }
    

    
    

}