// Компелирует Pug файлы в Html и переносит файлы в папку dist

module.exports = function () {

  $.gulp.task('pug', () => {

    return $.gulp.src($.config.paths.pug, { base: "src/" })
      .pipe($.gp.plumber())
      .pipe($.gp.pug({
        locals: {
            jsonData: JSON.parse($.fs.readFileSync('./src/templates/data/data.json', 'utf8'))
        }
      }))
      .pipe($.gp.htmlBeautify({
        "indent_size": 2,
        "max_preserve_newlines": 1
      }))
      .pipe($.gp.if($.config.toggle.minHtml, $.gp.htmlmin({ collapseWhitespace: true })))
      .pipe($.gulp.dest($.config.output.path))
      .pipe($.browserSync.stream());
  });
}

