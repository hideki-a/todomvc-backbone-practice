LIVERELOAD_PORT = 35729
lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT })
mountFolder = (connect, dir) ->
  return connect.static(require('path').resolve(dir))

module.exports = (grunt) ->
  # Load grunt tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.initConfig
    connect:
      options:
        port: 8080
        hostname: 'localhost'
      livereload:
        options:
          middleware: (connect) ->
            return [
              lrSnippet
              mountFolder(connect, 'app/')
            ]

    watch:
      options:
        nospawn: true
        livereload: true

      static:
        files: [
          'app/index.html'
          'app/js/*.js'
        ]

  # Register tasks.
  grunt.registerTask 'develop', [
    'connect'
    'watch'
  ]

  return;