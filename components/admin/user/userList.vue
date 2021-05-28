<template>
  <div>
     <div class="row no-gutters widget-2 shadow-base mg-b-30"  v-show = "viewModel.isShowUserCreate">
      <div class="col-sm-12 col-lg-12">
          <div class="card ">
            <div class="card-header bd-b-color-gray-lighter">
            <h6 class="card-title">
              <i class="ion-android-person-add tx-24 va-m"></i> 사용자 등록
            </h6>
           </div>
            <div class="card-body">
               <form>
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">아이디</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control form-control-sm form-input" id="inputSuccess1" v-model="viewModel.detailUser.user_id" placeholder="사용자 아이디를 입력해주세요." v-bind:readonly="viewModel.isEnableUpdate" v-on:change="fnChangeValue('user')">
                  </div>
                  <div class="col-sm-2 btn-group-xs" v-show = "!viewModel.isEnableUpdate">
                    <button type="button" class="btn btn-outline-secondary" v-on:click="fnOnClickCheckID()"><i class="ion-card tx-16 tx-primary va-m"></i> 아이디 중복확인</button>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">사진</label>
                  <div class="col-sm-8">
                    <input type="file" class="form-control form-control-sm form-input" id="uploadFiles"  v-on:change="fnSelectedFiles"/>
                  </div>
                </div>
                <div class="form-group row" v-show = "!viewModel.isEnableUpdate" >
                  <label for="inputEmail3" class="col-sm-2 col-form-label">비밀번호</label>
                  <div class="col-sm-5">
                    <input type="password" class="form-control form-control-sm form-input" id="inputSuccess2" v-model="viewModel.pwd1" placeholder="사용자 비밀번호를 입력해주세요.">
                  </div>
                  <div class="col-sm-5">
                    <input type="password" class="form-control form-control-sm form-input" id="inputSuccess3" v-model="viewModel.pwd2" placeholder="비밀번호를 한번 더 입력해주세요.">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">이름</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control form-control-sm form-input" id="inputSuccess4" v-model="viewModel.detailUser.user_name" placeholder="사용자 이름을 입력해주세요.">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">핸드폰번호</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control form-control-sm form-input" id="inputSuccess5" v-model="viewModel.phone1"  placeholder="phone1">
                  </div>
                  <div class="col-sm-3">
                    <input type="text" class="form-control form-control-sm form-input" id="inputSuccess6" v-model="viewModel.phone2"  placeholder="phone2">
                  </div>
                  <div class="col-sm-3">
                    <input type="text" class="form-control form-control-sm form-input" id="inputSuccess7" v-model="viewModel.phone3"  placeholder="phone3">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">이메일</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control form-control-sm form-input" id="inputSuccess8" v-model="viewModel.detailUser.user_email" placeholder="사용자 이메일을 입력해주세요." v-on:change="fnChangeValue('email')" v-bind:readonly="viewModel.isEnableUpdate">
                  </div>
                  <div class="col-sm-2 btn-group-xs" v-show = "!viewModel.isEnableUpdate">
                    <button type="button" class="btn btn-outline-secondary" v-on:click="fnOnClickCheckEmail()"><i class="ion-ios-email tx-16 tx-primary va-m"></i> 이메일 중복확인</button>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">사용자유형</label>
                  <div class="col-sm-10">
                    <select class="form-control form-control-sm" id="formControlSelect" v-model="viewModel.detailUser.user_type_code">
                      <option value="">사용자 유형 선택</option>
                      <option v-for="code in viewModel.listUserTypeCodes" :key="code.sys_code" :value="code.sys_code">{{code.sys_title}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputEmail3" class="col-sm-2 col-form-label">사용자 권한</label>
                  <div class="col-sm-4">
                    <div class="form-inline" v-for = "item in viewModel.listRoles" :key="item.role_id">
                      <input class="form-control form-control-sm form-input" type="checkbox" :value="item.role_id" :checked="viewModel.checkedItem.indexOf(item.role_id) > -1" v-on:click="toggleSelection(item.role_id)" :id="item.role_id">
                      <label class="custom-control-label" :for="item.role_id"> {{item.role_title}}</label>
                    </div>
                  </div>
                </div>                
              </form>
            </div>
            <div class="card-footer bg-white">
              <div class="form-group row">
                <div class="col-sm-10  btn-group-sm" >
                  <button class="btn btn-danger" data-toggle="modal" data-target="#pwsChange" v-show= "viewModel.isEnableUpdate">비밀번호 변경</button>
                  <button type="button" class="btn btn-primary" v-show = "!viewModel.isEnableUpdate" v-on:click="fnOnClickCreate()">생성</button>
                  <button type="button" class="btn btn-primary" v-show = "viewModel.isEnableUpdate" v-on:click="fnOnClickCreate()">수정</button>
                  <button type="button" v-on:click="viewModel.isShowUserCreate=false" class="btn btn-warning">취소</button>
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
              <i class="ion-ios-filing-outline tx-24 va-m"></i> 사용자 관리
              (시스템 사용자를 조회 할 수 있습니다.)
            </h6>
          </div>
          <div class="card-body">
            <div class="row tx-center">
              <div class="col-lg-12">
                
                    <div class="d-flex mg-b-10">
                      <div class="mr-auto">
                        <h6 class="tx-14 tx-info tx-left mg-t-10">
                          <i class="ion-android-arrow-dropright-circle tx-14"></i>
                          사용자 목록
                        </h6>
                      </div>
                      <div class="btn-group-xs">
                        <button type="button" class="btn btn-outline-secondary" v-on:click="fnClickBtnShowCreateForm">
                          <i class="ion-ios-plus tx-14 tx-primary va-m"></i>
                          사용자추가
                        </button>
                      </div>
                    </div>
                

                <table class="table table-bordered table-mid tx-13 tx-gray-700 bd" >
                  <thead>
                    <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                      <th class="wd-20p tx-center">구분</th>
                      <th class="wd-10p tx-center">아이디</th>
                      <th class="wd-10p tx-center">이름</th>
                      <th class="wd-20p tx-center">이메일</th>
                      <th class="wd-10p tx-center">전화번호</th>
                      <th class="wd-10p tx-center">상태</th>
                      <th class="wd-10p tx-center">삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in viewModel.list" :key="item.sys_code">
                      <td>
                        <select
                          class="form-control form-control-sm"
                          v-model="item.user_type_code"
                          v-on:change="fnChangeUserStat(item)"
                        >
                          <option
                            v-for="code in viewModel.listUserTypeCodes"
                            :key="code.sys_code"
                            v-bind:value="code.sys_code"
                          >
                            {{ code.sys_title }}
                          </option>
                        </select>
                      </td>
                      <td class="valign-middle">
                    
                      <a href="#"  v-on:click.prevent="fnOnClickUpdateUser(item)">{{ item.user_id }}</a>
                    
                      </td>
                      <td class="valign-middle">{{ item.user_name }}</td>
                      <td class="valign-middle">{{ item.user_email }}</td>
                      <td class="valign-middle">{{ item.user_phone }}</td>
                      <td>
                        <select
                          class="form-control  form-control-sm"
                          v-model="item.user_status_code"
                          v-on:change="fnChangeUserStat(item)"
                        >
                          <option
                            v-for="code in viewModel.listUserStatusCodes"
                            :key="code.sys_code"
                            v-bind:value="code.sys_code"
                          >
                            {{ code.sys_title }}
                          </option>
                        </select>
                      </td>
                      <td>
                        <div class="btn-group-xs">
                            <button type="button" class="btn btn-outline-secondary"    v-on:click="fnClickDelete(item)">
                              <i class="ion-ios-minus tx-14 tx-danger  va-m"></i>
                              사용자 삭제
                            </button>
                     
                        
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                 <pager v-bind:pass="viewModel.pager"></pager>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";


export default {
  data: function () {
    return {
      viewModel: {
        totalCount: 0,
        list: [],
        listRoles: [],
        listUserTypeCodes: [],
        listUserStatusCodes: [],
        listPhoneCodes: [],
        listFileInfo:[],
        fileSeq:0,
        detailUser: { user_type_code: "" },
        pwd1: "",
        pwd2: "",
        new_pwd1: "",
        new_pwd2: "",
        phone1: "",
        phone2: "",
        phone3: "",
        isShowUserCreate: false,
        isEnableUpdate: false,
        checkedItem: [],
        isInitSystem: false,
        resultMessage: "",
        findOption: "user_name",
        findText: "",
        isShowMessage: false,
        isCheckedID: false,
        isCheckedEmail: false,
        regId: /^[A-Za-z0-9]{4,12}$/,
        regPass: /^[A-Za-z0-9]{8,16}$/,
        regEmail: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        regPhone: /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/,

        pager: {
          model: {},
          pageNo: 1,
          totalSize: 0,
          rowSize: 10,
          blockSize: 5,
          list: [],
          callBack: function (n) {
            this.model.fnGetList();
          },
        },
      },
    };
  },
  created: function () {
    // console.log("created");
  },
  mounted: function () {
    console.log("mounted");
    try {
      this.fnGetList();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    fnGetList: function () {
      let vm = this.viewModel;
      Axios.post( "/api/system/admin/user/manage", {
        pageNo: vm.pager.pageNo,
        pageSize: vm.pager.rowSize,
      })
        .then(function (response) {
          let rs = response.data;

          vm.list = rs.list;
          vm.listUserTypeCodes = rs.listUserTypeCodes;
          vm.listUserStatusCodes = rs.listUserStatusCodes;
          
          vm.listRoles = rs.listRoles;
          vm.listSido = rs.listAdm;
          vm.isShowUserCreate = false;
          vm.isEnableUpdate = false;
          vm.pager.totalSize = rs.totalCount;
          vm.pageNum = vm.pager.pageNo * vm.pager.rowSize - vm.pager.rowSize;
          CompPager.props = CompPager.methods.createPaging(
            vm.pager,
            this,
            "list"
          );
        })
        .catch(function (ex) {
          console.log(ex);
        });
    },

    //유저 생성
    fnClickBtnShowCreateForm: function () {
      let vm = this.viewModel;
      document.getElementById('uploadFiles').value="";
      vm.isShowUserCreate = true;
      vm.isEnableUpdate = false;
      vm.viewModel.isCheckedID= false;
      vm.viewModel.isCheckedEmail = false;
      vm.detailUser = { user_type_code: "" };
      vm.fileSeq=0;
      vm.checkedItem=[];

      vm.pwd1 = "";
      vm.pwd2 = "";
      vm.phone3 = "";
      vm.phone1 = "";
      vm.phone2 = "";
      vm.phone3 = "";
    },

    //사용자 권한 선택
    toggleSelection: function (paramValue) {
      let vm = this.viewModel;
      let idx = vm.checkedItem.indexOf(paramValue);
      // is currently selected
      if (idx > -1) {
        vm.checkedItem.splice(idx, 1);
      }
      // is newly selected
      else {
        vm.checkedItem.push(paramValue);
      }
    },

    //아이디 중복
    fnOnClickCheckID: function () {
      let vm = this;

      if (
        vm.viewModel.detailUser.user_id == null ||
        vm.viewModel.detailUser.user_id == ""
      ) {
        swal("아이디를 입력하세요.");
        return false;
      } else {
        if (!vm.viewModel.regId.test(vm.viewModel.detailUser.user_id)) {
          swal("아이디는 영문,숫자를 포함한 4자이상12자 이하입니다.");
          return false;
        } else {
          Axios.post("/api/account/detail", {
            paramUserID: vm.viewModel.detailUser.user_id,
          }).then(function (response) {
            if (response.data.detail == null) {
              swal("사용 가능한 아이디 입니다.");
              vm.viewModel.isCheckedID = true;
            } else {
              swal("이미 사용중인 아이디 입니다.");
              vm.viewModel.isCheckedID = false;
            }
          });
        }
      }
    },

    fnOnClickCreate:function(){
      let obj=this;
      if(this.viewModel.listFileInfo.length>0){
           let fileFormData=new FormData();
          fileFormData.append("separator","user");
          let i=0;
          this.viewModel.listFileInfo.forEach(function(element){
              fileFormData.append("uploadFiles",element.fileObj);
          });
          Axios.post("/api/file/upload", fileFormData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }})
            .then(function(response){
                if(response.data.file_grp_key!=undefined&&response.data.file_grp_key>0){
                  obj.viewModel.fileSeq=response.data.file_grp_key;
                  obj.fnCreateUser();
                }else{
                  swal("사진 업로드 시에 오류가 발생했습니다.");
                }
            })
            .catch(function(ex){
                console.log(ex);
            });
      


      }else{
        this.fnCreateUser();
      }
    },
    //사용자 추가
    fnCreateUser: function () {
      let vm = this;
      if (!vm.viewModel.isEnableUpdate && !vm.viewModel.isCheckedID) {
        swal("아이디 중복체크를 하세요.");
        return false;
      }
      if (!vm.viewModel.isEnableUpdate && !vm.viewModel.isCheckedEmail) {
        alert("이메일 중복체크를 하세요.");
        return false;
      }
      vm.viewModel.detailUser.user_roles = null;
      for (var i = 0; i < vm.viewModel.checkedItem.length; i++) {
        if (i == 0)
          vm.viewModel.detailUser.user_roles = vm.viewModel.checkedItem[i];
        else
          vm.viewModel.detailUser.user_roles +=
            "," + vm.viewModel.checkedItem[i];
      }
      if (
        !vm.viewModel.isEnableUpdate &&
        (vm.viewModel.pwd1 == null ||
          vm.viewModel.pwd1 == "" ||
          vm.viewModel.pwd2 == null ||
          vm.viewModel.pwd2 == "")
      ) {
        swal("비밀번호를 입력하세요.");
        return false;
      }
      if (
        !vm.viewModel.isEnableUpdate &&
        vm.viewModel.pwd1 != vm.viewModel.pwd2
      ) {
        swal("비밀번호와 비밀번호확인이 다릅니다.");
        return false;
      }
      if (
        !vm.viewModel.isEnableUpdate &&
        !vm.viewModel.regPass.test(vm.viewModel.pwd1)
      ) {
        swal("비밀번호는 영문,숫자를 포함한 8자이상16자 이하입니다.");
        return false;
      } else {
        vm.viewModel.detailUser.user_pwd = vm.viewModel.pwd1;
      }
      if (
        vm.viewModel.detailUser.user_name == null ||
        vm.viewModel.detailUser.user_name == ""
      ) {
        swal("사용자 이름을 입력하세요.");
        return false;
      }
      if (
        vm.viewModel.detailUser.user_email == null ||
        vm.viewModel.detailUser.user_email == ""
      ) {
        swal("사용자 이메일을 입력하세요.");
        return false;
      }
      if (!vm.viewModel.regEmail.test(vm.viewModel.detailUser.user_email)) {
        swal("이메일 형식을 확인해주세요.");
        return false;
      }
      if (vm.viewModel.phone1 != null || !vm.viewModel.phone1 == "") {
        if (
          !vm.viewModel.regPhone.test(
            vm.viewModel.phone1 +
              "-" +
              vm.viewModel.phone2 +
              "-" +
              vm.viewModel.phone3
          )
        ) {
          swal("연락처 형식을 확인해주세요.");
          return false;
        } else {
          vm.viewModel.detailUser.user_phone =
            vm.viewModel.phone1 +
            "-" +
            vm.viewModel.phone2 +
            "-" +
            vm.viewModel.phone3;
        }
      }
      if (
        vm.viewModel.detailUser.user_type_code == null ||
        vm.viewModel.detailUser.user_type_code == ""
      ) {
        swal("사용자 유형을 선택하세요.");
        return false;
      }
      if (
        vm.viewModel.detailUser.user_roles == null ||
        vm.viewModel.detailUser.user_roles == ""
      ) {
        swal("사용자 권한을 선택하세요.");
        return false;
      }
      if (!vm.viewModel.isEnableUpdate) {
        

        Axios.post( "/api/account/create", {
          detail: vm.viewModel.detailUser,
          fileSeq:vm.viewModel.fileSeq
        }).then(function (response) {
          if (response.data.resultCount == 0) {
            swal("비밀번호는 영문,숫자를 포함한 8자이상16자 이하입니다.");
          } else {
            swal("등록되었습니다.");
            vm.fnGetList();
          }
        });


      } else {
        Axios.post( "/api/account/update", {
          detail: vm.viewModel.detailUser,
          fileSeq:vm.viewModel.fileSeq
        }).then(function (response) {
          swal("수정되었습니다.");
          vm.fnGetList();
        });
      }
    },

    //사용자 삭제
    fnClickDelete: function (paramItem) {
      let vm = this;
      Axios.post( "/api/account/delete", {
        paramUserID: paramItem.user_id,
      }).then(function (response) {
        vm.fnGetList();
        swal("삭제되었습니다.");
      });
    },

    //사용자 조회
    fnOnClickUpdateUser: function (paramItem) {
      let vm = this.viewModel;
      vm.isShowUserCreate = true;
      vm.isEnableUpdate = true;
      vm.checkedItem = [];

      Axios.post( "/api/account/detail", {
        paramUserID: paramItem.user_id,
      }).then(function (response) {
        vm.detailUser = response.data.detail;
        if (
          response.data.detail.user_roles != null &&
          response.data.detail.user_roles != ""
        )
          vm.checkedItem = response.data.detail.user_roles.split(",");
        if (
          response.data.detail.user_phone != null &&
          response.data.detail.user_phone != ""
        ) {
          vm.phone1 = response.data.detail.user_phone.split("-")[0];
          vm.phone2 = response.data.detail.user_phone.split("-")[1];
          vm.phone3 = response.data.detail.user_phone.split("-")[2];
        }
      });
    },

    //비밀번호 변경
    fnClickBtnPwdUpdate: function () {
      let vm = this;
      if (vm.viewModel.new_pwd1 != vm.viewModel.new_pwd2) {
        swal("비밀번호와 비밀번호확인이 다릅니다.");
        return false;
      }
      if (
        !vm.viewModel.isEnableUpdate &&
        !vm.viewModel.regPass.test(vm.viewModel.new_pwd1)
      ) {
        swal("비밀번호는 영문,숫자를 포함한 8자이상16자 이하입니다.");
        return false;
      }
      vm.viewModel.detailUser.user_pwd = vm.viewModel.new_pwd1;
      Axios.post( "/api/account/pwd/update", {
        detail: vm.viewModel.detailUser,
      }).then(function (response) {
        if (response.data.resultCount > 0) {
          swal("비밀번호가 변경되었습니다.");
          //vm.fnGetList();
          $(".close").trigger("click");
        }
      });
    },

    //사용자 권한 변경
    fnChangeUserStat: function (paramItem) {
      Axios.post( "/api/system/admin/user/type/update", {
        paramUserID: paramItem.user_id,
        paramUserType: paramItem.user_type_code,
        paramUserStatus: paramItem.user_status_code,
      }).then(function (data) {
        if (data.resultCount <= 0) {
          alert("오류가 발생하였습니다.");
        }
      });
    },

    fnOnClickCheckEmail: function () {
      let vm = this;
      if (
        vm.viewModel.detailUser.user_email == null ||
        vm.viewModel.detailUser.user_email == ""
      ) {
        alert("이메일을 입력하세요");
        return false;
      } else {
        Axios.post( "/api/account/detail/email", {
          paramUserEmail: vm.viewModel.detailUser.user_email,
        }).then(function (response) {
          if (response.data.detail == null) {
            alert("사용 가능한 이메일 입니다.");
            vm.viewModel.isCheckedEmail = true;
          } else {
            alert("이미 사용중인 이메일 입니다.");
            vm.viewModel.isCheckedEmail = false;
          }
        });
      }
    },

    fnChangeValue: function (paramItem) {
      let vm = this;
      if (paramItem == "user") {
        vm.viewModel.isCheckedID = false;
      } else {
        vm.viewModel.isCheckedEmail = false;
      }
    },
    fnSelectedFiles:function(){
      this.viewModel.listFileInfo=[];
      let file = document.getElementById('uploadFiles');
      for(let i=0;i<file.files.length;i++){
         let _file=file.files[i];
         if(this.viewModel.listFileInfo.findIndex(i=>i.fileName===_file.name)===-1){
           this.viewModel.listFileInfo.push({fileName:_file.name, fileSize:_file.size,fileObj:_file,checked:false} );  
         }
       } 
       
    }
    
  },
};
</script>

