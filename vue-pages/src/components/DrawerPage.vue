<template>
  <div>
    <div class="bg" v-if="showEditProjectDialog"></div>
    <transition name="slide-fade">
      <div class="drawer" v-if="showEditProjectDialog">
        <h2 class="title">{{currentProjectItem.title||'新建项目'}}</h2>
        <div class="content">
          <el-form label-width="140px" :model="form">
            <el-form-item label="项目名称">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="bottom">
          <el-button type="primary" :loading="loading" @click="updateItem" v-if="getModel">修改</el-button>
          <el-button type="primary" :loading="loading" @click="updateItem" v-if="!getModel">立刻创建</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex';

  export default {
    name: "DrawerPage",
    computed: {
      ...mapGetters({
        currentProjectItem: 'currentProjectItem',
        showEditProjectDialog: 'showEditProjectDialog',
      }),
      getModel() {
        return this.currentProjectItem.id.length;
      }
    },
    watch: {
      showEditProjectDialog(val, old) {
        if (!old && val) {
          const {title} = this.currentProjectItem;
          this.form.title = title;
        }
      },
    },
    data() {
      return {
        form: {
          title: '',
        },
        loading: false,
      }
    },
    methods: {
      ...mapActions({
        editPageItem: 'editPageItem',
        editProject: 'editProject',
        getPages: 'getPages',
      }),
      ...mapMutations({
        saveShowEditProjectDialog: 'saveShowEditProjectDialog',
      }),
      closeDialog() {
        this.saveShowEditProjectDialog(false);
        this.editPageItem({})
      },
      async updateItem() {
        this.loading = true;
        let res = await this.editProject({
          form: {...this.form,id:this.currentProjectItem.id},
        });
        if (res.code === 1) {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          this.saveShowEditProjectDialog(false);
        }
        this.loading = false;
        this.getPages();
      }
    },

  }
</script>


<style scoped lang="scss">
  .bg {
    background: rgba(155, 155, 155, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    cursor: not-allowed;
  }

  .drawer {
    background: #fff;
    box-shadow: 0px 0px 5px #909086;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 600px;
    height: 100%;
    z-index: 10;
    .title {
      padding: 20px 20px;
      border-bottom: 1px solid #dcdcb9;
      margin: 0;
    }
    .content {
      padding: 20px 30px 20px 0;
      position: absolute;
      top: 120px;
      left: 0;
      right: 0px;
      bottom: 100px
    }
    .bottom {
      position: absolute;
      left: 0;
      right: 0px;
      bottom: 0px;
      height: 100px;
      display: flex;
      align-items: center;
      padding: 0 30px;
      border-top: 1px solid #dcdcb9;
    }
  }

  .slide-fade-enter-active {
    transition: all 1s ease;
  }

  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(600px);
    opacity: 0;
  }

</style>
