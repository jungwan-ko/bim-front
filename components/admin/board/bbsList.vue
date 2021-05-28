<template>
  <div>
      <div class="row no-gutters widget-2 shadow-base mg-b-30" v-show = "isCreateBox"> 
        <div class="col-lg-12">
          <div class="card ">
            <div class="card-header bd-b-color-gray-lighter">
              <h6 class="card-title">
                <i class="ion-ios-paper-outline tx-18 va-m tx-24 va-m"></i> 게시판 추가
              </h6>
            </div>
            <div class="card-body">
              <form name="mainForm" id="mainForm" >
                <div class="form-group row">
                  <label for="bbsId" class="col-sm-2 col-form-label">게시판 아이디</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control  form-control-sm form-input" id="bbs_id" v-model="bbsViewModel.selectedBoard.bbs_id" placeholder="게시판의 고유한 아이디(8자리)를 입력해주세요." v-bind:readonly="isUpdateButton" >
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">게시판 이름</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control form-control-sm form-input" id="bbs_title" v-model="bbsViewModel.selectedBoard.bbs_title" placeholder="게시판의 이름을 입력해주세요.">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="readRole" class="col-sm-2 col-form-label">읽기 권한</label>
                  <div class="col-sm-4">
                    <div  v-for = "(item) in bbsViewModel.listRoles" :key="item.role_id">                      
                      <input  type="checkbox" :value="item.role_id" :checked="bbsViewModel.readRoleItem.indexOf(item.role_id) > -1" v-on:click="toggleReadSelection(item.role_id)" :id="'r'+item.role_id">
                      <label  :for="'r'+item.role_id">{{item.role_title}}</label>
                    </div>
                  </div>
                  <label for="writeRole" class="col-sm-2 col-form-label">쓰기 권한</label>
                  <div class="col-sm-4">
                    <div v-for = "item in bbsViewModel.listRoles" :key="item.role_id">                      
                      <input type="checkbox" :value="item.role_id" :checked="bbsViewModel.writeRoleItem.indexOf(item.role_id) > -1" v-on:click="toggleWriteSelection(item.role_id)" :id="'w'+item.role_id">
                      <label  :for="'w'+item.role_id">{{item.role_title}}</label>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="readRole" class="col-sm-2 col-form-label">카테고리</label>
                  <div class="col-sm-10">
                    <div class="row">
                      <div class="col-form-label col-sm-1 pt-0  btn-group-xs"><button type="button" v-on:click="fnOnAddCategory()" class="btn btn-outline-success" id="btnCategoryAdd">추가</button></div>
                      <div class="col-sm-11" id="categoryLayer">
                        <div class="row" v-for="(item,index) in bbsViewModel.selectedBoard.listCate" :key="item.category_seq">
                          <div class="form-group col-sm-10">
                            <input type="text" class="form-control form-control-sm form-input" v-model="item.category_title">
                          </div>
                          <div class="form-group col-sm-2 btn-group-xs">
                            <button type="button" class="btn btn-outline-danger" v-on:click="fnOnDeleteCategory(index)" id="btnCategoryDel">삭제</button>
                          </div>

                        </div>                        
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-2">해더 사용여부</div>
                  <div class="col-sm-10">
                    <div >                      
                      <input type="checkbox" id="headerCheck" v-model="isHeaderBox">
                      <label  for="headerCheck">사용</label>
                    </div>
                  </div>
                </div>
                <div class="form-group row" v-show="isHeaderBox">
                  <div class="col-sm-2"></div>
                  <div class="col-sm-10">
                    <div id="xp-summernote"></div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-2">사용여부</div>
                  <div class="col-sm-2">
                    <select class="form-control" v-model="bbsViewModel.selectedBoard.use_yn">
                      <option value="Y" selected>사용</option>
                      <option value="N">미사용</option>
                    </select>
                  </div>
                </div>
              </form>  
            </div>
            <div class="card-footer bg-white">
              <div class="form-group row">
                <div class="col-sm-10 btn-group-sm">
                  <button type="button" class="btn btn-primary" v-on:click="fnOnCreateAction" v-show="!isUpdateButton">생성</button>
                  <button type="button" class="btn btn-primary" v-on:click="fnOnUpdateAction" v-show="isUpdateButton">수정</button>
                  <button type="button" class="btn btn-warning" v-on:click="isCreateBox=false">취소</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row no-gutters widget-2 shadow-base">
      <div class="col-sm-12 col-lg-12">
        <div class="card">
          <div class="card-header bd-b-color-gray-lighter">
            <h6 class="card-title">
              <i class="ion-ios-filing-outline tx-24 va-m"></i> 게시판 관리
            </h6>
          </div>
          <div class="card-body">
            <div class="row tx-center">
              <div class="col-lg-12">

                  
                    <div class="d-flex mg-b-10">
                      <div class="mr-auto">
                        <h6 class="tx-14 tx-info tx-left mg-t-10">
                          <i class="ion-android-arrow-dropright-circle tx-14"></i>
                          게시판 목록
                        </h6>
                      </div>
                      <div class="btn-group-xs">
                        <button type="button" class="btn btn-outline-secondary" v-on:click="isCreateBox=true,isUpdateButton=false">
                          <i class="ion-ios-plus tx-14 tx-primary va-m"></i>
                          게시판 추가
                        </button>
                      </div>
                    </div>
                

                <table class="table table-bordered table-mid tx-13 tx-gray-700 bd" >
                  <thead>
                    <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                      <th class="wd-10p tx-center">번호</th>
                      <th class="wd-10p tx-center">아이디</th>
                      <th class="wd-20p tx-center">제목</th>
                      <th class="wd-20p tx-center">헤더</th>
                      <th class="wd-20p tx-center">카테고리</th>
                      <th class="wd-10p tx-center">사용여부</th>
                      <th class="wd-10p tx-center">수정</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for = "(item,index) in bbsViewModel.listBBS" :key="item.bbs_id">
                      <td>{{index+1}}</td>
                      <td>{{item.bbs_id}}</td>
                      <td>{{item.bbs_title}}</td>
                      <td>{{item.header_yn}}</td>
                      <td>{{item.category_titles}}</td>
                      <td>{{item.use_yn}}</td>
                      <td><div class="btn-group-xs"><button type="button" class="btn btn-outline-primary" v-on:click="fnClickDetail(item)"> 수정</button></div></td>
                    </tr>
                  </tbody>
                </table>   
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <org-tree-list></org-tree-list>
  </div>  
