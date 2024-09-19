const $image = document.getElementById("img");
const $url = document.getElementById("url");
const $width = document.getElementById("width");
const $height = document.getElementById("height");
const $borderRadius = document.getElementById("border-radius");
const $alt = document.getElementById("alt");

// Change image URL
$url.onchange = function () {
  $image.src = $url.value;
};

// Change image width
$width.oninput = function () {
  $image.style.width = `${$width.value}px`;
};

// Change image height
$height.oninput = function () {
  $image.style.height = `${$height.value}px`;
};

// Change border-radius
$borderRadius.oninput = function () {
  $image.style.borderRadius = `${$borderRadius.value}px`;
};

// Change alt text
$alt.oninput = function () {
  $image.alt = $alt.value;
};
