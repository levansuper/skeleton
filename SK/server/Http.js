SK.define('SK.server.Http',{ 
    externalModules:{
        'http':'http',
        'url':'url'
    },
    port:8000,
    server:null,
    
    constructor:function(config){
        var me = this;
        me.mainFunction = config.mainFunction || me.mainFunction;        
        me.server = me.createServer(function(){me.mainFunction.apply(me,arguments)})
        me.callParent(config);
    },
    init:function(){
        var me = this;
        me.server.listen(me.port);
        me.callParent()
    },
    gets:{
        '404':function(req,res){
            res.end('404 page not found');            
        }
    },
    
    mainFunction:function(req,res){
        if(this.gets[req.url]){
            this.gets[req.url](req,res)
        }else{
            this.gets[404](req,res)
        }
    }
    
    
   
})
