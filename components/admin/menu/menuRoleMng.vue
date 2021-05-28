<template>
  <div>
    <div class="row no-gutters widget-2 shadow-base">
      <div class="col-sm-12 col-lg-12">
        <div class="card">
          <div class="card-header bd-b-color-gray-lighter">
            <h6 class="card-title">
              <i class="ion-ios-paper-outline tx-18 va-m"></i> 접근권한 관리
            </h6>
          </div>
          <div class="card-body">
            <div class="row tx-center">
              <div class="col-lg-12">
                 <table class="table table-bordered table-mid tx-13 tx-gray-700 bd" >
                  <thead>
                    <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                      <th class="wd-10p tx-center">메뉴 아이디</th>
                      <th class="wd-10p tx-center">메뉴명</th>
                      <th class="wd-10p tx-center">그룹</th>
                      <th class=" tx-center" v-for="item in viewModel.listRoles" :key="item.role_id">{{item.role_title}}</th>
                      <th>저장</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in viewModel.listMenu" :key="item.menu_id">
                      <td class="valign-middle">{{item.menu_id}}</td>
                      <td class="valign-middle">{{item.menu_title}}</td>
                      <td class="valign-middle">{{item.menu_group}}</td>
                      <td  v-for="(role,index2) in viewModel.listRoles" :key="role.role_id">
                          <div class="pd-t-10">
                          <input  type="checkbox" :id="role.role_id" value="Y" name="detailContent.fixed_yn" v-model="item.menuRoles[index2].read_yn" true-value="Y" false-value="N">
                          <label  :for="role.role_id">읽기</label>
                          &nbsp;&nbsp;
                          <input type="checkbox" :id="role.role_id+index2" value="Y" name="detailContent.fixed_yn" v-model="item.menuRoles[index2].write_yn" true-value="Y" false-value="N">
                          <label  :for="role.role_id+index2">쓰기</label>
                          </div>
                      </td>
                      <td>
                        <div class="btn-group-xs">
                          <button type="button" v-on:click="fnCreateRoleAction(item)" class="btn btn-info"> 저장</button>
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
          listRoles: []
        }
      }
    }
    , created: function () {
      // console.log("created");
    }
    , mounted: function () {
        console.log("mounted");
      try {
        this.fnPageRoleInit();
      } catch (e) {
        console.log(e);
      }
    }
    , methods: {
      fnPageRoleInit: function() {
        let vm = this;
        Axios.post("/api/system/admin/menu/role", {})
        .then(function(response) {
          vm.viewModel.listMenu=response.data.listMenu;
          vm.viewModel.listRoles=response.data.listRole;

          console.log(vm.viewModel.listMenu);

          for(let i=0;i<vm.viewModel.listMenu.length;i++){
            vm.viewModel.listMenu[i].menuRoles=[];            
            for(let k=0;k<vm.viewModel.listRoles.length;k++){
              let temp={role_id:'',write_yn:'N',read_yn:'N'};              
              if(vm.viewModel.listMenu[i].menu_role==null || vm.viewModel.listMenu[i].menu_role==''){
                temp.role_id=vm.viewModel.listRoles[k].role_id;
              }else{
                let mRoles=vm.viewModel.listMenu[i].menu_role.split(',');
                let _index=mRoles.indexOf(vm.viewModel.listRoles[k].role_id);
                if(_index>-1){
                  temp.role_id=vm.viewModel.listRoles[k].role_id;
                  temp.write_yn=vm.viewModel.listMenu[i].write_yn==null?"":vm.viewModel.listMenu[i].write_yn.split(',')[_index];
                  temp.read_yn='Y';
                }else{
                  temp.role_id=vm.viewModel.listRoles[k].role_id;
                }
              }
              vm.viewModel.listMenu[i].menuRoles.push(temp);
            }
          }
        });
      }

      // 저장
      ,fnCreateRoleAction: function(item){
        let _roles=[];
        let _write=[];
        for(let i=0;i<item.menuRoles.length;i++){
          if(item.menuRoles[i].read_yn=='Y'){
            _roles.push(item.menuRoles[i].role_id);
            if(item.menuRoles[i].write_yn=='Y'){
              _write.push('Y');
            }else{
              _write.push('N');
            }
          }
        }
        Axios.post("/api/system/admin/menu/role/update", {paramMenuID:item.menu_id,paramRoles:_roles.join(','),paramWriteRoles:_write.join(',')})
        .then(function(response) {
          swal("저장되었습니다.");
        });
      }
    }
  }
</script>

