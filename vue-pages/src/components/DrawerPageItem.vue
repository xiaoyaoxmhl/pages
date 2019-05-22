<template>
  <div>
    <div class="bg" v-if="showEditDialog"></div>
    <transition name="slide-fade">
      <div class="drawer" v-if="showEditDialog">
        <h2 class="title">{{currentItem.data.title}}</h2>
        <div class="content">
          <el-form label-width="140px" :model="form">
            <el-form-item label="分支功能">
              <el-input v-model="form.feature"></el-input>
            </el-form-item>
            <el-form-item label="本地分支名称">
              <el-input v-model="form.localName"></el-input>
            </el-form-item>
            <el-form-item label="本地分支url">
              <el-input v-model="form.localUrl"></el-input>
            </el-form-item>
            <el-form-item label="测试分支">
              <el-input v-model="form.developName"></el-input>
            </el-form-item>
            <el-form-item label="测试分支线上地址">
              <el-input v-model="form.developUrl"></el-input>
            </el-form-item>
            <el-form-item label="预发布分支">
              <el-input v-model="form.masterName"></el-input>
            </el-form-item>
            <el-form-item label="预发布分支线上地址">
              <el-input v-model="form.masterUrl"></el-input>
            </el-form-item>
            <el-form-item label="负责人">
              <el-input v-model="form.manager"></el-input>
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
        currentItem: 'currentItem',
        showEditDialog: 'showEditDialog',
      }),
      getModel() {
        return Object.keys(this.currentItem.item).length;
      }
    },
    watch: {
      showEditDialog: {
        handler(val) {
          if (this.currentItem.item) {
            console.log(this.currentItem);
            this.form = {
              ...this.currentItem.item,
              parent_id: this.currentItem.data._id,
            };
          }
        }
      }
    },
    data() {
      return {
        form: {
          feature: '',
          localName: '',
          localUrl: '',
          developName: '',
          developUrl: '',
          masterName: '',
          masterUrl: '',
          manager: '',
        },
        loading: false,
      }
    },
    methods: {
      ...mapActions({
        editPageItem: 'editPageItem',
        editPage: 'editPage',
        getPages: 'getPages',
      }),
      ...mapMutations({
        saveShowEditDialog: 'saveShowEditDialog',
      }),
      closeDialog() {
        this.saveShowEditDialog(false);
        this.editPageItem({})
      },
      async updateItem() {
        this.loading = true;
        let res = await this.editPage({
          form: this.form,
        });
        if (res.code === 1) {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          this.saveShowEditDialog(false);
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
