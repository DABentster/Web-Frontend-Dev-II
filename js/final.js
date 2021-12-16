const APIKey = "5223d088";
var fullListOfMoviesString = localStorage.getItem("fullListOfMovies");
var fullListOfMoviesObj;
if (fullListOfMoviesString === null) {
    fullListOfMoviesObj = { movies: [] };
}
else { fullListOfMoviesObj = JSON.parse(fullListOfMoviesString); }
var savedMoviesCommentsObj = {};
viewSavedMoviesList();

function openTab(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("navOpt");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" tab-selected", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " tab-selected";
    hideDetails();
}

function searchTitle(searchResultsPage = 1) {
    var searchTitle = document.getElementById("searchTitle").value;
    var searchText = "s=" + searchTitle;
    var searchType = "s";
    search(searchText, searchType, searchResultsPage);
}

function search(searchText, searchType, searchResultsPage = 1) {
    var page = "&page=" + searchResultsPage;
    var type = "&type=movie"; //alternate types are "&type=series" or "&type=game"
    var url = "https://www.omdbapi.com/?" + searchText + type + page + "&apikey=" + APIKey;
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status == 200)) {
            var searchResultsText = this.responseText;
            var searchResultsObj = JSON.parse(searchResultsText);
            if (searchType == "s") {
                hideDetails();
                if (searchResultsObj.Response == "False") {
                    var searchResults = document.getElementById("searchResults");
                    searchResults.innerHTML = "<h2 id='noResultsError'>No results found!</h2>";
                }
                else {
                    displaySearchResults(searchResultsObj, searchResultsPage, searchResultsObj.totalResults);
                }
            }
            else if (searchType == "i") {
                displayDetails(searchResultsObj);
            }
        }
    };
    req.send();
}

function displaySearchResults(searchResultsObj, searchResultsPage, searchResultsTotalResults) {
    var searchResults = "<div id='searchResultsTop'><h2>Search Results</h2></div> <ol id='searchResultsList' start='" + (searchResultsPage * 10 - 9) + "'>";
    for (var i = 0; i < searchResultsObj.Search.length; i++) {
        var imdbID = searchResultsObj.Search[i].imdbID;
        searchResults += "<li><img class='poster' src='" + searchResultsObj.Search[i].Poster + "' onerror='this.src=&quot;no-img.png&quot;; this.classList=&quot;posterNoImg&quot;;'> <span class='resultsTitle'>" + searchResultsObj.Search[i].Title + "</span><br/>" + "<strong>Type:</strong> " + searchResultsObj.Search[i].Type + "<br/>" + "<strong>Year:</strong> " + searchResultsObj.Search[i].Year + "<br/>" + "<strong>IMDb ID:</strong> " + "<span class='imdbID'>" + imdbID + "</span><br/> <button id='viewDetailsBtn_" + imdbID + "' class='viewDetailsBtn' onclick='searchID(&quot;" + imdbID + "&quot;);'>View Details</button></li>";
    }
    searchResults += "</ol>";

    var totalResultsPagesIntermediateCalculation = (Number(searchResultsTotalResults) / 10);
    var lastSearchResultPageHasLessThanMaxRetrievableResultsOnIt = false;
    if (((Number(searchResultsTotalResults) / 10) % 1) > 0) {
        lastSearchResultPageHasLessThanMaxRetrievableResultsOnIt = true;
    }
    var searchResultsTotalPages;
    if (lastSearchResultPageHasLessThanMaxRetrievableResultsOnIt) {
        searchResultsTotalPages = (Math.trunc(totalResultsPagesIntermediateCalculation) + 1);
    }
    else {
        searchResultsTotalPages = Math.trunc(totalResultsPagesIntermediateCalculation);
    }

    searchResults += "<div id='searchResultsBottom'><p>Page: " + searchResultsPage + " of " + searchResultsTotalPages + " (" + searchResultsTotalResults + " total ";
    if (Number(searchResultsTotalResults) > 1) {
        searchResults += "results)";
    }
    else {
        searchResults += "result)";
    }
    searchResults += "</p>";
    if (searchResultsPage > 1) {
        searchResults += "<button onclick='searchTitle(" + (searchResultsPage - 1) + ");'>Previous Page</button> ";
    }
    if ((searchResultsObj.Search.length == 10) && (searchResultsPage < searchResultsTotalPages)) {
        searchResults += "<button onclick='searchTitle(" + (searchResultsPage + 1) + ");'>Next Page</button>";
    }
    searchResults += "</div>";
    var searchResultsId = document.getElementById("searchResults");
    searchResultsId.innerHTML = searchResults;
    unhideSearchResults();
}

