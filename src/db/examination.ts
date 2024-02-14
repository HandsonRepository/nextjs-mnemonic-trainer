import { db } from '@/lib/db';
import { getRandomWords } from '@/db/word';

export const createExamination = async (userId: string, wordQuantity = 10) => {
  return await db.$transaction(async (tx) => {
    const examination = await tx.examination.create({
      data: {
        userId,
      },
    });

    const wordObjects = await getRandomWords(wordQuantity);
    const examinationWordsData = wordObjects.map((wordObj, index) => ({
      examinationId: examination.id,
      wordId: wordObj.id,
      position: index + 1,
    }));

    await tx.examinationWord.createMany({
      data: examinationWordsData,
    });

    return examination;
  });
};

export const getExamination = async (examinationId: string, userId: string) => {
  return await db.examination.findFirst({
    where: {
      id: examinationId,
      userId: userId,
    },
    include: {
      words: {
        orderBy: {
          position: 'asc',
        },
        include: {
          word: true,
        },
      },
    },
  });
};
