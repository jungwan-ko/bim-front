<template>
  <div>
     <div class="row no-gutters widget-2 shadow-base">
        <div class="col-lg-12">
          <div class="card m-b-30">
            <div class="card-header bd-b-color-gray-lighter">
              <h6 class="card-title">
                <i class="ion-ios-paper-outline tx-18 va-m tx-24 va-m"></i> 답변 등록
              </h6>
            </div>
            <div class="card-body">
              <form name="mainForm" id="mainForm" action="/admin/board/content/create" method="post" enctype="multipart/form-data">
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
                            <input type="file" id="uploadFiles"  name="uploadFiles" class="form-control form-control-sm form-input" multiple v-on:change="onSelectedFile">
                          </div>
                          
                        </div>
                        
                        <div class="file-list-layer" v-show="listFileInfo.length>0">
                          <div class="btn-group-xs text-right mg-b-10"  >
                            <button type="button" class="btn btn btn-outline-secondary" v-on:click="onClickFileDelete()"><i class="ion-ios-trash-outline tx-14"></i> 선택파일 삭제</button>
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
        detailContent: { bbs_id: '',category_seq:'0',file_grp_id:'' ,bbs_title:''}
      },
      isMulti: false,
      listFileInfo:[]
    };
  },
  created: function () {
    // console.log("created");
  },
  mounted: function () {
    console.log("mounted");
    try {
       $("#xp-summernote").summernote({
        height: 220,
        minHeight: null,
        maxHeight: null,
        focus: false,
        lang: "ko-KR"
        });
        
      this.bbsContentViewModel.detailContent.bbs_id=this.$route.params.bbsID;
      this.bbsContentViewModel.detailContent.bbs_seq=this.$route.params.seq;
      this.getDetail();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    onClickSaveBtn:function(){
      if(this.listFileInfo.length>0){
        this.createWithFile();
      }else{
        this.create();
      }
    },
    onSelectedFile:function(){
      let file = document.getElementById('uploadFiles');
      for(let i=0;i<file.files.length;i++){
         let _file=file.files[i];
         if(this.listFileInfo.findIndex(i=>i.fileName===_file.name)===-1){
           this.listFileInfo.push({fileName:_file.name, fileSize:_file.size,fileObj:_file,checked:false} );  
         }
       } 
    },
    onClickFileDelete:function(){
      let validFiles=[];
      this.listFileInfo.forEach(function(item){
        if(!item.checked){
          validFiles.push(item);
        }
      });
      this.listFileInfo=validFiles;
    },
    getDetail:function(){
      let obj=this;
           Axios.post("/api/system/admin/board/content/detail", {
              id: this.$route.params.bbsID,
              paramSeq: this.$route.params.seq,
            })
              .then(function (response) {
                let rs = response.data;
                if(rs.detailContent!==null){
                    obj.bbsContentViewModel.detailContent.bbs_title=rs.detailContent.bbs_title;
                    obj.bbsContentViewModel.detailContent.bbs_id=rs.detailContent.bbs_id;
                    obj.bbsContentViewModel.detailContent.bbs_parent=rs.detailContent.bbs_seq;
                }
              })
              .catch(function (ex) {
                console.log(ex);
              });
    }
    ,createWithFile:function(){
      let obj=this;
      obj.bbsContentViewModel.file_grp_id='';
      let fileFormData=new FormData();
      fileFormData.append("separator","board");
      fileFormData.append("fileGroup",obj.bbsContentViewModel.detailContent.file_grp_id);
      let i=0;
      this.listFileInfo.forEach(function(element){
          fileFormData.append("uploadFiles",element.fileObj);
      });

      if(this.listFileInfo.length>0){
            Axios.post("/api/file/upload", fileFormData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }})
            .then(function(response){
                obj.bbsContentViewModel.detailContent.file_grp_id=response.data.file_grp_id;
                obj.create();
            })
            .catch(function(ex){
                console.log(ex);
            });
        }else{
            obj.create();
        }
    }
    ,create:function(){
      let obj=this;
      if (
        this.bbsContentViewModel.detailContent.bbs_cont_title === null ||
        this.bbsContentViewModel.detailContent.bbs_cont_title === ""
      ) {
        swal("제목을 입력하세요");
        return false;
      }

      this.bbsContentViewModel.detailContent.bbs_cont=$("#xp-summernote").summernote("code");
      Axios.post("/api/system/admin/board/content/create",{detailContent:this.bbsContentViewModel.detailContent})
      .then(function(response){
        if(response.data.resultCount>0){
          obj.$router.push({name:"bbsContentList",params:{bbsID:obj.bbsContentViewModel.detailContent.bbs_id}});
        }else{
         swal("게시물 저장 시에 오류가 발생하였습니다."); 
        }
      })
      .catch(function(ex){
        console.log(ex);
      });
    }
  },
};
</script>