function searchID(imdbID) {
    var searchText = "i=" + imdbID;
    var searchType = "i";
    search(searchText, searchType);
}

function displayDetails(searchResultsObj) {
    var details = "<h2 id='idDetailsTitle'>" + searchResultsObj.Title + "</h2><p>";
    var imdbID = searchResultsObj.imdbID;
    details += "<img id='idDetailsPoster' src='" + searchResultsObj.Poster + "' onerror='this.src=&quot;no-img.png&quot;; document.getElementById(&quot;idDetailsPoster&quot;).id=&quot;detailsPosterNoImg&quot;;'><br/>" + "<strong>Type:</strong> " + searchResultsObj.Type + "<br/>" + "<strong>Genre:</strong> " + searchResultsObj.Genre + "<br/>" + "<strong>Year:</strong> " + searchResultsObj.Year + "<br/>" + "<strong>Released:</strong> " + searchResultsObj.Released + "<br/>" + "<strong>Runtime:</strong> " + searchResultsObj.Runtime + "<br/>" + "<strong>Director:</strong> " + searchResultsObj.Director + "<br/>" + "<strong>Actors:</strong> " + searchResultsObj.Actors + "<br/>" + "<strong>IMDb ID:</strong> " + "<span class='imdbID'>" + imdbID + "</span><br/> <button id='addMovieBtn' onclick='addMovie(&quot;" + imdbID + "&quot;);'>Add Movie to List</button> <button id='viewonIMDb' onclick='window.open(&quot;https://www.imdb.com/title/" + imdbID + "&quot;);'>View on IMDb</button> <button id='hideDetails' onclick='hideDetails();'>Hide Details</button>";
    var movieDataString = JSON.stringify(searchResultsObj);
    details += "<span id='movieDataString'>" + movieDataString + "</span></p>";
    var moreDetails = document.getElementById("moreDetails");
    moreDetails.innerHTML = details;
    moreDetails.classList.add("topBottomBorders");
    moreDetails.scrollIntoView({behavior: 'smooth'});
}

function hideDetails() {
    var moreDetails = document.getElementById("moreDetails");
    moreDetails.innerHTML = "";
    moreDetails.classList.remove("topBottomBorders");
}

function addMovie(imdbID) {
    var movieDataString = document.getElementById("movieDataString").innerHTML;
    var savedMovieObj = JSON.parse(movieDataString);
    var addStatusMessage = document.getElementById("addStatusMessage");
    var isDuplicate = false;
    for (var i = 0; i < fullListOfMoviesObj.movies.length; i++) {
        if (fullListOfMoviesObj.movies[i].imdbID == savedMovieObj.imdbID) {
            isDuplicate = true;
            const errorMessage = "<p class='error'>This title is already saved to your list.</p>";
            addStatusMessage.innerHTML = errorMessage;
            break;
        }
    }
    if (isDuplicate == false) {
        fullListOfMoviesObj.movies.push(savedMovieObj);
        saveCurrentMovieListData();
        const successMessage = "<p class='success'>Successfully added this title to your list.</p>";
        addStatusMessage.innerHTML = successMessage;
    }
    addStatusMessage.classList.remove("displayNone", "fadeOut");
    addStatusMessage.scrollIntoView({block: 'end', behavior: 'smooth'});
    setTimeout(function () {
        addStatusMessage.classList.add("fadeOut");
        setTimeout(function () {
            addStatusMessage.classList.add("displayNone");
        }, 1000);
    }, 3000);
}

