<template>
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
                    <div class="table-wrap-header pd-3">
                           <div class="d-flex">
                                <div>
                                    <select class="form-control form-control-sm">
                                        <option value="ACC_0000">프로젝트 선택</option>
                                    </select>
                                </div>
                                <div class="mr-auto">
                                    <select class="form-control form-control-sm">
                                        <option value="ACC_0000">진행단계 선택</option>
                                    </select>
                                </div>
                                <div class="btn-group-xs">
                                   <button type="button" class="btn btn-primary" ><i class="ion-ios-plus text-minus tx-14"></i> 등록</button>
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
export default {
    
}
</script>