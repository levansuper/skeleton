SK.define('App.Test',{ 
    mixins:{
        a:'App.mixins.TestMixin'
    },
    a:4,
    init:function(){
        this.callParent()
    },
    constructor:function(config){
        this.callParent(config);
        
    },onClassExtend:function(parent,conf){
        
        conf.a = parent.a +conf.a;
    }
})