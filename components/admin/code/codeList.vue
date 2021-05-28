<template>
  <div>
    <div class="row no-gutters widget-2 shadow-base">
      <div class="col-sm-12 col-lg-12">
        <div class="card">
           <div class="card-header bd-b-color-gray-lighter">
               <h6 class="card-title"><i class="ion-ios-paper-outline tx-18 va-m"></i> 코드관리 (시스템 개발 시에 사용하는 코드를 관리합니다)</h6>
               
            </div>
             <div class="card-body">
                <div class="row tx-center">
                    <div class="col-lg-6">
                         <div class="card-header pd-0 mg-b-10 btn-group-xs bd-0 ">
                             <h6 class="tx-14 tx-info tx-left"><i class="ion-android-arrow-dropright-circle tx-14"></i> 코드그룹</h6>
                             
                         </div>
                          <table class="table table-bordered table-mid tx-13 tx-gray-700 bd">
                            <thead>
                            <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                                <th class="wd-20p tx-center">코드그룹</th>
                                <th class="wd-60p tx-center">코드명</th>
                                <th class="wd-20p tx-center">삭제</th>
                            </tr>
                            </thead>
                            <tbody>
                              <tr v-for = "item in viewModel.listGrps" :key="item.grp_code">
                                <td>
                                  <a href="#" v-on:click ="fnSelectedGrp(item)" ><i v-bind:class="{'ion-android-checkmark-circle mr-2':item.selected}"></i> {{item.grp_code}}</a>
                                
                                </td>
                                <td>{{item.grp_title}}</td>
                                <td>
                                  <div class="btn-group-xs">
                                    <button type="button" v-on:click ="fnDelteGrpCode(item)" class="btn btn-outline-danger"><i class="ion-ios-plus text-minus tx-14"></i> 삭제</button>
                                  </div>
                                </td>
                              </tr>
                               <tr>
                                  <td><input type="text" class="form-control form-control-sm form-input" v-model="viewModel.inputGrpCode" maxlength="8" /></td>
                                  <td><input type="text" class="form-control form-control-sm form-input"  v-model="viewModel.inputGrpCodeTxt" /></td>
                                  <td>
                                    <div class="btn-group-xs">
                                      <button type="button" v-on:click="fnClickAddGrpCode()" class="btn btn-outline-success"><i class="ion-ios-plus text-plus tx-14"></i> 추가</button>
                                    </div>
                                  </td>
                                </tr>
                            </tbody>
                          </table>                                    
                    </div>

                    <div class="col-lg-6">
                         <div class="card-header pd-0 mg-b-10 btn-group-xs bd-0 ">
                             <h6 class="tx-14 tx-info tx-left"><i class="ion-android-arrow-dropright-circle tx-14"></i> 시스템코드</h6>
                             
                         </div>
                          <table class="table table-bordered table-mid tx-13 tx-gray-700 bd">
                            <thead>
                            <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                                <th class="wd-20p tx-center">코드</th>
                                <th class="wd-60p tx-center">코드명</th>
                                <th class="wd-20p tx-center">삭제</th>
                            </tr>
                            </thead>
                           <tbody>
                              <tr v-for="item in viewModel.listSysCodes" :key="item.sys_code">
                                <td>{{item.sys_code}}</td>
                                <td>{{item.sys_title}}</td>
                                <td>
                                   <div class="btn-group-xs">
                                    <button type="button" v-on:click="fnDeleteSysCode(item)" class="btn btn-outline-danger"><i class="ion-ios-plus text-minus tx-14"></i> 삭제</button>
                                   </div>
                                </td>
                              </tr>
                              <tr>
                                <td><input type="text" class="form-control form-control-sm form-input"  v-model="viewModel.inputSysCode" maxlength="8"/></td>
                                <td><input type="text" class="form-control form-control-sm form-input"  v-model="viewModel.inputSysCodeTxt" /></td>
                                <td>
                                   <div class="btn-group-xs">
                                    <button type="button" v-on:click="fnClickAddSysCode()" class="btn btn-outline-success"><i class="ion-ios-plus text-plus tx-14"></i> 추가</button>
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

