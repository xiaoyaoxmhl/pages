const {projects} = require('../models/pageModel')
const {branchs} = require('../models/branchModel')


//通过项目找到宿所有的子分支数据
const searchAllBranch = (res) => {
    let arr = [];
    return new Promise(resove => {
        res.forEach(async (v, k) => {
            const parent = JSON.parse(JSON.stringify(v))
            let branchData = await  branchs.find({parent_id: parent._id});
            if (branchData.errors) return;
            parent.branchs = branchData;
            arr.push(parent);
            if (k === res.length - 1) {
                resove(arr);
            }
        })
    })
}

//找到所有的项目
async function searchAllPages(ctx, next) {
    let res = await projects.find({});
    if (Array.isArray(res)) {
        if (res.length == 0) {
            ctx.body = {
                msg: 'error',
                data: [],
            }
            return;
        }
        let data = await  searchAllBranch(res);
        ctx.body = {
            msg: 'success',
            data
        }
    } else {
        ctx.body = {
            msg: 'error',
            data: [],
        }
    }
}


async function editPageById(ctx, next) {

    console.log(JSON.stringify(ctx));
    const {
        _id,
        feature = "",
        localName = "",
        localUrl = "",
        developName = "",
        developUrl = "",
        masterName = "",
        masterUrl = "",
        manager = "",
        index,
        parent_id
    } = ctx.request.body.form;
    //修改模式
    if (_id) {
        let res = await branchs.findOneAndUpdate({_id}, {
            feature,
            localName,
            localUrl,
            developName,
            developUrl,
            masterName,
            masterUrl,
            manager,
            index,
            useFindAndModify: true,
        })
        console.log(res);
        if (!res.errors) {
            ctx.body = {
                msg: 'success',
                code: 1,
            }
        }
    } else if (!_id && parent_id) { //创建模式
        let branchData = await  branchs.find({parent_id});
        let data = branchData.sort(v => parseInt(v.index));
        console.log(data);

        const branchItem = new branchs({
            feature,
            localName,
            localUrl,
            developName,
            developUrl,
            masterName,
            masterUrl,
            manager,
            index: parseInt(data.length ? data.pop().index : 0) + 1,
            parent_id
        });
        let res = await  branchItem.save();
        if (!res.errors) {
            ctx.body = {
                msg: 'success',
                code: 1,
            }
        }
    }

}

//删除
async function deletePageById(ctx, next) {
    console.log(ctx);
    const {
        id,
    } = ctx.request.body;
    let res = await branchs.remove({_id: id});
    if (res.ok === 1) {
        ctx.body = {
            msg: 'success',
            code: 1,
        }
    }
}


//交换位置
async function switchItem(ctx) {
    console.log(ctx.request.body);
    const {
        items,
    } = ctx.request.body;

    let frontItem = await  branchs.findOne({_id: items[0]});
    let afterItem = await  branchs.findOne({_id: items[1]});

    if (errorCb(frontItem,ctx)) return;
    if (errorCb(afterItem,ctx)) return;

    let resultFront = await  branchs.findOneAndUpdate({_id: items[0]}, {index: afterItem.index}, {fields: 'index'});
    let resultAfter = await  branchs.findOneAndUpdate({_id: items[1]}, {index: frontItem.index}, {fields: 'index'});

    if (errorCb(resultFront,ctx)) return;
    if (errorCb(resultAfter,ctx)) return;

    ctx.body = {
        msg: 'success',
        code: 1,
    }
}

function errorCb(res,ctx) {
    if(res.errors){
        ctx.body = {
            msg: 'error',
            code: -1,
        }
        return true;
    }
    return false;
}

async function editProject(ctx, next) {

    console.log(JSON.stringify(ctx));
    const {
        id,
        title,
    } = ctx.request.body.form;
    //修改模式
    if (id) {
        let res = await projects.findOneAndUpdate({_id:id}, {
            title,
            index:'2',
            useFindAndModify: true,
        })
        console.log(res);
        if (!res.errors) {
            ctx.body = {
                msg: 'success',
                code: 1,
            }
        }
    } else { //创建模式
        let projectData = await  projects.find({});
        let data = projectData.sort(v => parseInt(v.index));
        console.log(data);

        const projectItem = new projects({
            title,
            index: parseInt(data.length ? data.pop().index : 0) + 1,
        });
        let res = await  projectItem.save();
        if (!res.errors) {
            ctx.body = {
                msg: 'success',
                code: 1,
            }
        }
    }

}

module.exports = {
    searchAllPages,
    editPageById,
    deletePageById,
    switchItem,
    editProject,
}