function viewSavedMoviesList() {
    fullListOfMoviesString = localStorage.getItem("fullListOfMovies");
    if (fullListOfMoviesString !== null) {
        fullListOfMoviesObj = JSON.parse(fullListOfMoviesString);
    }
    var savedMovies = document.getElementById("savedMovies");
    var savedMoviesString = "<h2>Saved Movies</h2>";
    if ((fullListOfMoviesObj != null) && (fullListOfMoviesObj.movies.length != 0)) {
        savedMoviesString += "<ol id='savedMoviesList'>";
        for (var i = 0; i < fullListOfMoviesObj.movies.length; i++) {
            var imdbID = fullListOfMoviesObj.movies[i].imdbID;
            savedMoviesString += "<li><img class='poster floatLeft' src='" + fullListOfMoviesObj.movies[i].Poster + "' onerror='this.src=&quot;no-img.png&quot;; this.classList=&quot;posterNoImg&quot;;'> <span class='savedMovieTitle'>" + fullListOfMoviesObj.movies[i].Title + "</span><br/> (" + fullListOfMoviesObj.movies[i].Year + ") [" + fullListOfMoviesObj.movies[i].Type + "] <button id='viewDetailsBtn_" + imdbID + "' class='viewDetailsBtn' onclick='searchID(&quot;" + imdbID + "&quot;);'>View Details</button> <button id='removeFromListBtn_" + fullListOfMoviesObj.movies[i].imdbID + "' class='removeFromList' onclick='removeFromList(" + i + ", &quot;" + imdbID + "&quot;);'>Remove</button><div  id='commentsSection_" + imdbID + "' class='savedMovieComments'>Comments: <textarea id='comments_" + imdbID + "' class='savedMovieCommentsArea'>";
            var savedMoviesCommentsString = localStorage.getItem("savedMoviesComments");
            savedMoviesCommentsObj = JSON.parse(savedMoviesCommentsString);
            var savedComments;
            if (savedMoviesCommentsObj != null) {
                savedComments = savedMoviesCommentsObj[imdbID];
                if (savedComments != null) {
                    savedMoviesString += savedComments;
                }
            }
            else {
                savedMoviesCommentsObj = {};
            }
            savedMoviesString += "</textarea> <button class='saveCommentsBtn' onclick='saveComments(&quot;" + imdbID + "&quot;);'>Save Comments</button> <span id='commentsStatus_" + imdbID + "' class='commentsStatus'></span></div></li>";
        }
        savedMoviesString += "</ol> <div class='clearFloats'></div>";
    }
    else {
        savedMoviesString += "<p id='noSavedMoviesMessage'><em>No saved movies found</em></p>";
    }
    savedMovies.innerHTML = savedMoviesString;
}

function removeFromList(i, imdbID) {
    if (fullListOfMoviesObj.movies.length > 1) {
        fullListOfMoviesObj.movies.splice(i, 1);
        fullListOfMoviesString = JSON.stringify(fullListOfMoviesObj);
        localStorage.setItem("fullListOfMovies", fullListOfMoviesString);
    }
    else {
        localStorage.removeItem("fullListOfMovies");
        fullListOfMoviesObj = { movies: [] };
        console.log("Removed 'fullListOfMovies' from localStorage");
    }
    deleteComments(imdbID);

    viewSavedMoviesList();

    var removalStatus = document.getElementById("removalStatus");
    const successMessage = "<p class='success'>Successfully removed this title from your list.</p>";
    removalStatus.innerHTML = successMessage;
    removalStatus.classList.remove("displayNone", "fadeOut");
    removalStatus.scrollIntoView({block: 'start', behavior: 'smooth'});
    setTimeout(function () {
        removalStatus.classList.add("fadeOut");
        setTimeout(function () {
            removalStatus.classList.add("displayNone");
        }, 1000);
    }, 3000);
}

function saveCurrentMovieListData() {
    var fullListOfMovies = JSON.stringify(fullListOfMoviesObj);
    localStorage.setItem("fullListOfMovies", fullListOfMovies);
    viewSavedMoviesList();
}

function unhideSearchResults() {
    document.getElementById("searchResults").style.display = "block";
}

function hideSearchResults() {
    document.getElementById("searchResults").style.display = "none";
}

function saveComments(imdbID) {
    commentsText = document.getElementById("comments_" + imdbID).value;
    var emptyComments = false;
    if (commentsText == "") {
        deleteComments(imdbID);
        emptyComments = true;
    }
    else {
        savedMoviesCommentsObj[imdbID] = commentsText;
        var savedMoviesComments = JSON.stringify(savedMoviesCommentsObj);
        localStorage.setItem("savedMoviesComments", savedMoviesComments);
    }

    commentsStatus = document.getElementById("commentsStatus_" + imdbID);
    commentsStatus.classList.remove("displayNone", "fadeOut");
    if (emptyComments == true) {
        commentsStatus.innerHTML = "Comments deleted!";
    }
    else {
        commentsStatus.innerHTML = "Comments saved!";
    }
    setTimeout(function () {
        commentsStatus.classList.add("fadeOut");
        setTimeout(function () {
            commentsStatus.classList.add("displayNone");
        }, 1000);
    }, 3000);
}

function deleteComments(imdbID) {
    delete savedMoviesCommentsObj[imdbID];
    var savedMoviesComments = JSON.stringify(savedMoviesCommentsObj);
    localStorage.setItem("savedMoviesComments", savedMoviesComments);
}