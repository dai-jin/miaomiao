<template>
  <div>
     <el-table
            :data="tableNowData"
            border
            style="width: 100%">
            <el-table-column
                label="头像">
                <template slot-scope="scope" >
                    <img class="userHead" :src="scope.row.userHead" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="date"
                label="日期">
            </el-table-column>
            <el-table-column
                prop="username"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope" >
                <el-button  type="default" @click="handleToFreeze(scope.$index,scope.row)" size="small">{{ scope.row.isFreeze ? '已冻结' :'未冻结' }}</el-button>
                <el-button  type="danger" size="small" @click="handleToRemove(scope.$index,scope.row)"> 移除</el-button>
                </template>
            </el-table-column>
     </el-table>
     <el-pagination class="page"
        background
        layout="prev, pager, next"
        :page-size="pagesize"
        :current-page.sync="currentPage"
        :total="tableData.length">
        </el-pagination>
  </div>
</template>

<script>
export default {
  name : 'user',
  data () {
      return{
        tableData : [],
        pagesize : 4,
        currentPage : 1
      }
  },
  mounted(){
      this.axios('/api2/admin/user').then((res)=>{
          let status = res.data.status
          if(status == 0){
              this.tableData = res.data.data.userList
          }
      })
  },
  computed :{
      tableNowData(){
          return this.tableData.slice((this.currentPage - 1)*this.pagesize,this.currentPage*this.pagesize)
      }
  },
  methods : {
      handleToFreeze(index,row){
            this.axios.post('/api2/admin/freeze',{
                email : row.email,
                isFreeze : !row.isFreeze
            }).then((res)=> {
                let status = res.data.status
                if(status == 0){
                      this.$alert(`${row.isFreeze} ? '未冻结成功': '冻结成功'`, '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.tableData[index].isFreeze = !row.isFreeze
                          }
                        });
                }
            })
      },
      handleToRemove(index,row){
          this.axios.post('/api2/admin/deleteUser',{
              email : row.email
          }).then(res => {
              let status = res.data.status
              if(status == 0){
                    this.$alert('删除信息', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.tableData.splice(index,1)
                          }
                        });
              }
          })
      }
  }
}

</script>
<style  scoped>
.page{
    margin : 20px auto;
}
.userHead{width: 50px; height: 50px; border-radius: 50%; overflow: hidden;}
</style>