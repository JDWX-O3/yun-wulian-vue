<template>
    <div class="table">
        <h2>网关配置信息:</h2>
        <el-table :data="gwConfigList" border style="width: 100%" ref="multipleTable" v-loading="loading">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="varName" label="描述" width="240"></el-table-column>
            <el-table-column prop="varValue" label="值"></el-table-column>
            <el-table-column prop="varValue" label="变量名字"></el-table-column>
            <el-table-column prop="varValue" label="变量别名"></el-table-column>
            <el-table-column prop="varValue" label="数据类型"></el-table-column>
            <el-table-column prop="varValue" label="值"></el-table-column>
            <el-table-column label="操作" width="250">
            <template slot-scope="scope">
                <el-button class="btn1" type="primary" size="small" @click="page_forward_config(scope.row.varName, scope.row.varId)">修改</el-button>
            </template>
        </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change ="handleCurrentChange"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="pageTotal">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    //import global_ from 'components/common/Global';
    let crypto = require('crypto');
    export default {
        data: function(){
            return {
                user_type:1,  //0:管理员, 1:用户
                user_account:'',
                radio3:'all',
                formLabelWidth: '120px',
                loading:false,
                fullscreenLoading: false,
                showDialogExport: false,

                system_setup_list:[{
                    "project_name":"",
                    "project_local":"",
                    "devunit_name":"",
                    "dev_cn_name":"",
                    "device_run_status":"运行",
                    "device_link_status":"正常",
                    "update_time":"" }],
                gwConfigList:[],

                pageTotal:1,
                currentPage:1,
                page_size:10,


                data_range: '',

            }
        },
        created: function(){
            //console.log('2222', this.$route.query);
            this.user_type = localStorage.getItem('user_type');  //管理员或用户
            this.user_account = localStorage.getItem('user_account');  //管理员或用户

            this.getRountPush;
            this.getProjectData();
            this.getDeviceRealData(1, this.page_size);
        },
        beforeDestroy:function () {

        },
        watch: {
            '$route' (to, from) {
                console.log('[ShowGatewayConfig] 路由参数变化，刷新数据', this.$route.path);

                if (typeof(this.$route.query.dev_cn_name) != "undefined") {
                    this.system_setup_list[0].project_name = this.$route.query.project_name;
                    //this.system_setup_list[0].project_local = '';
                    this.system_setup_list[0].dev_cn_name = this.$route.query.dev_cn_name;
                    this.system_setup_list[0].devunit_name = this.$route.query.devunit_name;
                }
                //console.log(this.getStatus(this.$route.path))
                this.getProjectData();
                this.getDeviceRealData(1, this.page_size);
            }
        },
        methods: {

            getProjectData: function() {//获取rom列表
                let self = this;
                let params = {
                    filter: {
                        project_name: self.system_setup_list[0].project_name,
                    }
                };
                self.loading = true;
                self.$axios.post('/api/project/manage/list',params).then(function(res){
                    self.loading = false;
                    if (res.data.ret_code == 0 && res.data.extra.length > 0) {
                        self.system_setup_list[0].project_local = res.data.extra[0].project_local;
                    }
                })
            },
            getDeviceRealData: function(current_page, page_size){//获取rom列表
                let self = this;
                let params = {
                    filter: {
                        devunit_name: self.system_setup_list[0].devunit_name ,
                    }
                };
                self.loading = true;
                self.$axios.post('/api/gateway/real/data', params).then(function(res){
                    self.loading = false;
                    console.log('[ShowGatewayConfig] get real data, params:', params);
                    console.log('[ShowGatewayConfig] get real data, return:', res.data);
                    if(res.data.ret_code == 0){
                        self.gwConfigList = res.data.extra.data;
                        self.system_setup_list[0].update_time = res.data.extra.update_time;
                        self.system_setup_list[0].device_run_status = "运行";
                        //self.pageTotal = res.data.total;
                    }else{
                        self.gwConfigList = [];
                        self.system_setup_list[0].device_run_status = "停止";
                        self.$message.error(res.data.ret_msg);
                    }

                });
            },
            handleCurrentChange:function(val){
                this.currentPage = val;
                this.getDeviceRealData(this.currentPage, this.page_size);
            },
            filterTag:function(value, row) {
                return row.comment === value;
            },
            page_forward_config: function(var_name, var_id){
                let params = {
                    devunit_name: this.system_setup_list[0].devunit_name,
                    var_name: var_name,
                    var_id: var_id,
                };

                //this.$message({message: params,type:'warning'});
                this.$router.push({name: '/ShowGatewayConfig', params :params});
            },
        },
        computed:{
            getRountPush: function() {
                console.log('[ShowGatewayConfig] route push into device!');

                if (typeof(this.$route.params.devunit_name) === "undefined") {
                    this.system_setup_list[0].devunit_name = localStorage.getItem('devunit_name');
                    console.log('devunit_name:', this.system_setup_list[0].devunit_name);
                }
                else{
                    this.system_setup_list[0].devunit_name = this.$route.params.devunit_name;
                    localStorage.setItem('devunit_name', this.system_setup_list[0].devunit_name);
                }

                console.log('get $route.params:', this.$route.params);
                //因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
                //return task_id;
            }

        }
    }
</script>

<style>
    .rad-group{margin-bottom:20px;}
    .orange{color:#eb9e05;background-color:inherit;}
    .title_box{margin-top:50px;}
    .btn_box{margin-top: 20px;margin-right: 50px;}
    .upload-demo .el-upload {cursor: pointer;position: relative;overflow: hidden;}
    .upload-demo .el-upload:hover {border-color: #409EFF;}
</style>
