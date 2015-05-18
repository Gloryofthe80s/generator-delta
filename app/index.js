'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
 
var DeltaGenerator = yeoman.generators.Base.extend({
  promptUser: function() {
      var done = this.async();

      var prompts = [{
          name: 'appName',
          message: 'What is your app\'s name ?'
      }];

      this.prompt(prompts, function (props) {
          this.appName = props.appName;
 
          done();
      }.bind(this));
  },

  scaffoldFolders: function() {
      this.mkdir("css");
      this.mkdir("img");
      this.mkdir("scripts");
      this.mkdir("scss");
  },

  copyMainFiles: function() {

    var context = { 
        site_name: this.appName 
    };


    //html
    this.fs.copyTpl( 
      this.templatePath('_index.html'), 
      this.destinationPath('index.html'),
      { site_name : context.site_name },
      {
        //only evaluate {{= }} in the markup
        evaluate: /\{\{([\s\S]+?)\}\}/g,
        interpolate: /\{\{=([\s\S]+?)\}\}/g,
        escape: /\{\{-([\s\S]+?)\}\}/g
      } 
    );
    
    
    //scss
    this.fs.copy( 
      this.templatePath("_scss/_base.scss"), 
      this.destinationPath("scss/base.scss") 
    );
    this.fs.copy( 
      this.templatePath("_scss/_components.scss"), 
      this.destinationPath("scss/components.scss") 
    );
    this.fs.copy( 
      this.templatePath("_scss/_custom.scss"), 
      this.destinationPath("scss/custom.scss") 
    );
    this.fs.copy( 
      this.templatePath("_scss/_fonts.scss"), 
      this.destinationPath("scss/fonts.scss") 
    );
    this.fs.copy( 
      this.templatePath("_scss/_style.scss"), 
      this.destinationPath("scss/style.scss") 
    );
    this.fs.copy( 
      this.templatePath("_scss/_variables.scss"), 
      this.destinationPath("scss/variables.scss") 
    );


    //JS
    this.directory('_scripts/_vendor', 'scripts/vendor');
    
    this.fs.copy( 
      this.templatePath("_scripts/_main.js"), 
      this.destinationPath("scripts/main.js") 
    );
    

    //images  
    this.fs.copy( 
      this.templatePath("_img/_bbb.png"), 
      this.destinationPath("img/bbb.png") 
    ); 
    this.fs.copy( 
      this.templatePath("_img/_inc500.png"), 
      this.destinationPath("img/inc500.png") 
    ); 
    this.fs.copy( 
      this.templatePath("_img/_USCCA-logo.png"), 
      this.destinationPath("img/USCCA-logo.png") 
    ); 

    
    //config stuff
    this.fs.copyTpl( 
      this.templatePath("_package.json"), 
      this.destinationPath("package.json"),
      { site_name : context.site_name }
    );
    this.fs.copy( 
      this.templatePath("_Gruntfile.js"), 
      this.destinationPath("Gruntfile.js") 
    ); 
    
    console.log('\n All done! \n Take care and stay safe!')
  }
 
});
 
module.exports = DeltaGenerator;