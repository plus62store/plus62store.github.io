//<![CDATA[
$('#AdminToko').val('');
$('.chatWhatsapp').click(function () {
    $('#whatsapp-order').toggleClass('toggle');
});

$('#whatsapp-order .order').click(prosesPembayaran);
$("#whatsapp-order input, #whatsapp-order textarea").keypress(function (event) {
    if (event.which == 13) prosesPembayaran();
});

function prosesPembayaran(event) {
    event.preventDefault();

    let nama = $('#whatsapp-order .nama').val();
    let nomor = $('#whatsapp-order .nomor').val();
    let email = $('#whatsapp-order .email').val();
    let alamat = $('#whatsapp-order .alamat').val();
    let kota = $('#whatsapp-order .kota').val();
    let provinsi = $('#whatsapp-order .provinsi').val();
    let kodepos = $('#whatsapp-order .kodepos').val();
    let kurir = $('#whatsapp-order .informasi').val();
    let total = $('.simpleCart_total').text().replace("Rp ", "").replace(",", "").trim();

    if (!nama || !nomor || !email || !alamat || !kota || !provinsi || !kodepos || total === "0") {
        alert("Harap isi semua data dengan benar dan pastikan keranjang tidak kosong.");
        return false;
    }

    // Ambil item dari SimpleCart
    let cartItems = [];
    let simpleCartData = JSON.parse(localStorage.getItem('simpleCart_items')) || {};

    Object.values(simpleCartData).forEach(item => {
        cartItems.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity
        });
    });

    // Data yang dikirim ke backend
    let orderData = {
        nama, nomor, email, alamat, kota, provinsi, kodepos, kurir, total, items: cartItems
    };

    // Kirim ke backend
    fetch("https://paymentlink-plus62store.vercel.app/api/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.redirect_url) {
            window.location.href = data.redirect_url; // Redirect ke Midtrans
        } else {
            alert("Gagal membuat transaksi. Coba lagi.");
        }
    })
    .catch(error => console.error("Error:", error));
}
//]]>