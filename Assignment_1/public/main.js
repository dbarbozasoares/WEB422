/********************************************************************************
 * WEB422 – Assignment 2
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Diego B Soares Student ID: ____145820239____ Date: __feb - 17 - 2025_______
 * Published URL: _________________https://github.com/dbarbozasoares/WEB422__________________________________________
 ********************************************************************************/
document.addEventListener("DOMContentLoaded", function () {
  var table = document
    .getElementById("listingsTable")
    .getElementsByTagName("tbody")[0];
  let currentPage = 1; // page tracker
  const itemsPerPage = 10; // items per page
  let searchName = null;

  let apiBaseUrl = "";

  if (window.location.hostname === "localhost") {
    // Local development API URL
    apiBaseUrl = "http://localhost:5000"; // Replace with your local API URL
  } else {
    // Vercel API
    apiBaseUrl = "https://webassignments-three.vercel.app"; // Replace with your deployed API URL
  }

  function fetchListings(page) {
    const url = searchName
      ? `${apiBaseUrl}/api/listings?page=${page}&perPage=${itemsPerPage}&name=${searchName}`
      : `${apiBaseUrl}/api/listings?page=${page}&perPage=${itemsPerPage}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((listings) => {
        table.innerHTML = "";
        listings.forEach((list) => {
          const lineBreak = document.createElement("br"); // FOR GENERAL USE
          const row = document.createElement("tr");
          row.setAttribute("data-id", list._id);
          const listName = document.createElement("td");
          listName.textContent = list.name;
          row.append(listName);
          const listType = document.createElement("td");
          listType.textContent = list.property_type;
          row.append(listType);

          const listLocation = document.createElement("td");
          const listStreet = document.createElement("p");
          listStreet.style.fontWeight = "bolder";
          listStreet.textContent = `${list.address.suburb}`;
          listLocation.textContent = list.address.street;
          listLocation.append(listStreet);
          row.append(listLocation);

          const listAccommodate = document.createElement("span");
          listAccommodate.textContent = `Accommodates: ${list.accommodates}`;
          listAccommodate.style.fontWeight = "bolder";

          const listRating = document.createElement("span");
          listRating.textContent = `${
            list.review_scores.review_scores_rating
              ? list.review_scores.review_scores_rating
              : "N/A"
          }`;
          listRating.style.fontWeight = "bolder";

          const listSummary = document.createElement("td");
          listSummary.innerHTML = `
            ${list.summary}<br>
            <span style="font-weight: bold;">Accommodates:</span> ${list.accommodates}<br>
            <span style="font-weight: bold;">Rating:</span> ${listRating.textContent} (${list.reviews.length} Reviews)<br>
            `;
          row.append(listSummary);
          table.append(row);

          row.addEventListener("click", function () {
            const listId = this.getAttribute("data-id");
            showListingDetail(listId);
            console.log("ROW ID: " + listId);
          });
        });
        document.getElementById("current-page").textContent = `${page}`; // display current page
        const prevPage = document.getElementById("prev-page");
        const nextPage = document.getElementById("next-page");
        // disable previous if we're on the first page
        prevPage.classList.toggle("disabled", page === 1);
        prevPage.style.pointerEvents = page === 1 ? "none" : "auto";

        // disable next page if there are fewer listings than items per page
        nextPage.classList.toggle("disabled", listings.length < itemsPerPage);
        nextPage.style.pointerEvents =
          listings.length < itemsPerPage ? "none" : "auto";
      });
  }

  fetchListings(currentPage);

  function showListingDetail(listId) {
    const modal = document.getElementById("detailsModal");
    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".modal-body");

    fetch(`/api/listings/${listId}`)
      .then((response) => response.json())
      .then((listing) => {
        modalTitle.textContent = listing.name;
        modalBody.innerHTML = `
          <img src=${listing.images.picture_url}>
          <p><strong>Price:</strong> ${listing.price.$numberDecimal} ${
          listing.security_deposit?.$numberDecimal &&
          listing.security_deposit?.$numberDecimal > 0
            ? `(Security deposit:${listing.security_deposit.$numberDecimal})`
            : " "
        }</p>
          <p><strong>Location:</strong> ${listing.address.street}, ${
          listing.address.suburb
        }</p>
          <p><strong>Summary:</strong> ${listing.summary}</p>
          <p><strong>Accommodates:</strong> ${listing.accommodates}</p>
          `;

        // pop up the modal
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
      });
  }

  // FORM VARIABLES
  const form = document.getElementById("search-form");
  const nameInput = document.getElementById("name");
  const clearButton = document.getElementById("clearForm");
  const invalidNameMessage = document.getElementById("invalid-name");

  // FORM FUNCTIONS
  function searchListingsByName(name) {
    searchName = name.trim();
    currentPage = 1; // Reset to page 1 when searching
    fetchListings(currentPage);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameToSearch = nameInput.value.trim();
    invalidNameMessage.textContent = "";
    invalidNameMessage.style.display = "none";

    console.log("Submit cliked"); // DEBUG

    if (nameToSearch !== "") {
      searchListingsByName(nameToSearch);
    } else {
      invalidNameMessage.textContent = "Invalid name, try again";
    }
  });

  clearButton.addEventListener("click", function (event) {
    event.preventDefault();
    nameInput.value = "";
    invalidNameMessage.style.display = "none";
    currentPage = 1;
    searchName = null;
    fetchListings(currentPage);
  });

  // PAGINATIONS VARIABLES
  document.getElementById("next-page").addEventListener("click", function () {
    currentPage++;
    fetchListings(currentPage);
  });
  document.getElementById("prev-page").addEventListener("click", function () {
    currentPage--;
    fetchListings(currentPage);
  });
});
