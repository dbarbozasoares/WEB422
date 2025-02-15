window.onload = function () {
  var allListings = document
    .getElementById("listingsTable")
    .getElementsByTagName("tbody")[0];

  fetch("/api/listings")
    .then((response) => response.json())
    .then((listings) => {
      console.log(listings[0].summary);
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
        allListings.append(row);

        row.addEventListener("click", function () {
          const listId = this.getAttribute("data-id");
          showListingDetail(listId);
          console.log("ROW ID: " + listId);
        });
      });
    });
};

function showListingDetail(listId) {
  const modal = document.getElementById("detailsModal");
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");
  fetch(`/api/listings/${listId}`)
    .then((response) => response.json())
    .then((listing) => {
      console.log(listing);
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
