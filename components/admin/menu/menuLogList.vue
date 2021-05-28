<template>
  <div>
    <div class="xp-breadcrumbbar text-center">
      <h4 class="page-title">메뉴별 접속현황</h4>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Noaa Admin</a></li>
        <li class="breadcrumb-item active" aria-current="page">메뉴관리</li>
      </ol>
    </div>
    <div class="xp-contentbar">
      <div class="row"> 
        <div class="col-lg-12">
          <div class="card m-b-10">
            <div class="card-header bg-white">
              <ul class="list-inline mb-0">
                <li class="list-inline-item"><h5 class="mt-2 mb-0 text-black">메뉴별 접속현황</h5></li>
              </ul>
            </div>
            <div class="card-body">
             
              <div class="table-responsive m-b-10">
                <table class="table">
                  <thead class="thead-dark">
                    <tr class="headings">
                      <th class="column-title">메뉴ID</th>
                      <th class="column-title">메뉴명</th>
                      <th class="column-title">최종접속일</th>
                      <th class="column-title">접속횟수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for= "item in viewModel.menuLogList" :key="item.menu_id">
                      <td>{{item.menu_id}}</td>
                      <td>{{item.menu_title}}</td>
                      <td>{{item.conn_day}}</td>
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
        this.fnListLog();
      } catch (e) {
        console.log(e);
      }
    }
    , methods: {
        fnListLog: function(paramID,paramPage,paramName,paramStartDate,paramEndDate) {
        let vm = this.viewModel;
          paramPage=paramPage==null ? vm.pager.pageNo : paramPage;
          
          Axios.post("/api/account/log/list", {id:paramID,pageNo:paramPage,pageSize:vm.pager.rowSize,paramStartDate: paramStartDate,paramEndDate: paramEndDate,paramUserName : paramName}).
          then(function(response) {
          
            let rs = response.data;
            let result;

            for(var i=0;i<rs.listLoginLog.length;i++){
              rs.listLoginLog[i].update_date = Common.fnConvertDateStr(rs.listLoginLog[i].update_date,'-');
            }
            vm.logList = rs.listLoginLog;
            if(paramStartDate == undefined || paramStartDate == null ){
              vm.dateS = fnPrintDateByNum(rs.paramStartDate);
            }
            if(paramEndDate == undefined || paramEndDate == null ){
              vm.dateE = fnPrintDateByNum(rs.paramEndDate);
            }
        });
      }





    }
  }
</script>

