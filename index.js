var imgdatauri;
var decoded;
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector("#image1").src = e.target.result;
      imgdatauri = e.target.result;
    };
  }
  reader.readAsDataURL(input.files[0]);
}

function decode(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      decoded = steg.decode(e.target.result);
    };
  }
  reader.readAsDataURL(input.files[0]);
}

function hideText() {
  document.querySelector("#image2").src = steg.encode(
    document.querySelector("#passkeyEncode").value +
      "||" +
      document.querySelector("#text").value,
    imgdatauri
  );
}

function displayText() {
  let toCheck = document.querySelector("#passkeyDecode").value;
  let str = String(decoded);
  let at = str.indexOf("||");
  if (str.startsWith("||") && toCheck.length === 0) {
    document.querySelector("#decoded").innerText = str.slice(2, str.length);
  } else {
    if (str.slice(0, at).localeCompare(toCheck) === 0) {
      document.querySelector("#decoded").innerText = str.slice(
        at + 2,
        str.length
      );
    } else {
      document.querySelector("#decoded").innerText =
        "Wrong Passkey or Choose correct image.";
    }
  }
}
