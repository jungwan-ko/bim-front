<template>
  <div>
    <div class="row no-gutters widget-2 shadow-base">
      <div class="col-sm-12 col-lg-12">
        <div class="card">
           <div class="card-header bd-b-color-gray-lighter">
               <h6 class="card-title"><i class="ion-ios-paper-outline tx-18 va-m"></i> 받은 메세지 보기</h6>
               
            </div>
             <div class="card-body">
                <div class="row tx-center">
                    <div class="col-lg-8">
                         <div class="card-header pd-0 mg-b-10 btn-group-xs bd-0 ">
                             <h6 class="tx-14 tx-info tx-left"><i class="ion-android-arrow-dropright-circle tx-14"></i> 메세지 목록</h6>
                         </div>
                         <!-- <button type="button" v-on:click="selectMsgList" >click</button> -->
                         <div class="table-wrap">
                          <div class="table-wrap-header pd-t-3 w-m-1">
                              <div class="btn-group-xs text-left pd-l-5"><button v-on:click="onClickDeleteMsgdata" type="button" class="btn btn-outline-secondary"><i class="ion-ios-plus text-minus tx-14"></i> 선택 삭제</button></div>
                          </div>   
                          <table class="table table-bordered table-mid tx-13 tx-gray-700 mg-b-0 bd">
                            <thead>
                            
                            <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                                <th class="wd-5p tx-center">선택</th>
                                <th class="wd-10p tx-center">등록일</th>
                                <th class="wd-10p tx-center">보낸사람</th>
                                <th class="wd-20p tx-center">프로젝트</th>
                                <th class="wd-10p tx-center">유형</th>
                                <th class="wd-45p tx-center">내용</th>
                            </tr>
                            </thead>
                            <tbody >
                              <tr v-if="msgDatas.length == 0 ">
                                <td colspan="6">{{noData}} </td>
                              </tr>
                              <tr v-for="item in msgDatas" v-bind:key="item.seq"> 
                               <td><input type="checkbox" v-bind:value="item.seq" v-on:change="getCheck($event, item)"></td>
                               <td>{{item.create_date}}</td>
                               <td>{{item.from_user_id}}</td>
                               <td>{{item.prj_id}}</td>
                               <td>{{item.app_type}}</td>
                               <td>{{item.message_content}}</td>
                              </tr> 
                             <!-- <tr>
                               <td><input type="checkbox"></td>
                               <td>2021-04-15</td>
                               <td>홍길동</td>
                               <td>항만프로젝트 1</td>
                               <td>프로젝트</td>
                               <td>메세지 내용이 보입니다. 메세지는 최대 100자  까지만 작성 할 수 있습니다.</td>
                              </tr> -->
                              
                            </tbody>
                          </table>  
                            <div class="table-wrap-bottom"></div>    
                         </div>                                 
                    </div>

                    <div class="col-lg-4">
                      <!-- 메세지 작성 -->
                         <div class="card-header pd-0 mg-b-10 btn-group-xs bd-0 ">
                             <h6 class="tx-14 tx-info tx-left"><i class="ion-android-arrow-dropright-circle tx-14"></i> 메세지 작성</h6>
                         </div>
                          <div class="form-group text-left">
                            <label class="form-control-label">받는사람: <span class="tx-danger">*</span></label>
                            <input class="form-control  form-control-sm form-input" type="text" name="firstname"  placeholder="사용자이름을 입력하세요." readonly
                             v-model="userID"     
                             v-on:click="onClickUserModal"                                        
                          />

                           <!-- v-model="userID"   -->
                         </div>
                         <div>
                             <div id="xp-summernote"></div>

                         </div>
                         <div class="btn-group-xs pd-t-10 text-right">
                             <button type="button" class="btn btn-primary" v-on:click="clickCreate()">저장</button>
                         </div>
                    </div>

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
                selectedUser:'',
                targetObj:this,
                callback(result){
                  let userIds=[];
                  result.selectedUser.forEach(element => {
                    userIds.push(element.user_id);
                  });
                 this.targetObj.userID = userIds.join(',');
                }
            },
            msgDatas : [],   
            userList:[],
            checkedList:[],
            noData:"도착한 메세지가 없습니다.",
            //메세지 작성
           userID :'',
           msgcontent:''
        }

    },
    mounted:function(){
       $("#xp-summernote").summernote({
        toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ],
        height: 150,
        minHeight: null,
        maxHeight: null,
        focus: false,
        lang: "ko-KR",
      })
      // 메세지 리스트
      this.selectMsgList();
      // 사용자 목록 - 모달
      // this.showUserList();
      
    },

    methods: { 
      selectMsgList(){
        let ob = this;
        this.Axios.get("/msgDir/messages/list")
        .then(function(response){
          ob.msgDatas=response.data.msgList;
         
        })
        .catch(function(err){
          
        });
      },
      // showUserList(){
      //   let obj = this;
      //   Axious.get("")
      //   .then(function(response) {
      //    // obj.userList = response.data; 
      //   })
      //   .catch(function(err) {
          
      //   })

      // },
       getCheck(event,paramObj){

          let isChecked=event.target.checked;
          let _index=this.checkedList.indexOf(paramObj.seq);
          if(isChecked == true &&  _index < 0 ){
            this.checkedList.push(paramObj.seq);
      
          }else{
              this.checkedList.splice(_index,1);
          }
       },

        onClickDeleteMsgdata(){
        let obj = this;
        if(this.checkedList.length == 0){
          alert("메세지를 선택해 주세요.");
          return false;
        }
        this.Axios.post("/msgDir/Message/delete",{listSeq:this.checkedList})
         .then(function(response){

            if(response.data.resultCount >0 ){      
            alert("정상적으로 삭제되었습니다.");
            obj.selectMsgList();
            
            }else{
              alert("실패");
            }
         })
         .catch(function(err){
           console.log(err);
         });
      },
      //메세지 내용 전송
      clickCreate(){
        let obj = this ;

       let contents = {
          to_user_id : this.userID.split(','),
          message_content: $("#xp-summernote").summernote("code")
         
       };
        // if(this.userID == null || this.userID ==''){
        //   alert('받는사람 이름을 입력하세요');
        //   return false;
        // }
        //Axious.post("/msgDir/Message/create1", {messageDTO:contents })
        this.Axios.post("/msgDir/Message/create", {userID:contents.to_user_id, contents:contents.message_content })
        .then(function(response){
            if(response.data.resultCount > 0){
              alert('성공');
              obj.userID='';
              $("#xp-summernote").summernote("code","") ;
              obj.selectMsgList();
            }
        })
        .catch(function(error){
        });

      },


      onClickUserModal(){
          this.$refs.userListtModal.showUserList();
      }
    }
}
</script>