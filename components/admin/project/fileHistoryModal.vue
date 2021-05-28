<template>
     <div  id="modal-fileHistory" class="modal fade">

         <div class="modal-dialog modal-lg  modal-dialog-centered" role="document">
              <div class="modal-content bd-0 tx-14">
                <div class="modal-header pd-x-20">
                  <h6 class="tx-14 mg-b-0 tx-uppercase tx-inverse tx-bold">파일 변경이력</h6>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body pd-20">
                    <div class="table-wrap">
                        <div class="table-wrap-header pd-t-3">
                            <div class="d-flex">
                                <div class="mr-auto">
                                  
                                </div>
                                <div class="btn-group-xs">
                                   <button type="button" class="btn btn-outline-secondary" > <i class="ion-ios-plus tx-14 tx-primary va-m"></i> 파일추가</button>
                                </div>

                            </div>
                            
                        </div>
                        <table class="table table-bordered table-mid tx-13 tx-gray-700 mg-b-0 bd">
                            <thead>
                                <tr class="bg-gray-100 tx-11 tx-uppercase tx-gray-800">
                                    <th class="wd-10p tx-center">번호</th>
                                    <th class="wd-40p tx-center">파일명</th>
                                    <th class="wd-10p tx-center">버전</th>
                                    <th class="wd-10p tx-center">등록자</th>
                                    <th class="wd-10p tx-center">등록(변경)일</th>
                                    <th class="wd-10p tx-center">삭제</th>
                                    <th class="wd-10p tx-center">다운로드</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listFiles" v-bind:key="item.file_seq">
                                    <td class="text-center">{{item.file_seq}}</td>
                                    <td>{{item.file_org_name}}</td>
                                    <td class="text-center">{{item.file_title}}</td>
                                    <td class="text-center">{{item.update_user_name}}</td>
                                    <td class="text-center">{{Common.fnConvertDateStr(item.create_date,"-")}}</td>
                                    <td class="text-center"><div class="btn-group-xs"><button type="button" class="btn btn-danger">삭제</button></div></td>
                                    <td class="text-center"><div class="btn-group-xs"><button type="button" class="btn btn-primary">다운로드</button></div></td>
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
import Common from '../../common/common.js'
export default {
    data:function(){
        return {
            listFiles:[]
        }
    }
    ,methods:{
        show:function(item){
            this.listFiles=[];
            this.listFiles.push(item);
            $("#modal-fileHistory").modal('show');
        }
    }
}
</script>