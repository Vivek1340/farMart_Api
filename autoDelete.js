import schedule from "node-schedule";
import FileModel from "./models/fileModel.js";
import FirebaseHandler from "./firebase/firebaseHandler.js";
const timeBeforeDeletion = 15 * 24 * 60 * 60 * 1000;

const autoDelete = async () => {
  console.log("Starting to delete files");
  try {
    const files = await FileModel.find({
      createdAt: {
        $lt: new Date(Date.now() - timeBeforeDeletion).toISOString(),
      },
    });
    for (const file of files) {
      await FirebaseHandler.deleteFile(file.name);
      await FileModel.findByIdAndDelete(file._id);
    }
  } catch (err) {
    console.log("Files deleted");
  }
};

schedule.scheduleJob("0 2 */7 * * ", autoDelete);
