<template>
    <div class="row no-gutters widget-2 shadow-base">
      <div class="col-sm-12 col-lg-12">
        <div class="card">
          <div class="card-header bd-b-color-gray-lighter">
            <h6 class="card-title">
              <i class="ion-ios-paper-outline tx-18 va-m tx-24 va-m"></i> 참여인력 조회
            </h6>
          </div>
          <div class="card-body">
            <div class="row tx-center">
              <div class="col-lg-12">
               <div class="mg-b-5">
               <form>
                <div class="d-flex">                  
                  <div class="pd-r-5 mr-auto">
                    <select v-model="selectedProjectId" v-on:change="onChangeProject" class="form-control form-select-sm ">
                      <option value="">프로젝트 선택</option>
                      <option v-for = "item in listProject" :key="item.prj_id" :value="item.prj_id">{{item.prj_title}}</option>
                    </select>
                  </div>
                 <div class="btn-group-xs">
                  <button type="button" v-on:click="onClickAddUser" class="btn btn-outline-secondary"><i class="ion-ios-plus tx-14 tx-primary va-m"></i>
                        참여인력 추가
                      </button>
                 </div>
                </div>
              </form>  
               </div> 

               <table class="table table-bordered table-mid tx-13 tx-gray-700 bd" >
                  <thead >
                   <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                      
                      <th class="wd-15p tx-center">아이디</th>
                      <th class="wd-15p tx-center">이름</th>
                      <th class="wd-20p tx-center">이메일</th>
                      <th class="wd-15p tx-center">소속</th>
                      <th class="wd-10p tx-center">등록일</th>
                      <th class="wd-10p tx-center">관리자</th>
                      <th class="wd-20p tx-center">설정</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr  v-if="listUsers.length===0"><td class="text-danger" colspan="7">참여 인력이 없습니다.</td></tr>
                    <tr v-for="item in listUsers" :key="item.user_id" >
                      <td>{{item.user_id}}</td>
                      <td>{{item.user_name}}</td>
                      <td>{{item.user_email}}</td>
                      <td>-</td>
                      <td>{{Common.fnConvertDateStr(item.create_date,'-')}}</td>
                      <td><i class="ion-android-checkmark-circle mr-2 tx-16 tx-success" v-if="item.owner_yn==='Y'"></i></td>
                      <td>
                        <div class="btn-group-xs">
                          <button type="button" class="btn btn-primary" v-on:click="onClickSetOwner(item)">관리자</button>
                          <button type="button" class="btn btn-primary" v-on:click="onClickDeleteUser(item)">참여자 삭제</button>
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
       <user-list v-bind:pass="passObj" ref="userListtModal"></user-list>
  </div>
</template>
<script> 
export default {
    data:function(){
        return {
            passObj:{
              selectedUser:[]
              ,targetComponent:this  
              ,callback:function(rs){
                if(this.selectedUser.length===0) return false;
                swal({
                      title: '프로젝트 참여자 추가',
                      text: `${this.selectedUser.length}명의 사용자를 추가합니다.`,
                      type: 'success',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: '추가',
                      cancelButtonText: '취소'
                    }).then((result) => {
                      console.log(result);
                      if (result) {
                        console.log(rs);
                        rs.targetComponent.addProjectUser(this.selectedUser);
                      }
                    }).catch((result)=>{
                      console.log(result);
                    });
              }
            },
            projectInfo:{
             
            },
            selectedProjectId:'',
            listUsers:[],
            listProject:[]
            
        }
    }
    ,mounted:function(){
        this.getListProject();
    }
    ,methods:{
        async getListProject(){
          try{
            let obj=this;
            const rsProject=await this.Axios.get("/api/project/list");
            this.listProject=rsProject.data.listProjects;
            if(this.listProject!=null){
              this.projectInfo=this.listProject[0];
              this.selectedProjectId=this.projectInfo.prj_id;
              this.getListUsers();
            }
          }catch(error){
            console.log(error);
          }
        },
        onClickAddUser:function(){
          this.$refs.userListtModal.showUserList(this.listUsers);
        },
        onClickDeleteUser:function(paramUser){
          this.deleteProjectUser(paramUser);
        }
        ,onChangeProject:function(){
          if(this.selectedProjectId==='') {
            this.listUsers=[];
            return false;
          }
          this.getListUsers();
        },
        onClickSetOwner:function(item){
              item.owner_yn=item.owner_yn==='Y'?'N':'Y';
               this.Axios.post('/api/project/user/owner/update',{detailUser:item})
               .then(function(response){
                 
               })
               .catch(function(error){
                 console.log(error);
               });
        },
        getListUsers:function(){
          let obj=this;
          let url=`/api/project/${this.selectedProjectId}/user/list`;
           this.Axios.get(url).then(function(response){
            //  response.data.listUsers.forEach(element => {
            //    element.create_date=obj.Common.fnConvertDateStr(element.create_date,'-');
            //  });
             obj.listUsers=response.data.listUsers;
           })
           .catch(function(error){
             console.log(error);
           });
        },
        addProjectUser:function(paramUsers){
          if(this.selectedProjectId==='' || paramUsers.length==0) return false;
          let targets=[];
          paramUsers.forEach(element => {
            targets.push({
              user_id:element.user_id
              ,user_email:element.user_email
              ,user_name:element.user_name
              ,prj_id:this.selectedProjectId
              });
          });
          let obj=this;
          this.Axios.post('/api/project/user/create',{listUsers:targets,id:this.selectedProjectId})
          .then(function(response){
             obj.listUsers=response.data.listUsers;
          })
          .catch(function(error){
            console.log(error);
          });
          
        }
        ,deleteProjectUser:function(paramUser){
          let obj=this;
          this.Axios.post('/api/project/user/delete'
          ,{
             detailUser:{user_id:paramUser.user_id}
            ,id:this.selectedProjectId}
          )
          .then(function(response){
            if(response.data.resultCount>0){
               obj.listUsers=response.data.listUsers;
            }
          })
          .catch(function(error){
            console.log(error);
          });
        }
        
    }

}
</script>