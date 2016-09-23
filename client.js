var input = document.getElementById('input')
var button = document.getElementById('button')
var nav = document.getElementById('nav')
var content = document.getElementById('content')
var body = document.body
var fromStorage = JSON.parse(localStorage.getItem('reddit')) || {}
var redditURL

navItems()

var Orbit = function () {}

Orbit.prototype.get = function (path, fn) {
  var req = new XMLHttpRequest()
  req.open('GET', path)
  req.send()
  req.addEventListener('load', fn.bind(req))

}

var redditRequest = new Orbit()

button.addEventListener('click', function () {
  if (input.value.length > 0) {
    nav.innerHTML = ''
    fromStorage[input.value] = input.value
    localStorage.setItem('reddit', JSON.stringify(fromStorage))
    navItems()
  }
})

body.addEventListener('click', function (e) {
  if (e.target.dataset.sub) {
    content.innerHTML = ''
    redditURL = e.target.dataset.sub

    redditRequest.get('https://www.reddit.com/r/' + redditURL + '.json', function () {
      var subContent = JSON.parse(this.response)
      var subArray = subContent.data.children
      var posts = ''
      subArray.forEach(function (ele) {
        posts += '<li><a href=' + ele.data.url + " target='_blank'>" + ele.data.title + '</a></li>'
      })

      content.innerHTML = posts
    })

  } else if (e.target.dataset.id) {
    delete fromStorage[e.target.dataset.id]
    localStorage.setItem('reddit', JSON.stringify(fromStorage))
    navItems()
    content.innerHTML = ''

  }
})

function navItems () {
  nav.innerHTML = ''
  for (var key in fromStorage) {
    nav.innerHTML += '<buttom class ="links" data-sub="' + key + '">' + key + '<span data-id="' + key + '">x</span></button>'
  }
}
