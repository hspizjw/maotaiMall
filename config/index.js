
//全局的配置
const config = {
    htmloptions: { //html压缩的配置
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    },

    // 热更新服务
    serveroptions: {
        root: './dist',
        port: 8050,
        livereload: true 
    },

    //项目页面
    pages: [ 'index', 'list', 'car' ],
    cssoptions: {// css配置
        'index': { 
            'common': [ //css合并
                './src/stylesheets/reset.scss',
                './src/views/index/stylesheets/common/*.scss'
            ],
            'index': './src/views/index/stylesheets/index/*.scss'
        },
        'list': {
            'list': [
                './src/stylesheets/reset.scss',
                './src/views/list/*/*.scss'
            ]
        }
    },

    //js配置
    jsoptions: {
        'index': {
            index: './src/views/index/javascripts/index.js',
            vendor: './src/views/index/javascripts/vendor.js'
        },
        'list': './src/views/list/javascripts/list.js'
    },
    //将所有页面的image文件夹移到对应文件夹下
    imgoptions :{
        'index': './src/views/index/images/*'
    }
} 
module.exports = config