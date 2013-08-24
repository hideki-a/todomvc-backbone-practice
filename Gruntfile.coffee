LIVERELOAD_PORT = 35729
lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT })
mountFolder = (connect, dir) ->
  return connect.static(require('path').resolve(dir))

module.exports = (grunt) ->
  # Load grunt tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.initConfig
    mocha_phantomjs:
      all:
        options:
          urls: [
            'http://localhost:8080/index.html'
          ]

    connect:
      options:
        port: 8080
        hostname: 'localhost'
      test:
        options:
          middleware: (connect) ->
            return [
              mountFolder(connect, 'test/')
              mountFolder(connect, 'app/')
            ]
      livereload:
        options:
          middleware: (connect) ->
            return [
              lrSnippet
              mountFolder(connect, 'app/')
            ]

    watch:
      test:
        files: [
          'test/*.html'
          'test/spec/*.js'
        ]
        tasks: [
          'mocha_phantomjs'
        ]

      static:
        files: [
          'app/index.html'
          'app/js/*.js'
        ]
        options:
          livereload: true

  # Register tasks.
  grunt.registerTask 'develop', [
    'connect:livereload'
    'watch'
  ]

  grunt.registerTask 'test', [
    'connect:test'
    'mocha_phantomjs'
    'watch'
  ]

  return;