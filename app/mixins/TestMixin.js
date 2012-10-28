SK.define('App.mixins.TestMixin',{ 
    console:function(a){
        console.log(a);
    },
    logA:function(){
        this.console(this.a);
    }
})