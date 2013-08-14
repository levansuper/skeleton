SK.define('SK.server.Http',{ 
    externalModules:{
        'http':'http',
        'url':'url'
    },
    port:8000,
    server:null,
    
    constructor:function(config){
        var me = this;
        me.server = me.createServer(function(){me.mainFunction.apply(me,arguments)})
        me.callParent(config);
    },
    init:function(){
        var me = this;
        me.server.listen(me.port,function(err){
            me.fireEvent('serverstart',err);
        });
        me.callParent()
    },
    gets:{
        '404':function(req,res){
            res.end('404 page not found');            
        }
    },
    
    mainFunction:function(req,res){
        var me = this;
        me.fireEvent('request',req,res);
    }
    
    
   
})
