<template>
    <div>
        <el-card class="box-card el-card__body" shadow="hover">
            <img src="//csdnimg.cn/release/download/static_files/pc/images/minetype/txt.svg" alt="img" class="fileImg">
            <div class="fileTitle"><!--title-->
                {{parentResource.resourceName}}
                <template v-for="tag in resource.tags" >
                    &nbsp;
                    <el-tag size="small" :key="tag.id">#{{tag.name}}</el-tag>
                </template>
            </div>
            <div class="fileInfo"><!--info-->
                <span>上传者：<el-link type="info" :underline="false">{{parentResource.account}}</el-link></span>
                <span>上传时间：<el-link type="info" :underline="false">{{timestamp13ToTime(parentResource.releaseTime)}}</el-link></span>
                <span>所需硬币：<el-link type="danger" :underline="false" icon="el-icon-s-goods">5</el-link></span>
                <el-button  type="primary" size="medium" class="fileButton" @click="gotoResource(parentResource.rid)">查看详情</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "resourceCard",
        props:['resource'],
        data(){
            return{

            }
        },
        computed:{
            parentResource(){
                return this.resource;
            },
        },
        methods:{
            gotoResource(rid){
                window.alert("当前资源卡片id：" + rid);
                this.$router.push({
                        name:'blogdownload',
                        query:{
                            id: rid,
                        }
                    }
                )
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
    table>tr{
        height: 32px;
        line-height: 32px;
        margin-top: 20px;
    }
    ul li{
        list-style: none;
        float: left;
        margin-left: 15px;
    }
    .fileImg{
        float: left;
    }
    .el-card__body{
        padding-top: 0px;
        padding-left: 0px;
        padding-bottom: 0px;
        text-align: left;
    }
    .fileTitle{
        font-size: 24px;
        font-weight: 400;
    }
    .fileInfo>span{
        font-size: 16px;
        margin-right: 10px;
    }
    .fileButton{
        float: right;
    }
    .resource .el-card__body{
        margin-bottom: 20px;
    }
    .resource .el-card__body>div{
        margin-left: 80px;
        margin-bottom: 12px;
    }
</style>