</template>
<script>
import Axios from 'axios'
import orgTreeList from '../category/orgTreeList.vue'

export default{
  components: { orgTreeList },
    data: function () {
      component:{}
      return {
        bbsViewModel: {
          listRoles: [],
          listBBS: [],
          readRoleItem: [],
          writeRoleItem: [],
          selectedBoard:{use_yn:'Y',listCate:[{category_title:''}]}
        }
        ,isCreateBox : false
        ,isHeaderBox : false
        ,isUpdateButton : false
      }
    }
    , created: function () {
      // console.log("created");
    }
    , mounted: function () {
        console.log("mounted");
      try {
        this.fnMngBBS();
      } catch (e) {
        console.log(e);
      }
    }
    , methods: {
      fnMngBBS: function(){
 
        
        
        let vm = this.bbsViewModel;
        Axios.post("/api/system/admin/board/mng", {})
        .then(function(response) {
          let rs = response.data;
          vm.listRoles = rs.listRoles;
          vm.listBBS = rs.listMaster;
          for(var i = 0 ; i < vm.listBBS.length ; i++){
            if(vm.listBBS[i].bbs_info_html==null || vm.listBBS[i].bbs_info_html==""){
              vm.listBBS[i].header_yn = "미사용";
            }else{
              vm.listBBS[i].header_yn = "사용";
            }
          }
        }).catch(function(ex) {
            console.log(ex);
        });

        $('#xp-summernote').summernote({
          height: 220,
          minHeight: null,
          maxHeight: null,
          focus: false ,
          lang: 'ko-KR'
        });
      }

      ,toggleReadSelection: function(param){
        let vm = this.bbsViewModel;
        var idx = vm.readRoleItem.indexOf(param);
        if (idx > -1) {
          vm.readRoleItem.splice(idx, 1);
        }else{
          vm.readRoleItem.push(param);
        }
      }

      ,toggleWriteSelection: function(param){
        let vm = this.bbsViewModel;
        var idx = vm.writeRoleItem.indexOf(param);
        if (idx > -1) {
          vm.writeRoleItem.splice(idx, 1);
        }else{
          vm.writeRoleItem.push(param);
        }
      }

      ,fnOnCreateAction: function(){
        let vm = this;
        if(vm.bbsViewModel.selectedBoard.bbs_id == null || vm.bbsViewModel.selectedBoard.bbs_id == ""){
          swal("게시판 아이디를 입력하세요");
          return false;
        }
        if(vm.bbsViewModel.selectedBoard.bbs_title == null || vm.bbsViewModel.selectedBoard.bbs_title == ""){
          swal("게시판 이름을 입력하세요");
          return false;
        }
        for(var i = 0 ; i < vm.bbsViewModel.readRoleItem.length ; i ++){
          if(i==0) vm.bbsViewModel.selectedBoard.read_role_id = vm.bbsViewModel.readRoleItem[i];
          else vm.bbsViewModel.selectedBoard.read_role_id+=","+vm.bbsViewModel.readRoleItem[i];
        }
        for(var i = 0 ; i < vm.bbsViewModel.writeRoleItem.length ; i++){
          if(i==0) vm.bbsViewModel.selectedBoard.write_role_id = vm.bbsViewModel.writeRoleItem[i];
          else vm.bbsViewModel.selectedBoard.write_role_id += "," + vm.bbsViewModel.writeRoleItem[i];
        }         
        vm.bbsViewModel.selectedBoard.bbs_info_html=$('#xp-summernote').summernote('code');
        
       /*  let listCategorys = new Array();
        for ( var i = 0; i < vm.bbsViewModel.listCategory.length; i++ ) {
          listCategorys.push(vm.bbsViewModel.listCategory[i].categoryTitle);
        } */

        Axios.post("/api/system/admin/board/create", {detailMaster:vm.bbsViewModel.selectedBoard})
        .then(function(response) {
          vm.bbsViewModel.selectedBoard = {};
          vm.bbsViewModel.readRoleItem = [];
          vm.bbsViewModel.writeRoleItem = [];
          //vm.bbsViewModel.listCategory = [];
          vm.isCreateBox = false;
          vm.isHeaderBox = false;
          vm.fnMngBBS();
        }).catch(function(ex) {
            console.log(ex);
        });
      }

      ,fnOnUpdateAction: function(){
        let vm = this;
        vm.isUpdate = false;
        for(var i = 0 ; i < vm.bbsViewModel.readRoleItem.length ; i ++){
          if(i==0) vm.bbsViewModel.selectedBoard.read_role_id = vm.bbsViewModel.readRoleItem[i];
          else vm.bbsViewModel.selectedBoard.read_role_id+=","+vm.bbsViewModel.readRoleItem[i];
        }
        for(var i = 0 ; i < vm.bbsViewModel.writeRoleItem.length ; i++){
          if(i==0) vm.bbsViewModel.selectedBoard.write_role_id = vm.bbsViewModel.writeRoleItem[i];
          else vm.bbsViewModel.selectedBoard.write_role_id += "," + vm.bbsViewModel.writeRoleItem[i];
        }
        vm.bbsViewModel.selectedBoard.bbs_info_html=$('#xp-summernote').summernote('code');
        if(vm.bbsViewModel.selectedBoard.bbs_id == null || vm.bbsViewModel.selectedBoard.bbs_id == ""){
          swal("게시판 아이디를 입력하세요");
          return false;
        }
        if(vm.bbsViewModel.selectedBoard.bbs_title == null || vm.bbsViewModel.selectedBoard.bbs_title == ""){
          swal("게시판 이름을 입력하세요");
          return false;
        }

        Axios.post("/api/system/admin/board/update", {detailMaster:vm.bbsViewModel.selectedBoard})
        .then(function(response) {
          vm.bbsViewModel.selectedBoard = {};
          vm.bbsViewModel.readRoleItem = [];
          vm.bbsViewModel.writeRoleItem = [];
          vm.isCreateBox = false;
          vm.isHeaderBox = false;
          vm.fnMngBBS();
        }).catch(function(ex) {
            console.log(ex);
        });
      }

      ,fnClickDetail: function(item){
        let vm = this;
        vm.isCreateBox = true;
        vm.isUpdateButton = true;

        vm.bbsViewModel.readRoleItem = [];
        vm.bbsViewModel.writeRoleItem = [];

        Axios.post("/api/system/admin/board/detail", {id:item.bbs_id})
        .then(function(response) {
          let rs = response.data;
          vm.bbsViewModel.selectedBoard = rs.detailMaster;
          if(vm.bbsViewModel.selectedBoard.bbs_info_html!=null && vm.bbsViewModel.selectedBoard.bbs_info_html!=""){
            vm.isHeaderBox = true;
            $('#xp-summernote').summernote("code", vm.bbsViewModel.selectedBoard.bbs_info_html);
          }
          if(rs.detailMaster.read_role_id!=null) vm.bbsViewModel.readRoleItem = rs.detailMaster.read_role_id.split(',');
          if(rs.detailMaster.write_role_id!=null) vm.bbsViewModel.writeRoleItem = rs.detailMaster.write_role_id.split(',');
        }).catch(function(ex) {
            console.log(ex);
        });
      }

      ,fnOnAddCategory: function(){
        this.bbsViewModel.selectedBoard.listCate.push({category_title:''});
      }
      
      ,fnOnDeleteCategory:function(paramIndex){
        this.bbsViewModel.selectedBoard.listCate.splice(paramIndex,1);

      }
    }
  }
</script>

