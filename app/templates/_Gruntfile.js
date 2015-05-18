'use strict';
 
module.exports = function(grunt) {

	/**
	 * Configuration
	 */
	grunt.initConfig({
		
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
		      'css/main.css': 'scss/style.scss'
		    }
		  }
		}, //end sass

		
		/**
		 * Watch (recompiling Sass and LiveReload)
		 */
		watch: {
		  sass: {
		    files: 'scss/{,*/}*.{scss,sass}',
		    tasks: ['sass:dev'],
		  },
		  html: {
		  	files: '*.html',
		  },
			options: {
				livereload: true,
			}
		}, //end watch


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
	          bases: '.',
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

	}); // end initConfig
	
	
	/**
	 * Load Grunt plugins
	 */
	 grunt.loadNpmTasks('grunt-contrib-sass');
	 grunt.loadNpmTasks('grunt-contrib-watch');
	 grunt.loadNpmTasks('grunt-express');
	 grunt.loadNpmTasks('grunt-open');
	
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
      'sass:dev',
      'open',
      'watch'
  	]);

};

