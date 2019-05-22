<template>
  <div>
    <el-table
      v-if="dataSource.branchs.length"
      :data="dataSource.branchs"
      style="width: 100%">

      <el-table-column
        prop="feature"
        label="分支功能"
        min-width="100"
        fixed="left"
      >
      </el-table-column>

      <el-table-column
        prop="localName"
        label="本地分支名称"
        min-width="100"
      >
      </el-table-column>

      <el-table-column
        prop="localUrl"
        label="本地分支url"
        min-width="160"
      >

        <template slot-scope="scope">
          <a :href="scope.row.localUrl" target="_blank">{{scope.row.localUrl}}</a>
        </template>

      </el-table-column>

      <el-table-column
        prop="developName"
        label="测试分支"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="developUrl"
        label="测试分支线上地址"
        min-width="160">
        <template slot-scope="scope">
          <a :href="scope.row.developUrl" target="_blank">{{scope.row.developUrl}}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="masterName"
        label="预发布分支"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="masterUrl"
        label="预发布分支线上地址"
        min-width="160"
      >
        <template slot-scope="scope">
          <a :href="scope.row.masterUrl" target="_blank">{{scope.row.masterUrl}}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="manager"
        label="负责人"
        min-width="100"
      >
      </el-table-column>

      <el-table-column
        width="180"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <i class="el-icon-edit icon" @click="editItem(scope.row)"></i>
          <!--<i class="el-icon-folder-add icon" @click="newItem(scope.row)"></i>-->
          <i class="el-icon-delete icon" @click="deleteItem(scope.row)"></i>
          <i v-if="scope.row.index!=='1'"
             class="el-icon-top icon"
             @click="moveItem(scope,'up')"></i>
          <i v-if="parseInt(scope.row.index)!==dataSource.branchs.length"
             class="el-icon-bottom icon"
             @click="moveItem(scope,'down')"></i>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex';

  export default {
    props: ['dataSource'],
    computed: {
      ...mapGetters({
        currentItem: 'currentItem',
      }),
    },
    methods: {
      ...mapActions({
        editPageItem: 'editPageItem',
        deletePage: 'deletePage',
        getPages: 'getPages',
        switchItem: 'switchItem',
      }),
      ...mapMutations({
        saveShowEditDialog: 'saveShowEditDialog',
      }),
      testScope(d) {
        debugger
      },
      async editItem(item) {
        this.saveShowEditDialog(true);
        this.editPageItem({item, id: this.dataSource._id, data: this.dataSource});
      },
      async newItem() {
        this.saveShowEditDialog(true);
        this.editPageItem({item: {}, id: this.dataSource._id, data: this.dataSource});
      },
      async deleteItem(item) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await  this.deletePage({id: item._id});
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getPages();
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      async moveItem(scope, d) {
        const {$index, row} = scope;
        const {branchs} = this.dataSource;
        const switchIds = [];
        switchIds.push(branchs[$index]._id);

        if (d == 'down') {
          switchIds.push(branchs[$index + 1]._id);
        } else {
          switchIds.push(branchs[$index - 1]._id);
        }

        let res = await this.switchItem(switchIds);
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getPages();
        }
      },
    },
    data() {
      return {}
    }
  }
</script>


<style scoped lang="scss">
  .icon {
    margin: 0 5px;
    cursor: pointer;
  }
</style>

