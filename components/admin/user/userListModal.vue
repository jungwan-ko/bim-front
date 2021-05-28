<template>
    <div  id="modal-userlist" class="modal fade">

         <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
              <div class="modal-content bd-0 tx-14">
                <div class="modal-header pd-x-20">
                  <h6 class="tx-14 mg-b-0 tx-uppercase tx-inverse tx-bold">사용자 목록</h6>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body pd-20">
                    <div class="table-wrap">
                        <div class="table-wrap-header pd-t-3">
                            <div class="d-flex">
                                <div class="mr-auto">
                                    <select class="form-control form-control-sm">
                                        <option value="ACC_0000">프로젝트</option>
                                    </select>
                                </div>
                                <div class="btn-group-xs">
                                   <button type="button" class="btn btn-outline-secondary" v-on:click="onSelectedUsers"><i class="ion-ios-plus text-minus tx-14"></i> 선택 완료</button>
                                </div>

                            </div>
                            
                        </div>
                        <table class="table table-bordered table-mid tx-13 tx-gray-700 mg-b-0 bd">
                            <thead>
                                <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                                    <th class="wd-5p tx-center">선택</th>
                                    <th class="wd-40p tx-center">아이디</th>
                                    <th class="wd-40p tx-center">이메일</th>
                                    <th class="wd-15p tx-center">이름</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in list" v-bind:key="item.user_id">
                                    <td><input type="checkbox"  v-bind:disabled="item.isReadOnly"  v-model="item.checked"></td>
                                    <td>{{item.user_id}}</td>
                                    <td>{{item.user_email}}</td>
                                    <td>{{item.user_name}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
              </div>
         </div>
    </div>
</template>
<script>
export default {
    props:['pass'],
    data:function(){
        return {
            list:[]
        }
    },
    mounted:function(){
        this.getUserList();
    },
    methods:{
        showUserList:function(oldUsers){
            if(oldUsers != null){

            
            for(let i=0;i<this.list.length;i++){
                let item=this.list[i];
                let _index=oldUsers.findIndex(x=>x.user_id===item.user_id);
                if(_index>=0) item.isReadOnly=true;
            }
            }
            $("#modal-userlist").modal('show');
        },
        onSelectedUsers:function(){
            this.pass.selectedUser=[];
        
            this.list.forEach(element => {
                if(element.checked){
                     this.pass.selectedUser.push(element);
                }
            });
            if(this.pass.callback!=undefined){
                this.pass.callback(this.pass);
            }
            //this.pass.selectedUser=['홍길동1','홍길동2'].join(',');
            $("#modal-userlist").modal('hide');
        }
        ,getUserList:function(){
            let obj=this;
            this.Axios.get("/api/user/list").then(function(response){
                if(response.data.list!=null){
                    response.data.list.forEach(element => {
                        element.isReadOnly=false;
                    });
                    obj.list=response.data.list;
                }
            })
            .catch(function(error){
                console.log(error);
            });
        }
        
    }

}
</script>
