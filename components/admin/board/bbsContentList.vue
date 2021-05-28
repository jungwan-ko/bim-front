<template>
  <div class="row no-gutters widget-2 shadow-base">
      <div class="col-sm-12 col-lg-12">
        <div class="card">
          <div class="card-header bd-b-color-gray-lighter">
            <h6 class="card-title">
              <i class="ion-ios-paper-outline tx-18 va-m tx-24 va-m"></i> 게시물 관리
            </h6>
          </div>
          <div class="card-body">
            <div class="row tx-center">
              <div class="col-lg-12">
               <div class="mg-b-5">
               <form>
                <div class="d-flex">                  
                  <div class="pd-r-5">
                    <select name="xp-default-datatable_length" aria-controls="xp-default-datatable" v-model="bbsContentViewModel.bbsId" class="form-control form-select-sm " v-on:change="fnChangeBBS">
                      <option v-for = "item in bbsContentViewModel.listBBS" :key="item.bbs_id" :value="item.bbs_id">{{item.bbs_title}}</option>
                    </select>
                  </div>
                  <div class="pd-r-5">
                    <input type="text" class="form-control  form-input form-control-sm" id="searchTitle" placeholder="검색어 입력" v-model="bbsContentViewModel.searchTitle">
                  </div>
                  
                  <div class="btn-group-xs mr-auto">
                    <a href="#" class="btn btn-info" v-on:click="fnChangeBBS"><i class="fa fa-search mr-2"></i> 조회</a>
                  </div>
                 <div class="btn-group-xs">
                  <router-link :to="{ name: 'bbsContentWrite', params: { bbsID: bbsContentViewModel.bbsId }}" class="btn btn-primary">글작성</router-link>
                 </div>
                </div>
              </form>  
               </div> 

               <table class="table table-bordered table-mid tx-13 tx-gray-700 bd" >
                  <thead >
                   <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                      <th class="wd-10p tx-center">번호</th>
                      <th class="wd-30p tx-center">제목</th>
                      <!-- <th class="wd-10p tx-center">카테고리</th> -->
                      <th class="wd-10p tx-center">파일유무</th>
                      <th class="wd-10p tx-center">작성자</th>
                      <th class="wd-20p tx-center">작성일</th>
                      <th class="wd-10p tx-center">사용여부</th>
                      <th class="wd-10p tx-center">삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in bbsContentViewModel.listContents" :key="item.bbs_seq" :class="{'tx-info tx-bold':item.fixed_yn=='Y'}">
                      <td>{{item.bbs_seq}}</td>
                      <td class="text-left"><router-link :to="{ name: 'bbsContentDetail', params: { bbsID: item.bbs_id , seq: item.bbs_seq }}">
                        <span v-show="item.bbs_level>0"  v-bind:style="{paddingLeft:(item.bbs_level*10)+'px'}">&#8627;</span>
                     {{item.bbs_cont_title}}</router-link></td>
                      <!-- <td >{{item.category_title}}</td> -->
                      <td><i class="ion-document-text tx-24" v-show="item.file_grp_id!=null&&item.file_grp_id!=''"></i></td>
                      <td>{{item.create_user_name}}</td>
                      <td>{{item.create_date}}</td>
                      <td>{{item.use_yn}}</td>
                      <td><div class="btn-group-xs"><button type="button" v-on:click="fnDeleteContent(item)" class="btn btn-outline-danger"> 삭제</button></div></td>
                    </tr>
                  </tbody>                  
                </table> 

                <pager v-bind:pass="bbsContentViewModel.pager"></pager> 
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
        bbsContentViewModel: {
          listBBS: [],
          listContents: [],
          bbsId:null,
          searchTitle:'',
          searchContent:'',
          pager: {
            model: {},
            pageNo: 1,
            totalSize: 0,
            rowSize: 10,
            blockSize: 5,
            list: [],
            callBack: function (n) {
              this.model.fnListContent(null);
            }
          }
        }        
      }
    }
    , created: function () {
      // console.log("created");
    }
    , mounted: function () {
        console.log(this.$route.params.bbsID);
        if(this.$route.params.bbsID!=undefined){
          this.bbsContentViewModel.bbsId=this.$route.params.bbsID;
        }
        console.log("mounted");
      try {
        this.fnGetList();
      } catch (e) {
        console.log(e);
      }
    }
    , methods: {
      fnGetList: function(){
        let vm = this;
        Axios.post("/api/system/admin/board/list", {})
        .then(function(response) {
          let rs = response.data;
          vm.bbsContentViewModel.listBBS = rs.listMaster;
          if(vm.bbsContentViewModel.bbsId===null){
            vm.bbsContentViewModel.bbsId=  vm.bbsContentViewModel.listBBS[0].bbs_id;
          }
          vm.fnListContent();
        }).catch(function(ex) {
            console.log(ex);
        });
      }
      ,fnListContent: function(paramBBS){        
        let vm = this;
        if(paramBBS==null)
          paramBBS = vm.bbsContentViewModel.bbsId;
        Axios.post("/api/system/admin/board/content/list", {id:paramBBS,pageNo:vm.bbsContentViewModel.pager.pageNo, pageSize:vm.bbsContentViewModel.pager.rowSize,searchTitle:vm.bbsContentViewModel.searchTitle,searchContent:vm.bbsContentViewModel.searchContent})
        .then(function(response) {
          let rs = response.data;
          vm.bbsContentViewModel.listContents = rs.listContent==null?[]:rs.listContent;
          for(var i=0;i<vm.bbsContentViewModel.listContents.length;i++){
            vm.bbsContentViewModel.listContents[i].create_date = Common.fnConvertDateStr(vm.bbsContentViewModel.listContents[i].create_date,'-');
          }
          vm.bbsContentViewModel.pager.totalSize = rs.totalCount;
          vm.bbsContentViewModel.pageNum = (vm.bbsContentViewModel.pager.pageNo * vm.bbsContentViewModel.pager.rowSize) - vm.bbsContentViewModel.pager.rowSize;
          CompPager.props = CompPager.methods.createPaging(vm.bbsContentViewModel.pager, vm, "list");
        }).catch(function(ex) {
            console.log(ex);
        });
      }
      ,fnChangeBBS:function(){
        let vm = this;
        vm.bbsContentViewModel.pager.pageNo=1;
        vm.fnListContent(vm.bbsContentViewModel.bbsId);
      }

      ,fnDeleteContent:function(paramItem){
        let vm = this;
        Axios.post("/api/system/admin/board/content/delete",{id:paramItem.bbs_id,paramSeq:paramItem.bbs_seq})
        .then(function(response) {
          swal("삭제되었습니다.");
          vm.fnListContent(paramItem.bbs_id);
        });
      }
    }
  }
</script>

