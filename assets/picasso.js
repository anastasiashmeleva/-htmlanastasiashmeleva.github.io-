(function() {
  $(function() {

    /*  Globals
    -------------------------------------------------- */
    var PROPERTIES =               ['translateX', 'translateY', 'opacity', 'rotate', 'scale'],
        $window =                  $(window),
        $body =                    $('body'),
        wrappers =                 [],
        currentWrapper =           null,
        scrollTimeoutID =          0,
        bodyHeight =               0,
        windowHeight =             0,
        windowWidth =              0,
        prevKeyframesDurations =   0,
        scrollTop =                0,
        relativeScrollTop =        0,
        currentKeyframe =          0,
        keyframes = [
          {
            'wrapper' : '#explosion1',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : '-25%',
                'opacity'     : [0, 1.75] // hack to accelrate opacity speed
              } , {
                'selector'    : '#domExplosionList1',
                'translateY'  : '-70%',
                'opacity'     : [0, 1] // hack to accelrate opacity speed
              }
            ]
          } , {
            'wrapper' : '#explosion1',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '#explosion1 .dei-1',
                'translateY'  : '-15%',
                'translateX'  : '-10%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '#explosion1 .dei-2',
                'translateY'  : '-5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '#explosion1 .dei-3',
                'translateY'  : '-9%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '#explosion1 .dei-4',
                'translateY'  : '-17%',
                'translateX'  : '8%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.5,
              } , {
                'selector'    : '#explosion1 .dei-5',
                'translateY'  : '-2%',
                'translateX'  : '-15%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '#explosion1 .dei-6',
                'translateY'  : '-1%',
                'translateX'  : '-7%',
                'opacity'     : [1, 0], // hack to decelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '#explosion1 .dei-7',
                'translateY'  : '-4%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.1,
              } , {
                'selector'    : '#explosion1 .dei-8',
                'translateY'  : '-3%',
                'translateX'  : '12%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.8,
              } , {
                'selector'    : '#explosion1 .dei-9',
                'translateY'  : '3%',
                'translateX'  : '-12%',
                'opacity'     : [1, 0],
                'scale'       : 1.5,
              } , {
                'selector'    : '#explosion1 .dei-10',
                'translateY'  : '5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '#explosion1 .dei-11',
                'translateY'  : '8%',
                'translateX'  : '6%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.4,
              } , {
                'selector'    : '#explosion1 .dei-12',
                'translateY'  : '1%',
                'translateX'  : '20%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.9,
              }
            ]
          } , {
            'wrapper' : '#explosion1',
            'duration' : '10%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : ['-25%', '-40%'],
                'opacity'     : [1, 0] // hack to accelrate opacity speed
              }
            ]
          } ,
            {
            'wrapper' : '#explosion2',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : '-25%',
                'opacity'     : [0, 1.75] // hack to accelrate opacity speed
              } , {
                'selector'    : '#domExplosionList2',
                'translateY'  : '-70%',
                'opacity'     : [0, 1] // hack to accelrate opacity speed
              }
            ]
          } , {
            'wrapper' : '#explosion2',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '#explosion2 .dei-1',
                'translateY'  : '-15%',
                'translateX'  : '-10%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '#explosion2 .dei-2',
                'translateY'  : '-5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '#explosion2 .dei-3',
                'translateY'  : '-9%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '#explosion2 .dei-4',
                'translateY'  : '-17%',
                'translateX'  : '8%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.5,
              } , {
                'selector'    : '#explosion2 .dei-5',
                'translateY'  : '-2%',
                'translateX'  : '-15%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '#explosion2 .dei-6',
                'translateY'  : '-1%',
                'translateX'  : '-7%',
                'opacity'     : [1, 0], // hack to decelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '#explosion2 .dei-7',
                'translateY'  : '-4%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.1,
              } , {
                'selector'    : '#explosion2 .dei-8',
                'translateY'  : '-3%',
                'translateX'  : '12%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.8,
              } , {
                'selector'    : '#explosion2 .dei-9',
                'translateY'  : '3%',
                'translateX'  : '-12%',
                'opacity'     : [1, 0],
                'scale'       : 1.5,
              } , {
                'selector'    : '#explosion2 .dei-10',
                'translateY'  : '5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '#explosion2 .dei-11',
                'translateY'  : '8%',
                'translateX'  : '6%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.4,
              } , {
                'selector'    : '#explosion2 .dei-12',
                'translateY'  : '1%',
                'translateX'  : '20%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.9,
              }
            ]
          } , {
            'wrapper' : '#explosion2',
            'duration' : '10%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : ['-25%', '-40%'],
                'opacity'     : [1, 0] // hack to accelrate opacity speed
              }
            ]
          } ,
            {
            'wrapper' : '#explosion3',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : '-25%',
                'opacity'     : [0, 1.75] // hack to accelrate opacity speed
              } , {
                'selector'    : '#domExplosionList3',
                'translateY'  : '-70%',
                'opacity'     : [0, 1] // hack to accelrate opacity speed
              }
            ]
          } , {
            'wrapper' : '#explosion3',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '#explosion3 .dei-1',
                'translateY'  : '-15%',
                'translateX'  : '-10%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '#explosion3 .dei-2',
                'translateY'  : '-5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '#explosion3 .dei-3',
                'translateY'  : '-9%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '#explosion3 .dei-4',
                'translateY'  : '-17%',
                'translateX'  : '8%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.5,
              } , {
                'selector'    : '#explosion3 .dei-5',
                'translateY'  : '-2%',
                'translateX'  : '-15%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '#explosion3 .dei-6',
                'translateY'  : '-1%',
                'translateX'  : '-7%',
                'opacity'     : [1, 0], // hack to decelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '#explosion3 .dei-7',
                'translateY'  : '-4%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.1,
              } , {
                'selector'    : '#explosion3 .dei-8',
                'translateY'  : '-3%',
                'translateX'  : '12%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.8,
              } , {
                'selector'    : '#explosion3 .dei-9',
                'translateY'  : '3%',
                'translateX'  : '-12%',
                'opacity'     : [1, 0],
                'scale'       : 1.5,
              } , {
                'selector'    : '#explosion3 .dei-10',
                'translateY'  : '5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '#explosion3 .dei-11',
                'translateY'  : '8%',
                'translateX'  : '6%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.4,
              } , {
                'selector'    : '#explosion3 .dei-12',
                'translateY'  : '1%',
                'translateX'  : '20%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.9,
              }
            ]
          } , {
            'wrapper' : '#explosion3',
            'duration' : '10%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : ['-25%', '-40%'],
                'opacity'     : [1, 0] // hack to accelrate opacity speed
              }
            ]
          } ,
            {
            'wrapper' : '#explosion4',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : '-25%',
                'opacity'     : [0, 1.75] // hack to accelrate opacity speed
              } , {
                'selector'    : '#domExplosionList4',
                'translateY'  : '-70%',
                'opacity'     : [0, 1] // hack to accelrate opacity speed
              }
            ]
          } , {
            'wrapper' : '#explosion4',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '#explosion4 .dei-1',
                'translateY'  : '-15%',
                'translateX'  : '-10%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '#explosion4 .dei-2',
                'translateY'  : '-5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '#explosion4 .dei-3',
                'translateY'  : '-9%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '#explosion4 .dei-4',
                'translateY'  : '-17%',
                'translateX'  : '8%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.5,
              } , {
                'selector'    : '#explosion4 .dei-5',
                'translateY'  : '-2%',
                'translateX'  : '-15%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '#explosion4 .dei-6',
                'translateY'  : '-1%',
                'translateX'  : '-7%',
                'opacity'     : [1, 0], // hack to decelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '#explosion4 .dei-7',
                'translateY'  : '-4%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.1,
              } , {
                'selector'    : '#explosion4 .dei-8',
                'translateY'  : '-3%',
                'translateX'  : '12%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.8,
              } , {
                'selector'    : '#explosion4 .dei-9',
                'translateY'  : '3%',
                'translateX'  : '-12%',
                'opacity'     : [1, 0],
                'scale'       : 1.5,
              } , {
                'selector'    : '#explosion4 .dei-10',
                'translateY'  : '5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '#explosion4 .dei-11',
                'translateY'  : '8%',
                'translateX'  : '6%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.4,
              } , {
                'selector'    : '#explosion4 .dei-12',
                'translateY'  : '1%',
                'translateX'  : '20%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.9,
              }
            ]
          } , {
            'wrapper' : '#explosion4',
            'duration' : '10%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : ['-25%', '-40%'],
                'opacity'     : [1, 0] // hack to accelrate opacity speed
              }
            ]
          } ,
            {
            'wrapper' : '#explosion5',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : '-25%',
                'opacity'     : [0, 1.75] // hack to accelrate opacity speed
              } , {
                'selector'    : '#domExplosionList5',
                'translateY'  : '-70%',
                'opacity'     : [0, 1] // hack to accelrate opacity speed
              }
            ]
          } , {
            'wrapper' : '#explosion5',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '#explosion5 .dei-1',
                'translateY'  : '-15%',
                'translateX'  : '-10%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '#explosion5 .dei-2',
                'translateY'  : '-5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '#explosion5 .dei-3',
                'translateY'  : '-9%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '#explosion5 .dei-4',
                'translateY'  : '-17%',
                'translateX'  : '8%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.5,
              } , {
                'selector'    : '#explosion5 .dei-5',
                'translateY'  : '-2%',
                'translateX'  : '-15%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '#explosion5 .dei-6',
                'translateY'  : '-1%',
                'translateX'  : '-7%',
                'opacity'     : [1, 0], // hack to decelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '#explosion5 .dei-7',
                'translateY'  : '-4%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.1,
              } , {
                'selector'    : '#explosion5 .dei-8',
                'translateY'  : '-3%',
                'translateX'  : '12%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.8,
              } , {
                'selector'    : '#explosion5 .dei-9',
                'translateY'  : '3%',
                'translateX'  : '-12%',
                'opacity'     : [1, 0],
                'scale'       : 1.5,
              } , {
                'selector'    : '#explosion5 .dei-10',
                'translateY'  : '5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '#explosion5 .dei-11',
                'translateY'  : '8%',
                'translateX'  : '6%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.4,
              } , {
                'selector'    : '#explosion5 .dei-12',
                'translateY'  : '1%',
                'translateX'  : '20%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.9,
              }
            ]
          } , {
            'wrapper' : '#explosion5',
            'duration' : '10%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : ['-25%', '-40%'],
                'opacity'     : [1, 0] // hack to accelrate opacity speed
              }
            ]
          } ,
            {
            'wrapper' : '#explosion6',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : '-25%',
                'opacity'     : [0, 1.75] // hack to accelrate opacity speed
              } , {
                'selector'    : '#domExplosionList6',
                'translateY'  : '-70%',
                'opacity'     : [0, 1] // hack to accelrate opacity speed
              }
            ]
          } , {
            'wrapper' : '#explosion6',
            'duration' : '50%',
            'animations' :  [
              {
                'selector'    : '#explosion6 .dei-1',
                'translateY'  : '-15%',
                'translateX'  : '-10%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '#explosion6 .dei-2',
                'translateY'  : '-5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '#explosion6 .dei-3',
                'translateY'  : '-9%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '#explosion6 .dei-4',
                'translateY'  : '-17%',
                'translateX'  : '8%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.5,
              } , {
                'selector'    : '#explosion6 .dei-5',
                'translateY'  : '-2%',
                'translateX'  : '-15%',
                'opacity'     : [1, 0],
                'scale'       : 2,
              } , {
                'selector'    : '#explosion6 .dei-6',
                'translateY'  : '-1%',
                'translateX'  : '-7%',
                'opacity'     : [1, 0], // hack to decelrate opacity speed
                'scale'       : 1.2,
              } , {
                'selector'    : '#explosion6 .dei-7',
                'translateY'  : '-4%',
                'translateX'  : '2%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.1,
              } , {
                'selector'    : '#explosion6 .dei-8',
                'translateY'  : '-3%',
                'translateX'  : '12%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.8,
              } , {
                'selector'    : '#explosion6 .dei-9',
                'translateY'  : '3%',
                'translateX'  : '-12%',
                'opacity'     : [1, 0],
                'scale'       : 1.5,
              } , {
                'selector'    : '#explosion6 .dei-10',
                'translateY'  : '5%',
                'translateX'  : '-4%',
                'opacity'     : [1, 0] // hack to decelrate opacity speed
              } , {
                'selector'    : '#explosion6 .dei-11',
                'translateY'  : '8%',
                'translateX'  : '6%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.4,
              } , {
                'selector'    : '#explosion6 .dei-12',
                'translateY'  : '1%',
                'translateX'  : '20%',
                'opacity'     : [1, 0], // hack to accelrate opacity speed
                'scale'       : 1.9,
              }
            ]
          } , {
            'wrapper' : '#explosion6',
            'duration' : '10%',
            'animations' :  [
              {
                'selector'    : '.explosion-byline',
                'translateY'  : ['-25%', '-40%'],
                'opacity'     : [1, 0] // hack to accelrate opacity speed
              }
            ]
          } 
        ]

    /*  Construction
    -------------------------------------------------- */
    init = function() {
      scrollIntervalID = setInterval(updatePage, 10);
      setupValues();
      $window.resize(throwError)
      if(isTouchDevice) {
        $window.resize(throwError)
      }
    }

    setupValues = function() {
      scrollTop = $window.scrollTop();
      windowHeight = $window.height();
      windowWidth = $window.width();
      convertAllPropsToPx();
      buildPage();
    }

    buildPage = function() {
      var i, j, k;
      for(i=0;i<keyframes.length;i++) { // loop keyframes
          bodyHeight += keyframes[i].duration;
          if($.inArray(keyframes[i].wrapper, wrappers) == -1) {
            wrappers.push(keyframes[i].wrapper);
          }
          for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
            Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
              value = keyframes[i].animations[j][key];
              if(key !== 'selector' && value instanceof Array === false) {
                var valueSet = [];
                valueSet.push(getDefaultPropertyValue(key), value);
                value = valueSet;
              }
              keyframes[i].animations[j][key] = value;
            });
          }
      }
      //$body.height(bodyHeight);
      $window.scroll(0);
      currentWrapper = wrappers[0];
      $(currentWrapper).show();
    }

    convertAllPropsToPx = function() {
      var i, j, k;
      for(i=0;i<keyframes.length;i++) { // loop keyframes
        keyframes[i].duration = convertPercentToPx(keyframes[i].duration, 'y');
        for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
          Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
            value = keyframes[i].animations[j][key];
            if(key !== 'selector') {
              if(value instanceof Array) { // if its an array
                for(k=0;k<value.length;k++) { // if value in array is %
                  if(typeof value[k] === "string") {
                    if(key === 'translateY') {
                      value[k] = convertPercentToPx(value[k], 'y');
                    } else {
                      value[k] = convertPercentToPx(value[k], 'x');
                    }
                  }
                } 
              } else {
                if(typeof value === "string") { // if single value is a %
                  if(key === 'translateY') {
                    value = convertPercentToPx(value, 'y');
                  } else {
                    value = convertPercentToPx(value, 'x');
                  }
                }
              }
              keyframes[i].animations[j][key] = value;
            }
          });
        }
      }
    }

    getDefaultPropertyValue = function(property) {
      switch (property) {
        case 'translateX':
          return 0;
        case 'translateY':
          return 0;
        case 'scale':
          return 1;
        case 'rotate':
          return 0;
        case 'opacity':
          return 1;
        default:
          return null;
      }
    }

    /*  Animation/Scrolling
    -------------------------------------------------- */
    updatePage = function() {
      window.requestAnimationFrame(function() {
        setScrollTops();
        if(scrollTop > 0 && scrollTop <= (bodyHeight - windowHeight)) {
          animateElements();
          setKeyframe();
        }
      });
    }

    setScrollTops = function() {
      scrollTop = $window.scrollTop();
      relativeScrollTop = scrollTop - prevKeyframesDurations;
    }

    animateElements = function() {
      var animation, translateY, translateX, scale, rotate, opacity;
      for(var i=0;i<keyframes[currentKeyframe].animations.length;i++) {
        animation   = keyframes[currentKeyframe].animations[i];
        translateY  = calcPropValue(animation, 'translateY');
        translateX  = calcPropValue(animation, 'translateX');
        scale       = calcPropValue(animation, 'scale');
        rotate      = calcPropValue(animation, 'rotate');
        opacity     = calcPropValue(animation, 'opacity');

        $(animation.selector).css({
          'transform':    'translate3d(' + translateX +'px, ' + translateY + 'px, 0) scale('+ scale +') rotate('+ rotate +'deg)',
          'opacity' : opacity
        })
      }
    }

    calcPropValue = function(animation, property) {
      var value = animation[property];
      if(value) {
        value = easeInOutQuad(relativeScrollTop, value[0], (value[1]-value[0]), keyframes[currentKeyframe].duration);
      } else {
        value = getDefaultPropertyValue(property);
      }
      // value = +value.toFixed(2) 
      // TEMPORARILY REMOVED CAUSE SCALE DOESN'T WORK WITHA AGRESSIVE ROUNDING LIKE THIS
      return value;
    }

    easeInOutQuad = function (t, b, c, d) {
      //sinusoadial in and out
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    };

    setKeyframe = function() {
      if(scrollTop > (keyframes[currentKeyframe].duration + prevKeyframesDurations)) {
          prevKeyframesDurations += keyframes[currentKeyframe].duration;
          currentKeyframe++;
          showCurrentWrappers();
      } else if(scrollTop < prevKeyframesDurations) {
          currentKeyframe--;
          prevKeyframesDurations -= keyframes[currentKeyframe].duration;
          showCurrentWrappers();
      }
    }

    showCurrentWrappers = function() {
      var i;
      if(keyframes[currentKeyframe].wrapper != currentWrapper) {
        $(currentWrapper).hide();
        $(keyframes[currentKeyframe].wrapper).show();
        currentWrapper = keyframes[currentKeyframe].wrapper;
      }
    }

    /*  Helpers
    -------------------------------------------------- */

    convertPercentToPx = function(value, axis) {
      if(typeof value === "string" && value.match(/%/g)) {
        if(axis === 'y') value = (parseFloat(value) / 100) * windowHeight;
        if(axis === 'x') value = (parseFloat(value) / 100) * windowWidth;
      }
      return value;
    }

    throwError = function() {
      $body.addClass('page-error')
    }

    isTouchDevice = function() {
      return 'ontouchstart' in window // works on most browsers 
      || 'onmsgesturechange' in window; // works on ie10
    }

    init();

  })
}).call(this);