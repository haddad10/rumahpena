// This file can be used for any interactive JavaScript functionality.
// For now, we'll add a simple form submission handler placeholder.

document.addEventListener('DOMContentLoaded', () => {
    const donateForm = document.querySelector('#donate form');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.navbar-nav');
    const backToTopButton = document.getElementById('back-to-top');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const loadingMessage = document.querySelector('.loading-message');

    // Form Submission Handler with Enhanced Validation
    if (donateForm) {
        donateForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const amountInput = document.getElementById('amount');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const amountError = document.getElementById('amount-error');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const amount = parseFloat(amountInput.value);

            let isValid = true;

            // Clear previous errors
            nameInput.classList.remove('is-invalid');
            emailInput.classList.remove('is-invalid');
            amountInput.classList.remove('is-invalid');
            nameError.textContent = '';
            emailError.textContent = '';
            amountError.textContent = '';

            if (name === '') {
                nameInput.classList.add('is-invalid');
                nameError.textContent = 'Nama lengkap tidak boleh kosong.';
                isValid = false;
            }

            if (email === '' || !email.includes('@') || !email.includes('.')) {
                emailInput.classList.add('is-invalid');
                emailError.textContent = 'Format email tidak valid.';
                isValid = false;
            }

            if (isNaN(amount) || amount < 10000) {
                amountInput.classList.add('is-invalid');
                amountError.textContent = 'Jumlah donasi minimal Rp 10.000.';
                isValid = false;
            }

            if (isValid) {
                // Simulate successful submission
                const donateSection = document.getElementById('donate');
                if (donateSection) {
                    donateSection.innerHTML = `
                        <div class="container text-center">
                            <h2>Terima Kasih Atas Donasi Anda!</h2>
                            <p>Donasi sebesar <strong>Rp${amount.toLocaleString('id-ID')}</strong> dari <strong>${name}</strong> telah kami terima.</p>
                            <p>Semoga kebaikan Anda menjadi amal jariyah yang terus mengalir.</p>
                            <p class="mt-4">Tim Rumah Pena</p>
                            <a href="#" class="btn btn-primary mt-3" onclick="window.location.reload();">Kembali ke Halaman Utama</a>
                        </div>
                    `;
                }
                console.log('Donation data:', { name, email, amount });
            }
        });
    }

    // Mobile Menu Toggle
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.navbar-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.navbar')?.offsetHeight || 0), // Adjust for fixed navbar height
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Back to Top Button Functionality
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Show button after scrolling 300px
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Dynamic School List Loading
    const schoolsListDiv = document.getElementById('schools-list');

    const loadSchools = () => {
        // Show loading indicator
        if (loadingSpinner) loadingSpinner.style.display = 'block';
        if (loadingMessage) loadingMessage.style.display = 'block';
        if (schoolsListDiv) schoolsListDiv.innerHTML = ''; // Clear existing content

        // Simulate API call delay
        setTimeout(() => {
            // Mock data - in a real application, this would come from a database via an API call
            const schools = [
                {
                    name: 'Madrasah Nurul Iman',
                    location: 'Jakarta',
                    needs: '50 modul Juz Amma, 20 meja belajar',
                    image: 'https://via.placeholder.com/150/007bff/FFFFFF?text=Sekolah+1' // Placeholder image
                },
                {
                    name: 'Pesantren Al-Hidayah',
                    location: 'Bandung',
                    needs: '100 modul Juz Amma, renovasi ruang kelas',
                    image: 'https://via.placeholder.com/150/28a745/FFFFFF?text=Sekolah+2' // Placeholder image
                },
                {
                    name: 'Tahfidz Qur\'an Baitul Jannah',
                    location: 'Surabaya',
                    needs: '30 modul Juz Amma, papan tulis interaktif',
                    image: 'https://via.placeholder.com/150/ffc107/FFFFFF?text=Sekolah+3' // Placeholder image
                },
                {
                    name: 'TPQ Miftahul Ulum',
                    location: 'Yogyakarta',
                    needs: '40 modul Juz Amma, perlengkapan sholat',
                    image: 'https://via.placeholder.com/150/dc3545/FFFFFF?text=Sekolah+4' // Placeholder image
                }
            ];

            if (schoolsListDiv) {
                schoolsListDiv.innerHTML = ''; // Clear loading message

                schools.forEach(school => {
                    const schoolCard = document.createElement('div');
                    schoolCard.classList.add('school-card');
                    schoolCard.innerHTML = `
                        <img src="${school.image}" alt="${school.name}">
                        <h3>${school.name}</h3>
                        <p><strong>Lokasi:</strong> ${school.location}</p>
                        <p><strong>Kebutuhan:</strong> ${school.needs}</p>
                    `;
                    schoolsListDiv.appendChild(schoolCard);
                });
            }
            // Hide loading indicator
            if (loadingSpinner) loadingSpinner.style.display = 'none';
            if (loadingMessage) loadingMessage.style.display = 'none';
        }, 1000); // Simulate 1 second delay
    };

    loadSchools(); // Call the function to load schools on page load
}); 