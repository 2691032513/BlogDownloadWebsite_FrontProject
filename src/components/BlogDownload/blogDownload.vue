<template>
    <div class="content">
        <div class="files left">
            <img src="../../assets/file.png" class="fileicon">

        </div>
        <div class="titles left">
            <h2>{{parentResource.name}}</h2>
            <p>
                <template  v-for="tag in parentResource.tags">
                    &nbsp;
                    <el-tag :key="tag.id" type="info">{{tag.name}}</el-tag>
                </template>
            </p>
        </div>
        <div class="status left">
            <h5 style="font-size: 16px;">资源状态：<span>公开</span></h5>
            <p style="margin-top: 90px;  color: #c2c2c2">上传：<span>{{timestamp13ToTime(parentResource.releaseTime)}}</span></p>
        </div>
        <div class="clears"></div>
        <div class="download">
            <div class="left">所需：<span style="font-size: 24px; color: red; padding-right: 5px">5</span>硬币</div>
            <div class="left" style="margin-left: 25px">
                <el-row>
                    <el-button type="primary" @click="buyFile(parentResource.id)">立即购买</el-button>
                    <el-button type="warning" @click="postDownload(parentResource.id)">立即下载</el-button>
                </el-row>
            </div>
            <div class="clears"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "blogDownload",
        props:['resource'],
        computed:{
            parentResource(){
                return this.resource;
            },
        },
        methods:{
            // 购买
            buyFile(rid) {
                this.$confirm('将花费5硬币购买该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postResourcePayment(rid);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消购买'
                    });
                });
            },

            // 发送购买资源请求
            postResourcePayment(rid){
                this.axios.post(
                    "resource/buyLicense",{
                        "resourceDetail":{
                            "id": rid,
                        },
                    }).then((res)=>{
                    window.console.log(res.data)
                    if(res.data){
                        this.$message({
                            type: 'success',
                            message: '消息：购买成功!'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: '消息：此资源已购买'
                        });
                    }
                    // this.$store.commit("updateBlogList",res.data)
                })
            },

            postDownload(rid){
                this.axios.post(
                    "resource/download",{
                        'id': rid
                    }
                ).then((res)=>{
                    window.console.log(res.data)
                    if(res.data != null){
                        this.$message({
                            type: 'success',
                            message: '消息：开始下载'
                        });
                        this.goto(res)
                    }else{
                        this.$message({
                            type: 'error',
                            message: '消息：下载失败'
                        });
                    }
                })
            },
            // 跳转函数（参数）
            goto(res) {
                // 跳转打开到新页面
                const { href } = this.$router.resolve({
                    path: "upload/download" + res.data
                })
                window.open(href, "_blank")
                // 加入到指定路径
                // this.$router.push({path: val})
            },

            timestamp13ToTime(timestamp) {
                const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                const Y = date.getFullYear() + '-';
                const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                const D = date.getDate() + ' ';
                const h = date.getHours() + ':';
                const m = date.getMinutes() + ':';
                const s = date.getSeconds();
                return Y + M + D + h + m + s;
            },
        }
    }
</script>

<style scoped>

    .content{
        width: 98%;
        min-width: 740px;
        margin: auto;
        min-height: 240px;
        background: white;
        text-align: left;
        box-shadow: 6px 6px 6px 0 rgba(0, 0, 0, 0.1);
        border: #D3DCE6 1px solid;
        border-radius: 5px;
    }
    .fileicon{
        width: 100px;
        height: 100px;
        margin-left: 25px;
        margin-top: 25px;
    }
    .left{
        float: left;
    }
    .files{
        width: 15%;
    }
    .titles{
        width: 60%;
        margin-top: 30px;
        font-size: 24px;
    }
    .status{
        width: 20%;
        text-align: right;
        margin-top: 30px;
        padding-right: 25px;
    }
    .download{
        margin-top: 20px;
        margin-left: 20px;
        font-size: 18px;
    }
</style>