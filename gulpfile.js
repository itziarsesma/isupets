var gulp = require('gulp'); // importamos gulp
var sass = require('gulp-sass'); // importamos sass
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var browserify = require("browserify");
var tap = require("gulp-tap");
var buffer = require("gulp-buffer");
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');
var spritesmith = require('gulp.spritesmith');

//config
var sassConfig = {
    compileSassTaskName: 'compile-sass',
    watchFiles: './src/scss/*.scss',
    entryPoint: './src/scss/style.scss',
    dest: './dist/'
}

var jsConfig = {
    concatJsTaskName: 'concat-js',
    watchFiles: './src/js/*.js',
    entryPoint: './src/js/main.js',
    concatFile: 'main.js',
    dest: './dist/'
}

var uglifyConfig = {
    uglifyTaskName: "uglify",
    src: './dist/main.js',
    dest: './dist'
};

var imagesConfig = {
    imagesTaskName: "optimize-images",
    src: "./src/img/*",
    dest: "./dist/img",
    responsive: {
        'art-*.jpg': [
            {
                width: 1500,
                rename: { suffix: '-1500px' }
            },
            {
                width: 1000,
                rename: { suffix: '-1000px' }
            },
            {
                width: 750,
                rename: { suffix: '-750px' }
            },
            {
                width: 375,
                rename: { suffix: '-375px' }
            },
            { width: '100%' }
        ],
        '*.png': {
            width: '100%'
        }
    }
}

var sprites = {
    spritesTaskName: 'sprites',
    imgSrc: './src/img/sprites/*.png',
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgDest: './dist/img/',
    cssDest: './src/scss/',
    imgPath: 'img/sprite.png'
};

var copyFilesConfig = {
    copyFilesTaskName: 'copy-files',
    videoSrc: './src/video/*.mp4',
    videoDest: './dist/video/',
    fontsSrc: './src/fonts/*.ttf',
    fontsDest: './dist/fonts/'
};

// definimos la tarea por defecto
gulp.task("default", [sassConfig.compileSassTaskName, jsConfig.concatJsTaskName, imagesConfig.imagesTaskName, sprites.spritesTaskName, copyFilesConfig.copyFilesTaskName], function() {
    // arrancar el servidor de desarrollo de browser sync
    browserSync.init({
        //server: "./"
        proxy: "127.0.0.1:8000" //conectar browsersync con sparrest
    });
    // cuando haya cambios en archivos scss, compila sass
    gulp.watch(sassConfig.watchFiles, [sassConfig.compileSassTaskName]);

    // cuando haya cambios en archivos js los concatena
    gulp.watch(jsConfig.watchFiles, [jsConfig.concatJsTaskName]);

    // cuando se cambie el HTML recarga el navegador
    gulp.watch('./*.html', function() {
        browserSync.reload(); // recarga navegador
        notify().write("Navegador recargado"); // mostramos la notificación
    });
});

// compilar sass
gulp.task(sassConfig.compileSassTaskName, function() {
    gulp.src(sassConfig.entryPoint)    // cargo el style.scss 
    .pipe(sourcemaps.init()) // empezamos a capturar los sourcemaps  
    .pipe(sass().on('error', function(error) { // compilamos sass
        return notify().write(error);   // si ocurre un error, mostramos notificacion
    }))  // compilo sass
    .pipe(postcss([autoprefixer(), cssnano()])) // autoprefija el css y lo minifica
    .pipe(sourcemaps.write('./')) // terminamos de capturar los sourcemaps
    .pipe(gulp.dest(sassConfig.dest))      // dejo el resultado en ./dist/
    .pipe(browserSync.stream())     // recargamos el CSS en el navegador
    .pipe(notify("SASS Compilado"));  // Añado una notificacion al finalizar la tarea
});

// concatena js
gulp.task(jsConfig.concatJsTaskName, function(){
    gulp.src(jsConfig.entryPoint)
    .pipe(tap(function(file){ // para cada archivo seleccionado
        // lo pasamos por browserify para importar los require
        file.contents = browserify(file.path, { debug:true }).bundle().on('error', function(error){
            return notify().write(error); // si ocurre un error javascript, lanza notificación
        });
    }))
    .pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
    // .pipe(concat(jsConfig.concatFile))
    .pipe(sourcemaps.init({ loadMaps: true }))    // empezamos a capturar los sourcemaps
    .pipe(uglify()) //minificamos el código
    .pipe(sourcemaps.write('./'))   // terminamos de capturar los sourcemaps
    .pipe(gulp.dest(jsConfig.dest))
    .pipe(notify("JS Concatenado"))
    .pipe(browserSync.stream());
});

//minifica
gulp.task(uglifyConfig.uglifyTaskName, function() {
    gulp.src(uglifyConfig.src)
    .pipe(uglify())
    .pipe(gulp.dest(uglifyConfig.dest))
    .pipe(notify("JS Minificado"));
});

// comprime imagenes
gulp.task(imagesConfig.imagesTaskName, function() {
    gulp.src(imagesConfig.src)
    .pipe(responsive(imagesConfig.responsive)) // genera las imagenes responsive
    .pipe(imagemin()) // optimiza el tamaño de las imagenes
    .pipe(gulp.dest(imagesConfig.dest));
});

//generar sprite
gulp.task(sprites.spritesTaskName, function(){
    var spriteData = gulp.src(sprites.imgSrc).
    pipe(spritesmith({
        imgName: sprites.imgName,
        cssName: sprites.cssName,
        imgPath: sprites.imgPath
    }));
    spriteData.img.pipe(gulp.dest(sprites.imgDest));
    spriteData.css.pipe(gulp.dest(sprites.cssDest));
});

//copiar videos y fuentes a carpeta dist
gulp.task(copyFilesConfig.copyFilesTaskName, function() {
    gulp.src(copyFilesConfig.videoSrc)
    .pipe(gulp.dest(copyFilesConfig.videoDest));
    gulp.src(copyFilesConfig.fontsSrc)
    .pipe(gulp.dest(copyFilesConfig.fontsDest));
});

