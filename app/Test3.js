SK.define('App.Test3',{ 
    extend:'App.Test2',
    a:6,
    init:function(){
        this.callParent()
    },
    constructor:function(config){
       this.console(this.a + "      3");
       this.callParent(config);
       
    },onClassExtend:function(parent,conf){
        
        conf.a = parent.a - conf.a;
    }
})