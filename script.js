function sendMail() {
	const btn = document.querySelector("button");

	//Lấy dữ liệu
	const toEmail = document.getElementById("to_email").value;
	const message = document.getElementById("message").value;

	//Các trường không bắt buộc
	const orderId = document.getElementById("order_id").value || "N/A";
	const productName = document.getElementById("name").value || "Sản phẩm Game";
	const productPrice = document.getElementById("price").value || "0.00";
	const productUnits = document.getElementById("units").value || "1";

	//bắt buộc (*)
	if (!toEmail || !message) {
		alert("Vui lòng điền đầy đủ các trường bắt buộc có dấu (*)");
		return;
	}

	btn.innerText = "Đang xử lý...";
	btn.disabled = true;

	//Template
	const params = {
		to_email: toEmail,
		message: message,
		order_id: orderId,
		name: productName,
		price: productPrice,
		units: productUnits,
		//Vì Template có vòng lặp {{#orders}}
		orders: [
			{
				name: productName,
				price: productPrice,
				units: productUnits,
			},
		],
	};

	//Dùng Public Key
	emailjs
		.send("service_nqf8izi", "template_40z8ey6", params, "HiU9BU3CqSW0H7nNU")
		.then((res) => {
			alert("Đã gửi email hóa đơn thành công!");
		})
		.catch((err) => {
			console.error("Lỗi:", err);
			alert("Gửi thất bại! Lỗi: " + (err.text || "Kiểm tra lại cấu hình"));
		})
		.finally(() => {
			btn.innerText = "Gửi Email Ngay";
			btn.disabled = false;
		});
}
