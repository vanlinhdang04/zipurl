function copyLink() {
  let linkElm = document.querySelector("#link-shorten");

  navigator.clipboard.writeText(linkElm.value);
  alert("Copy to clipboard");
}

function alert(msg) {
  let alertElm = document.querySelector("#alert");

  alertElm.innerHTML = msg;
  alertElm?.classList?.add("c-alert-show");
  setTimeout(() => {
    alertElm.classList.remove("c-alert-show");
  }, 3000);
}

function loading(action = true) {
  let overlayElm = document.querySelector("#overlay");

  if (action) {
    overlayElm.classList.add("overlay-show");
  } else {
    overlayElm.classList.remove("overlay-show");
  }
}

function shorten() {
  let inputElm = document.querySelector("#url");
  let shortenElm = document.querySelector("#link-shorten");
  let resultElm = document.querySelector("#result-box");

  const url = inputElm.value;
  if (!url) return alert("URL cannot be empty");

  loading(true);

  $.ajax({
    url: "/api/s",
    method: "POST",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ url: url }),
  }).done(function (result) {
    if (result?.shortUrl) {
      shortenElm.value = result?.shortUrl;
      resultElm.classList.add("opacity-100");
    } else {
        alert("An error has occurred");
    }
    loading(false);
  })
  .fail(function(error) {
    console.error('Error', error)
    loading(false);
    alert("An error has occurred")
  })

}

function resetResult() {
  let shortenElm = document.querySelector("#link-shorten");
  let resultElm = document.querySelector("#result-box");

  if (shortenElm.value) {
    shortenElm.value = "";
    resultElm.classList.remove("opacity-100");
  }
}
