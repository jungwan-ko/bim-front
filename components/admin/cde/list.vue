<template>
  <div>
    <div class="row no-gutters widget-2 shadow-base mg-b-30" v-show = "isShowCreateForm"> 
        <div class="col-lg-12">
          <div class="card ">
            <div class="card-header bd-b-color-gray-lighter">
              <h6 class="card-title">
                <i class="ion-ios-paper-outline tx-18 va-m tx-24 va-m"></i> 프로젝트 생성
              </h6>
            </div>
            <div class="card-body">
              <form name="mainForm" id="mainForm" >
                <div class="form-group row">
                  <label for="bbsId" class="col-sm-2 col-form-label">프로젝트 아이디</label>
                  <div class="col-sm-8">
                    <input type="text" maxlength="8" v-model="projectInfo.prj_id" class="form-control  form-control-sm form-input"  placeholder="고유한 아이디(8자리)를 입력해주세요."  >
                  </div>
                   <div class="col-sm-2">
                     <div class="btn-group-xs">
                     <button type="button" class="btn btn-outline-secondary" v-on:click="onClickCheckId"><i class="ion-card tx-16 tx-primary va-m"></i> 아이디 중복확인</button>
                     </div>
                   </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">프로젝트 이름</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="projectInfo.prj_title" class="form-control form-control-sm form-input"  placeholder="프로젝트 제목을 입력해주세요.">
                  </div>
                </div>
                
                <div class="form-group row">
                  <label for="readRole" class="col-sm-2 col-form-label">
                    진행 구분
                  </label>
                  <div class="col-sm-10">
                    <div class="row">
                      <div class="col-form-label col-sm-1 pt-0  btn-group-xs"><button type="button" v-on:click="onClickAddCategory()" class="btn btn-outline-success" id="btnCategoryAdd">추가</button></div>
                      <div class="col-sm-11" id="categoryLayer">
                        <div class="row" v-for="(item,index) in listInputCategories" :key="item.category_seq">
                          <div class="form-group col-sm-10">
                            <input type="text" class="form-control form-control-sm form-input" v-model="item.category_title">
                          </div>
                          <div class="form-group col-sm-2 btn-group-xs">
                            <button type="button" class="btn btn-outline-danger" v-on:click="onClickDeleteCategory(index)" id="btnCategoryDel">삭제</button>
                          </div>

                        </div>                        
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">소속기관</label>
                  <div class="col-sm-10">
                    <select v-model="projectInfo.org_code">
                        <option value="">소속기관 선택</option>
                        <option v-for="item in listSysCode['BIM_ORG']"
                        v-bind:key="item.sys_code" 
                        v-bind:value="item.sys_code"
                        >{{item.sys_title}}</option>
                    </select>
                    
                  </div>
                </div>

               <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">사업개요</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="projectInfo.prj_commt" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                </div>

                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">사업비</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="projectInfo.prj_exp" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                </div>

                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">프로젝트 기간</label>
                  <div class="col-sm-5">
                    <input type="text" v-model="projectInfo.start_date" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                  <div class="col-sm-5">
                    <input type="text" v-model="projectInfo.end_date" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">등록신청 사유</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="projectInfo.req_commt" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">시설물명</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="projectInfo.build_title" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">항명</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="projectInfo.port_title" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">세부항명</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="projectInfo.port_detail_title" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">시설구분</label>
                  <div class="col-sm-10">
                     <select v-model="projectInfo.build_code">
                        <option value="">시설구분 선택</option>
                        <option v-for="item in listSysCode['BIM_BULD']"  v-bind:key="item.sys_code" v-bind:value="item.sys_code">{{item.sys_title}}</option>
                    </select>
                  </div>
                </div>
                
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">관리구분</label>
                  <div class="col-sm-10">
                    <select v-model="projectInfo.mng_code">
                        <option value="">관리구분 선택</option>
                        <option v-for="item in listSysCode['BIM_MNG']"  v-bind:key="item.sys_code" v-bind:value="item.sys_code">{{item.sys_title}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">관리기관</label>
                  <div class="col-sm-10">
                   <select v-model="projectInfo.mng_org_code">
                        <option value="">관리기관 선택</option>
                        <option v-for="item in listSysCode['BIM_MORG']"  v-bind:key="item.sys_code" v-bind:value="item.sys_code">{{item.sys_title}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">준공일</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="projectInfo.setup_date" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">개방여부</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="projectInfo.open_yn" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">해역</label>
                  <div class="col-sm-10">
                     <select v-model="projectInfo.sea_code">
                        <option value="">해역 선택</option>
                        <option v-for="item in listSysCode['BIM_SEA']"  v-bind:key="item.sys_code" v-bind:value="item.sys_code">{{item.sys_title}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">구조형식</label>
                  <div class="col-sm-10">
                   <select v-model="projectInfo.build_type_code">
                        <option value="">구조형식 선택</option>
                        <option v-for="item in listSysCode['BIM_TBLD']"  v-bind:key="item.sys_code" v-bind:value="item.sys_code">{{item.sys_title}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">기타상세제원</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="projectInfo.etc_mnt" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">관리자의견</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="projectInfo.admin_commt" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="bbsTitle" class="col-sm-2 col-form-label">주소</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="projectInfo.addr" class="form-control form-control-sm form-input"  placeholder="">
                  </div>
                </div>
              </form>  
            </div>
            <div class="card-footer bg-white">
              <div class="form-group row">
                <div class="col-sm-10 btn-group-sm">
                  <button type="button" class="btn btn-primary" v-on:click="onClickBtnSave" >생성</button>
                  <button type="button" class="btn btn-primary" >수정</button>
                  <button type="button" class="btn btn-warning" v-on:click="isShowCreateForm=false">취소</button>
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
              <i class="ion-ios-filing-outline tx-24 va-m"></i> 프로젝트 진행현황 조회
            </h6>
          </div>
          <div class="card-body">
            <div class="row tx-center">
              <div class="col-lg-12">
                <div class="table-wrap">
                    <div class="table-wrap-header pd-3 w-m-1">
                           <div class="d-flex">
                                <div>
                                    <select class="form-control form-control-sm">
                                      <option>프로젝트 선택</option>
                                      <option v-for="item in listProject" v-bind:key="item.prj_id">{{item.prj_title}}</option>
                                    </select> 
                                </div>
                                <div class="mr-auto">
                                    <select class="form-control form-control-sm">
                                        <option>전체</option>
                                        <option v-for="item  in listCategories" v-bind:key="item.category_seq">{{item.category_title}}</option>
                                    </select>
                                </div>
                                <div class="btn-group-xs">
                                   <button type="button" class="btn btn-primary" v-on:click="onClickBtnShowCreateForm"><i class="ion-ios-plus text-minus tx-14"></i> 신규 프로젝트 등록</button>
                                </div>
                            </div>
                    </div>
                        <table class="table table-bordered table-mid tx-13 tx-gray-700 bd" >
                        <thead>
                            <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                            <th class="wd-10p tx-center">진행상태</th>
                            <th class="wd-10p tx-center">등록자</th>
                            <th class="wd-10p tx-center">등록일</th>
                            <th class="wd-10p tx-center">결재자</th>
                            <th class="wd-10p tx-center">승인/반려일</th>
                            <th class="wd-10p tx-center">승인여부</th>
                            <th class="wd-30p tx-center">의견</th>
                            <th class="wd-10p tx-center">관리자결제</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-if="listProject.length==0"><td colspan="8" class="text-danger"> 진행중인 프로젝트가 없습니다.</td></tr>
                        </tbody>
                        </table> 

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
import Axios from 'axios'
export default {
    data:function(){
      return {
        projectInfo:{
           
        },
        //projects
        listProject:[],
        //진행구분
        listCategories:[],
        //kanvan contents
        listProjectItems:[],
        //사용자 입력 진행구분
        listInputCategories:[],
        listSysCode:[],
        isShowCreateForm:false,
        isCheckId:false
      }
    }
    ,mounted:function(){
      this.listInputCategories.push({category_seq:0,category_title:'WIP'});
      this.listInputCategories.push({category_seq:1,category_title:'Shared'});
      this.listInputCategories.push({category_seq:2,category_title:'Published'});
      this.listInputCategories.push({category_seq:3,category_title:'Archive'});
      this.initInfo();
      this.getProjectList();
      this.getSysCodeList();
    }
    ,methods:{
      onClickBtnSave:function(){
        this.create();
      },
      onClickCheckId:function(){
        this.checkDuplicatedId();
      }
      ,onClickBtnShowCreateForm:function(){
        this.isShowCreateForm=true;
      }
      ,onClickAddCategory:function(){
        let _categorySeq=0;
        if(this.listInputCategories.length>=4){
          return false;
        }
        if(this.listInputCategories.length===0){
          _categorySeq=1;
        }else{
          _categorySeq=this.listInputCategories[this.listInputCategories.length-1].category_seq+1;
        }
        this.listInputCategories.push({category_seq:_categorySeq,category_title:''});
      }
      ,onClickDeleteCategory:function(n){
        this.listInputCategories.splice(n,1);

      }
      ,initInfo:function(){
        this.projectInfo={
            prj_id:''
            ,prj_title:''
            ,org_code:''
            ,prj_commt:''
            ,prj_exp:''
            ,start_date:''
            ,end_date:''
            ,req_commt:''
            ,build_title:''
            ,port_title:''
            ,port_detail_title:''
            ,build_code:''
            ,mng_code:''
            ,mng_org_code:''
            ,setup_date:''
            ,open_yn:''
            ,sea_code:''
            ,build_type_code:''
            ,etc_mnt:''
            ,admin_commt:''
            ,addr:''
        };
      }
      //아이디 중복체크
       ,checkDuplicatedId:function(){
          let obj=this;
          if(obj.projectInfo.prj_id.isEmpty()) return false;
          if(obj.projectInfo.prj_id.length!=8){
            swal('입력오류','프로젝트 아이디는 8글자 입니다.','warning');
            return false;
          }
          let url=`/api/project/check/id/${this.projectInfo.prj_id}`;
           Axios.get(url).then(function(response){
            if(response.data.resultCount===0){
              obj.isCheckId=true;
              swal("사용 가능한 아이디 입니다.");
            }else{
              obj.isCheckId=false;
              swal("이미 사용중인 아이디 입니다.");
            }
          })
          .catch(function(ex){
            console.log(ex);
          });
       }
       //프로젝트 목록
       ,getProjectList:function(){
         let obj=this;
         Axios.get("/api/project/list").then(function(response){
           obj.listProject=response.data.listProjects;
         })
         .catch(function(ex){
           console.log(ex);
         });
       }
       //시스템코드 목록
       ,getSysCodeList:function(){
         let obj=this;
         let grpCodes=["BIM_ORG","BIM_BULD","BIM_MNG","BIM_MORG","BIM_SEA","BIM_TBLD"];
         Axios.get("/api/code/sys/list",
         {  params:{paramCodeGrp:grpCodes.join(",")}}
            ).then(function(response){
            grpCodes.forEach(grp => {
                let temp=[];
                response.data.listCodeSys.forEach(element => {
                  if(grp===element.grp_code){
                    temp.push(element);
                  }
               });
               obj.listSysCode[grp]=temp;
            });
            
         })
         .catch(function(ex){
           console.log(ex);
         });
       },
       //생성
       create:function(){
          let obj=this;
           Axios.post("/api/project/create"
           ,{
             detailProject:this.projectInfo,
             listProjectCategory:this.listInputCategories
             }
          ).then(function(response){
            if(response.data.resultCount>0){
                 swal("저장 했습니다.");
                 obj.isShowCreateForm=false;
                 obj.listProject=response.data.listProjects;
            }
         })
         .catch(function(ex){
           console.log(ex);
         });
       }
    }
}
</script>