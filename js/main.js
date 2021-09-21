const links = [
  { label: 'Week 1 Notes', url: 'week1.html', }, // you can add other tags if you like
  { label: 'Week 2 Notes', url: 'week2.html', },
  { label: 'Week 3 Notes', url: 'week3.html', },
];

const ol = document.getElementById('assignments');      // whatever your OL tag ID is
links.forEach(link => {
  let li = document.createElement('li');
  let a = document.createElement('a');
  a.setAttribute('href', link.url);
  a.innerText = link.label;
  // add other tags of interest if you like (date submitted, score)
  li.appendChild(a);
  ol.appendChild(li);
});
