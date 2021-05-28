<template>
    <div class="row no-gutters widget-2 shadow-base">
      <div class="col-sm-12 col-lg-12">
        <div class="card">
          <div class="card-header bd-b-color-gray-lighter">
            <h6 class="card-title">
              <i class="ion-ios-paper-outline tx-18 va-m tx-24 va-m"></i> 성과품 조회
            </h6>
          </div>
          <div class="card-body">
            <div class="row tx-center">
              <div class="col-lg-12">
               <div class="mg-b-5">
               <form>
                <div class="d-flex">                  
                  <div class="pd-r-5">
                    <select name="xp-default-datatable_length" aria-controls="xp-default-datatable" v-model="projectInfo.prj_id" v-on:change="onChangePronect" class="form-control form-select-sm ">
                      <option value="">프로젝트 선택</option>
                      <option v-for = "item in listProject" :key="item.prj_id" :value="item.prj_id">{{item.prj_title}}</option>
                    </select>
                  </div>
                 <div class="btn-group-xs">
                  
                 </div>
                </div>
              </form>  
               </div> 

               <table class="table table-bordered table-mid tx-13 tx-gray-700 bd" >
                  <thead >
                   <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                      <th class="wd-10p tx-center">진행구분</th>
                      <th class="wd-25p tx-center">제목</th>
                      <!-- <th class="wd-10p tx-center">카테고리</th> -->
                      <th class="wd-10p tx-center">파일명</th>
                      <th class="wd-10p tx-center">유형</th>
                      <th class="wd-10p tx-center">신청자</th>
                      <th class="wd-10p tx-center">등록일</th>
                      <th class="wd-25p tx-center">담당자</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  v-if="listProjectItems.length===0"><td class="text-danger" colspan="7">등록된 진행현황을 찾을 수 없습니다.</td></tr>
                    <tr v-for="item in listProjectItems" :key="item.seq" >
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
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
</template>
<script>
import Axios from 'axios'
export default {
    data:function(){
        return {
            projectInfo:{
                prj_id:''
            },
            listProjectItems:[],
            listProject:[],
            listProjectCategories:[]
        }
    }
    ,mounted:function(){
        this.getListProject();
    }
    ,methods:{
        async getListProject(){
          try{
            let obj=this;
            const rsProject=await Axios.get("/api/project/list");
            this.listProject=rsProject.data.listProjects;
            this.projectInfo=this.listProject[0];
            const rsProjectCategory=await Axios.get("/api/project/detail/"+this.projectInfo.prj_id);
            this.listProjectCategories=rsProjectCategory.listProjectCategory;
            this.getListProejctItems();
          }catch(error){
            console.log(error);
          }
        },
        onChangePronect:function(){
          this.getListProejctItems();
        },
        getListProejctItems:function(){
          let url=`/api/project/${this.projectInfo.prj_id}/cde/list`;
           //Axios.get("/api/project/list")
        }
        
    }

}
</script>