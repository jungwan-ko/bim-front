<template>
  <div>
    <div class="row no-gutters widget-2 shadow-base">
      <div class="col-sm-12 col-lg-12">
        <div class="card">
          <div class="card-header bd-b-color-gray-lighter">
            <h6 class="card-title">
              <i class="ion-ios-paper-outline tx-18 va-m"></i> 카테고리 관리
            </h6>
          </div>
          <div class="card-body">
            <div class="row tx-center">
              <div class="col-lg-4">
                <div class="card-header pd-0 mg-b-10 btn-group-xs bd-0">
                  <h6 class="tx-14 tx-info tx-left">
                    <i class="ion-android-arrow-dropright-circle tx-14"></i>
                    카테고리
                  </h6>
                </div>
               
                <div class="d-flex mg-b-5">
                    <div class="pd-r-5"><input type="text" class="form-control form-input form-control-sm" v-model="createItems.org_item_title"/></div>
                    <div class="pd-r-5 btn-group-xs"><button type="button" class="btn btn-outline-danger" 
                          v-on:click="onClickBtnCreate()"> 폴더추가 </button>
                     </div>
                     {{test}}
                </div>

                <div id="treeview1" class="treeview">
                  <ul class="list-group">
                    <li v-for="item in listItems" class="list-group-item rounded-top-0 tx-left" 
                        v-bind:key="item.org_item_seq"
                        v-on:click="onClickFolder(item)"
                        v-bind:class="['data-level-'+item.org_item_level, item.isOpen?'open':'closed', item.isShow?'show':'no']">

                        <!-- v-bind:class="['data-level-'+item.level, item.isOpen?'open':'closed', item.isShow?'show':'no']"> -->
                        <!--for / if for 가 우선순위 높  -->

                    <p class="mg-b-0">
                        <i class="fa fa-check tx-success mg-r-8" v-show="selectedItem.org_item_seq===item.org_item_seq"></i>
                        <i class="ion-android-folder tx-folder mg-r-8"></i>
                        <input type="text" class="tx-inverse tx-medium" v-model="item.org_item_title"/>
                        <!-- <strong class="tx-inverse tx-medium">{{item.org_item_title}}</strong>  -->

                        <button type="button" class="btn btn-danger" style="float:right; "
                               v-on:click="onClickBtnDelete(item)">삭제</button>
                        <button type="button" class="btn btn-info" style="float:right; margin-right:10px;"
                              v-on:click="onClickBtnUpdate(item)">저장</button>
                        
                    </p>   

                    </li>
                    
                  </ul>
                </div>
              </div>

              <div class="col-lg-8">
                <div class="card-header pd-0 mg-b-10 btn-group-xs bd-0">
                  <h6 class="tx-14 tx-info tx-left">
                    <i class="ion-android-arrow-dropright-circle tx-14"></i>
                    파일목록
                  </h6>
                </div>
                <div class="d-flex mg-b-5">
                    <div class="pd-r-5 form-inline">
                      <select type="text" class="form-control form-select-sm mg-r-5">
                        <option>전체</option>
                      </select>
                       <input type="text" class="form-control form-input form-control-sm"/>
                      
                      </div>
                    <div class="pd-r-5 btn-group-xs"><button type="button" class="btn btn-outline-danger">파일추가 </button></div>
                </div>
                <div>
                  <table class="table table-bordered table-mid tx-13 tx-gray-700 bd">
                      <thead>
                       <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                           <th class="wd-40p tx-center">프로젝트</th>
                           <th class="wd-30p tx-center">파일</th>
                           <th class="wd-10p tx-center">파일타입</th>
                           <th class="wd-20p tx-center">등록일</th>
                       </tr>
                     </thead>

                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import userList from '../user/userList.vue';
import common from '../../common/common';

export default {
  data: function () {
    return {
        test:'ddddsvvdd',
        selectedItem:{
          org_item_seq:-999
        }, //리스트선택
        listItems:[], //cate list
        createItems:{
          org_item_title : ''
        },
        // updateItems:{
        //   org_item_title : ''
        // },
        //selected : false,
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
        console.log("opennnnnnnnnnn:22222::"+item.isOpen);

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
      onClickBtnCreate:function(){  //폴더추가
        let obj =this;
        if(this.createItems.org_item_title===''){
          alert("제목을 입력하세용~~")
          return;
        }
        Axios.post("/cate/create", {
          category:{
            org_item_title :obj.createItems.org_item_title,
            org_item_parent : obj.selectedItem.org_item_seq,
          }
        })
        .then(function(response){
            if(response.data.resultCount<1){
            }else{
              obj.createItems.org_item_title='';

              console.log("ddafdsfsdfsfsafds:"+response.data.category.org_item_parent)
              obj.listItems = response.data.list; 

              
                obj.listItems.forEach(element => {
                  element.isOpen=true;
                  element.isShow=true;
                  
                });
              
             
            }  
        })
        .catch(function(ex){
          console.log(ex);
        })
      },
      
      onClickBtnUpdate:function(item){
        if(item.org_item_title===''){
          alert("제목입렵ㄱ")
          return;
        }
        let obj =this;
        let test = item.org_item_title;
        let test2 = item.org_item_seq;
        console.log("test::::::::::::::::`:::::"+test); //dd
        console.log("test:::::::::::::::::"+test2); //dd
        Axios.post("/cate/update",{
          category:{
            org_item_seq :test2,
            org_item_title :test,
          }
        })
        .then(function(response){
          if(response.data.resultCount < 1){
            //수정 x
            console.log("수정안됨!@!@!@!@!@@!@"+response.data.resultCount);
          }else{
            obj.listItems = response.data.list;

          }
        })
        .catch(function(ex){
          console.log(ex);
        })
      },
      onClickBtnDelete:function(item){
        let obj =this;

        let org_item_seq = item.org_item_seq;
        let org_item_group = item.org_item_group;
        let org_item_level = item.org_item_level;

        for(var i =0; i<obj.listItems.length; i++){
          if(org_item_seq === obj.listItems[i].org_item_parent){
              if(confirm("자식카테고리까지 모두삭제됩니다.") === true){
              }else{
                return;
              }
          }

        }
        Axios.post("/cate/delete",{
          category:{
            org_item_seq :org_item_seq,
            org_item_group :org_item_group,
            org_item_level :org_item_level,
          }
          //org_item_group : test2,
          //org_item_level : test3,
          //   category:{
          //   org_item_seq :test2,
          // }
        })
        .then(function(response){
          if(response.data.category.org_item_seq < 1){
          //if(response.data.resultCount < 1){

            console.log("삭제안됨!@!@!@!@!@@!@"+response.data.category.org_item_seq);
          }else{
            obj.listItems = response.data.list; //list

          }
        })
        .catch(function(ex){
          console.log(ex);
        })
      }

  },
};
</script>