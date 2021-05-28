<template>
  <div>
    <div class="row no-gutters widget-2 shadow-base">
      <div class="col-sm-12 col-lg-12">
        <div class="card">
          <div class="card-header bd-b-color-gray-lighter">
            <h6 class="card-title">
              <i class="ion-ios-paper-outline tx-18 va-m tx-24 va-m"></i> {{bbsContentViewModel.detailContent.bbs_cont_title}}
            </h6>
            <p class="btn-group-xs">
              <router-link  :to="{ name: 'bbsContentReply', params:{ bbsID: bbsContentViewModel.detailContent.bbs_id,seq:bbsContentViewModel.detailContent.bbs_seq  }}" class="btn btn-outline-secondary">답변</router-link>
             <router-link  :to="{ name: 'bbsContentList', params: { bbsID: bbsContentViewModel.detailContent.bbs_id }}" class="btn btn-outline-secondary">목록</router-link>
             <router-link  :to="{ name: 'bbsContentUpdate', params: { bbsID: bbsContentViewModel.detailContent.bbs_id,seq:bbsContentViewModel.detailContent.bbs_seq }}" class="btn btn-outline-secondary">수정</router-link>
             <button type="button" class="btn btn-outline-secondary" v-if="bbsContentViewModel.detailContent.edit_yn=='Y'"  v-on:click="fnOnClickDelete">삭제</button>
            </p>
          </div>
           <div class="card-body">
                <div class="row ">
                    <div class="col-lg-12">
                      <div class="bd-b-color-gray-lighter">
                          <p class="tx-left tx-12 mg-b-5">작성자 : {{bbsContentViewModel.detailContent.create_user_name}}</p>
                          <p class="tx-left tx-12 mg-b-10">작성일 : {{bbsContentViewModel.detailContent.create_date}}</p>
                      </div>
                      <div class="pd-t-10 bd-b-color-gray-lighter">
                          <p class="tx-left tx-14 tx-bold mg-b-5">첨부파일</p>
                          <p class="tx-left tx-12 mg-b-5" v-for="item in bbsContentViewModel.detailContent.listFiles" :key="item.file_seq">
                           <a href="#" v-on:click.prevent="fnFileDownload(item.file_seq)"> <i class="mdi mdi-download mr-2"></i> {{item.file_org_name}}</a>
                          </p>
                          
                      </div>
                      <div class="pd-t-50 pd-b-30 pd-l-20 text-left bd-b-color-gray-lighter"  v-html="bbsContentViewModel.detailContent.bbs_cont"></div>  
                      
                      <div class="bd-b-dotted" v-for="item in bbsContentViewModel.detailContent.listComment" v-bind:key="item.seq">
                        <p class="mg-b-0"><small class="tx-primary">{{item.create_user_name}}</small>  <small>{{item.create_date}}</small></p>
                        <p>{{item.cmmt_content}}</p>
                        <p class="text-right btn-group-xs mg-b-3">
                          <button class="btn btn-outline-secondary" v-on:click="fnOnClickDeleteComment(item)">삭제</button>
                        </p>
                      </div>
                      
                    </div>
                </div>
                <div class="row mg-t-10  pd-b-20 ">
                  
                    <div class="col-lg-8">
                      <textarea class="form-control form-input" v-model="inputComment"></textarea>
                    </div>
                    <div class="col-lg-4">
                      <button class="btn btn-primary" v-on:click="fnOnClickCreateComment">등록</button>
                    </div>
                    
                </div>
                <div class="row mg-t-10">
                   <div class="col-lg-12">
                     <table class="table">
                       <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
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
import Axios from "axios";
import Common from "../../common/common.js";

export default {
  data: function () {
    return {
      bbsContentViewModel: {
        detailContent: { bbs_id: "" }
        
      },
      inputComment:'',
    };
  },
  created: function () {
    // console.log("created");
  },
  mounted: function () {
    console.log("mounted");
    try {
      this.fnInit(this.$route.params.bbsID, this.$route.params.seq);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    fnInit: function (paramID, paramSeq) {
      let vm = this;
      Axios.post("/api/system/admin/board/content/detail", {
        id: paramID,
        paramSeq: paramSeq,
      })
        .then(function (response) {
          let rs = response.data;
          vm.bbsContentViewModel.detailContent = rs.detailContent;
          vm.bbsContentViewModel.detailContent.create_date = Common.fnConvertDateStr(
            vm.bbsContentViewModel.detailContent.create_date,
            "-"
          );
 
          vm.bbsContentViewModel.detailContent.listComment.forEach(function(item){
              item.create_date=Common.fnConvertDateTimeStr(item.create_date,"-");
              console.log(item.create_date);
          });


        })
        .catch(function (ex) {
          console.log(ex);
        });
    },

    fnFileDownload: function (paramSeq) {
      Common.fnOnFileDownload(paramSeq);
    },
    fnOnClickCreateComment:function(){
      let obj=this;
      if(this.inputComment.isEmpty()) 
      {
        swal("내용을 입력하세요.");
        return false;
      }

      let _param={
         bbs_id:this.bbsContentViewModel.detailContent.bbs_id
        ,bbs_seq:this.bbsContentViewModel.detailContent.bbs_seq
        ,cmmt_content:this.inputComment
      }

      Axios.post("/api/system/admin/board/content/comment/create",{detail:_param})
      .then(function(response){
        if(response.data.resultCount>0){
          obj.bbsContentViewModel.detailContent.listComment=response.data.list;
          obj.bbsContentViewModel.detailContent.listComment.forEach(function(item){
               item.create_date=Common.fnConvertDateTimeStr(item.create_date,"-");
          });
        }
        else
          swal('내용 저장 시에 오류가 발생했습니다.');
      })
      .catch(function(ex){
        console.log(ex);
      });
    },
    fnOnClickDelete:function(){
       let obj=this;
       Axios.post("/api/system/admin/board/content/delete",{
         id:obj.bbsContentViewModel.detailContent.bbs_id
         ,paramSeq:obj.bbsContentViewModel.detailContent.bbs_seq
         })
       .then(function(response){
         if(response.data.resultCount>0){
             obj.$router.push({name:"bbsContentList"});
         }else{
             swal('게시물 삭제 시에 오류가 발생했습니다.');
         }
       })
       .catch(function(ex){
         console.log(ex);
       });
    },
    fnOnClickDeleteComment:function(item){
      let obj=this;
        let _param={
          bbs_id:this.bbsContentViewModel.detailContent.bbs_id
          ,bbs_seq:this.bbsContentViewModel.detailContent.bbs_seq
          ,cmmt_content:this.inputComment
          ,seq:item.seq
        };
          Axios.post("/api/system/admin/board/content/comment/delete",{detail:_param})
          .then(function(response){
            if(response.data.resultCount>0){
              obj.bbsContentViewModel.detailContent.listComment=response.data.list;
              obj.bbsContentViewModel.detailContent.listComment.forEach(function(item){
                  item.create_date=Common.fnConvertDateTimeStr(item.create_date,"-");
              });
            }
            else
              swal('내용 저장 시에 오류가 발생했습니다.');
          })
          .catch(function(ex){
            console.log(ex);
          });
    }
  },
};
</script>

