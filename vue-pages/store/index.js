import {
  getAllPages,
  editPage,
  deletePage,
  switchItem,
  editProject
} from '../src/api';

export default {
  state: {
    pages: [],
    currentItem: {
      item: {},
      id: '',
      data: {}
    },
    currentProjectItem: {
      title: '',
      id: '',
    },
    showEditDialog: false,//编辑分支信息 是否展示
    showEditProjectDialog: false,//编辑项目信息 是否展示
  },
  getters: {
    pages: state => state.pages,
    currentItem: state => state.currentItem,
    currentProjectItem: state => state.currentProjectItem,
    showEditDialog: state => state.showEditDialog,
    showEditProjectDialog: state => state.showEditProjectDialog,
  },
  mutations: {
    savePages(state, pages) {
      state.pages = pages;
    },
    saveCurrentItem(state, currentItem) {
      state.currentItem = currentItem;
    },
    saveShowEditDialog(state, showEditDialog) {
      state.showEditDialog = showEditDialog;
    },
    saveCurrentProjectItem(state, currentProjectItem) {
      state.currentProjectItem = currentProjectItem;
    },
    saveShowEditProjectDialog(state, showEditProjectDialog) {
      state.showEditProjectDialog = showEditProjectDialog;
    },
  },
  actions: {
    async getPages({commit}) {
      let res = await  getAllPages();
      if (res && Array.isArray(res.data)) {
        res.data.forEach((v, k) => {
          const {branchs = []} = res.data[k];
          //对返回的分支信息进行排序
          res.data[k].branchs = res.data[k].branchs.sort((a, b) => {
            return parseInt(a.index) - parseInt(b.index)
          });
        })
        res.data = res.data.sort((a,b)=> parseInt(a.index) - parseInt(b.index))
        commit('savePages', res.data);
      }
    },
    //把即将编辑信息 存储到当前操作
    async editPageItem({commit}, item) {
      commit('saveCurrentItem', item);
    },
    //开始编辑某一条项目中分支信息
    async editPage({commit}, form) {
      let res = await editPage(form);
      return res;
    },
    async deletePage({commit}, item) {
      let res = await deletePage(item);
      return res;
    },
    async switchItem({commit}, items) {
      let res = await switchItem({items});
      return res;
    },
    async editProject({commit}, form) {
      let res = await editProject(form);
      return res;
    },
    async newProject({commit}, {title = '', id = ''}) {
      commit('saveShowEditProjectDialog', true);
      commit('saveCurrentProjectItem', {
        title,
        id,
      });
    },
    async newItem({commit}, item) {
      commit('saveShowEditDialog', true);
      commit('saveCurrentItem', {item: {}, id: "", data: item});
    },
  }
}

