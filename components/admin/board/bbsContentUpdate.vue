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
                    {{bbsContentViewModel.detailContent.bbs_title}}
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsId" class="col-sm-2 col-form-label">제목</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control form-control-sm form-input" id="bbs_cont_title" name="detailContent.bbs_cont_title" v-model="bbsContentViewModel.detailContent.bbs_cont_title" placeholder="게시물의 제목을 입력하세요">
                  </div>
                </div>   
                <div class="form-group row" v-show="bbsContentViewModel.listCategory.length>0">
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
                        
                        <div class="file-list-layer" v-if="listFileInfo.length>0 || bbsContentViewModel.detailContent.listFiles.length>0">
                          <div class="btn-group-xs text-right mg-b-10"  >
                            <button type="button" class="btn btn btn-outline-secondary" v-on:click="fnOnClickFileDelete()"><i class="ion-ios-trash-outline tx-14"></i> 선택파일 삭제</button>
                          </div>  
                          <div class="file-list-box" >
                              <table class="table table-bordered table-mid tx-13 tx-gray-700 bdtable-sm">
                                <thead>
                                  <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                                  <th class="tx-center"><input type="checkbox"></th>
                                      <th class="tx-center">파일명</th>
                                      <th class="tx-center">파일크기</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr  v-for='item in bbsContentViewModel.detailContent.listFiles' v-bind:key="item.file_seq">
                                  <td class="tx-center"><input type="checkbox" v-model="item.checked" /></td>
                                  <td>{{item.file_org_name}}</td>
                                  <td class="tx-right">{{item.file_size}}</td>
                                  </tr>
                                  <tr v-for="item in listFileInfo" v-bind:key="item.fileName">
                                    <td class="tx-center"><input type="checkbox" v-model="item.checked" /> </td>
                                    <td>{{item.fileName}}</td>
                                    <td class="tx-right">{{item.fileSize}}</td>
                                  </tr>

                                </tbody>
                              </table>


                         
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
import Common from "../../common/common.js";
export default {
  data: function () {
    return {
      bbsContentViewModel: {
        listBBS: [],
        detailContent: {
          bbs_id: "",
          category_seq: "0",
          file_grp_id: "",
          listFiles: [],
        },
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
    try {
      $("#xp-summernote").summernote({
        height: 220,
        minHeight: null,
        maxHeight: null,
        focus: false,
        lang: "ko-KR",
      });
      this.fnGetDetail(this.$route.params.bbsID, this.$route.params.seq);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    fnGetDetail: function (paramID, paramSeq) {
      let vm = this;
      Axios.post("/api/system/admin/board/content/detail", {
        id: paramID,
        paramSeq: paramSeq,
      })
        .then(function (response) {
          let rs = response.data;
          vm.bbsContentViewModel.detailContent = rs.detailContent;
          if (vm.bbsContentViewModel.detailContent.listFiles === null) {
            vm.bbsContentViewModel.detailContent.listFiles = [];
          }
          vm.bbsContentViewModel.detailContent.create_date = Common.fnConvertDateStr(
            vm.bbsContentViewModel.detailContent.create_date,
            "-"
          );

          vm.bbsContentViewModel.detailContent.listComment.forEach(function (
            item
          ) {
            item.create_date = Common.fnConvertDateTimeStr(
              item.create_date,
              "-"
            );
            console.log(item.create_date);
          });
          vm.bbsContentViewModel.fixedContent =
            vm.bbsContentViewModel.detailContent.fixed_yn === "Y";
          vm.bbsContentViewModel.listCategory = [];
          response.data.listCategory.forEach(function (item) {
            if (item.category_title !== "") {
              vm.bbsContentViewModel.listCategory.push(item);
            }
          });

          $("#xp-summernote").summernote(
            "code",
            vm.bbsContentViewModel.detailContent.bbs_cont
          );
        })
        .catch(function (ex) {
          console.log(ex);
        });
    },

    fnInit: function () {
      //$("#mydropzone").dropzone();

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
          if (
            this.bbsContentViewModel.detailContent.listFiles.findIndex(
              (c) => c.file_org_name === _file.name
            ) === -1
          ) {
            this.listFileInfo.push({
              fileName: _file.name,
              fileSize: _file.size,
              fileObj: _file,
              checked: false,
            });
          }
        }
      }
    },

    fnCreate: function () {
      let obj = this;
      obj.bbsContentViewModel.file_grp_id = "";
      let fileFormData = new FormData();
      fileFormData.append("separator", "board");
      fileFormData.append(
        "fileGroup",
        obj.bbsContentViewModel.detailContent.file_grp_id
      );
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
      let inputData = {
        bbs_id: this.bbsContentViewModel.detailContent.bbs_id,
        bbs_seq: this.bbsContentViewModel.detailContent.bbs_seq,
        bbs_cont: this.bbsContentViewModel.detailContent.bbs_cont,
        bbs_cont_title: this.bbsContentViewModel.detailContent.bbs_cont_title,
        category_seq: this.bbsContentViewModel.detailContent.category_seq,
        fixed_yn: this.bbsContentViewModel.detailContent.fixed_yn,
        file_grp_id: this.bbsContentViewModel.detailContent.file_grp_id,
      };

      Axios.post("/api/system/admin/board/content/update", {
        detailContent: inputData,
      })
        .then(function (response) {
          if (response.data.resultCount > 0) {
            obj.$router.push({ name: "bbsContentList" });
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
      this.fnDeleteOldFiles();
    },
    fnDeleteOldFiles: function () {
      let obj = this;
      let _deleteTargetFiles = [];
      this.bbsContentViewModel.detailContent.listFiles.forEach(function (item) {
        if (item.checked) {
          _deleteTargetFiles.push({
            file_grp_id: item.file_grp_id,
            file_seq: item.file_seq,
          });
        }
      });

      Axios.post("/api/file/delete", { listFiles: _deleteTargetFiles })
        .then(function (response) {
          if (response.data.resultCount > 0) {
            obj.bbsContentViewModel.detailContent.listFiles =
              response.data.listFiles;
          } else {
            swal("파일 삭제 시에 오류가 발생하였습니다.");
          }
        })
        .catch(function (ex) {
          console.log(ex);
        });
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

