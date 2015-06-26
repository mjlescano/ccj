// Sorry for the mess. The site needed no build proccess.

// Init Scroll Position
smoothScroll.init()
smoothScroll.animateScroll(null, window.location.hash)

// Make querySelectorAll() results iterables.
NodeList.prototype.__proto__ = Array.prototype

;(function(){
  // http://davidwalsh.name/javascript-debounce-function
  function debounce(func, wait, immediate) {
    var timeout
    return function() {
      var context = this, args = arguments
      var later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  var hrefToSet = null
  var navigateDebounced = debounce(function(){
    if (history && history.replaceState) {
      history.replaceState({}, '', hrefToSet)
    } else {
      window.location = hrefToSet
    }
  }, 300)

  function navigate(href) {
    hrefToSet = href
    navigateDebounced()
  }

  var scrolledTo = window.location.hash
  var scrollToCurrentPageDebounced = debounce(function(){
    var scrollTo = window.location.hash
    if (scrolledTo && scrolledTo === scrollTo) return
    smoothScroll.animateScroll(null, window.location.hash)
    scrolledTo = scrollTo
  }, 1100)

  var activeItem = null
  function activate(item) {
    if (activeItem) {
      activeItem.classList.remove('active')
      activeItem = null
    }

    item.classList.add('active')
    activeItem = item

    navigate(item.href)
  }


  var menuItems = document.querySelectorAll('header > a')
  var pages = document.querySelectorAll('.page')

  function getMenuItem(pageName) {
    var item
    menuItems.forEach(function(el){
      if (pageName === el.attributes['data-page'].value) {
        item = el
      }
    })
    return item
  }

  var initialPage = location.hash && RegExp(location.hash + '$')

  pages.forEach(function(page){
    var menuItem = getMenuItem(page.id)

    if (initialPage && initialPage.test(menuItem.href)) {
      activate(menuItem)
    }

    function handler() {
      activate(menuItem)
      scrollToCurrentPageDebounced()
    }

    new Waypoint({
      element: page,
      handler: function(direction){
        console.log(page.id, 'top-in-view')
        if (direction == 'down') handler()
      },
      offset: '100%'
    })
    new Waypoint({
      element: page,
      handler: function(direction){
        console.log(page.id, 'bottom-in-view')
        if (direction == 'up') handler()
      },
      offset: '-100%'
    })
  })
})()
