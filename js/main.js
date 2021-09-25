//Table of Contents - List of Weekly Activities and/or Notes
function populateDynamicToC(){
    const links = [
      { label: 'Assignment Week 01: Test', url: 'test.html', },
      { label: 'Assignment Week 02: Adding Machine', url: 'week2.html', },
      { label: 'Assignment Week ##: NAME', url: 'week##.html', },
    ];

    const ol = document.getElementById('table_of_contents');
    links.forEach(link => {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.setAttribute('href', link.url);
      a.innerText = link.label;
      li.appendChild(a);
      ol.appendChild(li);
    });
}