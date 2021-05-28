<template>
  <div>
     <div class="row no-gutters widget-2 shadow-base">
        <div class="col-lg-12">
          <div class="card m-b-30">
            <div class="card-header bd-b-color-gray-lighter">
              <h6 class="card-title">
                <i class="ion-ios-paper-outline tx-18 va-m tx-24 va-m"></i> 게시물 등록
              </h6>
            </div>
            <div class="card-body">
              <form name="mainForm" id="mainForm" action="/admin/board/content/create" method="post" enctype="multipart/form-data">
                <div class="form-group row">
                  <div class="col-sm-2">상단고정</div>
                  <div class="col-sm-10">
                    <div >                      
                      <input type="checkbox" id="headerCheck"  name="detailContent.fixed_yn" v-model="bbsContentViewModel.fixedContent">
                      <label class="form-control-label" for="headerCheck">등록</label>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-2">게시판</div>
                  <div class="col-sm-10">
                    <select class="form-control form-select-sm" v-model="bbsContentViewModel.detailContent.bbs_id" v-on:change="fnSetCategory">
                      <option value="">게시판을 선택하세요</option>
                      <option v-for="item in bbsContentViewModel.listBBS" :key="item.bbs_id" :value="item.bbs_id">{{item.bbs_title}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsId" class="col-sm-2 col-form-label">제목</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control form-control-sm form-input" id="bbs_cont_title" name="detailContent.bbs_cont_title" v-model="bbsContentViewModel.detailContent.bbs_cont_title" placeholder="게시물의 제목을 입력하세요">
                  </div>
                </div>   
                <div class="form-group row">
                  <label for="bbsId" class="col-sm-2 col-form-label">카테고리</label>
                  <div class="col-sm-10">
                        <div class="btn-group" role="group" >
                            <label class="rdiobox rdiobox-success pd-r-10" v-for="item in bbsContentViewModel.listCategory" :key="item.category_seq" v-show="item.bbs_id==bbsContentViewModel.detailContent.bbs_id && item.category_title!=''">
                              <input type="radio" name="detailContent.category_seq" :id="item.category_seq" :value="item.category_seq" v-model="bbsContentViewModel.detailContent.category_seq"><span>{{item.category_title}}</span>
                            </label>
                          </div>
                       </div>
                   
                </div>          
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">내용</label>
                  <div class="col-sm-10">
                    <div id="xp-summernote"></div>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsId" class="col-sm-2 col-form-label">파일</label>
                  <div class="col-sm-10">
                    <div class="row">
                      
                      <div class="col-sm-12"  id="fileLayer">
                        <div class="row">
                          <div class="form-group col-sm-10">
                            <input type="file" id="uploadFiles"  name="uploadFiles" class="form-control form-control-sm form-input" multiple v-on:change="fnSelectedFiles">
                          </div>
                          
                        </div>
                        
                        <div class="file-list-layer" v-show="listFileInfo.length>0">
                          <div class="btn-group-xs text-right mg-b-10"  >
                            <button type="button" class="btn btn btn-outline-secondary" v-on:click="fnOnClickFileDelete()"><i class="ion-ios-trash-outline tx-14"></i> 선택파일 삭제</button>
                          </div>  
                          <div class="file-list-box" >
                              <div v-for="item in listFileInfo" v-bind:key="item.fileName">
                                <label><input type="checkbox" v-model="item.checked" /> <span>{{item.fileName}}</span></label>
                              </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </form> 
          
            <div class="card-footer bg-white">
              <div class="form-group row">
                <div class="col-sm-10 btn-group-sm"> 
                  <button type="button" class="btn btn-primary" v-on:click="onClickSaveBtn">등록</button>
                  <router-link to='/manage/bbsContents' class="btn btn-warning">취소</router-link>
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
import Axios from "axios";
export default {
  data: function () {
    return {
      bbsContentViewModel: {
        listBBS: [],
        detailContent: { bbs_id: "", category_seq: "0", file_grp_id: "" },
        fixedContent: false,
        listCategory: [],
        fileGrpId: null,
      },
      isMulti: false,
      selBbsId: "",
      listFileInfo: [],
    };
  },
  created: function () {
    // console.log("created");
  },
  mounted: function () {
    console.log("mounted");
    try {
      (this.bbsContentViewModel.detailContent.bbs_id = this.$route.params.bbsID),
        this.fnInit();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    fnInit: function () {
      //$("#mydropzone").dropzone();
      $("#xp-summernote").summernote({
        height: 220,
        minHeight: null,
        maxHeight: null,
        focus: false,
        lang: "ko-KR",
      });

      let vm = this;
      Axios.post("/api/system/admin/board/list", {})
        .then(function (response) {
          let rs = response.data;
          vm.bbsContentViewModel.listBBS = rs.listMaster;
        })
        .catch(function (ex) {
          console.log(ex);
        });
    },
    fnSetCategory: function () {
      this.bbsContentViewModel.listCategory = [];
      let _selectedId = this.bbsContentViewModel.detailContent.bbs_id;
      for (let i = 0; i < this.bbsContentViewModel.listBBS.length; i++) {
        let _target = this.bbsContentViewModel.listBBS[i];
        if (_target.bbs_id === _selectedId) {
          this.bbsContentViewModel.listCategory = _target.listCate;
          this.bbsContentViewModel.detailContent.category_seq = this.bbsContentViewModel.listCategory[0].category_seq;
        }
      }
    },
    fnSelectedFiles: function () {
      let file = document.getElementById("uploadFiles");
      for (let i = 0; i < file.files.length; i++) {
        let _file = file.files[i];
        if (
          this.listFileInfo.findIndex((i) => i.fileName === _file.name) === -1
        ) {
          this.listFileInfo.push({
            fileName: _file.name,
            fileSize: _file.size,
            fileObj: _file,
            checked: false,
          });
        }
      }
    },

    fnCreate: function () {
      let obj = this;
      obj.bbsContentViewModel.file_grp_id = "";
      let fileFormData = new FormData();
      fileFormData.append("separator", "board");
      let i = 0;
      this.listFileInfo.forEach(function (element) {
        fileFormData.append("uploadFiles", element.fileObj);
      });

      if (this.listFileInfo.length > 0) {
        Axios.post("/api/file/upload", fileFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then(function (response) {
            obj.bbsContentViewModel.detailContent.file_grp_id =
              response.data.file_grp_id;
            obj.fnCreateContents();
          })
          .catch(function (ex) {
            console.log(ex);
          });
      } else {
        obj.fnCreateContents();
      }
    },
    fnCreateContents: function () {
      let obj = this;
      if (
        this.bbsContentViewModel.detailContent.bbs_id == null ||
        this.bbsContentViewModel.detailContent.bbs_id == ""
      ) {
        swal("게시판을 선택하세요");
        return false;
      }
      if (
        this.bbsContentViewModel.detailContent.bbs_cont_title == null ||
        this.bbsContentViewModel.detailContent.bbs_cont_title == ""
      ) {
        swal("제목을 입력하세요");
        return false;
      }

      this.bbsContentViewModel.detailContent.bbs_cont = $(
        "#xp-summernote"
      ).summernote("code");
      this.bbsContentViewModel.detailContent.fixed_yn = this.bbsContentViewModel
        .fixedContent
        ? "Y"
        : "N";
      Axios.post("/api/system/admin/board/content/create", {
        detailContent: this.bbsContentViewModel.detailContent,
      })
        .then(function (response) {
          if (response.data.resultCount > 0) {
            obj.$router.push({
              name: "bbsContentList",
              params: { bbsID: obj.bbsContentViewModel.detailContent.bbs_id },
            });
          } else {
            swal("게시물 저장 시에 오류가 발생하였습니다.");
          }
        })
        .catch(function (ex) {
          console.log(ex);
        });
    },
    fnOnClickFileDelete: function () {
      let validFiles = [];
      this.listFileInfo.forEach(function (item) {
        if (!item.checked) {
          validFiles.push(item);
        }
      });
      this.listFileInfo = validFiles;
    },
    onClickSaveBtn: function () {
      this.fnCreate();
      let vm = this;

      // if (
      //   vm.bbsContentViewModel.detailContent.bbs_id == null ||
      //   vm.bbsContentViewModel.detailContent.bbs_id == ""
      // ) {
      //   swal("게시판을 선택하세요");
      //   return false;
      // }
      // if (
      //   vm.bbsContentViewModel.detailContent.bbs_cont_title == null ||
      //   vm.bbsContentViewModel.detailContent.bbs_cont_title == ""
      // ) {
      //   swal("제목을 입력하세요");
      //   return false;
      // }

      // $("#smartEditor").val($("#xp-summernote").summernote("code"));
      // $("#file_grp_id").val($("#fileGroup").val());

      // let fileUploadType = [
      //   "doc",
      //   "xlsx",
      //   "hwp",
      //   "txt",
      //   "jpg",
      //   "gif",
      //   "png",
      //   "jpeg",
      //   "xml",
      //   "pdf",
      //   "ppt",
      //   "pptx",
      //   "docx",
      //   "xls",
      //   "bmp",
      //   "zip",
      // ];
      // let fileBoo = true;
      // for (let i = 0; i < document.mainForm.uploadFiles.length; i++) {
      //   let fileObj = document.mainForm.uploadFiles[i];
      //   if (fileObj.files.length > 0) {
      //     let fileName = fileObj.files[0].name;
      //     let files = fileName.split(".");
      //     let fileExt = files[files.length - 1];
      //     if (fileUploadType.indexOf(fileExt) == -1) {
      //       fileBoo = false;
      //     }
      //   }
      // }
      // if (fileBoo == false) {
      //   swal("업로드 불가능한 파일형식이 있습니다.");
      //   return;
      // }
      // document.forms["mainForm"].submit();
      // //swal("등록되었습니다.");
    },
  },
};
</script>

