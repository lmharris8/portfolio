function toggleNavbar() {
    const navlinks = document.getElementById('navlinks');
    const main = document.getElementsByTagName("main")[0];
    const menubutton = document.getElementById('menubutton');
  
    if (navlinks.style.display == '') {
      navlinks.style.display = 'block';
      main.style.display = 'none';
      menubutton.style.color = '#c40808';
    } else {
      navlinks.style.display = '';
      main.style.display = 'block';       
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

function getHeaderCode(page) {
  var code = '';
  code += '<span id="menubutton" onclick="toggleNavbar()">&#9776;</span>';
  code += '<span class="square"></span>';
  code += '<span id="title">LAURA HARRIS</span>';
  code += '<span class="spacer"></span>';
  code += '<span id="navlinks">'
  code += '  <ul>';
  code += '     <li><a href="index.html" class="navLink'

  if (page == 'home')
    code += ' active-link';

  code += '">HOME</a></li>';
  code += '     <li><a href="portfolio.html" class="navLink'

  if (page == 'portfolio')
    code += ' active-link';

  code += '">PORTFOLIO</a></li>';
  code += '     <li><a href="cv.html" class="navLink'

  if (page == 'cv')
    code += ' active-link';

  code += '">CURRICULUM VITAE</a></li>';
  code += '     <li><a href="thesis.html" class="navLink'

  if (page == 'thesis')
    code += ' active-link';

  code += '">THESIS</a></li>';
  code += '     <li><a href="contact.html" class="navLink'

  if (page == 'contact')
    code += ' active-link';

  code += '">CONTACT</a></li>';
  code += '  </ul>';
  code += '</span>'
  return code;
}

function loadNav(){
    currentPage = document.getElementById('currentPage').innerHTML;
    document.getElementById('navbar').innerHTML = getHeaderCode(currentPage);
}

window.addEventListener("load", loadNav, false);
