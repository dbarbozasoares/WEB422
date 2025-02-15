document.addEventListener("DOMContentLoaded", function () {
  var table = document
    .getElementById("listingsTable")
    .getElementsByTagName("tbody")[0];
  let currentPage = 1; // page tracker
  const itemsPerPage = 10; // items per page

  function fetchListings(page) {
    fetch("/api/listings?page=${currentPage}&limit=${itemsPerPage}")
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
          const listSummary = document.createElement("td");
          listSummary.textContent = `${list.summary}`;
          listSummary.appendChild(lineBreak);
          listSummary.appendChild(listAccommodate);
          row.append(listSummary);
          table.append(row);

          row.addEventListener("click", function () {
            const listId = this.getAttribute("data-id");
            showListingDetail(listId);
            console.log("ROW ID: " + listId);
          });
        });
        document.getElementById("current-page").textContent = `Page: (${page})`;
        document.getElementById("prev-page").disabled = page === 1;
        document.getElementById("next-page").disabled =
          listings.length < itemsPerPage;
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
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const idToSearch = nameInput.value.trim();
    invalidNameMessage.textContent = "";
    invalidNameMessage.style.display = "none";

    console.log("Submit cliked"); // DEBUG

    if (idToSearch !== "") {
      console.log("ok");
    } else {
      invalidNameMessage.textContent = "Invalid name, try again";
    }
  });

  clearButton.addEventListener("click", function (event) {
    event.preventDefault();
    nameInput.textContent = "";
    nameInput.value = "";
    invalidNameMessage.style.display = "none";
  });

  // PAGINATIONS VARIABLES
  document.getElementById("next-page").addEventListener("click", function () {
    currentPage++;
    fetchListings(currentPage);
  });
  document
    .getElementById("previous-page")
    .addEventListener("click", function () {
      currentPage--;
      fetchListings(currentPage);
    });
});
