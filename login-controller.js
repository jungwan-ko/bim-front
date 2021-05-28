import 'es6-promise/auto'
import Vue from 'vue'
import Axios from 'axios'

new Vue({
    el: '#scope-login',
    data: function() {
        return {
            detailUser: {user_id:'',user_pwd:''}
            ,isAdmin:false
            ,message:null
        }
    },
    mounted: function() {
    //    pageLoad(this);
    },
    methods: {
        fnPageInit: function() {
            let vm = this;

            Axios.post("/api/system/admin/user/init/check", {})
            .then(function(response) {
                if(response.data.resultCount == 0){
                    vm.isAdmin = true;
                    swal("관리자 계정이 없습니다.\n관리자 계정을 생성하세요");
                }else{
                    vm.isAdmin = false;
                }
            }).catch(function(ex) {
                console.log(ex);
            });
        }
        ,fnOnClickBtnLogin: function() {
            let vm = this;
            let domain="";
            Axios.post(domain+"/api/system/admin/signin", {paramUserID:vm.detailUser.user_id,paramPwd:vm.detailUser.user_pwd})
            .then(function(response) {
                
                if(response.data.jwtTocken!=null){
                    localStorage.setItem("jtocken",response.data.jwtTocken);
                    window.location="/www/views/admin/index.html";
                }else{
                    vm.message="입력 정보를 확인하세요.";
                }
            }).catch(function(ex) {
                console.log(ex);
            });
            // let keyEx = $("#keyEx").val();
            // let keyM = $("#keyM").val();
            // let rsa = new RSAKey();
            // rsa.setPublic(keyM,keyEx);
            // let encID = rsa.encrypt(vm.detailUser.user_id);
            // let encPwd = rsa.encrypt(vm.detailUser.user_pwd);
            // $("#encUserID").val(encID);
            // $("#encUserPwd").val(encPwd);
            // document.forms["mainForm"].submit();
        }
        ,fnOnCreateAdmin: function(){
            let vm = this;

            if(vm.detailUser.user_id == null || vm.detailUser.user_id == ""){
                swal("사용자 아이디를 입력하세요");
                return false;
            }
            if(vm.detailUser.user_pwd == null || vm.detailUser.user_pwd == ""){
                swal("사용자 비밀번호를 입력하세요");
                return false;
            }

            Axios.post("/api/account/admin/create", {detail:vm.detailUser})
            .then(function(response) {
                vm.fnPageInit();
            }).catch(function(ex) {
                console.log(ex);
            });
        }
    }
});