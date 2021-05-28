<template>
  <div>
      <span>{{navigationTitles}}</span>
     <div id="treeview1" class="treeview" style="height:300px;overflow-y:auto;">
                  <ul class="list-group">
                    <li v-for="item in listItems" v-bind:key="item.id" class="list-group-item rounded-top-0 tx-left" v-on:click="fnOnClickNode(item)" v-bind:class="['data-level-'+item.level, item.isOpen?'open':'closed', item.isShow?'show':'no']">
                    <p class="mg-b-0">
                        <i class="fa fa-check tx-success mg-r-8" v-show="item.isSelected" style="margin-left:-27px;"></i>
                        <i class="ion-android-folder tx-folder mg-r-8"></i>
                        <strong class="tx-inverse tx-medium">{{item.title}}</strong> 
                    </p>   
                    </li>
                    
                  </ul>
                </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
        selectedItem:null,
        navigation:[],
        navigationTitles:'',
        listItems:[
            {id:'1',title:'항만 BIM Browser',sort:10000,level:0,parent:0, isOpen:true,isShow:true}
            ,{id:'2',title:'일반사항',sort:999,level:1,parent:'1', isOpen:true,isShow:true}
            ,{id:'3',title:'조사 및 계획',sort:998,level:1,parent:'1', isOpen:true,isShow:true}
            ,{id:'4',title:'재료',sort:997,level:1,parent:'1', isOpen:true,isShow:true}
            ,{id:'5',title:'설계도면',sort:996,level:1,parent:'1', isOpen:true,isShow:true}
            ,{id:'6',title:'라이브러리',sort:995,level:1,parent:'1', isOpen:true,isShow:true}
            ,{id:'7',title:'모델',sort:994,level:2,parent:'6', isOpen:true,isShow:true}
            ,{id:'8',title:'명세서',sort:993,level:2,parent:'6', isOpen:true,isShow:true}
            

            ]
    };
  },
  created: function () {
    // console.log("created");
    
  },
  mounted: function () {},
  methods: {
      fnOnClickNode:function(item){
        this.selectedItem=item;
        item.isOpen=!item.isOpen;

          this.listItems.forEach(element => {
                element.isSelected=false;
        
            });
        
        item.isSelected=true;
        
        if(item.isOpen){
            this.fnFolderOpen(item);
        }else{
            this.fnFolderClose(item);
        }
        this.setNavigation();
        
      },
      setNavigation:function(){
            let _target={id:this.selectedItem.id
            ,title:this.selectedItem.title
            ,level:this.selectedItem.level
            ,parent:this.selectedItem.parent
            };
            let newNavi=[];
            if(this.navigation.length===0){
                this.navigation.push(_target);
                
            }
            newNavi.push(_target);
            for(let i=0;i<_target.level;i++){
                let preItem=newNavi[newNavi.length-1];
                this.listItems.forEach(element => {
                    if(element.id===preItem.parent){
                        newNavi.push(element);
                    }
                });
            }
            this.navigation=newNavi.reverse();

            let titles=[];
            this.navigation.forEach(element => {
                titles.push(element.title);
            });
            this.navigationTitles=titles.join('>');
        
      },
      getCategory:function(){
          return this.selectedItem;
      },
      fnFolderOpen:function(item){

          this.listItems.forEach(element => {
                if(element.parent===item.id){
                element.isShow=true;
                }
            });
        

      },
      fnFolderClose:function(item){
          let preLevel=item.level+1;
          for(let i=0;i<this.listItems.length;i++){
              let _target=this.listItems[i];
            
             if(_target.sort<item.sort){
                  if(_target.level<preLevel) break;
                _target.isShow=false;
                _target.isOpen=false;
              }
          }
        
        

      }

  },
};
</script>