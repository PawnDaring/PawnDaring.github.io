document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            title: 'Github Repository',
            description: 'My one-stop shop for all my little things I\'ve been creating.',
            projectUrl: 'https://github.com/PawnDaring/PawnDaring.github.io',
            githubUrl: '',
            image: './images/Key1.png'
        },
        {
            title: 'CodePen Playground',
            description: 'My little playground for ideas.',
            projectUrl: 'https://codepen.io/Pawndaring',
            githubUrl: '',
            image: './images/Key2.png'
        },
        {
            title: 'Demo Reel',
            description: '2024 demo reel.',
            projectUrl: 'https://youtu.be/-KJ5rhFqSmE?si=-HdSRLPA0mdhTa7V',
            githubUrl: '',
            image: './images/TV1.png'
        },
        {
            title: 'Bird Napped - Emmy Award Winner',
            description: 'Proud video project that won an Emmy.',
            projectUrl: 'https://www.azcardinals.com/video/folktales-birdnapped',
            githubUrl: '',
            image: './images/Projects.png'
        },
        {
            title: 'Emmy Award',
            description: 'An accolade for when I won an Emmy.',
            projectUrl: 'https://rockymountainemmy.org/emmy-awards/nominees-recipients/',
            githubUrl: '',
            image: './images/Emmy.png'
        },
        {
            title: 'Kiosk Demo',
            description: 'Interactive Maps using Mapbox',
            projectUrl: 'https://dev-prod.smallgiantsonline.com/project-overview-interactive/dist/',
            githubUrl: '',
            image: './images/Kiosk.png'
        }
    ];

    const projectsContainer = document.getElementById('projects-container');

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        projectCard.innerHTML = `
            <div class="group">
                <div class="relative h-48 overflow-hidden">
                    <div class="absolute inset-0 bg-[var(--background-dark)] opacity-40 z-10"></div>
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 opacity-10 bg-[var(--hex-pattern)] bg-repeat z-20"></div>
                </div>
                <div class="p-6 relative z-30">
                    <h3 class="font-[var(--font-header)] text-xl mb-2 text-[var(--accent-maroon)] group-hover:text-[var(--subtext-blue)] transition-colors duration-300">${project.title}</h3>
                </div>
                <div class="p-6 relative z-30">
                    <p class="text-[var(--text-light)] opacity-80 mb-4">${project.description}</p>
                    <div class="flex gap-4">
                        <a href="${project.projectUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-[var(--accent-maroon)] hover:text-[var(--subtext-blue)] transition-colors duration-300">
                            <i class="fas fa-external-link-alt" style="font-size: 20px;"></i>
                            <span>View Project</span><br>
                        </a>
                        ${project.githubUrl ? `
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-[var(--text-light)] hover:text-[var(--subtext-blue)] transition-colors duration-300">
                            <i class="fab fa-github" style="font-size: 20px;"></i>
                            <span>Source Code</span>
                        </a>` : ''}
                    </div>
                </div>
            </div>
        `;

        projectsContainer.appendChild(projectCard);
    });

    lucide.createIcons();
});