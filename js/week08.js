const SWAPI = {
    urls: {
        base: 'https://swapi.dev/api/',
        People: 'people/',
        Planets: 'planets/',
        Films: 'films/',
        Species: 'species/',
        Vehicles: 'vehicles/',
        Ships: 'starships/',
    },
    start: () => {
        SWAPI.addListeners();
        SWAPI.addNav();
    },
    addListeners() {
        let nav = document.getElementById('nav');
        nav.addEventListener('click', SWAPI.getData);
        footer.addEventListener('click', SWAPI.getData);
    },
    addNav() {
        let df = new DocumentFragment();
        for (let nm in SWAPI.urls) {
            if (nm != 'base') {
                let link = document.createElement('a');
                link.href = `${SWAPI.urls.base}${SWAPI.urls[nm]}`;
                link.textContent = nm;
                link.setAttribute('data-link', `${SWAPI.urls.base}${SWAPI.urls[nm]}`);
                df.append(link);
            }
        }
        document.getElementById('nav').append(df);
    },
    getData(ev) {
        if (ev) ev.preventDefault();

        let link = ev.target;
        let url = link.getAttribute('data-link');

        fetch(url)
        .then((resp) => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
        })
        .then(SWAPI.buildList)
        .catch((err) => {
            console.error(err);
        });
    },
    details(data, name){
        let m = document.getElementById('main');
        console.log(data);

        let index = data.results.findIndex(x => item.name || item.title == name);
        let details = data.results[index].entries();
            m.innerHTML = details
            .map((item) => {
                    info = item.
                    return `<p></p>`;
                }
            )
            .join(' ');
    },
    buildList(data) {
        let m = document.getElementById('main');
        console.log(data);

        m.innerHTML = data.results
        .map((item) => {
            let nm = item.name || item.title;
            return `<p id="listItem">${nm}</p>`;
            // let listItem = document.getElementById('listItem');
            // listItem.addEventListener('click', details(data,nm));
            // return `<p onclick=details(${data},${nm})>${nm}</p>`;
        })
        .join(' ');
        // let listItem = document.getElementById('listItem');
        // listItem.addEventListener('click', details(data, nm));

        let footer = document.getElementById('footer');
        footer.innerHTML = '';

        if (data.previous) {
            let prev = document.createElement('a');
            prev.href = data.previous;
            let url = new URL(data.previous);
            let labels = url.pathname.split('/');
            let label = labels[labels.length - 2];
            prev.textContent = `⇐ Previous ${label}`;
            prev.setAttribute('data-link', data.previous);
            footer.append(prev);
        }
        let pages = Math.ceil(data.count/10);
        for(i = 1; i <= pages; i++){
            let link = document.createElement('a');
            link.href = data.next;
            let url = new URL(data.next);
            index = url.href.lastIndexOf("/");
            newurl = url.href.substr(0, index);
            newurl += `/?page=${i}`;
            link.href = newurl;
            url = new URL(newurl);
            let labels = url.pathname.split('/');
            let label = labels[labels.length - 2];
            link.textContent = `${i}`;
            link.setAttribute('data-link', url);
            footer.append(link);
        }
        if (data.next) {
            let next = document.createElement('a');
            next.href = data.next;
            let url = new URL(data.next);
            let labels = url.pathname.split('/');
            let label = labels[labels.length - 2];
            next.textContent = `Next ${label} ⇒`;
            next.setAttribute('data-link', data.next);
            footer.append(next);
        }
    },
};

document.addEventListener('DOMContentLoaded', SWAPI.start);