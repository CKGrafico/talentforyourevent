const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const events = ['Onsite', 'Online'];
  const eventsUpserts = events.map((event) =>
    prisma.eventType.upsert({
      where: { name: event },
      update: {},
      create: {
        name: event
      }
    })
  );

  await Promise.all(eventsUpserts);

  const categories = [
    'Agile',
    'Backend',
    'Cloud',
    'Devops',
    'Frontend',
    'IoT',
    'Mobile',
    'Security',
    'User Experience',
    'User Interface',
    'Videogames'
  ];
  const categoriesUpserts = categories.map((category) =>
    prisma.category.upsert({
      where: { name: category },
      update: {},
      create: {
        name: category
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
      technologies: ['Java', '.Net', 'PHP']
    },
    {
      category: 'Cloud',
      technologies: ['AWS', , 'Azure', 'Google Cloud']
    },
    {
      category: 'Devops',
      technologies: []
    },
    {
      category: 'Frontend',
      technologies: ['JavaScript', 'TypeScript', 'Layout']
    },
    {
      category: 'IoT',
      technologies: []
    },
    {
      category: 'Mobile',
      technologies: ['Flutter', 'Kotlin', 'React Native', 'Swift', 'Xamarin']
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
      technologies: []
    }
  ];
  const technologiesUpserts = technologies.map((category) =>
    category.technologies.map((technology) =>
      prisma.technology.upsert({
        where: { name: technology },
        update: {},
        create: {
          name: technology,
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
