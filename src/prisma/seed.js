const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const simpleIcons = require('simple-icons');

function getIcon(name) {
  const icon = simpleIcons.Get(name.replace(/ /g, '').toLowerCase());

  return icon?.svg || '';
}

async function main() {
  const events = [
    { name: 'Onsite', icon: '' },
    { name: 'Online', icon: '' }
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
    { name: 'Agile', icon: '' },
    { name: 'Backend', icon: '' },
    { name: 'Cloud', icon: '' },
    { name: 'Devops', icon: '' },
    { name: 'Frontend', icon: '' },
    { name: 'IoT', icon: '' },
    { name: 'Mobile', icon: '' },
    { name: 'Security', icon: '' },
    { name: 'User Experience', icon: '' },
    { name: 'User Interface', icon: '' },
    { name: 'Videogames', icon: '' }
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
      technologies: []
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
      technologies: []
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
      technologies: []
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
      technologies: []
    },
    {
      category: 'User Experience',
      technologies: []
    },
    {
      category: 'User Interface',
      technologies: []
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
    category.technologies.map((technology) =>
      prisma.technology.upsert({
        where: { name: technology.name },
        update: { icon: technology.icon },
        create: {
          name: technology.name,
          icon: technology.icon,
          categoryId: insertedCategories.find((insertedCategory) => category.category === insertedCategory.name).id
        }
      })
    )
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
