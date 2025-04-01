document.addEventListener('DOMContentLoaded', function() {
    // 获取轮播相关元素
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelectorAll('.testimonial-prev');
    const nextBtn = document.querySelectorAll('.testimonial-next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    let slideInterval;
    const autoSlideDelay = 5000; // 5秒自动切换
    
    // 初始化轮播
    function initCarousel() {
        // 显示当前幻灯片，隐藏其他幻灯片
        updateSlides();
        
        // 设置自动轮播
        startAutoSlide();
        
        // 为前进/后退按钮添加事件监听器
        prevBtn.forEach(btn => {
            btn.addEventListener('click', prevSlide);
        });
        
        nextBtn.forEach(btn => {
            btn.addEventListener('click', nextSlide);
        });
        
        // 为指示器添加事件监听器
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateSlides();
                resetAutoSlide();
            });
        });
        
        // 鼠标悬停时暂停自动轮播
        document.querySelectorAll('.testimonial-carousel').forEach(carousel => {
            carousel.addEventListener('mouseenter', stopAutoSlide);
            carousel.addEventListener('mouseleave', startAutoSlide);
        });
    }
    
    // 更新幻灯片显示
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
            slide.style.opacity = index === currentSlide ? 1 : 0;
        });
        
        // 更新指示器状态
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // 显示上一张幻灯片
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        if (currentSlide < 0) currentSlide = slides.length - 1; // 确保当前幻灯片不小于 0
        updateSlides();
        resetAutoSlide();
    }
    
    // 显示下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        if (currentSlide >= slides.length) currentSlide = 0; // 确保当前幻灯片不超出幻灯片总数
        updateSlides();
        resetAutoSlide();
    }
    
    // 开始自动轮播
    function startAutoSlide() {
        stopAutoSlide();
        slideInterval = setInterval(() => {
            nextSlide();
        }, autoSlideDelay);
    }
    
    // 停止自动轮播
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // 重置自动轮播计时器
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // 初始化轮播
    if (slides.length > 0) {
        initCarousel();
    }
});

