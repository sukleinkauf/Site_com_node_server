var gulp = require('gulp'); //requerindo ao móduo gulp
	imagemin = require('gulp-imagemin')
    minifycss = require('gulp-minify-css'),
    refresh   = require('gulp-livereload'),
    server    = require('tiny-lr');

gulp.task('default',function(){//task: define tarefas no gulp
	console.log("teste");
});

gulp.task('build-img',function(){

	gulp.src('public/images/**/*')//fluxo de origem //os asterisco indicam os arquivos
		.pipe(imagemin()) //função pipe permite ligar funções entre elas
		.pipe(gulp.dest('public/images'));//destino das ações 
	
});

gulp.task('bootstrap',function(){ //copiando da pasta de origim e colando no destino
	gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
		.pipe(gulp.dest('public/stylesheets'));
	gulp.src('node_modules/bootstrap/dist/js/bootstrap.js')
		.pipe(gulp.dest('public/javascripts'));
	gulp.src('node_modules/bootstrap/dist/fonts/**/*')
		.pipe(gulp.dest('public/fonts'));
	console.log("bootstrap");
});