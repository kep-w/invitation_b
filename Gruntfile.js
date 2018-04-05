module.exports = function(grunt){
	var vesion="v1.0.2";
	var sourceDir = "src";
	var finalDir = "bmw";
	var devsourceDir = sourceDir+"/dev";
	var devbuildDir = sourceDir+"/.build";
	var devfinalDir = finalDir+"/"+vesion;

	grunt.initConfig({
		//css合并
		css_combo:{
			options: {
                debug: false,
                compress: false
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: devsourceDir,
                        src: ['**/**/*_style.css'],
                        dest: devbuildDir
                    }
                ]
            }
		},
		//添加前缀
		postcss:{
			options:{
				processors:[
					require('autoprefixer')({browsers: ['> 0%']})
				]
			},
			dist:{
				expand:true,
				cwd:devbuildDir,
				src:"**/*_style.css",
				dest:devfinalDir
			}
		},
		copy:{
			static:{
				expand:true,
				flatten:false,
				cwd:devsourceDir,
				src:["**/*","!**/*.css"],
				dest:devfinalDir,
				filter: 'isFile'
			},
			html:{
				expand:true,
				flatten:false,
				cwd:sourceDir,
				src:["**/*.html","!**/*.css"],
				dest:finalDir,
				filter: 'isFile'
			}
		},
		replace:{
			replace_path:{
				expand: true,
                src: [finalDir+'/**/**/*.html',finalDir+'/**/**/*.js'],
                // src:["app/index."]
                overwrite: true, 
                replacements:[{
					from: /dev\//gi,
					to: vesion+"/"
                }]
			}
		},
		clean:{
			build:[devbuildDir],
			final:[finalDir]
		}
	});
	grunt.loadNpmTasks("grunt-postcss");
	grunt.loadNpmTasks("grunt-css-combo");
  	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-text-replace');


	// grunt.registerTask("default",["css_combo","postcss"]);
	grunt.registerTask("default",["clean:final","copy","css_combo","postcss","clean:build","replace"]);
}