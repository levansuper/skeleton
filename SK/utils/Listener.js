SK.define('SK.utils.Listener',{
    eventPool:{},
    addEvent:function(listener){
        var me = this;
        me.addListenerEventPool(listener);
    },
    callEvent:function(fn,scope,params){
        fn.apply(scope,params);
    },
    addListenerEventPool:function(listener){
        var me = this;
        var listeners = null;
        if(me.eventPool[listener.name]){
            
            listeners = me.eventPool[listener.name];
        }else{
            listeners = [];
            me.eventPool[listener.name] = listeners;
        }
        listeners.push(listener);
        return listener.fn;
    },
    getListenerFromEventPool:function(eventName){
        var me = this;
        return me.eventPool[eventName];
    },
    on:function(name,fn,scope){
        var me = this;
        
        me.addEvent({
            name:name,
            fn:fn,
            scope:scope
        })
    },
    fireEvent:function(){
        var me = this;
        var args = [];
        SK.each(arguments,function(arg){
            args.push(arg);
        })
        var events = me.getListenerFromEventPool(args[0]);
        if(!events){
            return false;
        }
        SK.each(events,function(e){
            
            e.fn.apply(e.scope,args.slice(1,args.length+1));
        })
        return true;
    }
})