/** @odoo-module **/

// Junk Pricing Frontend JavaScript

document.addEventListener('DOMContentLoaded', function () {
    const zipInput = document.getElementById('zip_code');

    if (zipInput) {
        // Auto-format: only allow digits
        zipInput.addEventListener('input', function (e) {
            this.value = this.value.replace(/\D/g, '').slice(0, 5);
        });

        // Auto-submit when 5 digits entered
        zipInput.addEventListener('keyup', function (e) {
            if (this.value.length === 5 && e.key !== 'Enter') {
                // Optional: auto-submit after 500ms delay
                // setTimeout(() => this.form.submit(), 500);
            }
        });
    }
});
