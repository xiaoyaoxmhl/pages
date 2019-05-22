<template>
  <div>
    <div class="title content">
      <h1>所有项目 </h1>
      <el-button type="primary" size='mini' icon="el-icon-folder-add" @click="newProject">新增项目</el-button>
    </div>
    <div v-for="(item,index) in pages" v-if="pages.length">
      <div class="content">
        <h2 class="title">
          <div>
            <!--<template v-if="!item.isEdit">-->
              <!--{{item.title}}-->
              <!--<i class="el-icon-edit icon" @click="editProjectTitle(item,index)"></i>-->
            <!--</template>-->
            <!--<template v-else>-->
              <!--<el-input v-model="item.title" placeholder="请输入内容"></el-input>-->
              <!--<el-button type="primary" size='mini' icon="el-icon-folder-add" @click="editProject(item)">确定</el-button>-->
            <!--</template>-->
            {{item.title}}
            <i class="el-icon-edit icon" @click="editProjectTitle(item,index)"></i>
          </div>
          <div>
            <el-button type="primary" size='mini' icon="el-icon-folder-add" @click="newItem(item)">新增分支</el-button>
            <!--<el-button type="primary" size='mini' icon="el-icon-folder-add" @click="newProject">新增项目</el-button>-->
          </div>
        </h2>
        <project-table :dataSource="item">

        </project-table>
      </div>
      <hr>
    </div>
    <div class="content">
      <h2>UI</h2>
      <a href="https://lanhuapp.com/web/#/item?cid=&fid=all" target="_blank">蓝湖</a>
    </div>
    <hr>
    <div class="content">
      <h2>接口</h2>
      <a href="http://gitlab.airdroid.com/airdroid_server/id-airdroid-com/wikis/home" target="_blank">id服务器</a><br/>
      <a href="http://gitlab.airdroid.com/airdroid_server/server-airdroid-com-go/wikis/home"
         target="_blank">go服务器</a>
    </div>
    <hr>
    <div class="content">
      <h2>其他</h2>
      <a href="smb://192.168.40.100" target="_blank">100地址</a><br/>
      <a
        href="http://192.168.40.201:8090/login.jsp?permissionViolation=true&os_destination=%2Fbrowse%2FAD-10079&page_caps=&user_role="
        target="_blank">
        同步网络 JIRA</a><br/>
      <a href="http://lang.airdroid.com/web/"
         target="_blank">
        语言助手</a>
    </div>

    <drawer-page-item></drawer-page-item>
    <drawer-page></drawer-page>
  </div>
</template>

<script>
  import ProjectTable from '@/components/ProjectTable'
  import DrawerPageItem from '@/components/DrawerPageItem'
  import DrawerPage from '@/components/DrawerPage'
  import {mapActions, mapGetters, mapMutations} from 'vuex';

  export default {
    name: "Home",
    components: {ProjectTable, DrawerPageItem, DrawerPage},
    data() {
      return {
        drawVisiable: false,
        current: {},
      }
    },
    async mounted() {
      this.getPages();
    },
    computed: {
      ...mapGetters({
        pages: 'pages',
      }),
    },
    methods: {
      ...mapActions({
        getPages: 'getPages',
        editPageItem: 'editPageItem',
        newProject: 'newProject',
        newItem: 'newItem',
        editProject:'editProject',
      }),
      ...mapMutations({
        saveShowEditDialog: 'saveShowEditDialog',
        saveShowEditProjectDialog: 'saveShowEditProjectDialog',
        saveCurrentProjectItem: 'saveCurrentProjectItem',
        savePages: 'savePages',
      }),
      editProjectTitle(item, index) {
        // savePages
       this.newProject({
         title:item.title,
         id:item._id
       });
      }
    }
  }
</script>

<style scoped lang="scss">
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-icon-edit {
      font-size: 18px;
      margin: 0 6px;
      cursor: pointer;
    }
  }

  div.content {
    margin-left: 30px;
    padding: 10px;
    margin-bottom: 30px;
  }

  div.content a {
    display: inline-block;
  }

  div.content a span {
    margin-left: 10px;
  }


</style>
