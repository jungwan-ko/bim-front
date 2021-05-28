<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" v-if="pass.startBlock>1" v-on:click="onClickPagerNo(pass.startBlock-1)"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>
      <li class="page-item" v-on:click="onClickPagerNo(item)" v-bind:class="{'active':item==pass.pageNo}" v-for="item in pass.list" v-bind:key="item"><a class="page-link" href="#">{{item}}</a></li>
      <li class="page-item" v-on:click="onClickPagerNo(pass.nextBlock)"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>
    </ul>
  </nav>
</template>
<script>
  export default{
    props:['pass']
    ,methods:{
      onClickPagerNo:function(n){
        this.pass.pageNo=n==0?1:n;
        this.pass.callBack(n);
      }
      ,createPaging:function(pager,vm,cbType){
        pager.callBackType=cbType;
        let _list=[];
        let _endPagerNo=parseInt((pager.totalSize-1)/pager.rowSize)+1;

        let _startBlock=parseInt((pager.pageNo-1)/pager.blockSize)*pager.blockSize+1;
        let index=0;
        let _endBlock=0;
        let _nextBlock=0;

        for(let i=_startBlock;i<=_endPagerNo;i++){
          if(index<pager.blockSize){
            _list.push(i);
            _endBlock=i;
            if(i<_endPagerNo){
              _nextBlock=i+1;
            }else{
              _nextBlock=0;
            }
            index++;
          }else{
            break; 
          }
        }//end for
        pager.list=_list;
        pager.model=vm;
        pager.startBlock=_startBlock;
        pager.nextBlock=_nextBlock;
        return pager;
      }
    }
  }
</script>
