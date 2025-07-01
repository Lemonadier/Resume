async function fetchData() {
    try {
        const [infoRes, filesRes] = await Promise.all([
            fetch('information.json'),
            fetch('files.json')
        ]);

        if (!infoRes.ok || !filesRes.ok) {
            throw new Error('Failed to fetch data');
        }

        const info = await infoRes.json();
        const files = await filesRes.json();
        
        populateData(info, files);

    } catch (error) {
        console.error("Error fetching resume data:", error);
        // You could display an error message to the user here
    }
}

function populateData(info, files) {
    // Set page title
    document.title = `${info.name} - Student`;

    // Header
    document.getElementById('profile-image').src = info.profileImage;
    document.getElementById('user-name').textContent = info.name;
    document.getElementById('user-nickname').textContent = info.nickname;
    document.getElementById('user-tagline').textContent = info.tagline;

    // Social Links
    const socialLinksContainer = document.getElementById('social-links');
    socialLinksContainer.innerHTML = files.socialLinks.map(link => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-sky-400 transition-colors">
            <span class="sr-only">${link.name}</span>
            <i data-lucide="${link.icon}" class="h-6 w-6"></i>
        </a>
    `).join('');

    // About Section
    const aboutContainer = document.getElementById('about-content');
    aboutContainer.innerHTML = info.about.map(p => `<p class="mt-4 leading-relaxed">${p}`).join('');

    // Education Section
    const educationContainer = document.getElementById('education-content');
    educationContainer.innerHTML = info.education.map(edu => `
        <div class="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
            <div class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
            <header class="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">${edu.period}</header>
            <div class="z-10 sm:col-span-6">
                <h3 class="font-medium leading-snug text-slate-200">
                    <div>
                        <a class="block font-medium leading-tight text-slate-200 hover:text-sky-400 focus-visible:text-sky-400 group/link text-base" href="${edu.institution_url}" target="_blank" rel="noreferrer noopener">
                            <span class="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                            <span class="inline-flex items-baseline">${edu.degree}${edu.degree === 'Studying in Engineering' ? `
                                <span class="relative flex size-3 ml-2">
                                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                  <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                                </span>
                            ` : ''}
                            </span>
                        </a>
                        <a class="block items-baseline font-medium leading-tight text-slate-500 hover:text-sky-400 focus-visible:text-sky-400 group/link text-base" href="${edu.institution_url}" target="_blank" rel="noreferrer noopener">
                            <span>${edu.institution}</span>
                        </a>
                    </div>
                </h3>
                <p class="mt-2 text-sm leading-normal text-slate-400">${edu.description}</p>
            </div>
        </div>
    `).join('');
    
    // Skills Section
    const skillsContainer = document.getElementById('skills-content');
    const technicalSkills = info.skills.technical.map(skill => `<li class="mr-1.5 mt-2"><div class="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 transition-all duration-300 hover:scale-110 cursor-pointer hover:mx-2.5">${skill}</div></li>`).join('');
    const experiences = info.skills.experiences.map(tool => `<li class="mr-1.5 mt-2"><div class="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 transition-all duration-300 hover:scale-110 cursor-pointer hover:mx-2.5">${tool}</div></li>`).join('');
    const tools = info.skills.tools.map(tool => `<li class="mr-1.5 mt-2"><div class="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 transition-all duration-300 hover:scale-110 cursor-pointer hover:mx-2.5">${tool}</div></li>`).join('');
    
    skillsContainer.innerHTML = `
        <h3 class="font-medium text-slate-200 mb-2">Technical Skills</h3>
        <ul class="flex flex-wrap">${technicalSkills}</ul>
        <h3 class="font-medium text-slate-200 mt-6">Experiences</h3>
        <ul class="flex flex-wrap">${experiences}</ul>
        <h3 class="font-medium text-slate-200 mt-6 mb-2">Tools & Software</h3>
        <ul class="mt-2 flex flex-wrap">${tools}</ul>
    `;

    // Projects Section
    const projectsContainer = document.getElementById('projects-content');
    if (files.projects && projectsContainer) {
        projectsContainer.innerHTML = files.projects.map(project => `
            <div class="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                <div class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                <div class="z-10 sm:order-2 sm:col-span-6">
                    <h3>
                        <a class="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-sky-400 focus-visible:text-sky-400 group/link text-base" href="${project.url}" target="_blank" rel="noreferrer noopener">
                            <span class="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                            <span>${project.name}</span>
                        </a>
                    </h3>
                    <p class="mt-2 text-sm leading-normal text-slate-400">
                        ${project.description}
                    </p>
                    <a class="relative mt-2 inline-flex items-center text-sm font-medium text-slate-300 hover:text-sky-400" href="${project.url}" target="_blank" rel="noreferrer noopener">
                        <i data-lucide="link-2" class="mr-1 h-4 w-4"></i>
                        <span>View Project</span>
                    </a>
                </div>
                <img alt="${project.name} screenshot" loading="z-index-99 lazy" width="200" height="48" class="transition-all group-hover:scale-125 rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1" style="color:transparent" src="${project.image}">
            </div>
        `).join('');
    }

    // Footer
    const footer = info.footer;
    document.getElementById('page-footer').innerHTML = `
        <p>Coded in <a href="${footer.coded_in_url}" class="font-medium text-slate-400 hover:text-sky-400" target="_blank" rel="noreferrer noopener">${footer.coded_in}</a>. Built with <a href="${footer.built_with_url}" class="font-medium text-slate-400 hover:text-sky-400" target="_blank" rel="noreferrer noopener">${footer.built_with}</a> and deployed with <a href="${footer.deployed_with_url}" class="font-medium text-slate-400 hover:text-sky-400" target="_blank" rel="noreferrer noopener">${footer.deployed_with}</a>.</p>
    `;

    // Re-initialize Lucide icons
    lucide.createIcons();
}

// Active nav link highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 64) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        const link = a.querySelector('.nav-text');
        const indicator = a.querySelector('.nav-indicator');
        link.classList.remove('text-slate-200');
        indicator.classList.remove('w-16', 'bg-slate-200');
        indicator.classList.add('w-8', 'bg-slate-600');
        if (a.href.includes(current)) {
            link.classList.add('text-slate-200');
            indicator.classList.remove('w-8', 'bg-slate-600');
            indicator.classList.add('w-16', 'bg-slate-200');
        }
    });
});

// Fetch data on page load
document.addEventListener('DOMContentLoaded', fetchData);
