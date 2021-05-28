<template>
  <div>
    <div class="row no-gutters widget-2 shadow-base">
      <div class="col-sm-12 col-lg-12">
        <div class="card">
          <div class="card-header bd-b-color-gray-lighter">
            <h6 class="card-title">
              <i class="ion-ios-paper-outline tx-18 va-m"></i> 메뉴 관리
            </h6>
          </div>
          <div class="card-body">
            <div class="row tx-center">
              <div class="col-lg-12">
                   <table class="table table-bordered table-mid tx-13 tx-gray-700 bd" >
                    <thead>
                       <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                        <th  class="wd-10p tx-center">아이디</th>
                        <th  class="wd-10p tx-center">이름</th>
                        <th  class="wd-10p tx-center">그룹</th>
                        <th  class="wd-10p tx-center">레벨</th>
                        <th  class="wd-10p tx-center">정렬</th>
                        <th  class="wd-20p tx-center">URI</th>
                        <th  class="wd-10p tx-center">타입</th>
                        <th  class="wd-10p tx-center">수정</th>
                        <th  class="wd-10p tx-center">삭제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for= "item in viewModel.listMenu" :key="item.menu_id">
                        <td><input type="text" class="form-control  form-control-sm form-input" v-model="item.menu_id" /></td>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="item.menu_title" /></td>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="item.menu_group" /></td>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="item.menu_level" /></td>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="item.menu_sort" /></td>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="item.menu_uri" /></td>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="item.menu_type_code" /></td>
                        <!-- <td><input type="text" class="form-control" v-model="item.menu_css" /></td>
                        <td><input type="text" class="form-control" v-model="item.menu_img" /></td> -->
                        <td>
                          <div class="btn-group-xs">
                          <button type="button" class="btn btn-info" v-on:click="fnClickUpdate(item)">수정</button>
                          </div>
                        </td>
                        <td>
                          <div class="btn-group-xs">
                          <button type="button" class="btn btn-danger" v-on:click="fnClickDelete(item)">삭제</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="viewModel.detailMenu.menu_id" /></td>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="viewModel.detailMenu.menu_title" /></td>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="viewModel.detailMenu.menu_group" /></td>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="viewModel.detailMenu.menu_level" /></td>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="viewModel.detailMenu.menu_sort" /></td>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="viewModel.detailMenu.menu_uri" /></td>
                        <td><input type="text" class="form-control form-control-sm form-input" v-model="viewModel.detailMenu.menu_type_code" /></td>
                        <!-- <td><input type="text" class="form-control" v-model="viewModel.detailMenu.menu_css" /></td>
                        <td><input type="text" class="form-control" v-model="viewModel.detailMenu.menu_img" /></td> -->
                        <td colspan="2">
                          <div class="btn-group-xs">
                          <button type="button" class="btn btn-outline-secondary" v-on:click="fnOnClickCreateAction()"><i class="ion-ios-plus tx-14 tx-primary va-m"></i> 등록</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
import Common from "../../common/common.js";

export default{
    data: function () {
      return {
        viewModel: {
          listMenu: [],
          detailMenu: {}
        }
      }
    }
    , created: function () {
      // console.log("created");
    }
    , mounted: function () {
        console.log("mounted");
      try {
        this.fnPageInit();
      } catch (e) {
        console.log(e);
      }
    }
    , methods: {
      fnPageInit: function() {
        let vm = this.viewModel;
        Axios.post("/api/system/admin/menu", {}).
        then(function(response) {
          vm.listMenu=response.data.listMenu;
        });
      },     

      //메뉴삭제
      fnClickDelete: function(item) {
        let vm = this.viewModel;
        Axios.post("/api/system/admin/menu/drop", {id:item.menu_id}).
        then(function(response) {
          vm.listMenu=response.data.listMenu;   
          swal("삭제되었습니다.");       
        });
      },

      //메뉴수정
      fnClickUpdate: function(item) {
        let vm = this.viewModel;
        Axios.post("/api/system/admin/menu/update", {detailMenu:item}).
        then(function(response) {
          vm.listMenu=response.data.listMenu;     
          swal("수정되었습니다.");            
        });
      },

      //메뉴 생성
      fnOnClickCreateAction: function(){
        let vm = this.viewModel;
        if(vm.detailMenu.menu_id==undefined || vm.detailMenu.menu_id==""){
          swal("입력항목을 확인하세요.");
          return false;
        }else if(vm.detailMenu.menu_title==undefined || vm.detailMenu.menu_title==""){
          swal("메뉴 이름을 확인하세요.");
          return false;
        }else if(vm.detailMenu.menu_uri==undefined || vm.detailMenu.menu_uri==""){
          swal("메뉴 URL을 확인하세요.");
          return false;
        }else if(vm.detailMenu.menu_type_code==undefined || vm.detailMenu.menu_type_code==""){
          swal("메뉴 타입을 확인하세요.");
          return false;
        }
        Axios.post("/api/system/admin/menu/create",{detailMenu:vm.detailMenu}).
        then(function(response) {
          vm.listMenu=response.data.listMenu;
          vm.detailMenu={};   
          swal("등록되었습니다.");                
        });
      }





    }
  }
</script>

