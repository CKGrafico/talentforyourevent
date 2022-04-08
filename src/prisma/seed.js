const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const simpleIcons = require('simple-icons');

const icon = simpleIcons.Get('javascript');

async function main() {
  const events = [
    { name: 'Onsite', icon: '' },
    { name: 'Online', icon: '' }
  ];
  const eventsUpserts = events.map((event) =>
    prisma.eventType.upsert({
      where: { name: event.name },
      update: {},
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
      update: {},
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
          icon: ''
        },
        {
          name: '.Net',
          icon: ''
        },
        {
          name: 'PHP',
          icon: ''
        }
      ]
    },
    {
      category: 'Cloud',
      technologies: [
        { name: 'AWS', icon: '' },
        { name: 'Azure', icon: '' },
        { name: 'Google Cloud', icon: '' }
      ]
    },
    {
      category: 'Devops',
      technologies: []
    },
    {
      category: 'Frontend',
      technologies: [
        { name: 'JavaScript', icon: '' },
        { name: 'TypeScript', icon: '' },
        { name: 'Layout', icon: '' }
      ]
    },
    {
      category: 'IoT',
      technologies: []
    },
    {
      category: 'Mobile',
      technologies: [
        { name: 'Flutter', icon: '' },
        { name: 'Kotlin', icon: '' },
        { name: 'React Native', icon: '' },
        { name: 'Swift', icon: '' },
        { name: 'Xamarin', icon: '' }
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
        { name: 'Godot', icon: '' },
        { name: 'PhaserJS', icon: '' },
        { name: 'Unity', icon: '' },
        { name: 'Unreal Engine', icon: '' }
      ]
    }
  ];
  const technologiesUpserts = technologies.map((category) =>
    category.technologies.map((technology) =>
      prisma.technology.upsert({
        where: { name: technology.name },
        update: {},
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
