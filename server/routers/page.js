const Router = require('koa-router');
// const userControl = require('../controllers/userController')
let router = new Router();
const page = require('../controllers/pageController');
router.get('/pages', page.searchAllPages)

router.post('/updatePage', page.editPageById)

router.post('/deletePage',page.deletePageById)

router.post('/switchItem',page.switchItem)


router.post('/editProject', page.editProject)


module.exports = router;