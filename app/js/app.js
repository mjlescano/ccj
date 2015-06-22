NodeList.prototype.__proto__ = Array.prototype

void function(){
  var menuItems = document.querySelectorAll('header .link')
  var pages = document.querySelectorAll('.page')

  var active = null
  function activate(menuItem) {
    if (active) {
      active.classList.remove('active')
      active = null
    }
    if (menuItem) {
      menuItem.classList.add('active')
      active = menuItem
    }
  }

  function getMenuItem(pageName) {
    var item
    menuItems.forEach(function(el){
      if (pageName === el.attributes['data-page'].value) {
        item = el
      }
    })
    return item
  }

  var initialPage = RegExp(window.location.hash + '$')

  pages.forEach(function(page){
    var menuItem = getMenuItem(page.id)
    if (menuItem && initialPage.test(menuItem.href)) activate(menuItem)

    function handler() { activate(menuItem) }

    new Waypoint({
      element: page,
      handler: handler,
      offset: '40%'
    })
    new Waypoint({
      element: page,
      handler: handler,
      offset: '-40%'
    })
  })
}()
