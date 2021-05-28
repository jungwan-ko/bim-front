<template>
  <div>
    <div id="treeview1" class="treeview">
                  <ul class="list-group">
                    <li v-for="item in listItems" class="list-group-item rounded-top-0 tx-left" 
                        v-bind:key="item.org_item_seq"
                        v-on:click="onClickFolder(item)"
                        v-bind:class="['data-level-'+item.org_item_level, item.isOpen?'open':'closed', item.isShow?'show':'no']">

                    <p class="mg-b-0">
                        <i class="fa fa-check tx-success mg-r-8" v-show="selectedItem.org_item_seq===item.org_item_seq"></i>
                        <i class="ion-android-folder tx-folder mg-r-8"></i>
                        <!-- <input type="text" class="tx-inverse tx-medium" v-model="item.org_item_title"/> -->
                        <strong class="tx-inverse tx-medium">{{item.org_item_title}}</strong> 
                        
                    </p>   

                    </li>
                    
                  </ul>
                </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data: function () {
    return {
        selectedItem:{
          org_item_seq:-999
        }, //리스트선택
        listItems:[], //cate list
        createItems:{
          org_item_title : ''
        },

    };
  },
  mounted: function () {
    this.listCode();
  },
  methods: {
      listCode:function(){ //리스트출력
        let obj = this;
        Axios.get("/cate/list", {})
        .then(function(response){
          obj.listItems = response.data.list;

          obj.listItems.forEach(element=> {
            element.isOpen = false;
            if(element.org_item_parent ===0){
              element.isShow = true;
            }else{
              element.isShow = false;
            }

          })
        })
        .catch(function(ex){
          console.log(ex);
        })
      },
      onClickFolder:function(item){
        this.selectedItem = item;
        item.isOpen =! item.isOpen;
        // isopen = false / isshow 부모 0 이면 ture 아니면 false

        if(item.isOpen){
          this.fnFolderOpen(item);
        }else{
          this.fnFolderClose(item);
        }


      },
      fnFolderOpen:function(item){

        this.listItems.forEach(element => {
            if(element.org_item_parent===item.org_item_seq){
            element.isShow=true;
            }
        });

      },
      fnFolderClose:function(item){
          let preLevel=item.org_item_level+1;
          for(let i=0;i<this.listItems.length;i++){
              let _target=this.listItems[i];
            
             if(_target.org_item_sort<item.org_item_sort){
                  if(_target.org_item_level<preLevel) break;
                _target.isShow=false;
                _target.isOpen=false;
              }
          }
      
      },
      getSelectedItem:function(){
        return this.selectedItem ;
      }

  },
};
</script>