'use strict';
 
module.exports = function(grunt) {

	/**
	 * Configuration
	 */
	grunt.initConfig({
		
		/**
		 * Set project object
		 */
		project: {
		  app: 'app',
		  dist: 'dist',
		  scss: [
		    '<%= project.app %>/scss/style.scss'
		  ],
		  js: [
		    '<%= project.app %>/scripts/*.js'
		  ]
		}, //end project
		
		
		/**
		 * Sass
		 */
		sass: {
		  dev: {
		    options: {
		      style: 'expanded',
		      compass: true
		    },
		    //what individual .css files do you want made?
		    files: {
		      'app/css/main.css': 'app/scss/style.scss'
		    }
		  },
		  dist: {

		  }
		}, //end sass

		
		/**
		 * Watch (recompiling Sass and LiveReload)
		 */
		watch: {
		  sass: {
		    files: '<%= project.app %>/scss/{,*/}*.{scss,sass}',
		    tasks: ['sass:dev'],
		  },
		  html: {
		  	files: '<%= project.app %>/*.html',
		  },
			options: {
				livereload: true,
			}
		}, //end watch

		
		/**
		 * UseminPrepare (build prep (minify, concat, uglify, etc)
		 */
		useminPrepare: {
		  //what html files do you want blocks replaced in?
		  //(all .html files by default)
		  html: [
		  	'app/*.html'
		  ],

		  options: {
		    dest: '<%= project.dist %>',
		    flow: {
		          //for html targets, only concat, don't min
		          html: {
		            steps: {
		              js: ['concat'],
		              css: ['concat']
		            },
		            post: {}
		          }
		        }
		  }
		}, //end useminPrepare


		/**
		 * Usemin (performs rewrites based on the useminPrepare configuration)
		 */
		usemin: {
		  options: {
		    
		  },
		  //what html files (in dist) do you want blocks replaced in?
		  html: [
			'<%= project.dist %>/{,*/}*.html',
			'<%= project.dist %>/{,*/}*.asp'
		  ],
		  css: ['<%= project.dist %>/styles/{,*/}*.css']
		}, //end usemin


		/**
		 * Copy (copies files for build process)
		 */
		copy: {
		  dist: {
		    files: [{
		      expand: true,
		      dot: true,
		      cwd: '<%= project.app %>',
		      dest: '<%= project.dist %>',
		      src: [
		        '*.html'
		      ]
		    }]
		  }, //end dist
		  
		  //copy all styles to dist
		  // styles: {
		  //   expand: true,
		  //   dot: true,
		  //   cwd: '<%= project.app %>/css',
		  //   dest: '<%= project.dist %>/css',
		  //   src: '{,*/}*.css'
		  // },

		  //copy all scripts to dist
		  scripts: {
		    expand: true,
		    dot: true,
		    cwd: '<%= project.app %>/scripts',
		    dest: '<%= project.dist %>/scripts',
		    src: '{,*/}*.js'
		  },
		  
		  //make an .asp version of all .html files
		  asp: {
		    files: [{
		      expand: true,
		      dot: true,
		      flatten: true,
		      cwd: '<%= project.dist %>',
		      src: ['{,*/}*.html'],
		      dest: '<%= project.dist %>',
		      ext: '.asp'
		    }]
		  },
    	
    	//copy all images to dist
		  images: {
		      files: [
		        { 
		          expand: true,
		          cwd: '<%= project.app %>/img/', 
		          src: ['**/*.{png,jpg,svg}'], 
		          dest:'<%= project.dist %>/img/' 
		        }
		      ]
		    }
		}, //end copy

		
		/**
		 * Concat ('flattens' JS and CSS into single files (build only) )
		 */
		concat: {
		  dist: {}
		},
	  	
	  	
		/**
		 * Clean (clears files from build directories)
		 */
		clean: {
		  dist: {
		    files: [{
		      dot: true,
		      src: [
		        '.tmp',
		        ['<%= project.dist %>/*', '!<%= project.dist %>/sftp-config.json'],
		        '!<%= project.dist %>/.git*',
		      ]
		    }]
		  },
		  distHtml: {
		    //cleans all .html from dist (so only .asp exist)
		    files: [{
		      dot: true,
		      src: '<%= project.dist %>/*.html',
		    }]
		  }
		}, //end clean


	  	/**
		 * Express
		 */
		express: {
		  // grunt-express will serve the files from the folders listed in `bases`
		  // on specified `port` and `hostname`
	      all: {
	        options: {
	          port: 9000,
	          hostname: "localhost",
	          bases: ['app', 'bower_components'],
	          livereload: true
	        }
	      }
	    }, //end express

	    
	    /**
		 * Open (auto opens browser at project URL)
		 */
	    open: {
	      all: {
	        // Gets the port from the connect configuration
	        path: 'http://localhost:<%= express.all.options.port%>'
	      }
	    },//end open

        
        /**
    	 * Wiredep (automatically adds dependencies)
    	 */
	    wiredep: {
	      task: {
	        // Point to the files that should be updated when
	        // you run `grunt wiredep`
	        src: [
	          '<%= project.app %>/*.html',   // .html support...
	          '<%= project.app %>/scss/style.scss',  // .scss & .sass support...
	        ],

	        options: {
	          // See wiredep's configuration documentation for the options
	          // you may pass:

	          // https://github.com/taptapship/wiredep#configuration
	        }
	      }
	    }// end wiredep

	}); // end initConfig
	
	
	/**
	 * Load Grunt plugins
	 */
	 grunt.loadNpmTasks('grunt-contrib-sass');
	 grunt.loadNpmTasks('grunt-contrib-watch');
	 grunt.loadNpmTasks('grunt-contrib-concat');
	 grunt.loadNpmTasks('grunt-contrib-clean');
	 grunt.loadNpmTasks('grunt-contrib-copy');
	 grunt.loadNpmTasks('grunt-usemin');
	 grunt.loadNpmTasks('grunt-express');
	 grunt.loadNpmTasks('grunt-open');
	 grunt.loadNpmTasks('grunt-wiredep');
	
	/**
	 * Default task
	 * Run `grunt` on the command line
	 */
	grunt.registerTask('default', [
	  'sass:dev',
	  'watch'
	]);

	/**
	 * Server task
	 * Run `grunt serve` on the command line to start local dev server
	 */
	grunt.registerTask('serve', [
      'express',
      'open',
      'sass:dev',
      'watch'
  	]);

  	/**
  	 * Build task
  	 * Run `grunt build` on the command line to build a dist directory for upload
  	 */
 	grunt.registerTask('build', [
       'clean:dist',
       'useminPrepare',
       'usemin',
       'concat',
       'copy:dist',
       // 'copy:styles',
       'copy:scripts',
       'copy:images',
       // 'copy:asp',
       'usemin'
       // 'clean:distHtml'
   	]);

};

