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
                <li class="list-inline-item"><h5 class="card-title text-black">{{viewModel.userId}}님의 접속현황</h5></li>
                <li class="list-inline-item float-right"><router-link tag="button" to='/userLogList' class="btn btn-warning">목록</router-link></li>
              </ul>
            </div>
            <div class="card-body">              
              <div class="row"> 
                <div class="col-lg-8">
                  <div class="row"> 
                    <div class="col-lg-12">
                      <canvas id="xp-chartjs-basic-line" class="xp-chartjs-chart"></canvas>
                    </div>
                    <div class="col-lg-12">
                      <div class="xp-social-profile-bottom text-center">
                        <div class="row">
                          <div class="col-4">
                            <div class="xp-social-profile-media pt-3">
                              <h5 class="text-black my-1">{{viewModel.conn_cnt_tot}}</h5>
                              <p class="mb-0 text-muted">총 접속 횟수</p>
                            </div>
                          </div>
                          <div class="col-4">
                            <div class="xp-social-profile-followers pt-3">
                              <h5 class="text-black my-1">{{viewModel.avg_use_time}}</h5>
                              <p class="mb-0 text-muted">평균 사용시간(분)</p>
                            </div>
                          </div>
                          <div class="col-4">
                            <div class="xp-social-profile-following pt-3">
                              <h5 class="text-black my-1">-</h5>
                              <p class="mb-0 text-muted">-</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>  
                </div>
                <div class="col-lg-4">
                  <form>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <div class="input-group">
                          <input type="text" id="xp-range-date-s" class="datepicker-here form-control" placeholder="시작일자" aria-describedby="basic-addon1" v-model="viewModel.dateS"/>
                          <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon1"><i class="mdi mdi-calendar"></i></span>
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-md-4">
                        <div class="input-group">
                          <input type="text" id="xp-range-date-e" class="datepicker-here form-control" placeholder="종료일자" aria-describedby="basic-addon2" v-model="viewModel.dateE"/>
                          <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2"><i class="mdi mdi-calendar"></i></span>
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-md-4">
                        <button type="button" v-on:click="fnOnSearchClick()" class="btn btn-info" style="padding-top: 7px;padding-bottom: 7px;"><i class="fa fa-search mr-2"></i> 조회</button>
                      </div>
                    </div>
                  </form>
                  <div class="table-responsive m-b-10">
                    <table class="table">
                      <thead class="thead-dark">
                        <tr class="headings">
                          <th class="column-title">최종접속일</th>
                          <th class="column-title">접속횟수</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for= "item in viewModel.logDetailList" :key="item.update_date">
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
          logDetailList: [],
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
              this.model.fnLogDetail(null,null,n);
             }
          }
        }
      }
    }
    , created: function () {
      // console.log("created");
    }
    , mounted: function () {
      console.log("mounted [userLogDetail]");
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
        this.fnLogDetailInit();
      } catch (e) {
        console.log(e);
      }
    }
    , methods: {
      fnLogDetailInit: function() {
        let vm = this.viewModel;
        vm.userId=this.$route.params.userID;
        let sDate = this.$route.params.dateS;
        let eDate = this.$route.params.dateE;
        
		    this.fnLogDetail(sDate,eDate,1);  
      }

      ,fnLogDetail: function(paramStartDate,paramEndDate,paramPage){
        let vm = this;
        paramPage=paramPage==null ? vm.viewModel.pager.currentPage : paramPage;
        paramStartDate=paramStartDate==null ? vm.viewModel.dateS : paramStartDate;
        paramEndDate=paramEndDate==null ? vm.viewModel.dateE : paramEndDate;

        Axios.post("/api/account/log/detail",{pageNo:paramPage, pageSize:vm.viewModel.pager.rowSize, paramStartDate: paramStartDate, paramEndDate: paramEndDate, paramUserID: vm.viewModel.userId})
        .then(function(response) {
          let rs = response.data;
          let result;
          for(let i=0;i<rs.listLoginLog.length;i++){
            rs.listLoginLog[i].update_date = Common.fnConvertDateStr(rs.listLoginLog[i].update_date,'-');
          }
          for(let i=0;i<rs.chartLoginLog.length;i++){
            rs.chartLoginLog[i].update_date = Common.fnConvertDateStr(rs.chartLoginLog[i].update_date,'-');
          }
          vm.viewModel.dateS = paramStartDate;
          vm.viewModel.dateE = paramEndDate;
          vm.viewModel.logDetailList = rs.listLoginLog;
          vm.viewModel.conn_cnt_tot = rs.conn_cnt_tot;
          vm.viewModel.avg_use_time = rs.avg_use_time;          

          vm.viewModel.pager.totalSize = rs.resultCount;
          vm.viewModel.pageNum = (vm.viewModel.pager.pageNo * vm.viewModel.pager.rowSize) - vm.viewModel.pager.rowSize;
          CompPager.props = CompPager.methods.createPaging(vm.viewModel.pager, vm, "list");

          let ctx = document.getElementById("xp-chartjs-basic-line").getContext("2d");
          let chartLabels=[];
          let chartData=[];
          for(let i=rs.chartLoginLog.length-1;i>=0;i--){
            chartLabels.push(rs.chartLoginLog[i].update_date);
            chartData.push(rs.chartLoginLog[i].hit_count);
          }
          let lineChart = new Chart(ctx, {
            type: 'line',
            options:{responsive:true,maintainAspectRatio : false},
            data: {
              labels: chartLabels,
              datasets: [{
                label: "접속 횟수",
                backgroundColor: "rgba(38, 185, 154, 0.31)",
                borderColor: "rgba(38, 185, 154, 0.7)",
                pointBorderColor: "rgba(38, 185, 154, 0.7)",
                pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointBorderWidth: 1,
                data: chartData
              }]
            },
          });
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
          this.fnLogDetail(vm.dateS,vm.dateE,1);
          vm.pager.pageNo=1;
        }
      }
    }
  }
</script>

