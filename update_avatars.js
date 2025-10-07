const fs = require('fs');

const avatarColors = {
  // Old Testament - Earthy browns and golds
  'david': ['92400E', 'FDE68A'],
  'solomon': 'D97706,FEF3C7',
  'esther': ['DB2777', 'FCE7F3'],
  'isaiah': ['7C2D12', 'FED7AA'],
  'abraham': ['713F12', 'FDE68A'],
  'joseph': ['A21CAF', 'FAE8FF'],
  'samuel': ['854D0E', 'FEF3C7'],
  'daniel': ['1E3A8A', 'DBEAFE'],
  'elijah': ['DC2626', 'FEE2E2'],
  'ruth': ['BE185D', 'FCE7F3'],
  'deborah': ['BE123C', 'FFE4E6'],
  'joshua': ['B45309', 'FED7AA'],
  'jonah': ['0E7490', 'CFFAFE'],
  'job': ['44403C', 'E7E5E4'],
  'noah': ['0369A1', 'DBEAFE'],
  
  // Jesus & Disciples - Blues, whites, purples
  'jesus': ['7C3AED', 'EDE9FE'],
  'mary': ['4338CA', 'E0E7FF'],
  'john_the_baptist': ['92400E', 'FECACA'],
  'peter': ['1E40AF', 'DBEAFE'],
  'john_apostle': ['5B21B6', 'EDE9FE'],
  'andrew': ['0C4A6E', 'CFFAFE'],
  'james_zebedee': ['B45309', 'FED7AA'],
  'philip': ['0F766E', 'CCFBF1'],
  'bartholomew': ['065F46', 'D1FAE5'],
  'matthew': ['16A34A', 'DCFCE7'],
  'thomas': ['78716C', 'E7E5E4'],
  'james_alphaeus': ['57534E', 'E7E5E4'],
  'thaddaeus': ['44403C', 'F5F5F4'],
  'simon_zealot': ['991B1B', 'FEE2E2'],
  'judas': ['292524', 'D6D3D1'],
  
  // New Testament - Greens, teals, purples
  'paul': ['6D28D9', 'EDE9FE'],
  'luke': ['0E7490', 'CFFAFE'],
  'mark': ['047857', 'D1FAE5'],
  'barnabas': ['CA8A04', 'FEF3C7'],
  'stephen': ['DC2626', 'FEE2E2'],
  'timothy': ['15803D', 'DCFCE7'],
  'james_brother': ['A16207', 'FEF3C7'],
  'lydia': ['BE185D', 'FCE7F3'],
  
  // General
  'bible_helper': ['1F2937', 'F3F4F6']
};

let content = fs.readFileSync('constants.ts', 'utf8');

// Replace each picsum.photos URL
for (const [id, colors] of Object.entries(avatarColors)) {
  const bgColor = Array.isArray(colors) ? colors[0] : colors.split(',')[0];
  const textColor = Array.isArray(colors) ? colors[1] : colors.split(',')[1];
  
  // Find and replace picsum.photos URLs
  const oldPattern = new RegExp(`avatarUrl: 'https://picsum\\.photos/seed/${id}[^']*'`, 'g');
  
  // Extract the name from the id (capitalize first letter, handle underscores)
  let name = id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  content = content.replace(oldPattern, `avatarUrl: createAvatar('${name}', '${bgColor}', '${textColor}')`);
}

fs.writeFileSync('constants.ts', content);
console.log('Avatars updated successfully!');
