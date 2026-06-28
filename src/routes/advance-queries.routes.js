import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

const include = async (req, res) => {
  try{
  const records = await prisma.borrowRecord.findMany({
    include: {
      student: true,
      book: true,
    },
  });

    if (!records) {
      return res.status(404).json({
        message: "records not found",
      });
    }
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const select = async (req, res) => {
  try{
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
    },
  });
      if (!records) {
      return res.status(404).json({
        message: "records not found",
      });
    }
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const includeAndSelect = async (req, res) => {
  try{
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

     if (!records) {
      return res.status(404).json({
        message: "records not found",
      });
    }
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
}
};

const advanced = async ( req,res) => {
  try{
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
    quantity: "asc",
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

const records =  {
  records1,
  records2,
  records3,
  records4,
  records5,
  records6,
  records7,
  records8,
  records9,
}
    if (!records) {
      return res.status(404).json({
        message: "records not found",
      });
    }
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


router.get("/include", include);

router.get("/select", select);

router.get("/include-select", includeAndSelect);

router.get("/queries", advanced);

export default router; 