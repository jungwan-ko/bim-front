<template>
  <div>
    <div
      class="row no-gutters widget-2 shadow-base mg-b-30"
      v-show="isShowCreateForm"
    >
      <div class="col-sm-12 col-lg-12">
        <div class="card">
          <div class="card-header bd-b-color-gray-lighter">
            <h6 class="card-title">
              <i class="ion-ios-paper-outline tx-18 va-m tx-24 va-m"></i> 신규
              등록
            </h6>
          </div>
          <div class="card-body">
            <div class="row bd-b-color-gray-lighter">
              <div class="col-sm-12 col-lg-12">
                <div class="table-wrap">
                  <div class="table-wrap-header pd-3 w-m-1">
                    <div class="d-flex">
                      <div class="mr-auto pd-5">
                        <i
                          class="ion-android-arrow-dropright-circle text-info tx-14"
                        ></i>
                        입력정보
                      </div>
                      <div class="btn-group-xs">
                        <!-- <button type="button" class="btn btn-primary"><i class="ion-ios-plus text-minus tx-14"></i> 신규 프로젝트 등록</button> -->
                      </div>
                    </div>
                  </div>
                  <table
                    class="table table-bordered table-mid tx-13 tx-gray-700 bd"
                  >
                    <tbody>
                      <tr>
                        <td class="wd-10p bg-gray-100 tx-center">신청자</td>
                        <td>
                          <input
                            type="text"
                            class="form-control form-control-sm form-input"
                            v-bind:value="UserInfo.loginUserID"
                            readonly
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="wd-10p bg-gray-100 tx-center">기관명</td>
                        <td>
                          <input
                            type="text"
                            value=""
                            placeholder="소속기관을 입력하세요"
                            class="form-control form-control-sm form-input"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="wd-10p bg-gray-100 tx-center">성과품명</td>
                        <td>
                          <input
                            type="text"
                            placeholder="성과품명을 입력하세요."
                            v-model="projectImteInfo.title"
                            class="form-control form-control-sm form-input"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="wd-10p bg-gray-100 tx-center">시설물분류</td>
                        <td>
                          <select
                            class="form-control form-select-sm"
                            v-model="projectImteInfo.bim_build_code"
                          >
                            <option value="">선택</option>
                            <option
                              v-for="item in listBuildCodes"
                              v-bind:key="item.sys_code"
                              v-bind:value="item.sys_code"
                            >
                              {{ item.sys_title }}
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td class="wd-10p bg-gray-100 tx-center">상세설명</td>
                        <td>
                          <textarea
                            class="form-control"
                            v-model="projectImteInfo.cont"
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td class="wd-10p bg-gray-100 tx-center">비고</td>
                        <td>
                          <textarea
                            class="form-control"
                            v-model="projectImteInfo.etc"
                          ></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

             <h6 class="tx-14 tx-info tx-left mg-t-10"><i class="ion-android-arrow-dropright-circle tx-14"></i> 파일 등록(수정)</h6>
             <div class="row">
             
              <div class="col-sm-12 col-lg-4">
                <category-tree ref="categoryTree"></category-tree>

              </div>
              <div class="col-sm-12 col-lg-8 text-right">
                <div class="btn-group-xs  mg-b-10">
                      <input type="file" id="fileElem" multiple style="display:none" v-on:change="onSelectedFiles">
                      <button type="button" class="btn btn-outline-secondary" v-on:click="onClickDeleteFiles">
                        <i class="ion-ios-minus tx-14 tx-danger va-m"></i>
                        선택삭제
                      </button>
                      <button type="button" class="btn btn-outline-secondary" v-on:click="onClickAddFiles">
                        <i class="ion-ios-plus tx-14 tx-primary va-m"></i>
                        파일추가
                      </button>
                </div>

                <div class="file-list-box mg-b-10" >
                     <table class="table table-bordered">
                       <thead>
                         <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                         <th class="tx-center">선택</th>
                         <th class="tx-center">버전</th>
                         <th class="tx-center">카테고리</th>
                         <th class="tx-center">파일크기</th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr v-for="item in listFileInfo" v-bind:key="item.fileName">
                           <td class="text-center"><input type="checkbox" v-model="item.checked" /> </td>
                           <td class="text-left">{{item.fileName}}</td>
                           <td class="text-center">{{item.category.title}}</td>
                           <td class="tx-right">{{Common.formatBytes(item.fileSize)}}</td>
                         </tr>
                       </tbody>
                     </table>
                  </div>

                <table class="table table-bordered tx-13 tx-gray-700 bd" v-if="isEditMode">
                    <thead>
                      <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                        <!-- <th  class="wd-5p tx-center">선택</th> -->
                        <th  class="wd-55p tx-center">파일명</th>
                        <th class="wd-10p tx-center">버전</th>
                        <th  class="wd-10 tx-center">등록자</th>
                        <!-- <th>등록(변경)일</th> -->
                        <th  class="wd-10p tx-center">변경이력</th>
                        <th  class="wd-10p tx-center">3D</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in listUploadedFile" v-bind:key="item.file_seq">
                        <!-- <td class="text-left"><input type="checkbox"></td> -->
                        <td class="text-left">{{item.file_org_name}}</td>
                         <td class="text-center">v{{item.file_title}}</td>
                        <td class="text-center">{{item.update_user_name}}</td>
                        <td class="text-center"><div class="btn-group-xs"><button type="button" v-on:click="onClickFileHistory(item)" class="btn btn-primary">보기</button></div></td>
                        <td class="text-center"><div class="btn-group-xs" v-if="item.file_ext==='png'"><button type="button" class="btn btn-primary" v-on:click="onClickIfcViewer()">뷰어</button></div></td>
                      
                      </tr>
                     
                    </tbody>
                  </table>

                  
              </div>
              
             </div>
             
               <div class="row mg-t-10">
                <div class="col-sm-12 col-lg-12">
                  <div class="d-flex mg-b-10">
                    <div class="mr-auto">
                      <h6 class="tx-14 tx-info tx-left mg-t-10">
                        <i class="ion-android-arrow-dropright-circle tx-14"></i>
                        결제정보
                      </h6>
                    </div>
                  </div>
                  <table class="table table-bordered tx-13 tx-gray-700 bd">
                    <thead>
                      <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                        <th>진행단계</th>
                        <th class="wd-20p">결재자</th>
                        <th>등록자</th>
                        <th>등록(변경)일</th>
                        <th>승인여부</th>
                        <th  class="wd-30p">의견</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in listProjectCategories" v-bind:key="item.category_seq" v-show="index<listProjectCategories.length-1">
                        <td class="va-m">{{item.category_title}}</td>
                        <td><select class="form-control form-select-sm" v-model="item.user_id">
                          <option value="">담당자를 선택하세요.</option>
                          <option v-for="user in listUsers" v-bind:value="user.user_id" v-bind:key="user.user_id">{{user.user_name}}</option>
                          </select></td>
                        <td>{{item.create_user_name}}</td>
                        <td>{{Common.fnConvertDateStr(item.update_date,'-')}}</td>
                        <td>{{item.process_code_title}}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              
             </div>
          </div>
          <div class="card-footer bg-white">
            <div class="form-group row">
              <div class="col-sm-10 btn-group-sm">
                <button
                  type="button"
                  class="btn btn-primary"
                  v-show="!isEditMode"
                  v-on:click="onClickBtnSave"
                >
                  저장
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  v-show="isEditMode"
                  v-on:click="onClickBtnUpdate"
                >
                  수정
                </button>
                <button
                  type="button"
                  class="btn btn-warning"
                  v-on:click="isShowCreateForm = false"
                >
                  취소
                </button>
                <span class="text-danger">{{ message }}</span>
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
              <i class="ion-ios-paper-outline tx-18 va-m tx-24 va-m"></i>
              CDE현황 조회
            </h6>
          </div>
          <div class="card-body">
            <div class="row tx-center">
              <div class="col-lg-12">
                <div class="mg-b-5">
                  <form>
                    <div class="d-flex">
                      <div class="pd-r-5 mr-auto">
                        <select
                          name="xp-default-datatable_length"
                          aria-controls="xp-default-datatable"
                          v-model="selectedProjectId"
                          v-on:change="onChangeProject"
                          class="form-control form-select-sm"
                        >
                          <option value="">프로젝트 선택</option>
                          <option
                            v-for="item in listProject"
                            :key="item.prj_id"
                            :value="item.prj_id"
                          >
                            {{ item.prj_title }}
                          </option>
                        </select>
                      </div>
                      <div class="btn-group-xs">
                        <button
                          type="button"
                          v-on:click="onClickAddItem"
                          class="btn btn-outline-secondary"
                        >
                          <i class="ion-ios-plus tx-14 tx-primary va-m"></i>
                          성과품 등록
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <table
                  class="table table-bordered table-mid tx-13 tx-gray-700 bd"
                >
                  <thead>
                    <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                      <th class="wd-10p tx-center">진행구분</th>
                      <th class="wd-25p tx-center">제목</th>

                      <th class="wd-10p tx-center">유형</th>
                      <th class="wd-10p tx-center">신청자</th>
                      <th class="wd-10p tx-center">등록일</th>
                      <th class="wd-25p tx-center">담당자</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="listProjectItems.length === 0">
                      <td class="text-danger" colspan="7">
                        등록된 진행현황을 찾을 수 없습니다.
                      </td>
                    </tr>
                    <tr v-for="item in listProjectItems" :key="item.seq">
                      <td>
                        <a
                          href="#"
                          v-on:click.prevent="onClickDetailItem(item)"
                          >{{ item.category_title }}</a
                        >
                      </td>

                      <td class="text-left">
                        <a
                          href="#"
                          v-on:click.prevent="onClickDetailItem(item)"
                          >{{ item.title }}</a
                        >
                      </td>
                      <td>{{ item.bim_build_code_title }}</td>
                      <td>{{ item.create_user_name }}</td>
                      <td>{{ item.create_date }}</td>
                      <td class="text-left">
                        <span
                          v-for="(step, index) in item.listStep"
                          v-bind:key="index"
                          v-show="step.mng_user_name != null"
                        >
                          &gt;
                          <span
                            v-bind:class="{
                              'text-danger': step.step_yn === 'Y',
                            }"
                            >{{ step.mng_user_name }}</span
                          >
                        </span>
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
    <file-history ref="modalFileHistory"></file-history>
  </div>
