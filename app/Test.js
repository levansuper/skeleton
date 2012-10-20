SK.define('SK.test.Test',{ 
    init:function(){
        this.callParent()
        //console.log(this.a);
    },
    constructor:function(config){
        console.log(1);
        this.callParent(config);
        console.log(this.a);
    }
    
    
})