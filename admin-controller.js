import 'babel-polyfill';  
import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from './components/admin/dashboard.vue';
import CodeList from './components/admin/code/codeList.vue';
import UserList from './components/admin/user/userList.vue';
import UserLogList from './components/admin/user/userLogList.vue';
import UserLogDetail from './components/admin/user/userLogDetail.vue';
import BbsList from './components/admin/board/bbsList.vue';
import BbsContentList from './components/admin/board/bbsContentList.vue';
import BbsContentWrite from './components/admin/board/bbsContentWrite.vue';
import BbsContentUpdate from './components/admin/board/bbsContentUpdate.vue';
import BbsContentDetail from './components/admin/board/bbsContentDetail.vue';
import BbsContentReply from './components/admin/board/bbsContentReply.vue';
import MenuList from './components/admin/menu/menuList.vue';
import MenuRoleMng from './components/admin/menu/menuRoleMng.vue';
import MenuLogList from './components/admin/menu/menuLogList.vue';
import CdeList from './components/admin/cde/list.vue';
import CdeCreate from './components/admin/cde/create.vue';
import ProjectList from './components/admin/project/list.vue';
import ProjectCde from './components/admin/project/cde.vue';
import ProjectFiles from './components/admin/project/files.vue';
import ProjectHisFilesModal from './components/admin/project/fileHistoryModal.vue';
import ProjectUsers from './components/admin/project/users.vue';
import OrgTree from './components/admin/category/orgTree.vue';
import OrgTreeList from './components/admin/category/orgTreeList.vue';
import CompPager from './components/common/paging.vue';
import MessagesView from './components/common/messages.vue';
import UserListModal from './components/admin/user/userListModal.vue';
import StringPrototype from './components/common/string-prototypes.js'
import Axios from "axios";
import Common from './components/common/common.js';
import DatePicker from 'vuejs-datepicker'
import {ko} from "vuejs-datepicker/dist/locale"
Vue.use(VueRouter);
Vue.component('pager', CompPager);
Vue.component('userList', UserListModal);
Vue.component('datepicker', DatePicker);
Vue.component('fileHistory', ProjectHisFilesModal);
Vue.prototype.Common=Common;
Vue.prototype.Axios=Axios;
Vue.prototype.UserInfo={loginUserID:''};
DatePicker.props.language.default=()=>ko;

// 요청 인터셉터 추가
Axios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    
    config.headers.Authorization = localStorage.getItem("jtocken");
    config.url=domain+config.url;
    console.log(config);
    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    
    console.log(error);
    return Promise.reject(error);
  });

// 응답 인터셉터 추가
Axios.interceptors.response.use(
  function (response) {
      console.log(response);
      if(response.data.commonParams!=undefined &&Vue.prototype.UserInfo.loginUserID===''){
        Vue.prototype.UserInfo=response.data.commonParams;
      }
      let _data=response.data;
      console.log(_data.errorCode);
      if(_data.errorCode!=undefined && _data.errorCode===9201){
        window.location='/www/bim-front/views/login.html';
        return false;
      }
    // 응답 데이터를 가공
    // ...
    return response;
  },
  function (error) {

      console.log(error);
     // window.location='/src/bim-front/views/error.html';
    // 오류 응답을 처리
    // ...
    return Promise.reject(error);
  });

const routes = [    
    { path: '/', component: Dashboard, name: 'dashboard' },
    { path: '/manage/code', component: CodeList, name: 'codeList' },
    { path: '/manage/user', component: UserList, name: 'userList' },
    { path: '/userLogDetail/:userID/:dateS/:dateE', component: UserLogDetail, name: 'userLogDetail' },
    { path: '/userLogList', component: UserLogList, name: 'userLogList' },
    { path: '/manage/board', component: BbsList, name: 'bbsList' },
    { path: '/manage/bbsContents/:bbsID?', component: BbsContentList, name: 'bbsContentList' },
    { path: '/manage/board/contentWrite/:bbsID?', component: BbsContentWrite, name: 'bbsContentWrite' },
    { path: '/manage/org/tree', component: OrgTree, name: 'orgTree' },
    { path: '/manage/cde/list', component: CdeList, name: 'cdeList' },
    { path: '/manage/cde/create', component: CdeCreate, name: 'cdeCreate' },
    { path: '/manage/project/users', component:ProjectUsers, name: 'projectUsers' },
    { path: '/bbsContentUpdate/:bbsID/:seq', component: BbsContentUpdate, name: 'bbsContentUpdate' },
    { path: '/bbsContentDetail/:bbsID/:seq', component: BbsContentDetail, name: 'bbsContentDetail' },
    { path: '/bbsContentReply/:bbsID/:seq', component: BbsContentReply, name: 'bbsContentReply'},
    { path: '/manage/menu', component: MenuList, name: 'menuList' },
    { path: '/manage/menuRole', component: MenuRoleMng, name: 'menuRoleMng' },
    { path: '/menuLogList', component: MenuLogList, name: 'menuLogList' },
    { path: '/message/list', component: MessagesView, name: 'messagesView' },
    
  //  { path: '/test/kim', component: TestKim, name: 'testKim' }
];

const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')
