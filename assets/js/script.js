document.addEventListener('DOMContentLoaded', function () {

    // ---------- About slider (Swiper) Initialization ----------
    const swiperContainer = document.querySelector('.about-swiper');
    if (swiperContainer) {
        const aboutSwiper = new Swiper(swiperContainer, {
            direction: 'vertical',
            loop: false, 
            slidesPerView: 1,

            autoplay: {
                stopOnLastSlide: true,
                // disableOnInteraction: true,
            },

            mousewheel: {
                releaseOnEdges: true,
                thresholdTime: 1000,
            },
        });

        // --- Intersection Observer Logic ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!aboutSwiper.isEnd) {
                        aboutSwiper.autoplay.start();
                    }
                } else {
                    aboutSwiper.autoplay.stop();
                }
            });
        });

        observer.observe(swiperContainer);
    }

    const nextTriggers = document.querySelectorAll('.next-slide-trigger');

    nextTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            aboutSwiper.slideNext();
        });
    });
    // --- "Our Services" Accordion Logic (CSS-based) ---
    const servicesWrapper = document.getElementById("servicesWrapper");

    if (servicesWrapper) {
        const services = [
            { number: "01", title: "Strategic Planning", image: "assets/img/services1.png", description: "Crafting clear, actionable strategies that align with long-term goals and drive organizational success." },
            { number: "02", title: "Branding & Concept Development", image: "assets/img/services2.png", description: "Building powerful brand identities and innovative concepts that resonate with target audiences." },
            { number: "03", title: "Business Development", image: "assets/img/services3.png", description: "Identifying and capitalizing on growth opportunities, fostering strategic partnerships for long-term success." },
            { number: "04", title: "Financial Structuring & Forecasting", image: "assets/img/services4.png", description: "Designing financial frameworks that ensure stability and predict future growth trajectories." },
            { number: "05", title: "Operations & Logistics", image: "assets/img/services5.png", description: "Leveraging data-driven strategies to maximize ROI and drive growth." },
            { number: "06", title: "Digital Presence & Infrastructure", image: "assets/img/services6.png", description: "Establishing a robust digital ecosystem that amplifies online presence and supports scalable growth." },
            { number: "07", title: "Marketing & Execution", image: "assets/img/services7.png", description: "Creating impactful marketing strategies and executing them effectively to reach target markets." },
            { number: "08", title: "Project Management", image: "assets/img/services8.png", description: "Managing projects from start to finish, ensuring timelines, budgets, and goals are met with precision." },
            { number: "09", title: "Market Expansion", image: "assets/img/services9.png", description: "Exploring new markets and optimizing expansion strategies to scale businesses effectively." }
        ];

        let activeServiceIndex = -1;

        // Generate the HTML without inline style for width
        services.forEach((srv, i) => {
            servicesWrapper.innerHTML += `
                <div class="service-item cursor-pointer flex flex-col justify-center items-center bg-[#1C2E5D] border-r border-[#E3D8CE] last:border-none" data-index="${i}">
                    <div class="collapsed flex items-center justify-center h-full w-full overflow-hidden p-4">
                        <div class="flex items-end transform -rotate-90 ">
                            <span class="text-4xl md:text-6xl font-extrabold text-[#E3D8CE] opacity-90">${srv.number}</span>
                            <div class="ml-4 w-96">
                                <span class="font-bold text-base md:text-3xl text-[#E3D8CE]">${srv.title}</span>
                            </div>
                        </div>
                    </div>
                    <div class="expanded hidden w-full h-full">
                        <div class="flex-none w-28 flex items-center justify-center bg-[#1C2E5D] text-[#E3D8CE] border-r border-[#E3D8CE]">
                            <div class="flex items-end transform -rotate-90 ">
                                <span class="text-6xl font-extrabold">${srv.number}</span>
                                <div class="ml-4 w-96">
                                    <span class=" font-bold text-3xl">${srv.title}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex-1 flex flex-col md:flex-row items-center p-6 md:p-12 bg-[#E3D8CE] text-slate-800">
                            <div class="w-full md:w-1/2 md:pr-10 mb-6 md:mb-0">
                                <p class="text-xl lg:text-2xl font-light italic leading-relaxed text-[#1C2E5D] font-ibm-plex">${srv.description}</p>
                            </div>
                            <div class="w-full md:w-1/2">
                                <img src="${srv.image}" alt="${srv.title}" class="w-full h-auto max-h-[400px] object-contain rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>`;
        });

        const serviceItems = document.querySelectorAll(".service-item");

        function updateActiveService(activeIndex) {
            serviceItems.forEach((item, i) => {
                const isNowActive = i === activeIndex;
                item.classList.toggle('active', isNowActive);
                item.querySelector(".collapsed").classList.toggle('hidden', isNowActive);
                item.querySelector(".expanded").classList.toggle('hidden', !isNowActive);
                item.querySelector(".expanded").classList.toggle('flex', isNowActive);
            });
            activeServiceIndex = activeIndex;
        }

        servicesWrapper.addEventListener('click', (e) => {
            const item = e.target.closest('.service-item');
            if (item && item.dataset.index) {
                const index = parseInt(item.dataset.index, 10);
                const newIndex = index === activeServiceIndex ? -1 : index;
                updateActiveService(newIndex);
            }
        });
    }

});