export default{
    data: function () {
      return {
        viewModel: {
          listGrps: [],
          listSysCodes: [],
          inputGrpCode: "",
          inputGrpCodeTxt: "",
          inputSysCode: "",
          inputSysCodeTxt: "",
          selectedGrp: null
        }
      }
    }
    , created: function () {
      // console.log("created");
    }
    , mounted: function () {
        console.log("mounted");
      try {
        this.fnGetListGrpCode();
      } catch (e) {
        console.log(e);
      }
    }
    , methods: {
        fnGetListGrpCode: function() {
            let vm = this;
            Axios.post("/api/system/admin/code/grp/list", {}).
            then(function(response) {
                vm.viewModel.listGrps = response.data.listCodeGrp;
                for(var i=0; i<vm.viewModel.listGrps.length; i++){
                    vm.viewModel.listGrps[i].selected = false;
                }
            }).catch(function(ex) {
                console.log(ex);
            });
        },

        fnGetListSysCodes: function(paramGrpCode) {
            let vm = this;
            if(paramGrpCode!=""){
                Axios.post("/api/system/admin/code/sys/list", {paramCodeGrp: vm.viewModel.selectedGrp.grp_code})
                .then(function(response) {
                    vm.viewModel.listSysCodes = response.data.listCodeSys;
                }).catch(function(ex) {
                    console.log(ex);
                });
            }   
        },

        //그룹코드 추가 버튼 클릭
        fnClickAddGrpCode: function() {
            let vm = this;
            if(vm.viewModel.inputGrpCode==""||vm.viewModel.inputGrpCodeTxt==""){
                alert("모든 필드는 필수 입력 항목 입니다.","");
                return false;
            }
            this.fnCreateGrpCode();
        },

        //시스템코드 추가
        fnClickAddSysCode: function() {
            let vm = this;
            if(vm.viewModel.selectedGrp==null){
                alert("그룹코드를 선택하세요.","");
                return false;
            }
            if(vm.viewModel.inputSysCode == null || vm.viewModel.inputSysCode==""){
                alert("코드를 입력하세요.","");
                return false;
            }
            if(vm.viewModel.inputSysCodeTxt == null || vm.viewModel.inputSysCodeTxt==""){
                alert("코드명을 입력하세요.","");
                return false;
            }
            this.fnCreateSysCode();            
        },

        //그룹코드 추가
        fnCreateGrpCode: function() {
            let vm = this;       
            Axios.post("/api/system/admin/code/grp/create", {
                paramCodeGrp: vm.viewModel.inputGrpCode,
                paramCodeGrpTxt: vm.viewModel.inputGrpCodeTxt
            }).then(function(response) {
                vm.viewModel.inputGrpCode = "";
                vm.viewModel.inputGrpCodeTxt = "";
                vm.viewModel.listGrps = response.data.listCodeGrp;
            }).catch(function(ex) {
                console.log(ex);
            });
              
        },

        //시스템코드 추가
        fnCreateSysCode: function() {
            let vm = this;
            Axios.post("/api/system/admin/code/sys/create", {
                paramCodeGrp: vm.viewModel.selectedGrp.grp_code,
                paramSysCode: vm.viewModel.inputSysCode,
                paramSysCodeTxt: vm.viewModel.inputSysCodeTxt
            }).then(function(response) {
                vm.viewModel.inputSysCode = "";
                vm.viewModel.inputSysCodeTxt = "";
                vm.viewModel.listSysCodes = response.data.listCodeSys;
            }).catch(function(ex) {
                console.log(ex);
            });
        },

        //코드 삭제
        fnDelteGrpCode: function(paramItem) {
            let vm = this;
            Axios.post("/api/system/admin/code/grp/drop", {
                paramCodeGrp: paramItem.grp_code
            }).then(function(response) {
                vm.viewModel.listGrps = response.data.listCodeGrp;
            }).catch(function(ex) {
                console.log(ex);
            });  
        },

        fnDeleteSysCode: function(paramItem) {
            let vm = this;
            Axios.post("/api/system/admin/code/sys/drop", {
                paramCodeGrp: paramItem.grp_code,
                paramSysCode: paramItem.sys_code
            }).then(function(response) {
                vm.viewModel.listSysCodes=response.data.listCodeSys;
            }).catch(function(ex) {
                console.log(ex);
            });  
        },

        fnSelectedGrp: function(paramItem) {
            let vm = this;
            
            for(var i=0; i< vm.viewModel.listGrps.length; i++){
                vm.viewModel.listGrps[i].selected = false;
            }
            paramItem.selected=true;
            vm.viewModel.selectedGrp = paramItem;     
                        
            this.fnGetListSysCodes(paramItem.grp_code);
        }
    }
  }
</script>

