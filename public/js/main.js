
function copyLink() {
  let linkElm = document.querySelector("#link-shorten");

  navigator.clipboard.writeText(linkElm.value);
  alert("Copy to clipboard");
}

function alert(msg, type = "info") {
  let alertElm = document.querySelector("#alert");

  const types = {
    "info": "alert-info",
    "success": "alert-success",
    "danger": "alert-danger",
    "warning": "alert-warning",
  }

  alertElm.innerHTML = msg;
  alertElm?.classList?.add("c-alert-show", types[type]);
  setTimeout(() => {
    alertElm.classList.remove("c-alert-show", types[type]);
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

const isValidURL = (str) => {
  let givenURL ;
    try {
        givenURL = new URL (str);
    } catch (error) {
       return false; 
    }
    return true;
};

function shorten() {
  let inputElm = document.querySelector("#url");
  let shortenElm = document.querySelector("#link-shorten");
  let resultElm = document.querySelector("#result-box");

  const url = inputElm.value;
  if (!url) return alert("URL cannot be empty");

  if(!isValidURL(url)) return alert("Invalid URL", 'danger')

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
    alert(error?.responseJSON?.message || "An error has occurred", "danger");
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

$('#form-shorten').submit(function() {
  shorten()

  return false
})
