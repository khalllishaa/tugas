class LoginForm {
    constructor() {
        // Mengambil elemen tautan login
        this.loginLink = document.getElementById("loginLink");

        // Menambahkan event listener untuk menampilkan form saat tautan login diklik
        this.loginLink.addEventListener("click", () => {
            this.showLoginForm();
        });
    }

    showLoginForm() {
        // Menggunakan prompt untuk mendapatkan input dari pengguna
        let user = prompt("Nama user:");
        console.log(typeof user);

        let password = prompt("Password:");
        console.log(typeof +password);

       
    }
}

const loginForm = new LoginForm();
