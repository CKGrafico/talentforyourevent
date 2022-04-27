const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const simpleIcons = require('simple-icons');

function getIcon(name) {
  const icon = simpleIcons.Get(name.replace(/ /g, '').toLowerCase());

  return icon?.svg || '';
}

async function main() {
  const events = [
    { name: 'Onsite', icon: getIcon('Google Classroom') },
    { name: 'Online', icon: getIcon('Google Earth') }
  ];
  const eventsUpserts = events.map((event) =>
    prisma.eventType.upsert({
      where: { name: event.name },
      update: { icon: event.icon },
      create: {
        name: event.name,
        icon: event.icon
      }
    })
  );

  await Promise.all(eventsUpserts);

  const categories = [
    { name: 'Agile', icon: getIcon('Jira') },
    { name: 'Backend', icon: getIcon('StackEdit') },
    { name: 'Cloud', icon: getIcon('Cloudways') },
    { name: 'Devops', icon: getIcon('Terraform') },
    { name: 'Frontend', icon: getIcon('Visual Studio Code') },
    { name: 'IoT', icon: getIcon('SmartThings') },
    { name: 'Mobile', icon: getIcon('motorola') },
    { name: 'Security', icon: getIcon('openvpn') },
    { name: 'User Experience', icon: getIcon('Figma') },
    { name: 'User Interface', icon: getIcon('Inkscape') },
    { name: 'Videogames', icon: getIcon('Nintendo GameCube') }
  ];
  const categoriesUpserts = categories.map((category) =>
    prisma.category.upsert({
      where: { name: category.name },
      update: {
        icon: category.icon
      },
      create: {
        name: category.name,
        icon: category.icon
      }
    })
  );

  const insertedCategories = await Promise.all(categoriesUpserts);
  const technologies = [
    {
      category: 'Agile',
      technologies: [
        {
          name: 'Confluence',
          icon: getIcon('Confluence')
        },
        {
          name: 'Jira',
          icon: getIcon('Jira')
        },
        {
          name: 'Kanban',
          icon: getIcon('Trello')
        },
        {
          name: 'Scrum',
          icon: getIcon('Azure DevOps')
        }
      ]
    },
    {
      category: 'Backend',
      technologies: [
        {
          name: 'Java',
          icon: getIcon('Java')
        },
        {
          name: '.Net',
          icon: getIcon('dotNet')
        },
        {
          name: 'PHP',
          icon: getIcon('PHP')
        }
      ]
    },
    {
      category: 'Cloud',
      technologies: [
        { name: 'AWS', icon: getIcon('Amazon AWS') },
        { name: 'Azure', icon: getIcon('Microsoft Azure') },
        { name: 'Google Cloud', icon: getIcon('Google Cloud') }
      ]
    },
    {
      category: 'Devops',
      technologies: [
        { name: 'Azure DevOps', icon: getIcon('Azure DevOps') },
        { name: 'Github Actions', icon: getIcon('Github') },
        { name: 'Jenkins', icon: getIcon('Jenkins') },
        { name: 'Travis CI', icon: getIcon('Travis CI') }
      ]
    },
    {
      category: 'Frontend',
      technologies: [
        { name: 'JavaScript', icon: getIcon('JavaScript') },
        { name: 'TypeScript', icon: getIcon('TypeScript') },
        { name: 'Layout', icon: getIcon('CSS3') }
      ]
    },
    {
      category: 'IoT',
      technologies: [
        { name: 'Arduino', icon: getIcon('Arduino') },
        { name: 'Raspberry Pi', icon: getIcon('Raspberry Pi') },
        { name: 'SmartThings', icon: getIcon('SmartThings') }
      ]
    },
    {
      category: 'Mobile',
      technologies: [
        { name: 'Flutter', icon: getIcon('Flutter') },
        { name: 'Kotlin', icon: getIcon('Kotlin') },
        { name: 'React Native', icon: getIcon('React') },
        { name: 'Swift', icon: getIcon('Swift') },
        { name: 'Xamarin', icon: getIcon('Xamarin') }
      ]
    },
    {
      category: 'Security',
      technologies: [{ name: 'Fortify', icon: getIcon('Fortran') }]
    },
    {
      category: 'User Experience',
      technologies: [
        { name: 'Figma', icon: getIcon('Figma') },
        { name: 'Inkscape', icon: getIcon('Inkscape') }
      ]
    },
    {
      category: 'User Interface',
      technologies: [
        { name: 'Figma', icon: getIcon('Figma') },
        { name: 'Inkscape', icon: getIcon('Inkscape') }
      ]
    },
    {
      category: 'Videogames',
      technologies: [
        { name: 'Godot', icon: getIcon('Godot Engine') },
        { name: 'PhaserJS', icon: getIcon('JavaScript') },
        { name: 'Unity', icon: getIcon('Unity') },
        { name: 'Unreal Engine', icon: getIcon('Unreal Engine') }
      ]
    }
  ];
  const technologiesUpserts = technologies.map((category) =>
    category.technologies.map(async (technology) => {
      try {
        await prisma.technology.upsert({
          where: { name: technology.name },
          update: { icon: technology.icon },
          create: {
            name: technology.name,
            icon: technology.icon,
            categoryId: insertedCategories.find((insertedCategory) => category.category === insertedCategory.name).id
          }
        });
      } catch (e) {
        throw new Error(`Cannot upsert ${technology.name} - ${e.message}`);
      }
    })
  );
  await Promise.all(technologiesUpserts.flat());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
