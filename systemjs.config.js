/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/',
     
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
      'mongodb':'npm:mongodb',
      'express':'npm:express',
       'ng2-simple-page-scroll/ng2-simple-page-scroll': 'npm:ng2-simple-page-scroll/bundles/ng2-simple-page-scroll.umd.js',
   //   'services' : '/services', 
      // 'mongodb':''
      // other libraries
      'rxjs':                      'npm:rxjs',
      'highcharts': 'npm:highcharts/highcharts.js',
      'highcharts-more':'npm:highcharts/highcharts-more.js',

      'd3':'npm:d3/build/d3.js',
     //'modules':''
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'dependency-injection-es6':'npm:dependency-injection-es6/index.js',
      'container':'npm:dependency-injection-es6/src/container.js',
      'jquery':'npm:jquery/dist/jquery.js',
      'paginaton':'npm:twbs-pagination-1.4.1/jquery.twbsPagination.js',
      
      
    //  'container':'npm:de'

    },

    
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'dependency-injection-es6':{
       // main:'index.js',
        defaultExtension:'js',
        container:'./src/container.js',
        inject:'./src/inject.js'
      }
    }
  });
})(this);
