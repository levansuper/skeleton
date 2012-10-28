SK.define('SK.server.Http',{ 
    mixins:{
        a:require("http")
    },
    port:8000,

    init:function(){
        /*this.createServer(function(req,res){
            res.end("hello world");
        }).listen(this.port);
        console.log("started on port "+ this.port)*/
        console.log(this.port)
        this.callParent()
    }
    
   
})