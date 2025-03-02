const skills = [
    { icon: 'fab fa-html5', title: 'HTML', description: 'Markup language for creating web pages.' },
    { icon: 'fab fa-css3-alt', title: 'CSS', description: 'Style sheet language for designing web pages.' },
    { icon: 'fab fa-js', title: 'JavaScript', description: 'Programming language for web development.' },
    { icon: 'fab fa-react', title: 'React', description: 'JavaScript library for building user interfaces.' },
    { icon: 'fab fa-node-js', title: 'Node.js', description: 'JavaScript runtime for server-side programming.' },
    { icon: 'fab fa-python', title: 'Python', description: 'High-level programming language for general-purpose programming.' },
    { icon: 'fas fa-cube', title: 'Blender', description: '3D modeling and animation software.' },
    { icon: 'fas fa-film', title: 'Aftereffects', description: 'Digital visual effects and motion graphics software.' },
    { icon: 'fas fa-database', title: 'Data', description: 'Data analysis and manipulation.' },
    { icon: 'fas fa-cubes', title: 'ThreeJS', description: 'JavaScript library for 3D graphics on the web.' },
    { icon: 'fas fa-robot', title: 'AI', description: 'Engineering prompts for AI models.' }
];

document.addEventListener('DOMContentLoaded', () => {
  SkillsSection();
});

function SkillsSection() {
  const cardContainer = document.getElementById('card-container');
  console.log('Card section:', cardContainer);

  if (cardContainer) {
    skills.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <i class="${skill.icon} card-icon"></i>
                <div class="card-title">${skill.title}</div>
            </div>
            <div class="card-back">
                <div class="card-description">${skill.description}</div>
            </div>
        </div>
      `;

      cardContainer.appendChild(card);
      console.log('Card added:', card);
    });
  }
}

export default SkillsSection;