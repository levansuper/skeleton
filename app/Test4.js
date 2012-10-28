SK.define('App.Test4',{ 
    extend:'App.Test3',
    a:4,
    init:function(){
        this.vano()
        this.callParent()
    }
})