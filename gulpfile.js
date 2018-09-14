
// 引入gulp
const gulp = require('gulp')
const config = require('./config')
// 压缩html
const htmlmin = require('gulp-htmlmin')
// 热更新服务器
const connect = require('gulp-connect')
// 合并文件
const concat = require('gulp-concat')
// 压缩css
const minifycss = require('gulp-minify-css')
// 给css加前缀
const autoprefixer = require('gulp-autoprefixer')
// 重命名
const rename = require('gulp-rename')
// 合并文件操作流
const merge = require('merge-stream')
// webpack
const webpack = require('webpack-stream')
// 自动引入依赖文件
const inject = require('gulp-inject')
// 编译sass
const sass = require('gulp-sass')

// 处理html，将src中的html文件输出到dist中去
gulp.task('handle:html', function () {
    return gulp.src('./src/views/*/*.html')
        .pipe(gulp.dest('./dist'))
})
//处理图片，将图片文件移到dist对应的文件夹中
gulp.task('handle:img', function () {
let streams = []
    for (const page in config.imgoptions){
        let stream = gulp.src('./src/views/*/images/*')
                    .pipe(gulp.dest('./dist/'))
                    streams.push(stream)
    }
    return merge(...streams)
})
//将font文件引入
gulp.task('font', function () {
    return gulp.src('./src/font/*')
                .pipe(gulp.dest('./dist/font'))
})

// 处理css， 合并css， 压缩css， 前缀，输出
gulp.task('handle:css', function () {
    let streams = []
    for (const page in config.cssoptions) { 
        for (const file in config.cssoptions[page]) { // 遍历各个页面中的多个打包css文件配置
            let stream = gulp.src(config.cssoptions[page][file])
                .pipe(sass({outputStyle: 'compressed'}))// 把scss编译成css
                .pipe(autoprefixer({
                    browsers: ['last 2 versions','Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],//last 2 versions- 主流浏览器的最新两个版本
                    cascade: false, 
                    remove:true //是否去掉不必要的前缀 默认：true 
                }))
                .pipe(concat(file + '.css')) 
                .pipe(rename({suffix:'.min'})) 
                .pipe(gulp.dest('./dist/'+ page +'/css')) 
            
            streams.push(stream) 
        }
    }
    return merge( ...streams )//合并多个文件流
})
// js es6-> es5 合并 压缩
gulp.task('handle:js', function () {
    let streams = []
    for (const page in config.jsoptions) {
        //如果入口是数组或字符串,就是单出口，否则是多出口
        let entry = config.jsoptions[page]
        let filename = Array.isArray(entry) || ((typeof entry) === 'string') ? page : '[name]'
        let stream = gulp.src('src/entry.js')
            .pipe(webpack({
                mode: 'production',
                entry: entry,
                output: { filename: filename+'.min.js' },
                module: {
                    rules: [ //webpack中在这里使用各种loader对代码进行各种编译
                        {
                            test: /\.js$/, // 对js文件进行处理
                            loader: 'babel-loader', // 使用babel-loader对其进行处理
                            query: {
                                presets: ['es2015'] // 将es6编译一下
                            }
                        }
                    ]
                }
            }))
            .pipe(gulp.dest('./dist/' + page + '/js'))
        streams.push(stream)
    }
    return merge( ...streams )
})

//给各个页面的html文件添加对应依赖
gulp.task('inject', function () {
    setTimeout(() => {
        config.pages.forEach(page => {
            var target = gulp.src('./dist/'+page+'/'+page+'.html');
            var sources = gulp.src(['./dist/'+page+'/js/*.js', './dist/'+page+'/css/*.css'], {read: false});
            target.pipe(inject(sources, { ignorePath: '/dist' }))//忽略路径前的/dist
              .pipe(gulp.dest('./dist/'+page+''));
        })
    }, 1000);  
});

// 监听函数
gulp.task('watch', function () {
    gulp.watch('./src/views/*/*.html', ['handle:html', 'inject', 'reload'])
    gulp.watch('./src/views/*/images/*', ['handle:img', 'inject', 'reload'])
    gulp.watch('./src/**/*.scss', ['handle:css', 'inject', 'reload'])
    gulp.watch('./src/**/*.js', ['handle:js', 'inject', 'reload'])
    gulp.watch('./src/font/*', ['font', 'inject', 'reload'])

})

//创建热更新服务器
gulp.task('server', function () {
    connect.server(config.serveroptions)
})

// 服务器刷新任务
gulp.task("reload", function(){
	return gulp.src("./dist/**/*.html") 
		.pipe(connect.reload());
})

gulp.task('default', ['server', 'handle:html','handle:img', 'handle:css', 'handle:js', 'inject', 'font', 'watch'])