</template>
<script>
import CategoryTree from "../category/sample.vue"
import Common from "../../common/common.js";
export default {
  data: function () {
    return {
      projectImteInfo: {
        title: "",
        category_seq: 0,
        cont: "",
        bim_build_code: "",
      },
      projectInfo: {
        prj_id: "",
      },
      listBuildCodes: [],
      listProjectStepInfos: [],
      listProjectItems: [],
      listProject: [],
      listProjectCategories: [],
      listUsers: [],
      listFileInfo: [],
      listUploadedFile: [],
      isShowCreateForm: false,
      isEditMode: false,
      message: "",
      selectedCategory: "",
      selectedProjectId: "",
    };
  },
  components:{
    'categoryTree':CategoryTree
  }
  ,
  mounted: function () {
    this.getListProject();
  },
  methods: {
    async getListProject() {
      try {
        let obj = this;
        const rsCodes = await this.Axios.get("/api/code/BIM_BULD/sys/list");
        this.listBuildCodes = rsCodes.data.listCodeSys;
        const rsProject = await this.Axios.get("/api/project/list");
        this.listProject = rsProject.data.listProjects;
        if (this.listProject != null && this.listProject.length > 0) {
          this.selectedProjectId = this.listProject[0].prj_id;
          this.getDetailProject();
          this.getListProejctItems();
        }
      } catch (error) {
        console.log(error);
      }
    }
     ,onSelectedFiles: function () {
      let file = document.getElementById("fileElem");
     
      this.selectedCategory=this.$refs.categoryTree.getCategory();

      for (let i = 0; i < file.files.length; i++) {
        let _file = file.files[i];
        if (
          this.listFileInfo.findIndex((i) => i.fileName === _file.name) === -1
        ) {
          this.listFileInfo.push({
            fileName: _file.name,
            fileSize: _file.size,
            category:this.selectedCategory,
            fileObj: _file,
            checked: false,
          });
          
        }
      }
    },
    onClickDeleteFiles: function () {
      
      let validFiles = [];
      this.listFileInfo.forEach(function (item) {
        if (!item.checked) {
          validFiles.push(item);
        }
      });
      this.listFileInfo = validFiles;
      
    },
    onClickAddFiles: function () {
      let selectedCat=this.$refs.categoryTree.getCategory();
      if(selectedCat==null){
          swal('입력오류','왼쪽에서 카테고리를 선택해 주세요.','warning');
          return false;
      }
      let fileEl = document.getElementById("fileElem");
      fileEl.click();
    },
    onClickFileHistory: function (item) {
      console.log(this.$refs);
      this.$refs.modalFileHistory.show(item);
    },
    onClickAddItem: function () {
      this.isEditMode = false;
      this.isShowCreateForm = true;
      this.listFileInfo = [];
      this.projectImteInfo = {
        title: "",
        category_seq: 0,
        cont: "",
        bim_build_code: "",
      };
      this.getDetailProject();
    },
    onClickBtnSave: function () {
      this.create();
    },
    onClickBtnUpdate: function () {},
    onClickDetailItem: function (item) {
      this.isShowCreateForm = true;
      this.isEditMode = true;
      this.projectImteInfo = item;
      this.listProjectCategories = item.listStep;
      this.listFileInfo = [];
      this.message="";
      window.scroll({ top: 0 });
      this.getUploadedFiles();
    },
    onClickIfcViewer:function(){
     window.open ("/www/images/ifc-sample.png","mywindow","menubar=1,resizable=1,width=640,height=455");
    },
    onChangeProject: function () {
      this.getDetailProject();
      this.getListProejctItems();
    },
    getListProejctItems: function () {
      let obj = this;
      let url = `/api/project/${this.selectedProjectId}/cde/list`;
      this.Axios.get(url, {
        params: { paramStep: -1, pageNo: 1, pageSize: 1000 },
      })
        .then(function (response) {
          response.data.listProjectItems.forEach((element) => {
            element.create_date = Common.fnConvertDateStr(
              element.create_date,
              "-"
            );
          });
          obj.listProjectItems = response.data.listProjectItems;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getUploadedFiles: function () {
      let obj = this;
      this.Axios.get("/api/project/item/file/list", {
        params: { fileGroup: this.projectImteInfo.file_grp_id },
      })
        .then(function (response) {
          obj.listUploadedFile = response.data.list;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDetailProject: function () {
      let obj = this;
      this.Axios.get("/api/project/detail/" + this.selectedProjectId)
        .then(function (response) {
          let _category = response.data.listProjectCategory;
          _category.forEach((element) => {
            element.user_id = "";
          });
          obj.listProjectCategories = _category;
          obj.listUsers = response.data.listUsers;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async create() {
      this.message = "";
      if (this.listFileInfo.length == 0) {
        this.message = "* 성과품 파일을 선택해 주세요.";
        return false;
      }
      if (this.projectImteInfo.title.isEmpty()) {
        this.message = "* 성과품명을 입력해 주세요.";
        return false;
      }
      if (this.selectedProjectId.isEmpty()) {
        this.message = "* 프로젝트를 선택해 주세요.";
        return false;
      }

      this.projectImteInfo.prj_id = this.selectedProjectId;
      let paramStep = [];
      let isValid = false;
      this.listProjectCategories.forEach((element) => {
        if (element.user_id != "") isValid = true;
        paramStep.push({
          category_seq: element.category_seq,
          user_id: element.user_id,
          prj_id: this.selectedProjectId,
        });
      });

      if (!isValid) {
        this.message = "* 적어도 한명의 결재자는 지정해야 합니다.";
        return false;
      }

      let fileFormData = new FormData();
      fileFormData.append("id", this.selectedProjectId);

      let i = 0;
      this.listFileInfo.forEach(function (element) {
        fileFormData.append("uploadFiles", element.fileObj);
        fileFormData.append("listCategoryIds",element.category.id);
      });

      try {
        const responseFile = await this.Axios.post(
          "/api/project/cde/file/upload",
          fileFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (
          responseFile.data.file_grp_id == undefined ||
          responseFile.data.file_grp_id == null
        ) {
          return false;
        }

        this.projectImteInfo.file_grp_id = responseFile.data.file_grp_id;
        this.projectImteInfo.category_seq = this.listProjectCategories[0].category_seq;
        const responseCreate = this.Axios.post("/api/project/item/create", {
          detailProjectItem: this.projectImteInfo,
          listItemStep: paramStep,
        });

        if (responseCreate.data.resultCount > 0) {
          this.isShowCreateForm = false;
          this.listProjectItems = responseCreate.data.listProjectItems;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>