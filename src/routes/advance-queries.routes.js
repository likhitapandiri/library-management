const include = async (req, res) => {
  const records = await prisma.borrowRecord.findMany({
    include: {
      student: true,
      book: true,
    },
  });
};
const select = async (req, res) => {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
    },
  });
};

const includeAndSelect = async (req, res) => {
  const records = await prisma.borrowRecord.findMany({
    select: {
      id: true,

      student: {
        select: {
          name: true,
        },
      },

      book: {
        select: {
          title: true,
        },
      },
    },
  });
};


const advanced = async ( req,res) => {
  //comparisons WHERE quantity > 5

  const records1 = await prisma.book.findMany({
    where: {
      quantity: {
        gte: 5,
      },
    },
  });


  //contains WHERE title LIKE '%Code%'

  const records2 = await prisma.book.findMany({
    where: {
      title: {
        contains: "Code",
      },
    },
  });

  //startsWith WHERE title LIKE 'Clean%'
    const records3 = await prisma.book.findMany({

  where: {
    title: {
      startsWith: "Clean"
    }
  }
  });

  //endsWith  WHERE title LIKE '%Code'
  const records4 = await prisma.book.findMany({
  where: {
    title: {
      endsWith: "Code"
    }
  },
  });

  //OR  WHERE author='Robert Martin' OR author='James Clear'
const records5 = await prisma.book.findMany({
  where: {
    OR: [
      {
        author: "Robert Martin",
      },
      {
        author: "James Clear",
      },
    ],
  },
});

  //ORDERBY  -- ORDER BY title ASC
const records6 = await prisma.book.findMany({
  orderBy: {
    title: "asc",
  },
});

  //LIMIT 
const records7 = await prisma.book.findMany({
  take: 5,
  skip: 0,
});

  //OFFSET 
 const records8 = await prisma.book.findMany({
   skip: 5,
 });

  //PAGINATION 
  //page 1
const records9 = await prisma.book.findMany({
  take: 5,
  skip: 0,
});
}

