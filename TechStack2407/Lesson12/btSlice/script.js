const $tagsLi = document.querySelectorAll("li.favorite-list-item");
for (let $tagLi of $tagsLi) {
  $tagLi.innerHTML = "ilovethisting";
  $tagLi.style.color = "red";
}
const content = prompt("nhap noi dung");
const $tagLi = document.createElement("li");
$tagLi.innerHTML = content;
document.getElementById("favorite-list").appendChild($tagLi);
