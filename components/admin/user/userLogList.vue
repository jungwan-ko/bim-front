<template>
  <div>
    <div class="xp-breadcrumbbar text-center">
      <h4 class="page-title">접속현황</h4>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Noaa Admin</a></li>
        <li class="breadcrumb-item active" aria-current="page">사용자</li>
      </ol>
    </div>
    <div class="xp-contentbar">
      <div class="row"> 
        <div class="col-lg-12">
          <div class="card m-b-10">
            <div class="card-header bg-white">
              <ul class="list-inline mb-0">
                <li class="list-inline-item"><h5 class="mt-2 mb-0 text-black">사용자 별 접속현황</h5></li>
              </ul>
            </div>
            <div class="card-body">
              <form>
                <div class="form-row">
                  <div class="form-group col-md-2">
                    <input type="text" class="form-control" id="inputCity1" placeholder="사용자 ID" v-model="viewModel.userId">
                  </div>
                  <div class="form-group col-md-2">
                    <input type="text" class="form-control" id="inputCity2" placeholder="사용자 이름" v-model="viewModel.userName">
                  </div>
                  <div class="form-group col-md-2">
                    <div class="input-group">
                      <input type="text" id="xp-range-date-s" class="datepicker-here form-control" placeholder="시작일자" aria-describedby="basic-addon1" v-model="viewModel.dateS"/>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon1"><i class="mdi mdi-calendar"></i></span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-2">
                    <div class="input-group">
                      <input type="text" id="xp-range-date-e" class="datepicker-here form-control" placeholder="종료일자" aria-describedby="basic-addon2" v-model="viewModel.dateE"/>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"><i class="mdi mdi-calendar"></i></span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-2">
                    <a href="#" class="btn btn-info" v-on:click="fnOnSearchClick()" style="padding-top: 7px;padding-bottom: 7px;"><i class="fa fa-search mr-2"></i> 조회</a>
                  </div>
                  <div class="form-group col-md-2">
                  </div>
                </div>
              </form>
              <div class="table-responsive m-b-10">
                <table class="table">
                  <thead class="thead-dark">
                    <tr class="headings">
                      <th class="column-title">ID</th>
                      <th class="column-title">이름</th>
                      <th class="column-title">최종접속일</th>
                      <th class="column-title">접속횟수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for= "item in viewModel.logList" :key="item.user_id">
                      <td>{{item.user_id}}</td>
                      <td><router-link :to="{ name: 'userLogDetail', params: { userID: item.user_id, dateS: viewModel.dateS, dateE: viewModel.dateE}}" class="btn btn-link"> {{item.create_user_name}}</router-link></td>                      
                      <td>{{item.update_date}}</td>
                      <td>{{item.hit_count}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <pager v-bind:pass="viewModel.pager"></pager>
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
        viewModel: {
          totalCount: 0,
          logList: [],
          userId: "",
          dateS: "",
          dateE: "",
          userName: "",
          conn_cnt_tot: 0,
          avg_use_time: 0,

          pager: {
            model: {},
            pageNo: 1,
            totalSize: 0,
            rowSize: 10,
            blockSize: 5,
            list: [],
            callBack: function (n) {
              this.model.fnListLog();
             }
          }
        }
      }
    }
    , created: function () {
      // console.log("created");
    }
    , mounted: function () {
      console.log("mounted");
      try {

        $('#xp-range-date-s').datepicker({
          language: 'kr',
          dateFormat: 'yyyy-mm-dd',
          range: false,
          multipleDatesSeparator: ' - '
        });
        $('#xp-range-date-e').datepicker({
          language: 'kr',
          dateFormat: 'yyyy-mm-dd',
          range: false,
          multipleDatesSeparator: ' - '
        });
        this.fnListLog();
      } catch (e) {
        console.log(e);
      }
    }
    , methods: {
      fnListLog: function(paramID,paramPage,paramName,paramStartDate,paramEndDate) {
        let vm = this.viewModel;
        paramPage=paramPage==null ? vm.pager.pageNo : paramPage;          
        Axios.post("/api/account/log/list", {id:paramID,pageNo:paramPage,pageSize:vm.pager.rowSize,paramStartDate: paramStartDate,paramEndDate: paramEndDate,paramUserName : paramName})
        .then(function(response) {          
          let rs = response.data;
          let result;
          for(var i=0;i<rs.listLoginLog.length;i++){
            rs.listLoginLog[i].update_date = Common.fnConvertDateStr(rs.listLoginLog[i].update_date,'-');
          }
          vm.logList = rs.listLoginLog;
          if(paramStartDate == undefined || paramStartDate == null ){
            vm.dateS = Common.fnPrintDateByNum(rs.paramStartDate);
          }
          if(paramEndDate == undefined || paramEndDate == null ){
            vm.dateE = Common.fnPrintDateByNum(rs.paramEndDate);
          }
          vm.pager.totalSize = rs.totalCount;
          vm.pageNum = (vm.pager.pageNo * vm.pager.rowSize) - vm.pager.rowSize;
          CompPager.props = CompPager.methods.createPaging(vm.pager, this, "list");
        });
      }
      ,fnOnSearchClick: function(){
        let vm = this.viewModel;
        vm.dateS = $("#xp-range-date-s").val();
        vm.dateE = $("#xp-range-date-e").val();
        if(vm.userId == '') vm.userId = null;
        if(vm.userName == '') vm.userName = null;
        if(vm.dateS == '') vm.dateS = null;
        if(vm.dateE == '') vm.dateE = null;
        if(vm.dateS !=null && vm.dateE !=null && (Common.fnConvertStrDate(vm.dateE,'-') - Common.fnConvertStrDate(vm.dateS,'-')<0)){
          swal("종료일자가 시작일자보다 작습니다.");
          return false;
        }else{
          this.fnListLog(vm.userId,1,vm.userName,vm.dateS,vm.dateE);
        }
      }
    }
  }
</script>

