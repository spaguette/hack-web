var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-rimraf');
var childProcess = require('child_process');
var htmlreplace = require('gulp-html-replace');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

// Папка с кэшем
var cacheDir = './cache/';
// Папка, куда webpack собирает проект
var buildFolder = './build/';
// Папка, куда gulp размещает релиз
var releaseFolder = './release/';
// Папка, где находятся public файлы
var releasePublicFolderName = 'public';
// index.html
var indexFile = 'index.html';
// Версия программы, берется из git, по умолчанию dev
var appVersion = 'dev';

/**
 * Удаление релиз папки с устаревшим билдом
 * */
gulp.task('clean-cache', function () {
    return gulp.src(cacheDir, {read: false})
               .pipe(clean());
});

/**
 * Удаление релиз папки с устаревшим билдом
 * */
gulp.task('clean-release', function () {
    return gulp.src(releaseFolder, {read: false})
               .pipe(clean());
});

/**
 * Удаление папки build
 * */
gulp.task('clean-build', function () {
    return gulp.src(buildFolder, {read: false})
               .pipe(clean());
});

/**
 * Запуск команды сборки приложения
 * */
gulp.task('webpack-build', ['clean-release'], function (callback) {
    var webpackProductionConfig = Object.assign({}, require('./webpack.config.production.js'));
    // run webpack
    webpack(webpackProductionConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack-build', err);
        }
        gutil.log('[webpack-build]', stats.toString({
            colors: true
        }));
        callback(err);
    });
});

/**
 * Запуск команды для компиляции языковых файлов
 * */
gulp.task('app-localizations', function (callback) {
    //childProcess.exec('l10ns compile', {env: process.env}, function (execError) {
    //if (execError) {
    // return callback(execError);
    //  }
    callback();
    // });
});

/**
 * Запуск команды для получения версии приложения
 * */
gulp.task('app-version', function (callback) {
    childProcess.exec('git describe --always', function (execError, stdout) {
        if (execError) {
            return callback(execError);
        }
        appVersion = stdout.trim();
        callback();
    });
});

/**
 * Перенос файлов css в релиз папку
 * */
gulp.task('build-css', ['webpack-build'], function () {
    return gulp.src(buildFolder + '*.css')
               .pipe(gulp.dest(releaseFolder));
});

/**
 * Перенос файлов js в релиз папку
 * */
gulp.task('build-js', ['webpack-build'], function () {
    return gulp.src(buildFolder + '*.js')
               .pipe(gulp.dest(releaseFolder));
});

/**
 * Перенос файлов public в релиз папку
 * */
gulp.task('build-public', ['clean-release'], function () {
    return gulp.src('./' + releasePublicFolderName + '/**')
               .pipe(gulp.dest(releaseFolder + releasePublicFolderName));
});

/**
 * Перенос файла index.js в релиз папку и указание версий в нем
 * */
gulp.task('build-version', ['clean-release', 'app-version'], function () {
    return gulp.src(indexFile)
               .pipe(htmlreplace({
                   'release-css': '/styles.css?v=' + appVersion,
                   'release-js': '/bundle.js?v=' + appVersion,
                   'version-js': {
                       src: [[appVersion.split('-')[0], appVersion]],
                       tpl: "<script type='text/javascript'>APP_VERSION = '%s'; APP_VERSION_FULL = '%s'</script>"}}))
    .pipe(gulp.dest(releaseFolder));
});

/**
 * Удаление папки build
 * Сборка production версии
 * */
gulp.task('build:release', [
    'build-css',
    'build-js',
    'app-localizations',
    'build-public',
    'build-version'
], function () {
    return gulp.src(buildFolder, {read: false})
               .pipe(clean());
});

gulp.task('webpack-dev-server', [
    'clean-build',
    'app-localizations',
    'clean-release',
    'clean-cache'
], function (callback) {
    var webpackDevConfig = Object.assign({}, require('./webpack.config.dev.js'));
    var compiler = webpack(webpackDevConfig);

    new WebpackDevServer(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        hot: true,
        historyApiFallback: true,
        headers: {'X-Custom-Header': 'yes'},
        stats: {colors: true},
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        proxy: {
            '/gelf': 'http://127.0.0.1:12201',
            '/api/*': 'http://127.0.0.1:50620'
        }
    }).listen(webpackDevConfig.serverPort, webpackDevConfig.serverHost, function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }

        gutil.log('[webpack-dev-server]', 'http://' + webpackDevConfig.serverHost + ':' + webpackDevConfig.serverPort + '/webpack-dev-server/index.html');
        callback(err);
    });
});