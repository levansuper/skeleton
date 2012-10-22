SK.define('App.Test',{ 
    mixins:{
        a:'App.mixins.TestMixin'
    },
    init:function(){
        this.callParent()
    },
    constructor:function(config){
        this.callParent(config);
        
    }
})