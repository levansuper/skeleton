SK.define('SK.server.Http',{ 
    mixins:{
        a:require("http")
    },
    init:function(){
        this.createServer(function(req,res){
            res.end("hello world");
        }).listen("8080");
        this.callParent()
    }
})