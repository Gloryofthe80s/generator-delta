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
      this.mkdir("app");
      this.mkdir("app/css");
      this.mkdir("app/img");
      this.mkdir("app/scripts");
      this.mkdir("app/scss");
      this.mkdir("dist");
  },

  copyMainFiles: function() {

    var context = { 
        site_name: this.appName 
    };


    //html
    this.fs.copyTpl( 
      this.templatePath('_index.html'), 
      this.destinationPath('app/index.html'),
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
      this.destinationPath("app/scss/base.scss") 
    );
    this.fs.copy( 
      this.templatePath("_scss/_components.scss"), 
      this.destinationPath("app/scss/components.scss") 
    );
    this.fs.copy( 
      this.templatePath("_scss/_custom.scss"), 
      this.destinationPath("app/scss/custom.scss") 
    );
    this.fs.copy( 
      this.templatePath("_scss/_fonts.scss"), 
      this.destinationPath("app/scss/fonts.scss") 
    );
    this.fs.copy( 
      this.templatePath("_scss/_style.scss"), 
      this.destinationPath("app/scss/style.scss") 
    );
    this.fs.copy( 
      this.templatePath("_scss/_variables.scss"), 
      this.destinationPath("app/scss/variables.scss") 
    );
    
    
    //javascript
    this.fs.copy( 
      this.templatePath("_main.js"), 
      this.destinationPath("app/scripts/main.js") 
    ); 


    //images  
    this.fs.copy( 
      this.templatePath("_img/_bbb.png"), 
      this.destinationPath("app/img/bbb.png") 
    ); 
    this.fs.copy( 
      this.templatePath("_img/_inc500.png"), 
      this.destinationPath("app/img/inc500.png") 
    ); 
    this.fs.copy( 
      this.templatePath("_img/_USCCA-logo.png"), 
      this.destinationPath("app/img/USCCA-logo.png") 
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
    this.fs.copyTpl( 
      this.templatePath("_bower.json"), 
      this.destinationPath("bower.json"),
      { site_name : context.site_name }
    );    
    
    console.log('\n All done! \n Take care and stay safe!')
  }
 
});
 
module.exports = DeltaGenerator;