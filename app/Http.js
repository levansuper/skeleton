SK.define('App.Http',{ 
    extend:'SK.server.Http',
    port:8008,
    gets:{
        'makeMeHappy':function(req,res,params){
            res.end('test');
        },
        'test':function(req,res){            
            res.end('test111');            
        },
        '404':function(req,res){
            res.end('404 page not found');            
        }
    },
    mainFunction:function(req,res,a){
        var params = this.parse(req.url, true).query;
        if(this.gets[params.fn]){
            this.gets[params.fn](req,res,params)
        }else{
            this.gets[404](req,res,params)
        }
    }
   
})
