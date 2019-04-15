function toggleNavbar() {
    const navlinks = document.getElementById('navlinks');
    const mains = document.getElementsByTagName("main");
    const menubutton = document.getElementById('menubutton');
  
    if (navlinks.style.display == '') {
      navlinks.style.display = 'block';
      mains[0].style.display = 'none';
      menubutton.style.color = '#c40808';
    } else {
      navlinks.style.display = '';
      mains[0].style.display = 'block';       
      menubutton.style.color = '#fff';
    }
  }
  
function hideSubs() {
    document.getElementById('portfolios').style.display = 'none';
}
    
function showMenu(e) {
    hideSubs();
    document.getElementById(e).style.display = 'block';
}
  
function hideMenu(e) {
    document.getElementById(e).style.display = 'none';
}  

var code = '';
code += '<span id="menubutton" onclick="toggleNavbar()">&#9776;</span>';
code += '<span class="square"></span>';
code += '<span id="title">LAURA HARRIS</span>';
code += '<span class="spacer"></span>';
code += '<span id="navlinks">'
code += '  <ul>';
code += '     <li><a href="index.html" class="navLink">HOME</a></li>';
code += '     <li><a href="portfolio.html" class="navLink">PORTFOLIO</a></li>';
code += '     <li><a href="cv.html" class="navLink">CURRICULUM VITAE</a></li>';
code += '     <li><a href="thesis.html" class="navLink">THESIS</a></li>';
code += '     <li><a href="contact.html" class="navLink">CONTACT</a></li>';
code += '  </ul>';
code += '</span>'

function loadNav(){
    document.getElementById('navbar').innerHTML = code;
}

window.addEventListener("load", loadNav, false);
