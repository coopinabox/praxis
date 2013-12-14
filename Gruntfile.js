module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-knex-migrate');

  grunt.registerTask('default', ['dev']);
  grunt.registerTask('html', ['copy:html']);
  grunt.registerTask('css', ['sprite', 'less']);
  grunt.registerTask('js', ['browserify:vendor', 'browserify:app']);
  grunt.registerTask('db', ['knexmigrate:latest']);
  grunt.registerTask('assets', ['copy:assets', 'copy:fonts']);
  grunt.registerTask('build', ['clean', 'html', 'js', 'css', 'assets']);
  grunt.registerTask('server', ['express']);
  grunt.registerTask('dev', ['build', 'db', 'server', 'watch']);
  grunt.registerTask('minify', ['cssmin', 'uglify']);
  grunt.registerTask('prod', ['build', 'db', 'minify', 'hashres']);

  var jsVendors = [
    'node_modules/jquery/dist/jquery',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/underscore/underscore',
    'node_modules/angular/angular',
    'node_modules/angular-route/angular-route',
    'node_modules/restangular/dist/restangular',
  ];
  var defaultBanner = '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n';
  var lessPaths = [
    'node_modules/bootstrap/less/',
    'node_modules/angular-xeditable/dist/css/',
    'client/',
  ];
  var fontFiles = [
    'node_modules/bootstrap/fonts/*',
  ];

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'clean': ['build'],
    'browserify': {
      'vendor': {
        'src': jsVendors,
        'dest': 'build/js/vendor.js',
        'options': {
          'debug': true,
          'shim': {
            'jquery': {
              'path': jsVendors[0],
              'exports': '$',
            },
            'bootstrap': {
              'path': jsVendors[1],
              'exports': null,
              'depends': { 'jquery': '$'},
            },
            'underscore': {
              'path': jsVendors[2],
              'exports': '_',
            },
            'angular': {
              'path': jsVendors[3],
              'exports': 'angular',
            },
            'angular-route': {
              'path': jsVendors[4],
              'exports': null,
              'depends': { 'angular': 'angular'},
            },
            'restangular': {
              'path': jsVendors[5],
              'exports': null,
              'depends': {
                'angular': 'angular',
                'underscore' : '_',
              },
            },
          },
        },
      },
      'app': {
        'src': 'client/index.js',
        'dest': 'build/js/app.js',
        'options': {
          'debug': true,
          'transform': ['brfs'],
          'external': ['jquery'],
        },
      },
    },

    'sprite': {
      'build': {
        'src': 'assets/sprites/*.png',
        'destImg': 'build/sprites/spritesheet.png',
        'destCSS': 'build/sprites/appsprites.less',
      },
    },

    'less': {
      'options': {
        'paths': lessPaths,
        'compress': false,
      },
      'build': {
        'src': 'client/index.less',
        'dest': 'build/css/index.css',
      },
    },

    'copy': {
      'html': {
        'expand': true,
        'cwd': 'client/',
        'src': '**/*.html',
        'dest': 'build/',
      },
      'fonts': {
        'src': fontFiles,
        'dest': 'build/fonts/',
        'expand': true,
        'flatten': true,
        'filter': 'isFile',
      },
      'assets': {
        'cwd': 'assets',
        'src': '**/*',
        'dest': 'build',
        'expand': true,
      }
    },

    'express': {
      'server': {
        'options': {
          'server': './server/index.js',
          'bases': 'build',
          'livereload': true,
          'port': 5000,
        },
      },
    },

    'watch': {
      'all': {
        'files': ['Gruntfile.js'],
        'tasks': ['build'],
      },
      'html': {
        'files': ['client/**/*.html'],
        'tasks': ['html'],
      },
      'js': {
        'files': ['client/**/*.js', 'server/**/*.js'],
        'tasks': ['js'],
      },
      'css': {
        'files': ['client/**/*.less'],
        'tasks': ['css']
      },
      // TODO watch assets
      //'assets': {
      //  'files': ['assets/**/*'],
      //  'tasks': ['assets']
      //},
    },

    'cssmin': {
      'options': {
        'banner': defaultBanner,
        'report': 'min',
      },
      'deploy': {
        'src': 'build/css/index.css',
        'dest': 'build/css/index.css',
      },
    },

    'uglify': {
      'options': {
        'banner': defaultBanner,
        'report': 'min',
      },
      'deploy': {
        'files': {
          'build/js/vendor.js': 'build/js/vendor.js',
          'build/js/app.js': 'build/js/app.js',
        },
      },
    },

    'hashres': {
      'options': {},
      'deploy': {
        'src': [
          'build/css/index.css',
          'build/js/vendor.js',
          'build/js/app.js',
        ],
        'dest': 'build/index.html',
      },
    },

    'knexmigrate': {
      'config': __dirname + '/server/db/config.js',
    },
  });
};
