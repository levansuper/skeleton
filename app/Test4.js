SK.define('App.Test4',{ 
    extend:'App.Test3',
    a:5,
    init:function(){
        this.callParent()
    },
    constructor:function(config){
        this.console(this.a + "      4");
        this.callParent(config);
        
    }
})