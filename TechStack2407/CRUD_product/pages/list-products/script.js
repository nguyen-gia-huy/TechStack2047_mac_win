// -Json không phải kiểu dữ liệu, nó chỉ là định dạng dữ liệu
// -Json là kiểu dữ liệu string
// JSON.stringify(data) => chuyển đổi data sang định dạng json (kiểu dữ liệu string)
// JSON.parse(data) => chuyển đổi data từ định dạng json về kiểu dữ liệu ban đầu

const listProduct = JSON.parse(localStorage.getItem("listProduct")) || [];
console.log(listProduct);
// Các input
const $idProduct = document.getElementById("id");
const $titleProduct = document.getElementById("title");
const $priceProduct = document.getElementById("price");
const $imageProduct = document.getElementById("image");
const $descriptionProduct = document.getElementById("description");
// Các button
const $btnCreateProduct = document.getElementById("create-product");

// Bước 1: gán event cho button thêm mới
$btnCreateProduct.addEventListener("click", function () {
  // Trong hàm
  // Bước 2: lấy các thông tin người dùng đã nhập ở các ô input
  const id = $idProduct.value;
  const title = $titleProduct.value;
  const price = $priceProduct.value;
  const image = $imageProduct.value;
  const description = $descriptionProduct.value;
  // Bước 3: kiểm tra thông tin (optional)
  // Tự làm
  // Bước 4: tạo 1 object mới (tương đương với tạo 1 sản phẩm mới) chứa các thông tin người dùng vừa nhập
  const newProduct = {
    id: Number(id),
    title: title,
    price: Number(price),
    image: image,
    description: description,
  };
  // Bước 5: thêm sản phẩm vừa tạo vào trong danh sách sản phẩm đã có
  listProduct.push(newProduct);
  // Bước 6: sau khi tạo thành công thì sẽ reset input
  $idProduct.value = "";
  $titleProduct.value = "";
  $priceProduct.value = "";
  $imageProduct.value = "";
  $descriptionProduct.value = "";
  // Bước 7: lưu thông tin danh sách sản phẩm mới nhất vào trong local storage
  localStorage.setItem("listProduct", JSON.stringify(listProduct));
  // Bước 8: gọi lại hàm renderListProduct để in thông tin danh sách sản phẩm mới nhất
  renderListProduct();
  console.log(listProduct);
});

function renderListProduct() {
  let htmlProducts = "";

  for (let product of listProduct) {
    htmlProducts += `
                <div class="col-3 mt-3" style="padding: 0px 12px">
					<div class="card" style="width: 18rem">
						<img
							src="${product.image}"
							class="card-img-top"
							alt="${product.title}"
                            style="width: 280px; height: 280px; object-fit: contain;"
						/>
						<div class="card-body">
							<h5 class="card-title">${product.title}</h5>
							<p class="card-text mt-1 mb-1">${product.price} VND</p>
							<p class="card-text">${product.description}</p>
							<button class="btn btn-primary">Xem chi tiết</button>
						</div>
					</div>
				</div>
            `;
  }

  document.getElementById("container-products").innerHTML = htmlProducts;
}

renderListProduct();
