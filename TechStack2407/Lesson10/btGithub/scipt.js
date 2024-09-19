//1. Khai báo 1 đối tượng để mô tả bản thân bao gồm: tên, tuổi, địa chỉ, giới tính, sở thích (nhiều sở thích), chiều cao, cân nặng, tình trạng hôn nhân, số điện thoại.
//2. Khai báo 1 đối tượng là bạn trai/bạn gái của bạn: tên, tuổi, sự tốt bụng (1 - 10), nhà giàu (boolean).
//3. Viết chương trình kiểm tra nếu tuổi của bạn và bạn gái (trai) đều lớn hơn 20, in ra màn hình “Tầm này cưới được rồi”. Ngược lại, in ra “Chờ thêm chút nữa”

// const boyFriend = {
//   name: "huy",
//   age: 19,
//   address: "HoChiMinh",
//   gender: "male",
//   hobby: "study, reading, ride",
//   height: 165,
//   weight: 50,
//   status: "single",
//   phone: 12345,
// };
// const girlFriend = {
//   name: "Nhu",
//   age: 19,
//   nice: 9,
//   rich: true,
// };

// function checkAge() {
//   if (boyFriend.age > 18 && girlFriend.age > 18) {
//     return "tam nay cuoi dc roi";
//   } else {
//     return "cho them chut";
//   }
// }
// let abc = checkAge();
// console.log(abc);

//--------------------------------------------------------------------------------------------------------------------------
//1. Khai báo 1 function nhận đầu vào là chuỗi name, thực hiện in ra màn hình “Hello world, ” + name.

// function print(name) {
//     console.log("hello world, " + name);
//   }
//   print("huy");

//--------------------------------------------------------------------------------------------------------------------------
//2. Khai báo 1 function nhận đầu vào là 2 số a, b. Đầu ra là kết quả của phép tính (a + b)^2 .

// function print(a, b) {
//   console.log((a + b) ** 2);
// }
// print(3, 4);
//--------------------------------------------------------------------------------------------------------------------------

//3. Khai báo 1 function để nhập vào a từ bàn phím, tiếp tục nhập đến khi a là một số lớn hơn 0. Đầu ra là giá trị số vừa nhập.
// function inputNumber() {
//   let a;
//   do {
//     a = prompt("nhap a");
//     a = Number(a);
//   } while (a < 0);
//   return a;
// }
// const number = inputNumber();
// console.log(number);
//--------------------------------------------------------------------------------------------------------------------------
//1. Khai báo 1 function nhận vào chuỗi slogan. Cứ sau mỗi 5 giây, in ra slogan đó kèm biến đếm counter bắt đầu từ 1.
function printSlogan(slogan) {
  let counter = 1;

  setInterval(() => {
    console.log(`${slogan}-${counter}`);
    counter++;
  }, 5000);
}
printSlogan("in ra roi");
//2. Hãy sử dụng phương thức map để biến đổi 1 mảng texts bao gồm các chuỗi thành 1 mảng textsLength có các phần tử là chiều dài tương ứng của từng chuỗi trong mảng texts.
