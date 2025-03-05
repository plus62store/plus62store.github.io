//<![CDATA[
$('#AdminToko').val('');

$('.chatWhatsapp').click(function () {
    $('#whatsapp-order').toggleClass('toggle');
});

// Tangani klik tombol order
$('#order').on("click", function (event) {
    event.preventDefault();
    prosesPembayaran();
});

// Tangani tekan Enter di input field
$("#whatsapp-order input, #whatsapp-order textarea").keypress(function (event) {
    if (event.which == 13) {
        event.preventDefault();
        prosesPembayaran();
    }
});

function showAlert(message) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Peringatan';
    alert.message = message;
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
}

function prosesPembayaran() {
    let nama = $('#whatsapp-order .nama').val().trim();
    let nomor = $('#whatsapp-order .nomor').val().trim();
    let email = $('#whatsapp-order .email').val().trim();
    let alamat = $('#whatsapp-order .alamat').val().trim();
    let kota = $('#whatsapp-order .kota').val().trim();
    let provinsi = $('#whatsapp-order .provinsi').val().trim();
    let kodepos = $('#whatsapp-order .kodepos').val().trim();
    let kurir = $('#whatsapp-order .informasi').val();

    let total = $('.simpleCart_total').text().replace(/[^\d]/g, "").trim();

    // Validasi form
    if (!nama || !nomor || !email || !alamat || !kota || !provinsi || !kodepos || total === "0") {
        showAlert("Harap isi semua data dengan benar dan pastikan keranjang tidak kosong.");
        return false;
    }

    let cartItems = [];
    let simpleCartData = JSON.parse(localStorage.getItem('simpleCart_items')) || {};

    Object.values(simpleCartData).forEach(item => {
        cartItems.push({
            id: item.id || "PROD-" + new Date().getTime(),
            name: item.name,
            price: parseInt(item.price) || 0,
            quantity: parseInt(item.quantity) || 1,
            subtotal: (parseInt(item.price) || 0) * (parseInt(item.quantity) || 1)
        });
    });

    if (cartItems.length === 0) {
        showAlert("Keranjang belanja kosong.");
        return;
    }

    let orderData = {
        nama, nomor, email, alamat, kota, provinsi, kodepos, kurir, total, items: cartItems
    };

    console.log("Mengirim data ke backend:", orderData);

    fetch("https://paymentlink-plus62store.vercel.app/api/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.redirect_url) {
            window.location.href = data.redirect_url;
        } else {
            showAlert("Gagal membuat transaksi. Silakan coba lagi.");
            console.error("Respon tidak valid:", data);
        }
    })
    .catch(error => {
        console.error("Terjadi kesalahan:", error);
        showAlert("Terjadi kesalahan dalam proses pembayaran.");
    });
}
//]]>