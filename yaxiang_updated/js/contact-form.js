// EmailJS configuration for contact form with reCAPTCHA
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init({
        publicKey: "YOUR_PUBLIC_KEY", // You'll need to replace this with an actual public key from EmailJS
    });

    // Set up reCAPTCHA
    const loadRecaptcha = function() {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    };
    
    loadRecaptcha();

    // Add reCAPTCHA divs to forms
    const contactForm = document.getElementById('contactForm');
    const contactFormEn = document.getElementById('contactFormEn');
    
    if (contactForm) {
        const recaptchaDiv = document.createElement('div');
        recaptchaDiv.className = 'g-recaptcha mb-3';
        recaptchaDiv.setAttribute('data-sitekey', 'YOUR_RECAPTCHA_SITE_KEY'); // Replace with actual site key
        contactForm.insertBefore(recaptchaDiv, contactForm.querySelector('button[type="submit"]').parentNode);
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verify reCAPTCHA
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                alert('请完成验证码验证');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 发送中...';
            
            // Prepare form data with recipient
            const formData = new FormData(this);
            formData.append('to_email', '337514556@qq.com');
            
            // Send the form using EmailJS
            emailjs.sendForm('contact_service', 'contact_form', this)
                .then(function() {
                    alert('感谢您的留言！我们将尽快与您联系。');
                    contactForm.reset();
                    grecaptcha.reset();
                })
                .catch(function(error) {
                    console.error('发送失败:', error);
                    alert('发送失败，请稍后再试。');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                });
        });
    }
    
    if (contactFormEn) {
        const recaptchaDivEn = document.createElement('div');
        recaptchaDivEn.className = 'g-recaptcha mb-3';
        recaptchaDivEn.setAttribute('data-sitekey', 'YOUR_RECAPTCHA_SITE_KEY'); // Replace with actual site key
        contactFormEn.insertBefore(recaptchaDivEn, contactFormEn.querySelector('button[type="submit"]').parentNode);
        
        contactFormEn.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verify reCAPTCHA
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                alert('Please complete the CAPTCHA verification');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            
            // Prepare form data with recipient
            const formData = new FormData(this);
            formData.append('to_email', '337514556@qq.com');
            
            // Send the form using EmailJS
            emailjs.sendForm('contact_service', 'contact_form', this)
                .then(function() {
                    alert('Thank you for your message! We will contact you soon.');
                    contactFormEn.reset();
                    grecaptcha.reset();
                })
                .catch(function(error) {
                    console.error('Sending failed:', error);
                    alert('Sending failed, please try again later.');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                });
        });
    }
});
