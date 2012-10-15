SK.define('SK.test.Test',{ 
    init:function(){
        this.callParent()
        console.log(this.a);
    },
    pre:function(config){
        console.log(this.a);
        config.a = 12;
        this.callParent(config)
        console.log(this.a);
    }
    
    
})